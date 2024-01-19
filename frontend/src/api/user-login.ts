import axios from 'axios';
import User from '../types/user';

const userLoginApi = async (email: string, password: string): Promise<number | undefined> => {
    const requestBody: User = {
        email: email,
        password: password
    };

    const URL = `${process.env.VITE_USERS_API}/login`;

    const response = await axios
        .post(URL, requestBody, {
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
