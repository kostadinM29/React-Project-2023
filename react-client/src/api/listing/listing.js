import { ENDPOINTS } from '../../constants/apiEndpoints';
import axios, { axiosPrivate } from '../axios';

export const UpdateViews = async (id, signal) =>
{
    try
    {
        const response = await axiosPrivate.get(ENDPOINTS.LISTING_UPDATE_VIEWS, {
            params: {
                id,
            },
            signal: signal
        });

        return response.data;
    }
    catch (error)
    {
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const Edit = async (data) =>
{
    try
    {
        const response = await axiosPrivate.post(
            ENDPOINTS.LISTING_EDIT,
            data,
        );

        return response.data;
    }
    catch (error)
    {
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const Delete = async (id) =>
{
    try
    {
        const response = await axiosPrivate.post(
            ENDPOINTS.LISTING_DELETE,
            id,
        );

        return response.data;
    }
    catch (error)
    {
        throw new Error(`Axios error: ${error.message}`);
    }
};


export const Create = async (data) =>
{
    try
    {
        const response = await axiosPrivate.post(
            ENDPOINTS.LISTING_CREATE,
            data,
        );

        return response.data;
    }
    catch (error)
    {
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const GetOne = async (id, signal) =>
{
    try
    {
        const response = await axiosPrivate.get(ENDPOINTS.LISTING_BY_ID, {
            params: {
                id,
            },
            signal: signal,
        });

        return response.data;
    }
    catch (error)
    {
        if (error.name === 'AbortError')
        {
            console.log('Fetch aborted');
        }
        else
        {
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};

export const GetOneByUser = async (id, signal) =>
{
    try
    {
        const response = await axiosPrivate.get(ENDPOINTS.LISTING_BY_USER, {
            params: {
                id,
            },
            signal: signal,
        });

        return response.data;
    }
    catch (error)
    {
        if (error.name === 'AbortError')
        {
            console.log('Fetch aborted');
        }
        else
        {
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};

export const GetAll = async (signal) =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.LISTINGS_ALL, { signal });

        return response.data;
    }
    catch (error)
    {
        if (error.name === 'AbortError')
        {
            console.log('Fetch aborted');
        }
        else
        {
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};

export const GetLatest = async (count, signal) =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.LISTINGS_LATEST, {
            params: {
                count,
            },
            signal: signal
        });

        return response.data;
    }
    catch (error)
    {
        if (error.name === 'AbortError')
        {
            console.log('Fetch aborted');
        }
        else
        {
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};

export const GetAllByUser = async (signal) =>
{
    try
    {
        const response = await axiosPrivate.get(ENDPOINTS.LISTINGS_ALL_BY_USER,
            {
                signal: signal,
            });

        return response.data;
    }
    catch (error)
    {
        if (error.name === 'AbortError')
        {
            console.log('Fetch aborted');
        }
        else
        {
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};