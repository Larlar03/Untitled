import { apiCall } from './api-call';

describe('apiCall', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should return the JSON response if the GET request is successful', async () => {
        const mockResponse = { message: 'Hello, world!' };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        } as any);

        const result = await apiCall('GET', 'https://example.com/api');
        expect(result).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null,
        });
    });

    test('should return the JSON response if the POST request is successful', async () => {
        const mockResponse = { message: 'Hello, world!' };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
            body: { message: 'Sending a post request' },
        } as any);

        const result = await apiCall('POST', 'https://example.com/api', {
            message: 'Sending a post request',
        });
        expect(result).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { message: 'Sending a post request' },
        });
    });

    test('should throw an error if GET request fails', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 404,
        } as any);

        await expect(apiCall('GET', 'https://example.com/api')).rejects.toThrow(
            'Something went wrong with the request'
        );
    });
});
