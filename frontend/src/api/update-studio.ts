import axios from 'axios';
import Studio from '../types/studios';

export const updateStudioApi = async (studio: Studio, id: string | undefined): Promise<any> => {
    const requestBody = {
        studio
    };

    const response = await axios.put(`${process.env.VITE_STUDIOS_API}/${id}`, requestBody).catch((error) => {
        console.error(error);
    });

    return response?.status;
};
