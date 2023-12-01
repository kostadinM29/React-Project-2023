import React, { useEffect, useState } from 'react';

import { GetAllByUser, Delete } from '../../../api/listing/listing';

import CardMinimal from './cards/CardMinimal';
import Spinner from '../../Spinner';

const ListingsByUser = () =>
{
    const [listings, setListings] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const listings = await GetAllByUser(signal);

            setListings(listings);
            setLoading(false);
        };

        fetchData();

        return () =>
        {
            controller.abort();
        };
    }, []);

    const handleDelete = async (id) =>
    {
        try
        {
            await Delete(id);
            setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
        } catch (error)
        {
            console.error("Error deleting listing:", error);
        }
    };

    return (
        <>
            {isLoading
                ? <Spinner />
                : <div className="container mx-auto pt-8">
                    <h1 className="text-2xl text-gray dark:text-white font-bold mb-4">
                        Your Listings
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listings.map((listing) => (
                            <CardMinimal
                                key={listing.id}
                                listing={listing}
                                onDelete={() => handleDelete(listing.id)}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default ListingsByUser;