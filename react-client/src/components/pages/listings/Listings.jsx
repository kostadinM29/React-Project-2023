import { useEffect, useState } from 'react';

import { GetAll } from '../../../api/listing/listing';

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
            const listings = await GetAll(signal);

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
                : <div className='container mx-auto '>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3">
                        {listings?.map((listing) => (
                            <Card key={listing.id} listing={listing} />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default Listings;