import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import AdminNavbar from '../admin-navbar';

const mockShowForm = jest.fn();
const mockHandleLogout = jest.fn();
const mockSetView: React.Dispatch<React.SetStateAction<string>> = jest.fn();

describe('Admin Navbar', () => {
    beforeEach(() => {
        render(
            <Router>
                <AdminNavbar setView={mockSetView} showForm={mockShowForm} handleLogout={mockHandleLogout} />
            </Router>
        );
    });

    it('sets view to edit when navbar edit icon is clicked', async () => {
        const editIcon = screen.getByTestId('navbar-edit-icon');
        fireEvent.click(editIcon);

        waitFor(() => {
            expect(mockSetView).toHaveBeenCalledWith('edit');
        });
    });

    it('calls showForm when upload icon is clicked', async () => {
        const uploadIcon = screen.getByTestId('navbar-upload-icon');
        fireEvent.click(uploadIcon);

        waitFor(() => {
            expect(mockShowForm).toHaveBeenCalled();
        });
    });
});
