import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from '../login';

const mockHandleLogin = jest.fn();
const mockSetUsernameState: React.Dispatch<React.SetStateAction<string>> = jest.fn();
const mockSetPasswordState: React.Dispatch<React.SetStateAction<string>> = jest.fn();

describe('Admin Login', () => {
    beforeEach(() => {
        render(
            <Router>
                <Login
                    user={{ username: '', password: '' }}
                    setUsername={mockSetUsernameState}
                    setPassword={mockSetPasswordState}
                    handleLogin={mockHandleLogin}
                />{' '}
            </Router>
        );
    });

    it('updates username state when username input is changed', async () => {
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } });
        expect(mockSetUsernameState).toHaveBeenCalledWith('admin');
    });

    it('updates password state when password input is changed', async () => {
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass' } });
        expect(mockSetPasswordState).toHaveBeenCalledWith('pass');
    });

    it('calls handleLogin when the login button is clicked', () => {
        fireEvent.click(screen.getByRole('button'));
        expect(mockHandleLogin).toHaveBeenCalled();
    });
});
