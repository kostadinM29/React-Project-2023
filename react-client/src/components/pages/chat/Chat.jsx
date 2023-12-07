import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as signalR from '@microsoft/signalr';
import { ROUTE_ENDPOINTS } from '../../../constants/routeEndpoints';
import { ENDPOINTS } from '../../../constants/apiEndpoints';

import useAuth from '../../../hooks/useAuth';
import InputField from '../../inputs/InputField';

const Chat = () =>
{
    const { auth } = useAuth();
    const { listingId, otherUser } = useParams();
    const navigate = useNavigate();

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sendMessageError, setSendMessageError] = useState(null);

    useEffect(() =>
    {
        if (auth.user && auth.user.unique_name === otherUser)
        {
            // Prevent users from accessing chat with themselves
            navigate(ROUTE_ENDPOINTS.HOME);
        }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${ENDPOINTS.BASE_URL}chatHub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () =>
        {
            if (newConnection && newConnection.state === signalR.HubConnectionState.Connected)
            {
                newConnection.stop();
            }
        };
    }, [auth.user, otherUser, navigate]);

    useEffect(() =>
    {
        if (connection && connection.state === signalR.HubConnectionState.Disconnected)
        {
            startSignalRConnection();
        }
    }, [connection]);

    useEffect(() =>
    {
        if (connection)
        {
            connection.on('ReceiveMessage', (message) =>
            {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            connection.on('UserJoined', (userId) =>
            {
                console.log(`User ${userId} joined the chat`);
            });
        }
    }, [connection]);

    const startSignalRConnection = async () =>
    {
        try
        {
            await connection.start();
            console.log('Connected!');
            joinChat();
        }
        catch (error)
        {
            console.error('Connection failed:', error);
        }
    };

    const joinChat = () =>
    {
        if (connection)
        {
            const groupKey = getGroupKey(auth.user.unique_name, otherUser, listingId);

            connection
                .invoke('GetChatHistory', groupKey)
                .then((chatHistory) =>
                {
                    setMessages(chatHistory);
                })
                .catch((error) =>
                {
                    console.error('Error fetching chat history:', error);
                });

            connection
                .invoke('JoinChat', groupKey, auth.user.unique_name)
                .catch((error) =>
                {
                    console.error('Error joining chat:', error);
                });
        }
    };


    const sendMessage = async () =>
    {
        if (connection)
        {
            try
            {
                const groupKey = getGroupKey(auth.user.unique_name, otherUser, listingId);

                if (!message.trim())
                {
                    setSendMessageError('Message cannot be empty!');
                    return;
                }

                setSendMessageError(null);

                await connection.invoke('SendMessage', groupKey, Number(listingId), auth.user.unique_name, otherUser, message);
                setMessage('');
            }
            catch (error)
            {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyDown = (e) =>
    {
        if (e.key === 'Enter' && !e.shiftKey)
        {
            e.preventDefault();
            sendMessage();
        }
    };

    const getGroupKey = (user1, user2, listingId) =>
    {
        const sortedUsers = [user1, user2].sort();

        return `${sortedUsers[0]}_${sortedUsers[1]}_${listingId}`;
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='flex-grow overflow-auto dark:bg-gray-800'>
                <ul className='list-none p-4'>
                    {messages.map((msg) => (
                        <li
                            key={msg.id}
                            className={`flex items-end ${msg.sender === auth.user.unique_name
                                ? 'justify-end'
                                : ''} mb-2`}
                        >
                            <div
                                className={`p-2 rounded ${msg.sender === auth.user.unique_name
                                    ? 'rounded-br-none bg-teal-300'
                                    : 'rounded-bl-none bg-pink-300'
                                    }`}
                            >
                                <div className='flex justify-between items-center mb-1'>
                                    <div className='text-lg font-bold'>{msg.sender}</div>
                                    <div className='pl-2 text-sm text-gray-700'>{msg.timestamp}</div>
                                </div>
                                <div>{msg.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex items-center p-4'>
                <InputField
                    type='text'
                    placeholder='Type your message'
                    value={message}
                    required={true}
                    error={sendMessageError}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    wrapperClassName='flex-grow'
                />
                <button
                    onClick={sendMessage}
                    onenter
                    className={`px-4 py-2 m-2 bg-blue-500 text-white rounded-md ml-2 ${message.trim()
                        ? ''
                        : 'bg-opacity-50 cursor-not-allowed'
                        }`}
                    disabled={!message.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;