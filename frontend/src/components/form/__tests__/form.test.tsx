import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Form from '../form';
import Studio from '../../../types/studio';
export const mockStudio: Studio = {
    name: 'Mock Studio One',
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
    logo: '',
    services: ['Acrobalance']
};

describe('Upload Page UI', () => {
    beforeEach(() => {
        render(
            <Router>
                <Form formType='Upload' />
            </Router>
        );
    });

    it('updates form page on navigation button click', () => {
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        const pageTwoInputField = screen.getByText('Website URL');
        expect(pageTwoInputField).toBeVisible();
    });
});

describe('Upload API Calls', () => {
    beforeEach(() => {
        render(
            <Router>
                <Form formType='Upload' />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('calls upload studio api on upload form submission', async () => {
        // Mock POST request
        const mockResponse = {
            status: 200
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Mock Studio One' } });
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
                    newStudio: mockStudio
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        });
    });

    it('shows warning modal if there is an upload network error', async () => {
        // Mock network error
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Axios error'));

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Mock Studio One' } });
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
            expect(screen.getByTestId('modal-message')).toHaveTextContent('An upload network error occurred');
        });
    });
});

describe('Update API Calls', () => {
    beforeEach(() => {
        render(
            <Router>
                <Form formType='Update' />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('calls update studio api on update form submission', async () => {
        // Mock PUT api  request
        const mockResponse = {
            status: 204
        };

        jest.spyOn(axios, 'put').mockResolvedValueOnce(mockResponse);

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Mock Studio One' } });
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
    it('shows warning modal if there is a network error', async () => {
        // Mock network error
        jest.spyOn(axios, 'put').mockRejectedValueOnce(new Error('Axios error'));

        // Simulate form input and submission
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });
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

        fireEvent.click(screen.getByRole('button', { name: 'Update' }));

        //  Assert
        await waitFor(() => {
            expect(screen.getByTestId('modal-message')).toHaveTextContent('An update network error occurred');
        });
    });
});
