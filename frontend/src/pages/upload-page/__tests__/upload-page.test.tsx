import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UploadPage from '../upload-page';

console.log = jest.fn();

describe('Upload Page', () => {
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

    it('shows warning modal if fields are empty', async () => {
        // Simulate one field input
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });

        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        //  Upload form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(screen.getByTestId('modal')).toBeVisible();

        expect(screen.getByTestId('modal-message')).toHaveTextContent(
            'The following fields are empty: email_address, address, post_code, city, region, country, website'
        );
    });

    it('uploads form successfully', async () => {
        // Mock the uploadForm function
        jest.mock('../../../utils/upload-form', async () => ({}));

        // Mock uploadForm successfull response
        const mockResponse = {
            data: 'New studio stored successfully.'
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });
        fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '00000000000' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Street' } });
        fireEvent.change(screen.getByLabelText('Post Code'), { target: { value: '000 000' } });
        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Birmingham' } });
        fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'West Midlands' } });
        fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'England' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.change(screen.getByLabelText('Website URL'), { target: { value: 'www.test.com' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getAllByRole('checkbox')[0]);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        //  Assert
        await waitFor(() => {
            expect(screen.getByAltText('Sparkling stars')).toBeVisible();
            expect(screen.getByTestId('upload-success-message')).toHaveTextContent('Studio uploaded successfully');
        });
    });

    it('shows warning modal if there is a network error', async () => {
        // Mock the uploadForm function
        jest.mock('../../../utils/upload-form', async () => ({}));

        // Mock network error
        const networkError = new Error('Network Error');
        const axiosMock = jest.fn(() => Promise.reject(networkError));
        jest.spyOn(axios, 'post').mockImplementation(axiosMock);

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });
        fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '00000000000' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Street' } });
        fireEvent.change(screen.getByLabelText('Post Code'), { target: { value: '000 000' } });
        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Birmingham' } });
        fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'West Midlands' } });
        fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'England' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.change(screen.getByLabelText('Website URL'), { target: { value: 'www.test.com' } });

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getAllByRole('checkbox')[0]);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        //  Assert
        await waitFor(() => {
            expect(screen.getByTestId('modal-message')).toHaveTextContent('A network error occurred');
        });
    });
});
