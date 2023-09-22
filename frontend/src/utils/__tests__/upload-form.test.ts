import axios from 'axios';
import Studio from '../../types/studios';
import { uploadForm } from '../upload-form';
import { cleanup } from '@testing-library/react';

const studio: Studio = {
    name: 'Studio',
    phone_number: '00000000000',
    email_address: 'studio@gmail.com',
    location: {
        address: '123 Street',
        post_code: '000 000',
        city: 'Birmingham',
        region: 'West Midlands',
        country: 'England'
    },
    social_links: {
        website: 'www.studio.com',
        instagram: '',
        facebook: ''
    },
    logo: '',
    services: ['Aerial Silks']
};

describe('Upload Studio Form', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('makes a post request', async () => {
        const mockResponse = {
            data: 'New studio stored successfully.'
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        const response = await uploadForm(studio);

        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.VITE_STUDIOS_API}/`,
            {
                isFrontend: true,
                newStudio: studio
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        expect(response).toBe('New studio stored successfully.');
    });

    it('logs Axios errors', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Axios error'));
        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        try {
            await uploadForm(studio);
        } catch (error: any) {
            expect(error.message).toBe('Axios error');
            expect(consoleErrorMock).toHaveBeenCalled();
        }
    });
});
