import axios from 'axios';
import Studio from '../types/studios';

const updateStudioApi = async (studio: Studio, id: string | undefined): Promise<number | undefined> => {
    const requestBody = {
        studio
    };

    console.log(requestBody);

    const response = await axios.put(`${process.env.VITE_STUDIOS_API}/${id}`, requestBody).catch((error) => {
        console.error(error);
    });

    return response?.status;
};

export default updateStudioApi;
