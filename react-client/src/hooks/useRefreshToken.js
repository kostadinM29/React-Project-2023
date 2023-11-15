import axios from "../api/axios";
import { ENDPOINTS } from "../constants/apiEndpoints";
import useAuth from "./useAuth";


const useRefreshToken = () =>
{
    const { updateAuth } = useAuth();

    const refresh = async () =>
    {
        try
        {
            const response = await axios.get(ENDPOINTS.REFRESH_TOKEN, {
                withCredentials: true,
            });
            console.log(response);

            updateAuth(response.data);
        }
        catch (error)
        {
            console.log('Error occured while sending a refresh token request!')
            updateAuth({});
        }
    }
    return refresh;
};

export default useRefreshToken;