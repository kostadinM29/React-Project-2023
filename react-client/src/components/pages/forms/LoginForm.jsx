import React, { useState, useContext } from 'react';
import InputField from '../../partials/InputField';
import { Login } from '../../../api/auth/auth';
import useAuth from '../../../hooks/useAuth';

function LoginForm()
{
    const { updateAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

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
                const response = await Login({ username, password });

                updateAuth(response);

                // Redirect to some page
                console.log('Login successful. JWT token:', response.accessToken);
            } catch (error)
            {
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
        <div className='bg-slate-300 ml-20 mr-20'>
            <form onSubmit={handleSubmit}>
                <div className='text-2xl font-bold mb-6'>Login</div>
                <InputField
                    id='username'
                    label='Username'
                    name='username'
                    placeholder='Username'
                    type='text'
                    required={true}
                    wrapperClassName={'relative z-0 w-full mb-6 group'}
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
                    wrapperClassName={'relative z-0 w-full mb-6 group'}
                    onChange={onPasswordChange}
                    error={errors.password}
                />
                {errors.apiError && (
                    <p className="text-red-500 mb-4">{errors.apiError}</p>
                )}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
