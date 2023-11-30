import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Card = ({ listing }) =>
{
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateSlider = () =>
    {
        const translateValue = -currentIndex * 100;
        return { transform: `translateX(${translateValue}%)`, transition: 'transform 0.3s ease-in-out' };
    };

    const handlePrev = () =>
    {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () =>
    {
        setCurrentIndex((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleDotClick = (index) =>
    {
        setCurrentIndex(index);
    };

    return (
        <div className='max-w-lg bg-white dark:gray-800 rounded-md overflow-hidden shadow-md'>
            <div className='bg-gray-700 text-white dark:bg-gray-600 dark:text-white p-4 flex flex-wrap justify-between items-center'>
                <h2 className='text-lg break-all'>
                    {listing.title}
                </h2>
                {listing.images.length > 1 &&
                    <div className="flex pl-2 space-x-2">
                        {listing.images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex
                                    ? 'bg-gray-200'
                                    : 'bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                }
            </div>

            {listing.images &&
                (
                    <div className="slider-container flex overflow-hidden relative">
                        <div className="slider-wrapper flex" style={updateSlider()}>
                            {listing.images.map((imageUrl, index) => (
                                <div key={index} className="slider-item flex-shrink-0 w-full">
                                    <img
                                        src={imageUrl}
                                        className="h-48 w-96"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300 overflow-ellipsis break-words">
                    {listing.description}
                </p>
            </div>

            {listing.tags &&
                <div className="m-2 space-x-1">
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
                <div className="flex justify-between p-4">
                    <button onClick={handlePrev} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={handleNext} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            }
        </div>
    );
};

export default Card;
