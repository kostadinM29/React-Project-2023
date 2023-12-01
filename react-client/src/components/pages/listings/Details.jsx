import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GetOne } from '../../../api/listing/listing';

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
            const listing = await GetOne(id, signal);
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
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='mx-auto'>
                    {listing.images.length > 1 &&
                        (
                            <div className='overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96'>
                                <div className="flex h-full" style={{ width: `${listing.images.length * 100}%` }}>
                                    {listing.images.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className='rounded-xl'
                                            style={{ width: '100%', ...updateSlider(index) }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Image ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="absolute top-1/2 -translate-y-1/2 left-4 text-white z-10 bg-gray-800/50 p-2 rounded-full focus:outline-none"
                                    onClick={handlePrev}
                                >
                                    &lt;
                                </button>
                                <button
                                    type="button"
                                    className="absolute top-1/2 -translate-y-1/2 right-4 text-white z-10 bg-gray-800/50 p-2 rounded-full focus:outline-none"
                                    onClick={handleNext}
                                >
                                    &gt;
                                </button>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {listing.images.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`h-4 w-4 rounded-full cursor-pointer ${index === currentIndex ? 'bg-pink-500' : 'bg-teal-500'
                                                }`}
                                            onClick={() => handleDotClick(index)}
                                        />
                                    ))}
                                </div>
                            </div >
                        )}
                </div >
            )}
        </>
    );
};

export default Details;