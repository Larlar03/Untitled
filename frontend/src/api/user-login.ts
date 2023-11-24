import axios from 'axios';
import User from '../types/user';

const userLoginApi = async (username: string, password: string): Promise<number | undefined> => {
    const requestBody: User = {
        username: username,
        password: password
    };

    const response = await axios
        .post(`${process.env.VITE_USERS_API}/login`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return response?.status;
};

export default userLoginApi;
