import axios from 'axios';
import Studio from '../types/studios';

export const getAllStudiosApi = async (): Promise<Studio[]> => {
    const response = await axios.get(`${process.env.VITE_STUDIOS_API}/`).catch((error) => {
        console.error(error);
    });

    return response?.data;
};
