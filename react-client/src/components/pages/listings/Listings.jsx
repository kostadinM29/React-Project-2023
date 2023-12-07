import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const controller = new AbortController();
    const { signal } = controller;
    const itemsPerPage = 10;

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
        setItemOffset(0);
    };

    useEffect(() =>
    {
        const updatePageCount = () =>
        {
            const items = searchTerm.trim() === ''
                ? listings
                : filteredListings;
            const pageCount = Math.ceil(items.length / itemsPerPage);
            setPageCount(pageCount);
        };

        updatePageCount();
    }, [listings, filteredListings, searchTerm]);

    const handlePageClick = (event) =>
    {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const displayedListings = searchTerm.trim() === ''
        ? listings
        : filteredListings;

    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='flex items-center py-2 mb-4'>
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
            </div>

            {isLoading
                ? <Spinner />
                : displayedListings.length > 0
                    ? <>
                        <div className='container mx-auto '>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3'>
                                {displayedListings
                                    .slice(itemOffset, itemOffset + itemsPerPage)
                                    .map((listing) => (
                                        <Card key={listing.id} listing={listing} />
                                    ))}
                            </div>
                        </div>
                        <nav className='flex items-center gap-x-1 py-2 m-2 justify-center'>
                            <ReactPaginate
                                breakLabel='...'
                                nextLabel={
                                    <>
                                        <span>Next </span>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel={
                                    <>
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                        <span> Previous</span>
                                    </>}
                                renderOnZeroPageCount={null}
                                containerClassName='flex items-center gap-x-1'
                                pageClassName='min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
                                activeClassName='min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-600 dark:text-white dark:focus:bg-gray-500'
                                previousClassName='min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
                                nextClassName='min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
                            />
                        </nav>
                    </>
                    : <h2 className='text-center text-lg text-gray dark:text-white'>
                        No listings found.
                    </h2>
            }
        </div >
    );
};

export default Listings;