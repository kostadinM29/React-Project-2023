import { React, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { RefreshToken } from '../api/auth/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>
{
    const [auth, setAuth] = useState({});

    const updateAuth = (tokens) =>
    {
        try
        {
            setAuth({
                user: jwtDecode(tokens.accessToken),
                ...tokens,
            });
        }
        catch (error)
        {
            setAuth({});
        }
        finally
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
            }
            catch (error)
            {
                console.log('Error occured while setting up token on initial page load!')
                setAuth({});
            }
        };

        setInitialStateFromCookies();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;