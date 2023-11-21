import axios from 'axios';
import { cleanup } from '@testing-library/react';
import uploadStudioApi from '../upload-studio';
import { mockStudio } from '../../utils/mock-objects/mock-studios';

describe('Upload Studio API', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a POST request', async () => {
        const mockResponse = {
            status: 204
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        const response = await uploadStudioApi(mockStudio);

        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.VITE_STUDIOS_API}/`,
            {
                isFrontend: true,
                newStudio: mockStudio
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        expect(response).toBe(204);
    });

    it('handles Axios errors', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Axios error'));

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await uploadStudioApi(mockStudio);
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
