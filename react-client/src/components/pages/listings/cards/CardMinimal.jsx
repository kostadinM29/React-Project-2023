import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEdit, faTrashAlt, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROUTE_ENDPOINTS } from '../../../../constants/routeEndpoints';

const CardMinimal = ({ listing, onDelete }) =>
{
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openDeleteModal = () =>
    {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () =>
    {
        setDeleteModalOpen(false);
    };

    const handleDelete = async () =>
    {
        onDelete();
        closeDeleteModal();
    };

    const buttonStyles = 'px-4 py-2 rounded-md border border-gray dark:border-white';

    return (
        <div key={listing.id} className='max-w-lg bg-white dark:bg-gray-400 rounded-md overflow-hidden shadow-md'>
            <Link to={`/${ROUTE_ENDPOINTS.EDIT_LISTING}/${listing.id}`} className='block'>
                <div className='bg-gray-500 text-white p-4 dark:bg-gray-800'>
                    <h2 className='text-lg break-all'>
                        {listing.title}
                    </h2>
                </div>
                <div className='p-4'>
                    <p className='text-black p-4 overflow-ellipsis break-words'>
                        {listing.description}
                    </p>
                </div>
            </Link>
            <div className='flex flex-row-reverse gap-1 p-4'>
                <Link
                    to={`/${ROUTE_ENDPOINTS.EDIT_LISTING}/${listing.id}`}
                    className={buttonStyles}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                    onClick={openDeleteModal}
                    className={buttonStyles}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <Link
                    to={`/${ROUTE_ENDPOINTS.LISTING_DETAIL}/${listing.id}`}
                    className={buttonStyles}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </Link>
            </div>

            {isDeleteModalOpen &&
                (
                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div className='fixed inset-0 transition-opacity'>
                                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                            </div>
                            <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                            <div className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                                <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                            <FontAwesomeIcon icon={faExclamationCircle} className='text-red-600' />
                                        </div>
                                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                            <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
                                                Delete Confirmation
                                            </h3>
                                            <div className='mt-2'>
                                                <p className='text-sm text-gray-500 dark:text-gray-300'>
                                                    Are you sure you want to delete this item?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                                    <button
                                        onClick={handleDelete}
                                        type='button'
                                        className='w-full inline-flex justify-center rounded-md border border-red-500 dark:border-white shadow-sm px-4 py-2 bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                                    >
                                        Confirm Delete
                                    </button>
                                    <button
                                        onClick={closeDeleteModal}
                                        type='button'
                                        className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-white shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CardMinimal;