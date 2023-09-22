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

    it('shows warning modal when fields are empty', async () => {
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
        expect(modalMessage).toBeVisible();
    });
});

it('should submit the form successfully', async () => {
    // Simulate form input and submission
    const nameInput = screen.getAllByRole('textbox')[0];
    const emailInput = screen.getAllByRole('textbox')[2];
    const addressInput = screen.getAllByRole('textbox')[3];
    const postCodeInput = screen.getAllByRole('textbox')[4];
    const citySelect = screen.getAllByRole('combobox')[0];
    const regionSelect = screen.getAllByRole('combobox')[1];
    const countrySelect = screen.getAllByRole('combobox')[1];

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(addressInput, { target: { value: '123 test Street' } });
    fireEvent.change(postCodeInput, { target: { value: 'Foo Bar' } });
    fireEvent.change(citySelect, { target: { value: 'Birmingham' } });
    fireEvent.change(regionSelect, { target: { value: 'West Midands' } });
    fireEvent.change(countrySelect, { target: { value: 'England' } });

    // Go to next form page
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    //  Upload form
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(`${process.env.VITE_STUDIOS_API}/`, {
            isFrontend: true,
            newStudio: {
                email_address: 'test@gmail.com',
                location: { address: '123 Test Street', city: '', country: '', post_code: 'Bar', region: '' },
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
