import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';

import * as listingService from '../../../api/listing/listing';
import { ROUTE_ENDPOINTS } from '../../../constants/routeEndpoints';

import Spinner from '../../Spinner';

const Details = () =>
{
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const controller = new AbortController();
    const { signal } = controller;

    const updateSlider = () =>
    {
        const translateValue = -currentIndex * 100;
        return { transform: `translateX(${translateValue}%)`, transition: 'transform 0.3s ease-in-out' };
    };
    const handlePrev = () =>
    {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? listing.images.length - 1
                : prevIndex - 1
        );
    };

    const handleNext = () =>
    {
        setCurrentIndex((prevIndex) =>
            prevIndex === listing.images.length - 1
                ? 0
                : prevIndex + 1
        );
    };

    const handleDotClick = (index) =>
    {
        setCurrentIndex(index);
    };

    useEffect(() =>
    {
        const fetchListing = async () =>
        {
            await listingService.UpdateViews(id, signal);
            const listing = await listingService.GetOne(id, signal);

            setListing(listing);
            setLoading(false);
        };

        fetchListing();

        return () =>
        {
            controller.abort();
        };
    }, [id]);

    return (
        <>
            {isLoading
                ? <Spinner />
                : <div className='dark:bg-gray-900 mx-auto'>
                    {listing.images.length > 1 && (
                        <div className='overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96 dark:bg-gray-900'>
                            <div className='flex h-full' style={{ width: `${listing.images.length * 100}%` }}>
                                {listing.images.map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className='rounded-xl'
                                        style={{ width: '100%', ...updateSlider(index) }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                            className='h-full w-full object-cover'
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type='button'
                                className='absolute top-1/2 -translate-y-1/2 left-4 text-white z-10 bg-gray-800/50 p-2 rounded-full focus:outline-none dark:text-gray-300'
                                onClick={handlePrev}
                            >
                                &lt;
                            </button>
                            <button
                                type='button'
                                className='absolute top-1/2 -translate-y-1/2 right-4 text-white z-10 bg-gray-800/50 p-2 rounded-full focus:outline-none dark:text-gray-300'
                                onClick={handleNext}
                            >
                                &gt;
                            </button>

                            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                                {listing.images.map((_, index) => (
                                    <button
                                        key={index}
                                        type='button'
                                        className={`h-4 w-4 rounded-full cursor-pointer ${index === currentIndex ? 'bg-pink-500' : 'bg-teal-500'
                                            }`}
                                        onClick={() => handleDotClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='mt-6 p-6 md:p-10 lg:p-16 xl:p-20 bg-white shadow-lg rounded-lg text-gray-800 dark:bg-gray-800 dark:text-white'>
                        <h1 className='text-4xl font-bold mb-4'>{listing.title}</h1>
                        <p className='text-sm text-gray-500 mb-2'>By {listing.userName}</p>
                        <p className='text-lg mb-6'>{listing.description}</p>
                        <div className='flex items-center mb-4'>
                            <FontAwesomeIcon icon={faEye} className='text-gray-500 mr-2' />
                            <span className='text-sm'>{listing.views} Views</span>
                        </div>

                        {listing.details &&
                            <div className='mb-6'>
                                <h2 className='text-xl font-bold mb-2'>Contact Details</h2>
                                <p>{listing.details}</p>
                            </div>
                        }

                        <div className='mb-6'>
                            <h2 className='text-xl font-bold mb-2'>Tags</h2>
                            <ul className='flex flex-wrap'>
                                {listing.tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className='mr-2 mb-2 text-sm bg-gray-100 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300'
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to={`/${ROUTE_ENDPOINTS.CHAT}/${listing.id}/${listing.userName}`}
                            className='inline-flex items-center m-2 px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-pink-600 focus:ring-4'>
                            Chat with {listing.userName}
                            <FontAwesomeIcon
                                icon={faPen}
                                className='ml-2' />
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};

export default Details;