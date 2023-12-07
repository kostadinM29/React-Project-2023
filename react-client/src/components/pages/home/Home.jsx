import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import { ROUTE_ENDPOINTS } from '../../../constants/routeEndpoints';

import ListingsLatest from '../listings/ListingsLatest';
import Stats from './Stats';

const Home = () =>
{
    return (
        <div className='h-screen'>
            <div className='p-8 text-gray-800 dark:text-white'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold mb-4'>Welcome to Market Mingle!</h1>
                    <p className='text-lg'>
                        Here you can sell your items to other people or find just the item you need!
                        You can contact people directly and approach them directly through our chat functionality.
                    </p>
                </div>
                <Stats />
                <div className='p-8'>
                    <ListingsLatest />
                    <div className='mt-6'>
                        <Link
                            to={ROUTE_ENDPOINTS.LISTINGS_ALL}
                            className='bg-white text-teal-500 hover:bg-teal-300 text-2xl font-semibold py-4 px-6 rounded-xl dark:bg-slate-800'
                        >
                            Explore Listings
                            <FontAwesomeIcon
                                icon={faAnglesRight}
                                className='ml-2'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;