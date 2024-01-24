import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import EditList from '../../edit/edit-list';
import Form from '../../form/form';
import { mockOneStudio } from '../../../utils/mock-objects/mock-studios';
import mockServices from '../../../utils/mock-objects/mock-services';

const mockGetAllStudiosFunc = jest.fn();
const mockShowForm = jest.fn();

describe('Confirmation Modal', () => {
    beforeEach(() => {
        render(
            <Router>
                <EditList studios={[mockOneStudio]} getAllStudios={mockGetAllStudiosFunc} showForm={mockShowForm} />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('shows confirmation modal when delete button is clicked', () => {
        const deleteButton = screen.getAllByRole('button')[1];
        fireEvent.click(deleteButton);

        const modalMessage = screen.getByTestId('modal-message');
        expect(modalMessage).toBeVisible();
    });

    it('hides warning modal when modal close button is click', () => {
        const deleteButton = screen.getAllByRole('button')[1];
        fireEvent.click(deleteButton);

        const modalMessage = screen.getByTestId('modal-message');
        expect(modalMessage).toBeVisible();

        fireEvent.click(screen.getByTestId('modal-close-button'));
        expect(modalMessage).not.toBeVisible();
    });
});

describe('Warning Modal', () => {
    beforeEach(() => {
        render(
            <Router>
                <Form services={mockServices} />
            </Router>
        );
    });

    it('shows warning modal if fields are empty', () => {
        // Simulate one field input
        fireEvent.change(screen.getByLabelText('Studio Name'), { target: { value: 'Test Studio' } });

        // Go to last form page
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        //  Upload form
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        const modalMessage = screen.getByTestId('modal-message');
        expect(modalMessage).toHaveTextContent(
            'The following fields are empty: email_address, address, post_code, city, region, country, website'
        );
    });

    it('hides modal when modal close button is click', () => {
        // Go to last form page and upload empty form
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        // Show modal
        const modalMessage = screen.getByTestId('modal-message');
        expect(modalMessage).toBeVisible();

        // Close modal
        fireEvent.click(screen.getByTestId('modal-close-button'));
        expect(modalMessage).not.toBeVisible();
    });
});
