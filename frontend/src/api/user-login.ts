import axios from 'axios';
import User from '../types/user';

const userLoginApi = async (username: string, password: string): Promise<number | undefined> => {
    let status;
    const requestBody: User = {
        username: username,
        password: password
    };

    await axios
        .post(`${process.env.VITE_USERS_API}/login`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.error(error);
            status = error.response.status;
        });

    return status;
};

export default userLoginApi;
