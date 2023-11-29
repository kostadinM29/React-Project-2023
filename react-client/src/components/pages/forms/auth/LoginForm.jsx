import React, { useState, useEffect } from 'react';
import InputField from '../../../partials/InputField';
import useAuth from '../../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../../../../api/auth/auth';

const LoginForm = () =>
{
    const navigate = useNavigate();
    const { updateAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const abortController = new AbortController();

    useEffect(() =>
    {
        return () =>
        {
            abortController.abort();
        };
    }, []);

    function validateForm()
    {
        const errors = {};

        if (!username.trim())
        {
            errors.username = 'Username is required!';
        }

        if (!password.trim())
        {
            errors.password = 'Password is required!';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (validateForm())
        {
            try
            {
                const response = await Login
                    (
                        { username, password },
                        { signal: abortController.signal }
                    );

                updateAuth(response.data);

                console.log('Login successful. JWT token:', response.data.accessToken);

                navigate('/');
            }
            catch (error)
            {
                if (error.name === 'AbortError')
                {
                    return;
                }

                console.error('API request error:', error);

                setErrors({ apiError: 'Invalid credentials. Please try again.' });
            }
        }
    };

    const onUsernameChange = (event) =>
    {
        setUsername(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, username: '', apiError: '' }));
    };

    const onPasswordChange = (event) =>
    {
        setPassword(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, password: '', apiError: '' }));
    };

    return (
        <section className='w-full max-w-xl mx-auto p-6'>
            <div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-4 sm:p-7'>
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Log in</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account yet?
                            <Link
                                className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                to='/register'>
                                Register here
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full mx-auto p-6'>
                            <div className='grid gap-y-4'>
                                <InputField
                                    id='username'
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
                                    id='password'
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
                                    <p className="text-red-500 mb-4">{errors.apiError}</p>
                                )}
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
