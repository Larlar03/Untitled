import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

const navbarComponent = (
    <Router>
        <Navbar />
    </Router>
);

describe('testing the rendering of the navbar', () => {
    test('the hamburger nav icon renders', () => {
        //Arrange
        render(navbarComponent);

        //Act
        const hamburgerIcon = screen.getByRole('button');

        //Assert
        expect(hamburgerIcon).toBeInTheDocument();
    });

    test('the menu items render', () => {
        //Arrange
        render(navbarComponent);

        //Act
        const item1 = screen.getByText('Home');
        const item2 = screen.getByText('Sign Up');
        const item3 = screen.getByText('Log In');
        const menuItems = [item1, item2, item3];

        //Assert
        menuItems.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });
});

describe('testing the navbar items navigation', () => {
    test('given the Home link is clicked, the page navigates to the homepage', async () => {
        //Arrange
        render(navbarComponent);

        //Act
        const homeLink = screen.getByText('Home');
        await userEvent.click(homeLink);

        //Assert
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    test('given the Sign Up link is clicked, the page navigates to the signup page', async () => {
        //Arrange
        render(navbarComponent);

        //Act
        const signUpLink = screen.getByText('Sign Up');
        await userEvent.click(signUpLink);

        //Assert
        expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
    });

    test('given the Log In link is clicked, the page navigates to the login page', async () => {
        //Arrange
        render(navbarComponent);

        //Act
        const logInLink = screen.getByText('Log In');
        await userEvent.click(logInLink);

        //Assert
        expect(logInLink.closest('a')).toHaveAttribute('href', '/login');
    });
});
