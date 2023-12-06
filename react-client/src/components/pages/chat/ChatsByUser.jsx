import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import * as chatService from '../../../api/chat/chat';
import { ROUTE_ENDPOINTS } from '../../../constants/routeEndpoints';

const ChatsByUser = () =>
{
    const [chats, setChats] = useState([]);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchChats = async () =>
        {

            const response = await chatService.GetChatsByUser(signal);
            setChats(response);
        };

        fetchChats();

        return () =>
        {
            controller.abort();
        };
    }, []);

    return (
        <div>
            <h2>Your Chats</h2>
            {chats && chats.length > 0
                ? <ul className='inline-flex rounded-lg shadow-sm'>
                    {chats.map((chat, index) => (
                        <li key={index} className=''>
                            <Link
                                to={`/${ROUTE_ENDPOINTS.CHAT}/${chat.listingId}/${chat.otherUserName}`}
                                className='inline-flex items-center m-2 px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-pink-600 focus:ring-4'>
                                View chat with {chat.otherUserName}
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className='ml-2' />
                            </Link>
                        </li>
                    ))}
                </ul>
                : <p>No chats available.</p>
            }
        </div>
    );
};

export default ChatsByUser;