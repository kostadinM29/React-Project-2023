import { React, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>
{
    const [auth, setAuth] = useState(null);

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
        setAuth({
            user: jwtDecode(tokens.accessToken),
            ...tokens,
        });

        Cookies.set('accessToken', tokens.accessToken, { secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', tokens.refreshToken, { secure: true, sameSite: 'strict' });
    };

    return (
        <AuthContext.Provider value={{ auth, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;