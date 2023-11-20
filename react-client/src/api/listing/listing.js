import { ENDPOINTS } from '../../constants/apiEndpoints';
import { axiosPrivate } from '../axios';

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