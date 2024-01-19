import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from '../login';

const mockHandleLogin = jest.fn();
const mockSetEmailState: React.Dispatch<React.SetStateAction<string>> = jest.fn();
const mockSetPasswordState: React.Dispatch<React.SetStateAction<string>> = jest.fn();

describe('Admin Login', () => {
    beforeEach(() => {
        render(
            <Router>
                <Login
                    user={{ email: '', password: '' }}
                    setEmail={mockSetEmailState}
                    setPassword={mockSetPasswordState}
                    handleLogin={mockHandleLogin}
                />{' '}
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('updates email state when email input is changed', async () => {
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'admin' } });
        expect(mockSetEmailState).toHaveBeenCalledWith('admin');
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
