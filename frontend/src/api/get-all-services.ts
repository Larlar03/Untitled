import axios from 'axios';
import Service from '../types/service';

const getAllServicesApi = async (): Promise<Service[]> => {
    const response = await axios.get(`${process.env.VITE_SERVICES_API}/`).catch((error) => {
        console.error(error);
    });

    return response?.data;
};

export default getAllServicesApi;
