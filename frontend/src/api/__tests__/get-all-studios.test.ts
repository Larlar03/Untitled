import axios from 'axios';
import { cleanup } from '@testing-library/react';
import getAllStudiosApi from '../get-all-studios';
import { mockFiveStudios } from '../../utils/mock-objects/mock-studios';

describe('Upload Studio API', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a GET request', async () => {
        const mockResponse = {
            status: 200,
            data: mockFiveStudios
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

        const response = await getAllStudiosApi();

        expect(axios.get).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`);

        expect(response).toBe(mockFiveStudios);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await getAllStudiosApi();
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
