import React, { useState } from 'react';
import EyeHidden from '../../assets/eyeHidden.svg?react';
import EyeVisible from '../../assets/eyeVisible.svg?react';

const InputField = ({ id, value, label, name, placeholder, type, required, wrapperClassName, onChange }) =>
{
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () =>
    {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className={wrapperClassName}>
            {label && (
                <label htmlFor={id} className='block mb-2 ml-1 text-sm text-gray-900 dark:text-white'>
                    {label}
                </label>
            )}
            <div className='relative'>
                <input
                    id={id}
                    type={showPassword ? 'text' : type}
                    value={value}
                    name={name}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10'
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
                {type === 'password' && (
                    <button
                        type='button'
                        className='absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 dark:text-gray-400 cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeHidden /> : <EyeVisible />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;