import axios from 'axios';
import { ENDPOINTS } from '../constants/apiEndpoints';

export default axios.create({
    baseURL: ENDPOINTS.BASE_API_URL
});

export const axiosPrivate = axios.create({
    baseURL: ENDPOINTS.BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});