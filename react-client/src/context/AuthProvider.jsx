import { React, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { RefreshToken } from '../api/auth/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>
{
    const [auth, setAuth] = useState({});
    // Set loading state because if we refresh the page Private Guard's auth is not yet set and it redirects to login even though cookies are valid.
    const [loading, setLoading] = useState(true);

    const updateAuth = (tokens) =>
    {
        try
        {
            setAuth({
                user: jwtDecode(tokens.accessToken),
                ...tokens,
            });
        } catch (error)
        {
            setAuth({});
        } finally
        {
            tokens && tokens.accessToken
                ? Cookies.set('accessToken', tokens.accessToken, { secure: true, sameSite: 'strict' })
                : Cookies.remove('accessToken');
            tokens && tokens.refreshToken
                ? Cookies.set('refreshToken', tokens.refreshToken, { secure: true, sameSite: 'strict' })
                : Cookies.remove('refreshToken');
        }
    };

    useEffect(() =>
    {
        const setInitialStateFromCookies = async () =>
        {
            try
            {
                const response = await RefreshToken();
                updateAuth(response.data);
            } catch (error)
            {
                console.log('Error occurred while setting up token on initial page load!');
                setAuth({});
            } finally
            {
                setLoading(false);
            }
        };

        setInitialStateFromCookies();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, updateAuth }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;