import { ENDPOINTS } from '../../constants/apiEndpoints';
import axios from '../axios';

export const Login = async (credentials) =>
{
    try
    {
        const response = await axios.post(ENDPOINTS.LOGIN, credentials);

        return response;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const Register = async (userData) =>
{
    try
    {
        const response = await axios.post(ENDPOINTS.REGISTER, userData);

        return response;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};

export const RefreshToken = async () =>
{
    try
    {
        const response = await axios.get(ENDPOINTS.REFRESH_TOKEN, {
            withCredentials: true,
        });

        return response;
    } catch (error)
    {
        console.log(error.response.data);
        throw new Error(`Axios error: ${error.message}`);
    }
};
