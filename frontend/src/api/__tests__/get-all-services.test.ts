import axios from 'axios';
import { cleanup } from '@testing-library/react';
import getAllServicesApi from '../get-all-services';
import { mockFiveStudios } from '../../utils/mock-objects/mock-studios';
import mockServices from '../../utils/mock-objects/mock-services';

describe('Get All Services API', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a GET request', async () => {
        const mockResponse = {
            status: 200,
            data: mockServices
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

        const response = await getAllServicesApi();

        expect(axios.get).toHaveBeenCalledWith(`${process.env.VITE_SERVICES_API}/`);

        expect(response).toBe(mockServices);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await getAllServicesApi();
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
