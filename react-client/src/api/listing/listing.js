import { ENDPOINTS } from '../../constants/apiEndpoints';
import { axiosPrivate } from '../axios';

export const Create = async (data) =>
{
    try
    {
        const response = await axiosPrivate(
            {
                Accept: "multipart/form-data",
            }).post(ENDPOINTS.LISTING_CREATE, data);

        console.log(response);

        return response.data;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};