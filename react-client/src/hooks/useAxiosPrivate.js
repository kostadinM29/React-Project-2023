import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';


const useAxiosPrivate = () =>
{
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() =>
    {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) =>
            {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent)
                {
                    prevRequest.sent = true;
                    await refresh();

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () =>
        {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;