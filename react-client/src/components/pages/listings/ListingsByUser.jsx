import React, { useEffect, useState } from 'react';

import * as listingService from '../../../api/listing/listing';

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
            const listings = await listingService.GetAllByUser(signal)
                .catch(err => console.log(err));

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
            await listingService.Delete(id);
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
                : listings && listings.length > 0
                    ? <div className="container mx-auto pt-8">
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
                    : <h2 className='text-center text-lg text-gray dark:text-white'>
                        You haven't created any listings yet!
                    </h2>
            }
        </>
    );
};

export default ListingsByUser;