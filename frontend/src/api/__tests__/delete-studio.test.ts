import axios from 'axios';
import { cleanup } from '@testing-library/react';
import deleteStudioApi from '../delete-studio';

const mockId = '123';

describe('Delete Studio API', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a DELETE request', async () => {
        const mockResponse = {
            status: 204
        };

        jest.spyOn(axios, 'delete').mockResolvedValueOnce(mockResponse);

        const response = await deleteStudioApi(mockId);

        expect(axios.delete).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/${mockId}`);

        expect(response).toBe(204);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await deleteStudioApi(mockId);
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
