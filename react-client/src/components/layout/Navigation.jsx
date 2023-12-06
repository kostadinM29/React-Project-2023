import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Logout } from '../../api/auth/auth';
import { ROUTE_ENDPOINTS } from '../../constants/routeEndpoints';

const Navigation = () =>
{
    const { auth, updateAuth } = useAuth();
    const navigate = useNavigate();

    const getNavLinkClassName = (isActive) =>
    (
        isActive
            ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
    );

    const logout = async () =>
    {
        await Logout();

        updateAuth({});
        navigate(ROUTE_ENDPOINTS.HOME);
    };

    return (
        <nav className='bg-white border-gray-200 dark:bg-gray-900'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <Link to='/' className='flex items-center space-x-3'>
                    <div className='text-4xl font-bold '>
                        <span className='text-teal-500'>Market</span>
                        <span className='text-pink-500'>Mingle</span>
                    </div>
                </Link>
                <div className='flex items-center md:order-2 space-x-3 md:space-x-0'>
                    <button data-collapse-toggle='navbar-user' type='button' className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='navbar-user' aria-expanded='false'>
                        <span className='sr-only'>Open main menu</span>
                        <FontAwesomeIcon icon={faBars} size='2xl' />
                    </button>
                </div>
                <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-user'>
                    <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        <li>
                            <NavLink
                                to={ROUTE_ENDPOINTS.HOME}
                                className={({ isActive }) => getNavLinkClassName(isActive)}
                                aria-current='page'
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTE_ENDPOINTS.LISTINGS_ALL}
                                className={({ isActive }) => getNavLinkClassName(isActive)}
                            >Listings</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTE_ENDPOINTS.CREATE_LISTING}
                                className={({ isActive }) => getNavLinkClassName(isActive)}
                            >Create Listing</NavLink>
                        </li>

                        {auth && auth.user && Object.keys(auth.user).length > 0
                            ? <>
                                <li>
                                    <NavLink
                                        to={ROUTE_ENDPOINTS.USER_PROFILE}
                                        className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                    >Profile</NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        type='button'
                                        className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                    >Logout</button>
                                </li>
                            </>
                            : <>
                                <li>
                                    <NavLink
                                        to={ROUTE_ENDPOINTS.REGISTER}
                                        className={({ isActive }) => getNavLinkClassName(isActive)}
                                    >Register</NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={ROUTE_ENDPOINTS.LOGIN}
                                        className={({ isActive }) => getNavLinkClassName(isActive)}
                                    >Login</NavLink>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navigation;