import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import * as statService from '../../../api/stat/stat';
import { faComments, faEye } from '@fortawesome/free-regular-svg-icons';

const Stats = () =>
{
    const [stats, setStats] = useState([]);
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        const fetchStats = async () =>
        {

            const response = await statService.GetStats(signal);
            setStats(response);
        };

        fetchStats();

        return () =>
        {
            controller.abort();
        };
    }, []);

    return (
        <div className='container my-24 mx-auto md:px-6'>
            <section className='mb-32 text-center'>
                <h2 className='mb-20 text-3xl font-bold'>Why is it so great?</h2>
                <div className='grid lg:grid-cols-4 lg:gap-x-12'>
                    <div className='mb-16 lg:mb-0'>
                        <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-700'>
                            <div className='flex justify-center'>
                                <div className='-mt-8 inline-block rounded-full p-4 text-primary shadow-md'>
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                            </div>
                            <div className='p-6'>
                                <h3 className='mb-4 text-2xl font-bold text-primary dark:text-primary-400'>
                                    {stats.usersCount}
                                </h3>
                                <h4 className='mb-4 text-lg font-medium'>Users</h4>
                                <p className='text-neutral-500 dark:text-neutral-300'>
                                    Our community is expanding. Share us around to help it grow!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-16 lg:mb-0'>
                        <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-700'>
                            <div className='flex justify-center'>
                                <div className='-mt-8 inline-block rounded-full p-4 text-primary shadow-md'>
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                            </div>
                            <div className='p-6'>
                                <h3 className='mb-4 text-2xl font-bold text-primary dark:text-primary-400'>
                                    {stats.listingsCount}
                                </h3>
                                <h4 className='mb-4 text-lg font-medium'>Listings</h4>
                                <p className='text-neutral-500 dark:text-neutral-300'>
                                    Sell your unused items and make someone's life better!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-16 lg:mb-0'>
                        <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-700'>
                            <div className='flex justify-center'>
                                <div className='-mt-8 inline-block rounded-full p-4 text-primary shadow-md'>
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                            </div>
                            <div className='p-6'>
                                <h3 className='mb-4 text-2xl font-bold text-primary dark:text-primary-400'>
                                    {stats.messagesCount}
                                </h3>
                                <h4 className='mb-4 text-lg font-medium'>Messages</h4>
                                <p className='text-neutral-500 dark:text-neutral-300'>
                                    Engage in conversations! Make offers, ask questions, and connect with people.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-16 lg:mb-0'>
                        <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-700'>
                            <div className='flex justify-center'>
                                <div className='-mt-8 inline-block rounded-full opacity-90 p-4 text-primary shadow-md'>
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                            </div>
                            <div className='p-6'>
                                <h3 className='mb-4 text-2xl font-bold text-primary dark:text-primary-400'>
                                    {stats.listingsViewsCount}
                                </h3>
                                <h4 className='mb-4 text-lg font-medium'>Listing Views</h4>
                                <p className='text-neutral-500 dark:text-neutral-300'>
                                    Feel welcome to window shop all you want!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stats;