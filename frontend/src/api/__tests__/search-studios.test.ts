import axios from 'axios';
import { cleanup } from '@testing-library/react';
import searchStudiosApi from '../search-studios';
import { mockFiveStudios } from '../../utils/mock-objects/mock-studios';

const mockLocation = 'Birmingham';
const mockServices = ['Aerial Hoop'];

describe('Upload Studio API', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a GET request', async () => {
        const mockResponse = {
            status: 200,
            data: mockFiveStudios[2]
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

        const response = await searchStudiosApi(mockLocation, mockServices);

        expect(axios.get).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/${mockLocation}/services/`, {
            params: { services: ['Aerial Hoop'] },
            timeout: 100000
        });

        expect(response).toBe(mockFiveStudios[2]);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await searchStudiosApi(mockLocation, mockServices);
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
