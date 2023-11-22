import axios from 'axios';
import Studio from '../types/studios';

const getAllStudiosApi = async (): Promise<Studio[]> => {
    const response = await axios.get(`${process.env.VITE_STUDIOS_API}/`).catch((error) => {
        console.error(error);
    });

    return response?.data;
};

export default getAllStudiosApi;
