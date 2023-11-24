import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userLoginApi from '../../../api/user-login';
import AdminPage from '../admin-page';

jest.mock('../../../api/user-login', () => ({
    __esModule: true,
    default: jest.fn()
}));

const mockSetIsAdmin: React.Dispatch<React.SetStateAction<boolean>> = jest.fn();

describe('Admin Page', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('calls user login api on login button click', () => {
        render(
            <Router>
                <AdminPage isAdmin={false} setIsAdmin={mockSetIsAdmin} />
            </Router>
        );

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass' } });

        fireEvent.click(screen.getByTestId('cta-button'));
        expect(userLoginApi).toHaveBeenCalled();
    });

    it('sets isAdmin state to true on successful login', () => {
        render(
            <Router>
                <AdminPage isAdmin={false} setIsAdmin={mockSetIsAdmin} />
            </Router>
        );

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass' } });

        fireEvent.click(screen.getByTestId('cta-button'));

        waitFor(() => {
            expect(mockSetIsAdmin).toHaveBeenCalledWith(true);
        });
    });

    it('sets isAdmin state to false when logout icon is clicked', () => {
        render(
            <Router>
                <AdminPage isAdmin={true} setIsAdmin={mockSetIsAdmin} />
            </Router>
        );

        const logoutIcon = screen.getByTestId('navbar-logout-icon');
        fireEvent.click(logoutIcon);

        expect(mockSetIsAdmin).toHaveBeenCalledWith(false);
    });

    it('shows upload form when upload icon in the navbar is clicked', () => {
        render(
            <Router>
                <AdminPage isAdmin={true} setIsAdmin={mockSetIsAdmin} />
            </Router>
        );

        const uploadIcon = screen.getByTestId('navbar-upload-icon');
        fireEvent.click(uploadIcon);

        expect(screen.getByText('Upload a Studio')).toBeVisible();
    });
});
