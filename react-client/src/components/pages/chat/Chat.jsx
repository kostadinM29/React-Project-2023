import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as signalR from '@microsoft/signalr';

import useAuth from '../../../hooks/useAuth';
import InputField from '../../partials/InputField';
import { ENDPOINTS } from '../../../constants/apiEndpoints';

const Chat = () =>
{
    const { auth } = useAuth();
    const { listingId, otherUserId } = useParams();

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() =>
    {
        if (auth.user && auth.user.nameid === otherUserId)
        {
            // Prevent users from accessing chat with themselves
            return <Navigate to={`/${ROUTE_ENDPOINTS.HOME}`} />;
        }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/chatHub')
            .build();

        setConnection(newConnection);

        return () =>
        {
            if (newConnection && newConnection.state === signalR.HubConnectionState.Connected)
            {
                newConnection.stop();
            }
        };
    }, [auth.user, otherUserId]);

    useEffect(() =>
    {
        if (connection && connection.state === signalR.HubConnectionState.Disconnected)
        {
            startSignalRConnection();
        }
    }, [connection, auth.user.nameid, otherUserId, listingId]);

    useEffect(() =>
    {
        if (connection)
        {
            connection.on('ReceiveMessage', (sender, content) =>
            {
                setMessages((prevMessages) => [...prevMessages, { sender, content }]);
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
        } catch (error)
        {
            console.error('Connection failed:', error);
        }
    };

    const joinChat = () =>
    {
        if (connection)
        {
            const groupKey = getGroupKey(auth.user.nameid, otherUserId, listingId);
            connection.invoke('GetChatHistory', groupKey)
                .then((chatHistory) =>
                {
                    setMessages(chatHistory);
                })
                .catch((error) =>
                {
                    console.error('Error fetching chat history:', error);
                });

            connection.invoke('JoinChat', groupKey)
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
                const groupKey = getGroupKey(auth.user.nameid, otherUserId, listingId);
                await connection.invoke('SendMessage', groupKey, auth.user.nameid, otherUserId, message);
                setMessage('');
            } catch (error)
            {
                console.error('Error sending message:', error);
            }
        }
    };

    const getGroupKey = (user1, user2, listingId) =>
    {
        const sortedUserIds = [user1, user2].sort();
        return `${sortedUserIds[0]}_${sortedUserIds[1]}_${listingId}`;
    };

    return (
        <div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.sender}</strong>: {msg.content}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <InputField
                    type='text'
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;