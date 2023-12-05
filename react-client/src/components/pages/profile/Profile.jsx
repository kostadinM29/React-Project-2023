import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingsByUser from '../listings/ListingsByUser';

const Profile = () =>
{
    const [chats, setChats] = useState([]);

    useEffect(() =>
    {


        const fetchChats = async () =>
        {
            // todo create chats endpoints
        };

        fetchChats();
    }, []);

    return (
        <div>
            <h1>Your Profile</h1>

            {/* Display user's listings */}
            <ListingsByUser />

            <h2>Your Chats</h2>
            {chats.length > 0 ? (
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id}>
                            <Link to={`/chat/${chat.otherUserId}/${chat.listingId}`}>
                                Chat with {chat.otherUserName}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No chats available.</p>
            )}
        </div>
    );
};

export default Profile;