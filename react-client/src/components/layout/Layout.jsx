import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) =>
{
    return (
        <>
            <Header />

            <main className='bg-white border-gray-200 dark:bg-gray-900'>
                {children}
            </main>

            <Footer />
        </>
    );
};

export default Layout;