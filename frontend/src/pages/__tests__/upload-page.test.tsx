import { cleanup, fireEvent, render, waitFor, screen } from '@testing-library/react';
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

        const mockResponse = {
            data: {}
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);
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

    it('should submit the form successfully', async () => {
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

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`, {
                isFrontend: true,
                newStudio: {
                    email_address: '',
                    location: { address: '', city: '', country: '', post_code: 'Bar', region: '' },
                    logo: '',
                    name: 'Foo',
                    phone_number: '',
                    services: [],
                    social_links: { facebook: '', instagram: '', website: '' }
                }
            });

            // Expect success page to be rendered
            expect(screen.getByAltText('Magnifying glass with sparkles')).toBeVisible();
            expect(screen.getByTestId('upload-success-message')).toBeVisible();
        });
    });

    it('stores checked services in studio state object', async () => {
        // Simulate form input and submission
        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        const firstServiceInput = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstServiceInput);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`, {
                isFrontend: true,
                newStudio: {
                    email_address: '',
                    location: { address: '', city: '', country: '', post_code: '', region: '' },
                    logo: '',
                    name: '',
                    phone_number: '',
                    services: ['Aerial Hoop'],
                    social_links: { facebook: '', instagram: '', website: '' }
                }
            });
        });
    });

    it('removes checked services in studio state object when clicked twice', async () => {
        // Simulate form input and submission
        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        const firstServiceInput = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstServiceInput);
        fireEvent.click(firstServiceInput);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`, {
                isFrontend: true,
                newStudio: {
                    email_address: '',
                    location: { address: '', city: '', country: '', post_code: '', region: '' },
                    logo: '',
                    name: '',
                    phone_number: '',
                    services: [],
                    social_links: { facebook: '', instagram: '', website: '' }
                }
            });
        });
    });
});
