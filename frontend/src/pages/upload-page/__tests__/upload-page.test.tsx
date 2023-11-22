import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadPage from '../upload-page';
import axios from 'axios';
import Studio from '../../../types/studios';
import placeholderImageData from '../../../constants/placeholder-image-data';

console.log = jest.fn();

export const mockStudio: Studio = {
    name: 'Mock Studio One',
    phone_number: '00000000000',
    email_address: 'mockstudio@gmail.com',
    location: {
        address: '123 Street',
        post_code: '000 000',
        city: 'Birmingham',
        region: 'West Midlands',
        country: 'England'
    },
    social_links: {
        website: 'www.mockstudio.com',
        instagram: '',
        facebook: ''
    },
    logo: placeholderImageData,
    services: ['Acrobalance']
};

describe('Upload Page UI', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadPage />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('renders subheading', () => {
        const subheading = screen.getByRole('heading', { level: 2 });
        expect(subheading).toBeVisible();
        expect(subheading).toHaveTextContent('Upload a Studio');
    });

    it('updates form page on navigation button click', () => {
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        const pageTwoInputField = screen.getByText('Website URL');
        expect(pageTwoInputField).toBeVisible();
    });

    // it('shows warning modal if there is a network error', async () => {
    //     // Mock the uploadForm function
    //     jest.mock('../../../utils/upload-form', async () => ({}));

    //     // Mock network error
    //     const networkError = new Error('Network Error');
    //     const axiosMock = jest.fn(() => Promise.reject(networkError));
    //     jest.spyOn(axios, 'post').mockImplementation(axiosMock);

    //     // Create a mock function for console.error
    //     const consoleErrorMock = jest.fn();
    //     global.console.error = consoleErrorMock;

    //     // Simulate form input and submission
    //     fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });
    //     fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '00000000000' } });
    //     fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@gmail.com' } });
    //     fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Street' } });
    //     fireEvent.change(screen.getByLabelText('Post Code'), { target: { value: '000 000' } });
    //     fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Birmingham' } });
    //     fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'West Midlands' } });
    //     fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'England' } });

    //     fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    //     fireEvent.change(screen.getByLabelText('Website URL'), { target: { value: 'www.test.com' } });

    //     fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    //     fireEvent.click(screen.getAllByRole('checkbox')[0]);

    //     fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    //     //  Assert
    //     await waitFor(() => {
    //         expect(screen.getByTestId('modal-message')).toHaveTextContent('A network error occurred');
    //     });
    // });
});

describe('Upload Page API Calls', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('calls upload studio api on upload form submission', async () => {
        render(
            <Router>
                <UploadPage />
            </Router>
        );

        const mockResponse = {
            status: 200
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        // Simulate form input and submission

        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Mock Studio One' } });
        fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '00000000000' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'mockstudio@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Street' } });
        fireEvent.change(screen.getByLabelText('Post Code'), { target: { value: '000 000' } });
        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Birmingham' } });
        fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'West Midlands' } });
        fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'England' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.change(screen.getByLabelText('Website URL'), { target: { value: 'www.mockstudio.com' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getAllByRole('checkbox')[0]);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        //  Assert
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${process.env.VITE_STUDIOS_API}/`,
                {
                    isFrontend: true,
                    newStudio: mockStudio
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        });
    });

    it('calls update studio api on update form submission', async () => {
        render(
            <Router>
                <UploadPage formType='update' />
            </Router>
        );

        const mockResponse = {
            status: 204
        };

        jest.spyOn(axios, 'put').mockResolvedValueOnce(mockResponse);

        // Simulate form input and submission

        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Mock Studio One' } });
        fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '00000000000' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'mockstudio@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Street' } });
        fireEvent.change(screen.getByLabelText('Post Code'), { target: { value: '000 000' } });
        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Birmingham' } });
        fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'West Midlands' } });
        fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'England' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.change(screen.getByLabelText('Website URL'), { target: { value: 'www.mockstudio.com' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getAllByRole('checkbox')[0]);

        fireEvent.click(screen.getByRole('button', { name: 'Update' }));

        //  Assert
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`, {
                studio: mockStudio
            });
        });
    });
});
