import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const InputField = ({ id, value = '', label, name, placeholder, type, wrapperClassName, onChange, accept, multiple, error }) =>
{
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () =>
    {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className={wrapperClassName}>
            {label &&
                (
                    <label htmlFor={id} className='block text-sm mb-2 dark:text-white'>
                        {label}
                    </label>
                )}
            <div className='relative'>
                <input
                    id={id}
                    type={showPassword ? 'text' : type}
                    value={value}
                    name={name}
                    className={`py-3 px-4 pr-7 block w-full border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700'
                        } disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-gray-400 dark:focus:ring-gray-600`}
                    placeholder={placeholder}
                    onChange={onChange}
                    accept={accept}
                    multiple={multiple}
                />
                {type === 'password' &&
                    (
                        <button
                            type='button'
                            className='absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 dark:text-gray-400 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword
                                ? <FontAwesomeIcon icon={faEyeSlash} />
                                : <FontAwesomeIcon icon={faEye} />}
                        </button>
                    )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputField;