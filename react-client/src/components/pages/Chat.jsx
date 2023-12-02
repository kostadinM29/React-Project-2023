import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const Chat = () =>
{
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const { id } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() =>
    {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/chatHub')
            .build();

        setConnection(newConnection);

    }, []);

    useEffect(() =>
    {
        if (connection)
        {
            connection
                .start()
                .then(() =>
                {
                    console.log('Connected!');
                })
                .catch(err => console.error('Connection failed:', err));

            connection.on('ReceiveMessage', (sender, receivedMessage) =>
            {
                setMessages([...messages, { sender, receivedMessage }]);
            });

            connection.on('ReceiveChatHistory', chatHistory =>
            {
                setMessages([...chatHistory, ...messages]);
            });
        }
    }, [connection, messages]);

    const sendMessage = () =>
    {
        if (connection)
        {
            // Send the message to the other user in the chat
            connection.invoke('SendMessage', user, otherUser, message);
        }
    };

    const joinChat = (otherUser) =>
    {
        setOtherUser(otherUser);
        // Join the chat group
        connection.invoke('JoinChat', user, otherUser);
        // Request chat history when the user joins the chat
        connection.invoke('RequestChatHistory', user);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.user}</strong>: {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;