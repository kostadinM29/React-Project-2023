import axios from "../api/axios";
import { ENDPOINTS } from "../constants/apiEndpoints";
import useAuth from "./useAuth";


const useRefreshToken = () =>
{
    const { updateAuth } = useAuth();

    const refresh = async () =>
    {
        const response = await axios.get(ENDPOINTS.REFRESH_TOKEN, {
            withCredentials: true,
        });
        updateAuth(response.data);
    }
    return refresh;
};

export default useRefreshToken;