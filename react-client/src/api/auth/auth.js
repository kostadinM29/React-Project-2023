import { ENDPOINTS } from '../../constants/apiEndpoints';
import axios, { axiosPrivate } from '../axios';

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

export const RefreshToken = async () => await axiosPrivate.get(ENDPOINTS.REFRESH_TOKEN);

export const Logout = async () =>
{
    try
    {
        const response = await axiosPrivate.post(ENDPOINTS.LOGOUT);

        return response;
    } catch (error)
    {
        console.log(error.response);
        throw new Error(`Axios error: ${error.message}`);
    }
};