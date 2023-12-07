import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({ isOpen, imageUrl, onClose }) =>
{
    return (
        (isOpen &&
            <div className='fixed inset-0 z-1 overflow-y-auto w-auto'>
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <div className='fixed inset-0 transition-opacity'>
                        <div
                            className='absolute inset-0 bg-gray-500 opacity-75'
                            onClick={onClose}
                        ></div>
                    </div>
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                    <div className='inline-block align-bottom m-20 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-fit sm:w-full'>
                        <div className='absolute top-4 end-4 z-[10]'>
                            <button
                                onClick={onClose}
                                type='button'
                                className='inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-transparent bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                <span className='sr-only'>Close</span>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                        <div className='relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800'>
                            <img src={imageUrl} alt='Full Size' className='w-full object-cover' />
                        </div>
                    </div>
                </div>
            </div >
        )
    );
};

export default ImageModal;
