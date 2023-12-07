import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import * as listingService from '../../../api/listing/listing';

import Card from './cards/Card';
import Spinner from '../../Spinner';
import InputField from '../../inputs/InputField';

const Listings = () =>
{
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    const handleSearch = (searchValue) =>
    {
        setSearchTerm(searchValue);

        if (searchValue.trim() === '')
        {
            return;
        }
        else
        {
            const filteredListings = listings.filter((listing) =>
                ['details', 'tags', 'description', 'title'].some(
                    (key) =>
                        typeof listing[key] === 'string' &&
                        listing[key].toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredListings(filteredListings);
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto'>
            <form className='flex items-center py-2'>
                <label htmlFor='simple-search' className='sr-only'>Search</label>
                <div className='relative w-full'>
                    <InputField
                        type='text'
                        id='simple-search'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        required={true}
                    />
                </div>
                <button
                    type='submit'
                    className='p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span className='sr-only'>Search</span>
                </button>
            </form>

            {
                isLoading
                    ? <Spinner />
                    : listings.length > 0
                        ? <div className='container mx-auto '>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3'>
                                {searchTerm.trim() === ''
                                    ? listings.map((listing) => (
                                        <Card key={listing.id} listing={listing} />
                                    ))
                                    : filteredListings.map((listing) => (
                                        <Card key={listing.id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                        : <h2 className='text-center text-lg text-gray dark:text-white'>
                            No listings have been created yet!
                        </h2>
            }
        </div>
    );
};

export default Listings;