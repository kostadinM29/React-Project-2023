import { React, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>
{
    const [auth, setAuth] = useState({});

    useEffect(() =>
    {
        const storedAccessToken = Cookies.get('accessToken');
        const storedRefreshToken = Cookies.get('refreshToken');

        if (storedAccessToken)
        {
            setAuth({
                user: jwtDecode(storedAccessToken),
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
            });
        }
    }, []);

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
            // If decoding the JWT fails, it indicates that either the accessToken was undefined or tampered with.
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

    return (
        <AuthContext.Provider value={{ auth, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;