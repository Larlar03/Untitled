import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../navbar';

describe('Navbar', () => {
    beforeEach(() => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });

    afterEach(() => {
        cleanup(); // Reset all user events
    });

    it('renders the hamburger icon', () => {
        const hamburgerIcon = screen.getByRole('button');
        expect(hamburgerIcon).toBeInTheDocument();
    });

    it('renders the menu items', () => {
        const item1 = screen.getByText('Home');
        const item2 = screen.getByText('Sign Up');
        const item3 = screen.getByText('Log In');
        const menuItems = [item1, item2, item3];

        menuItems.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    it('navigates to the home page when the home nav item is clicked', () => {
        const homeLink = screen.getByText('Home');
        fireEvent.click(homeLink);

        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(window.location.href).toBe('http://localhost/');
    });

    it('navigates to the signup page when the signup nav item is clicked', () => {
        const signUpLink = screen.getByText('Sign Up');
        fireEvent.click(signUpLink);

        expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
        expect(window.location.href).toBe('http://localhost/signup');
    });

    it('navigates to the login page when the login nav item is clicked', () => {
        const loginLink = screen.getByText('Log In');
        fireEvent.click(loginLink);

        expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
        expect(window.location.href).toBe('http://localhost/login');
    });
});
