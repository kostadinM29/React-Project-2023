import React, { useState, useEffect } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThemeSwitcher = () =>
{
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() =>
    {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() =>
    {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () =>
    {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <label className='relative inline-block'>
            <input
                type='checkbox'
                checked={darkMode}
                onChange={toggleDarkMode}
                className='hidden'
            />
            <div
                className={`w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex items-center cursor-pointer`}
            >
                <div
                    className={`w-5 h-5 rounded-full bg-gray-800 dark:bg-yellow-400 dark:translate-x-full shadow-md`}
                />
                <div className='absolute w-6 h-6 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center transition-transform transform -translate-x-2.5 dark:translate-x-6'>
                    {darkMode
                        ? <FontAwesomeIcon icon={faMoon} size='xl' style={{ color: '#05090f', }} />
                        : <FontAwesomeIcon icon={faSun} size='xl' style={{ color: '#ffbf00', }} />}
                </div>
            </div>
        </label>
    );
};

export default ThemeSwitcher;
