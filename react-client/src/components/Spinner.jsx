import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner = () =>
{
    return (
        <div
            role='status'
            className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
        >
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
            <FontAwesomeIcon icon={faSpinner} spin size='2xl' style={{ color: '#14b8a6', }} />
            <span className='sr-only'>Loading...</span>
        </div>
    );
};

export default Spinner;