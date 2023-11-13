import React, { useState, useEffect } from 'react';
import MoonIcon from '../assets/moon.svg?react';
import SunIcon from '../assets/sun.svg?react';

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
        <label className="relative inline-block">
            <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="hidden"
            />
            <div className="w-12 h-6 bg-gray-800 rounded-full p-1 flex items-center cursor-pointer">
                <div
                    className={`w-5 h-5 rounded-full ${darkMode
                        ? 'bg-yellow-400'
                        : 'bg-gray-800'
                        } shadow-md`}
                    style={{
                        transform: darkMode && 'translateX(100%)',
                    }}
                />
                <div
                    className={`absolute w-6 h-6 rounded-full bg-white transition-transform transform ${darkMode
                        ? 'translate-x-6'
                        : 'translate-x-0'
                        }`}
                >
                    {darkMode
                        ? <MoonIcon />
                        : <SunIcon />
                    }
                </div>
            </div>
        </label>
    );
};

export default ThemeSwitcher;
