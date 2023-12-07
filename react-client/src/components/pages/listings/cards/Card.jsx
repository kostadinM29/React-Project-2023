import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROUTE_ENDPOINTS } from '../../../../constants/routeEndpoints';
import useAuth from '../../../../hooks/useAuth';

const Card = ({ listing }) =>
{
    const { auth } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateSlider = () =>
    {
        const translateValue = -currentIndex * 100;
        return { transform: `translateX(${translateValue}%)`, transition: 'transform 0.3s ease-in-out' };
    };

    const handlePrev = () =>
    {
        setCurrentIndex((prevIndex) => (prevIndex === 0
            ? listing.images.length - 1
            : prevIndex - 1));
    };

    const handleNext = () =>
    {
        setCurrentIndex((prevIndex) => (prevIndex === listing.images.length - 1
            ? 0
            : prevIndex + 1));
    };

    const handleDotClick = (index) =>
    {
        setCurrentIndex(index);
    };

    return (
        <div className='max-w-lg bg-white dark:bg-gray-800 rounded-md border dark:border-gray-600 overflow-hidden'>
            <div className='bg-gray-700 text-white dark:bg-gray-600 dark:text-white p-4 flex flex-wrap justify-between items-center'>
                <h2 className='text-lg break-all'>
                    {listing.title}
                </h2>
                {listing.images.length > 1 &&
                    <div className='flex pl-2 space-x-2'>
                        {listing.images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex
                                    ? 'bg-pink-500'
                                    : 'bg-teal-500'
                                    }`}
                            />
                        ))}
                    </div>
                }
            </div>

            {listing.images &&
                <div className='flex overflow-hidden relative'>
                    <div className='flex' style={updateSlider()}>
                        {listing.images.map((imageUrl, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-full'
                            >
                                <img
                                    src={imageUrl}
                                    className='h-48 w-96'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className='p-2'>
                <p className='text-gray-700 dark:text-gray-300 overflow-ellipsis break-words'>
                    {listing.description}
                </p>
            </div>
            <p className='text-xs ml-2 text-gray-500 dark:text-gray-400 '>
                {listing.created}
            </p>

            {listing.tags &&
                <div className='m-2 space-x-1'>
                    {listing.tags.map((title, index) => (
                        <span
                            key={index}
                            className='bg-gray-100 text-gray-800 text-xs font-medium p-1 rounded dark:bg-gray-700 dark:text-gray-300 overflow-ellipsis break-words'
                        >
                            {title}
                        </span>
                    ))}
                </div>
            }

            {listing.images.length > 1 &&
                <div className='flex justify-between p-4'>
                    <button
                        onClick={handlePrev}
                        className='text-gray-700 dark:text-gray-300 focus:outline-none'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={handleNext}
                        className='text-gray-700 dark:text-gray-300 focus:outline-none'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            }
            {auth && auth.user && Object.keys(auth.user).length > 0 &&
                <Link
                    to={`/${ROUTE_ENDPOINTS.LISTING_DETAIL}/${listing.id}`}
                    className='inline-flex items-center m-2 px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-pink-600 focus:ring-4'>
                    Read more
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className='ml-2' />
                </Link>
            }
        </div>
    );
};

export default Card;
