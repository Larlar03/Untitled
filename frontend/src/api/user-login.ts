import axios from 'axios';
import User from '../types/user';

const userLoginApi = async (email: string, password: string): Promise<number | undefined> => {
    const requestBody: User = {
        email: email,
        password: password
    };

    const URL = 'https://29qfxdpdma.execute-api.eu-west-2.amazonaws.com/users/login';

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
