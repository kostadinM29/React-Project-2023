import { ENDPOINTS } from '../../constants/apiEndpoints';
import axios from '../axios';

export const GetStats = async (signal) =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.STATS, { signal });

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