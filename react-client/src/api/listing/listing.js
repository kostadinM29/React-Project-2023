import { ENDPOINTS } from '../../constants/apiEndpoints';
import axios, { axiosPrivate } from '../axios';

export const Create = async (data) =>
{
    try
    {
        const response = await axiosPrivate.post(
            ENDPOINTS.LISTING_CREATE,
            data,
            {
                headers: { 'Accept': "multipart/form-data" },
                withCredentials: true
            }
        );

        return response.data;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const GetAll = async (signal) =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.LISTING_ALL, { signal });

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
            console.log(error.response.data);
            throw new Error(`Axios error: ${error.message}`);
        }
    }
};