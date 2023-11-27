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

export const GetAll = async () =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.LISTING_ALL);

        return response.data;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};