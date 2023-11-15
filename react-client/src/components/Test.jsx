import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Test = () =>
{
    const [response, setResponse] = useState({});
    const axiosPrivate = useAxiosPrivate();

    useEffect(() =>
    {
        const controller = new AbortController();

        const getUsers = async () =>
        {
            try
            {
                const response = await axiosPrivate.get('/admin/test', {
                    signal: controller.signal
                });

                setResponse(response.data);
            } catch (error)
            {
                setResponse(error);
            }
        };

        getUsers();

        return () =>
        {
            controller.abort();
        };
    }, []);

    return (
        <>
            <h1>Test Page</h1>
            <p>{response.toString()}</p>
        </>
    );
};

export default Test;