import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
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

    it('renders upload success component on form submit', async () => {
        //  Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        // Upload form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        const imgAltText = screen.getByAltText('Magnifying glass with sparkles');
        const successMessage = screen.getByTestId('upload-success-message');

        expect(imgAltText).toBeVisible();
        expect(successMessage).toBeVisible();
    });

    it('stores text field input values', () => {
        const nameInput = screen.getAllByRole('textbox')[0];
        const postCodeInput = screen.getAllByRole('textbox')[4];

        fireEvent.change(nameInput, { target: { value: 'Foo' } });
        fireEvent.change(postCodeInput, { target: { value: 'Bar' } });

        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        //  Upload form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(console.log).toHaveBeenCalledWith({
            email_address: '',
            location: { address: '', city: '', country: '', post_code: 'Bar', region: '' },
            logo: '',
            name: 'Foo',
            phone_number: '',
            services: [],
            social_links: { facebook: '', instagram: '', website: '' }
        });
    });

    it('stores checked services in studio state object', () => {
        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        const firstServiceInput = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstServiceInput);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(console.log).toHaveBeenCalledWith({
            email_address: '',
            location: { address: '', city: '', country: '', post_code: '', region: '' },
            logo: '',
            name: '',
            phone_number: '',
            services: ['Aerial Hoop'],
            social_links: { facebook: '', instagram: '', website: '' }
        });
    });

    it('removes service from studio state object when unchecked', () => {
        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        const firstServiceInput = screen.getAllByRole('checkbox')[0];
        // check
        fireEvent.click(firstServiceInput);
        // uncheck
        fireEvent.click(firstServiceInput);

        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(console.log).toHaveBeenCalledWith({
            email_address: '',
            location: { address: '', city: '', country: '', post_code: '', region: '' },
            logo: '',
            name: '',
            phone_number: '',
            services: [],
            social_links: { facebook: '', instagram: '', website: '' }
        });
    });
});
