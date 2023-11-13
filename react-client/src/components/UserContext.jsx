import { React, createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) =>
{
    const [user, setUser] = useState(undefined);

    useEffect(() =>
    {
        const storedToken = localStorage.getItem('jwtToken');

        console.log('stored token: ' + storedToken)
        if (storedToken)
        {
            updateUser(storedToken);
        }
    }, []);

    const updateUser = (token) =>
    {
        const decodedUser = jwtDecode(token);
        console.log('decoded user:' + decodedUser.unique_name)
        setUser(decodedUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () =>
{
    const context = useContext(UserContext);
    if (!context)
    {
        throw new Error('useUser must be used within a UserProvider!');
    }
    return context;
};