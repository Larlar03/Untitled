import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UploadPage from '../upload-page';
import { uploadForm } from '../../../utils/upload-form';

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

    it('updates form page when goToFormPage is called', () => {
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        const pageTwoInputField = screen.getByText('Website URL');
        expect(pageTwoInputField).toBeVisible();
    });

    it('shows warning modal if fields are empty', async () => {
        // Simulate form input and submission
        const nameInput = screen.getAllByRole('textbox')[0];
        const postCodeInput = screen.getAllByRole('textbox')[4];
        fireEvent.change(nameInput, { target: { value: 'Foo' } });
        fireEvent.change(postCodeInput, { target: { value: 'Bar' } });

        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        //  Upload form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        const modal = screen.getByTestId('modal');
        expect(modal).toBeVisible();

        const modalMessage = screen.getByTestId('modal-message');
        expect(modalMessage).toHaveTextContent(
            'The following fields are empty: email_address, address, city, region, country, website'
        );
    });

    it('uploads form successfully', async () => {
        // Mock the uploadForm function
        jest.mock('../../../utils/upload-form', async () => ({}));

        const mockResponse = {
            data: 'New studio stored successfully.'
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

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

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        await waitFor(() => {
            expect(screen.getByAltText('Sparkling stars')).toBeVisible();
            expect(screen.getByTestId('upload-success-message')).toHaveTextContent('Studio uploaded successfully');
        });
    });

    it('shows warning modal if there is a network error', async () => {
        // Mock the uploadForm function
        jest.mock('../../../utils/upload-form', async () => ({}));

        // const mockResponse = {
        //     data: undefined
        // };

        // jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        const networkError = new Error('Network Error');
        const axiosMock = jest.fn(() => Promise.reject(networkError));
        jest.spyOn(axios, 'post').mockImplementation(axiosMock);

        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

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

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        await waitFor(() => {
            const modalMessage = screen.getByTestId('modal-message');
            expect(modalMessage).toHaveTextContent('A network error occurred');
        });
    });
});
