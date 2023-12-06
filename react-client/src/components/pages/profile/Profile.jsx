import React from 'react';
import ListingsByUser from '../listings/ListingsByUser';
import ChatsByUser from '../chat/ChatsByUser';

const Profile = () =>
{
    return (
        <div>
            <ListingsByUser />
            <hr className='my-2' />
            <ChatsByUser />
        </div>
    );
};

export default Profile;