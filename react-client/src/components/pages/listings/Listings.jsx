import { useEffect, useState } from 'react';
import { GetAll } from '../../../api/listing/listing';
import Card from './Card';

const Listings = () =>
{
    const [listings, setListings] = useState([]);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await GetAll(signal);

            setListings(response);
        };

        fetchData();

        return () =>
        {
            controller.abort();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3">
            {listings?.map((listing, index) => (
                <Card key={index} listing={listing} />
            ))}
        </div>
    );
};

export default Listings;