import React from 'react';
import Footer from './Footer';
import Header from './Header';
import LoginForm from '../pages/forms/LoginForm';

const Layout = ({ children }) =>
{
    return (
        <div>
            <Header />

            <main className='bg-white border-gray-200 dark:bg-gray-900'>
                {children}
                {/* <LoginForm /> */}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;