import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEdit, faTrashAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROUTE_ENDPOINTS } from '../../../../constants/routeEndpoints';

import DeleteConfirmationModal from '../../../modals/DeleteConfirmationModal';

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
                    <FontAwesomeIcon icon={faLink} />
                </Link>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
            />
        </div>
    );
};

export default CardMinimal;