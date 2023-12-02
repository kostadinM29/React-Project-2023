import * as authService from '../api/auth/auth';
import useAuth from "./useAuth";

const useRefreshToken = () =>
{
    const { updateAuth } = useAuth();

    const refresh = async () =>
    {
        try
        {
            const response = await authService.RefreshToken();

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