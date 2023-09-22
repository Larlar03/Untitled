import axios from 'axios';
import Studio from '../types/studios';

export const uploadForm = async (newStudio: Studio): Promise<string> => {
    const requestBody = {
        isFrontend: true,
        newStudio
    };

    const response = await axios
        .post(`${process.env.VITE_STUDIOS_API}/`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return response?.data;
};
