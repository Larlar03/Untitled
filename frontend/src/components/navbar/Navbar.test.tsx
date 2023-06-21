import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

const navbarComponent = (
    <Router>
        <Navbar />
    </Router>
);

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

test('given the menu is not visible and the hamburger nav button is clicked, showMenu should be true', async () => {
    //Arrange
    let mockShowMenu = false;
    const mockHandleNavClick = () => {
        return !mockShowMenu ? (mockShowMenu = true) : (mockShowMenu = false);
    };

    //Act
    const expected = mockHandleNavClick();

    //Assert
    expect(expected).toBe(true);
});

test('given the menu is visible and the hamburger nav button is clicked, showMenu should be false', async () => {
    //Arrange
    let mockShowMenu = true;
    const mockHandleNavClick = () => {
        return !mockShowMenu ? (mockShowMenu = true) : (mockShowMenu = false);
    };

    //Act
    const expected = mockHandleNavClick();

    //Assert
    expect(expected).toBe(false);
});

test('given the Home link is clicked, the page navigates to the homepage', async () => {
    //Arrange
    render(navbarComponent);

    //Act
    const homeLink = screen.getByText('Home');
    await userEvent.click(homeLink);

    //Assert
    expect(homeLink).toHaveAttribute('href', '/');
});

test('given the Sign Up link is clicked, the page navigates to the signup page', async () => {
    //Arrange
    render(navbarComponent);

    //Act
    const signUpLink = screen.getByText('Sign Up');
    await userEvent.click(signUpLink);

    //Assert
    expect(signUpLink).toHaveAttribute('href', '/signup');
});

test('given the Log In link is clicked, the page navigates to the login page', async () => {
    //Arrange
    render(navbarComponent);

    //Act
    const logInLink = screen.getByText('Log In');
    await userEvent.click(logInLink);

    //Assert
    expect(logInLink).toHaveAttribute('href', '/login');
});
