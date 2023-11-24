import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import EditList from '../edit-list';
import deleteStudioApi from '../../../api/delete-studio';
import { mockOneStudio } from '../../../utils/mock-objects/mock-studios';

const mockGetAllStudios = jest.fn();
const mockShowForm = jest.fn();

jest.mock('../../../api/delete-studio', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Edit List', () => {
    it('renders no results component when 0 studios are passed as props', () => {
        render(
            <Router>
                <EditList studios={[]} getAllStudios={mockGetAllStudios} showForm={mockShowForm} />
            </Router>
        );

        expect(screen.getByText('0 results')).toBeVisible();
    });

    it('navigates to upload page with studio details when edit button is clicked', () => {
        render(
            <Router>
                <EditList studios={[mockOneStudio]} getAllStudios={mockGetAllStudios} showForm={mockShowForm} />
            </Router>
        );

        const editButton = screen.getAllByRole('button')[0];
        fireEvent.click(editButton);

        waitFor(() => {
            expect(window.location.href).toBe('http://127.0.0.1:5173/upload');
            const nameInputFields = screen.getAllByRole('textbox')[0];
            expect(nameInputFields).toHaveTextContent('Mock Studio One');
        });
    });

    it('calls delete studio api when delete modal pop up is confirmed and closes modal', () => {
        render(
            <Router>
                <EditList studios={[mockOneStudio]} getAllStudios={mockGetAllStudios} showForm={mockShowForm} />
            </Router>
        );

        const deleteButton = screen.getAllByRole('button')[1];
        fireEvent.click(deleteButton);

        const modalConfirmDeleteButton = screen.getByTestId('modal-delete-button');
        fireEvent.click(modalConfirmDeleteButton);

        expect(deleteStudioApi).toHaveBeenCalled();

        waitFor(() => {
            const modalMessage = screen.queryByTestId('modal-message');
            expect(modalMessage).toBeNull();
        });
    });
});
