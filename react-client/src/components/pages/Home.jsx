import { Link } from 'react-router-dom';

import { ROUTE_ENDPOINTS } from '../../constants/routeEndpoints';

import ListingsLatest from './listings/ListingsLatest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const Home = () =>
{
    return (
        <div className='h-screen'>
            <div className='bg-gray-200 p-8 text-gray-800 dark:bg-gray-500 dark:text-white'>
                <h1 className='text-4xl font-bold mb-4'>Welcome to Your Website</h1>
                <p className='text-lg mb-8'>Discover the latest listings and more!</p>
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