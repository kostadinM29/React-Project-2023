import React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) =>
{
    return (
        <>
            <Header />
            <main className='max-w-[115rem] mb-20 mx-auto min-h-screen bg-white border-x-gray-200 py-10 px-4 sm:px-6 lg:px-8 xl:border-x dark:bg-gray-800 dark:border-x-gray-700'>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;