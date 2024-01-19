import axios from 'axios';
import { cleanup } from '@testing-library/react';
import userLoginApi from '../user-login';

describe('User Login Api', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a POST request', async () => {
        const mockResponse = {
            status: 200
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        const response = await userLoginApi('email', 'password');

        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.VITE_USERS_API}/login`,
            {
                email: 'email',
                password: 'password'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        expect(response).toBe(200);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await userLoginApi('email', 'password');
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
