import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadPage from '../upload-page';

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

        const formTwoInputField = screen.getByText('Website URL');
        expect(formTwoInputField).toBeVisible();
    });

    it('renders upload success component on form submit', async () => {
        const pageOneNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageOneNextButton);
        const pageTwoNexButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageTwoNexButton);

        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        expect(uploadButton).toBeVisible();

        fireEvent.click(uploadButton);
        const svgAltText = screen.getByAltText('Magnifying glass with sparkles');
        expect(svgAltText).toBeVisible();
    });

    it('stores text field input in studio state object', () => {
        console.log = jest.fn();

        const inputs = screen.getAllByRole('textbox');
        const nameInput = inputs[0];
        const postCodeInput = inputs[4];

        fireEvent.change(nameInput, { target: { value: 'Foo' } });
        fireEvent.change(postCodeInput, { target: { value: 'Bar' } });

        // Go to last form page
        const pageOneNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageOneNextButton);
        const pageTwoNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageTwoNextButton);

        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadButton);
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
        console.log = jest.fn();

        // Go to last form page
        const pageOneNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageOneNextButton);
        const pageTwoNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageTwoNextButton);

        const textInputFields = screen.getAllByRole('checkbox');
        const service = textInputFields[0];

        fireEvent.click(service);

        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadButton);

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
        console.log = jest.fn();

        // Go to last form page
        const pageOneNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageOneNextButton);
        const pageTwoNextButton = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(pageTwoNextButton);

        const textInputFields = screen.getAllByRole('checkbox');
        const service = textInputFields[0];

        // check
        fireEvent.click(service);
        // uncheck
        fireEvent.click(service);

        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadButton);

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
