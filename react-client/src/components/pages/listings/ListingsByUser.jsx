import React, { useEffect, useState } from 'react';
import { GetAllByUser } from '../../../api/listing/listing';
import { Link } from 'react-router-dom';
import { ROUTE_ENDPOINTS } from '../../../constants/routeEndpoints';

const ListingsByUser = () =>
{
    const [listings, setListings] = useState([]);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await GetAllByUser(signal);

            setListings(response);
        };

        fetchData();

        return () =>
        {
            controller.abort();
        };
    }, []);

    // Function to handle edit button click
    const handleEdit = (id) =>
    {
        // Implement edit functionality
        console.log(`Edit clicked for item ${id}`);
    };

    // Function to handle delete button click
    const handleDelete = (id) =>
    {
        // Implement delete functionality
        console.log(`Delete clicked for item ${id}`);
    };

    // Function to handle view button click
    const handleView = (id) =>
    {
        // Implement view functionality
        console.log(`View clicked for item ${id}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Your Listings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((listing) => (
                    <div key={listing.id} className="bg-white rounded-md overflow-hidden shadow-md">
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{listing.title}</h2>
                            <p className="text-gray-700">{listing.description}</p>
                        </div>
                        <div className="flex justify-between p-4">
                            <Link
                                as={Link}
                                to={`/${ROUTE_ENDPOINTS.EDIT_LISTING}/${listing.id}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(listing.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleView(listing.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsByUser;