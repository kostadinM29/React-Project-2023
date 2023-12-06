import { ENDPOINTS } from '../../constants/apiEndpoints';
import { axiosPrivate } from '../axios';

export const GetChatsByUser = async (signal) =>
{
    try
    {
        const response = await axiosPrivate.get(ENDPOINTS.CHATS_BY_USER, signal);

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