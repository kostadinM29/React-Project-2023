import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as authService from '../../../../api/auth/auth';
import { ROUTE_ENDPOINTS } from '../../../../constants/routeEndpoints';
import useAuth from '../../../../hooks/useAuth';

import InputField from '../../../inputs/InputField';

const RegistrationForm = () =>
{
    const navigate = useNavigate();
    const { updateAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() =>
    {
        return () =>
        {
            controller.abort();
        };
    }, []);

    const validateForm = () =>
    {
        const errors = {};

        if (!username.trim())
        {
            errors.username = 'Username is required!';
        }

        if (!email.trim())
        {
            errors.email = 'Email is required!';
        }

        if (!password.trim())
        {
            errors.password = 'Password is required!';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (validateForm())
        {
            try
            {
                const response = await authService.Register(
                    {
                        username,
                        firstName,
                        lastName,
                        email,
                        password,
                    },
                    { signal: signal }
                );

                updateAuth(response.data);

                console.log('Registration successful. JWT token:', response.data.accessToken);

                navigate(ROUTE_ENDPOINTS.HOME);
            }
            catch (error)
            {
                if (error.name === 'AbortError')
                {
                    return;
                }

                console.error('API request error:', error);

                setErrors({ apiError: 'Registration failed. Please try again.' });
            }
        }
    };

    const onUsernameChange = (event) =>
    {
        setUsername(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, username: '', apiError: '' }));
    };

    const onFirstNameChange = (event) =>
    {
        setFirstName(event.target.value);
    };

    const onLastNameChange = (event) =>
    {
        setLastName(event.target.value);
    };

    const onEmailChange = (event) =>
    {
        setEmail(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, email: '', apiError: '' }));
    };

    const onPasswordChange = (event) =>
    {
        setPassword(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, password: '', apiError: '' }));
    };

    const isFormValid = () =>
    {
        return (
            username.trim() !== '' ||
            email.trim() !== '' ||
            password.trim() !== ''
        );
    };


    return (
        <section className='w-full max-w-xl mx-auto p-6'>
            <div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-4 sm:p-7'>
                    <div className='text-center'>
                        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Register</h1>
                        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                            Already have an account?
                            <Link
                                className='ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                to='/login'>
                                Log in here
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full mx-auto p-6'>
                            <div className='grid gap-y-4'>
                                <InputField
                                    id='username'
                                    value={username}
                                    label='Username'
                                    name='username'
                                    placeholder='Username'
                                    type='text'
                                    required={true}
                                    wrapperClassName={''}
                                    onChange={onUsernameChange}
                                    error={errors.username}
                                />
                                <InputField
                                    id='firstName'
                                    value={firstName}
                                    label='First Name'
                                    name='firstName'
                                    placeholder='First Name'
                                    type='text'
                                    required={false}
                                    wrapperClassName={''}
                                    onChange={onFirstNameChange}
                                />
                                <InputField
                                    id='lastName'
                                    value={lastName}
                                    label='Last Name'
                                    name='lastName'
                                    placeholder='Last Name'
                                    type='text'
                                    required={false}
                                    wrapperClassName={''}
                                    onChange={onLastNameChange}
                                />
                                <InputField
                                    id='email'
                                    value={email}
                                    label='Email'
                                    name='email'
                                    placeholder='Email'
                                    type='email'
                                    required={true}
                                    wrapperClassName={''}
                                    onChange={onEmailChange}
                                    error={errors.email}
                                />
                                <InputField
                                    id='password'
                                    value={password}
                                    label='Password'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    required={true}
                                    wrapperClassName={''}
                                    onChange={onPasswordChange}
                                    error={errors.password}
                                />
                                {errors.apiError && (
                                    <p className='text-red-500 mb-4'>{errors.apiError}</p>
                                )}
                                <button
                                    type='submit'
                                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${isFormValid()
                                        ? ''
                                        : 'bg-opacity-50 cursor-not-allowed'
                                        }`}
                                    disabled={!isFormValid()}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegistrationForm;