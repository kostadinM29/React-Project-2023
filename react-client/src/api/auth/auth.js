const BASE_URL = 'https://localhost:5001/api/';

export const Login = async (credentials) =>
{
    try
    {
        const response = await fetch(`${BASE_URL}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok)
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error)
    {
        throw new Error(`Fetch error: ${error.message}`);
    }
};