import axios from 'axios';
import Studio from '../types/studio';

const searchStudiosApi = async (location: string | undefined, services: string[]): Promise<Studio[]> => {
    const response = await axios
        .get(`${process.env.VITE_STUDIOS_API}/${location}/services`, {
            params: {
                services
            },
            timeout: 100000
        })
        .catch((error) => {
            console.error(error);
        });

    return response?.data;
};

export default searchStudiosApi;
