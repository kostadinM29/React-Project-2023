import { useEffect, useState } from 'react';
import { GetAll } from '../../../api/listing/listing';
import Card from './Card';

const Listings = () =>
{
    const [listings, setListings] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await GetAll();
                setListings(response);
                console.log(response);
            }
            catch (error)
            {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listings?.map((listing, index) => (
                <Card key={index} listing={listing} />
            ))}
        </div>
    );
};

export default Listings;