import { useEffect, useState } from 'react';

import * as listingService from '../../../api/listing/listing';

import Card from './cards/Card';
import Spinner from '../../Spinner';

const Listings = () =>
{
    const [listings, setListings] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const listings = await listingService.GetAll(signal);

            setListings(listings);
            setLoading(false);
        };

        fetchData();

        return () =>
        {
            controller.abort();
        };
    }, []);

    return (
        <>
            {isLoading
                ? <Spinner />
                : listings.length > 0
                    ? <div className='container mx-auto '>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3'>
                            {listings?.map((listing) => (
                                <Card key={listing.id} listing={listing} />
                            ))}
                        </div>
                    </div>
                    : <h2 className='text-center text-lg text-gray dark:text-white'>
                        No listings have been created yet!
                    </h2>
            }
        </>
    );
};

export default Listings;