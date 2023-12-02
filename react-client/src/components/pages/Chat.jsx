import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import useAuth from '../../hooks/useAuth';

const Chat = () =>
{
    const { auth } = useAuth();
    const { id } = useParams();

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() =>
    {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/chatHub')
            .build();

        setConnection(newConnection);

        return () =>
        {
            if (newConnection)
            {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() =>
    {
        if (connection && connection.state === signalR.HubConnectionState.Disconnected)
        {
            connection
                .start()
                .then(() =>
                {
                    console.log('Connected!');
                })
                .catch((err) => console.error('Connection failed:', err));

            connection.on('ReceiveMessage', (sender, receivedMessage) =>
            {
                setMessages([...messages, { sender, receivedMessage }]);
            });

            connection.on('ReceiveChatHistory', (chatHistory) =>
            {
                setMessages([...chatHistory, ...messages]);
            });
        }
    }, [connection, messages, auth.user.nameid, id]);

    const sendMessage = async () =>
    {
        if (connection)
        {
            try
            {
                await connection.invoke('SendMessage', auth.user.nameid, id, message);
                setMessage('');
            } catch (error)
            {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.sender}</strong>: {msg.receivedMessage}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
