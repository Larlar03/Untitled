import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('testing the rendering and navigating of the headings in the header', () => {
    const headerComponent = (
        <Router>
            <Header subheading='I am a subheading' />
        </Router>
    );
    test('h2 subheading renders', () => {
        // Arange
        render(headerComponent);

        //Act
        const h2 = screen.getByText('I am a subheading');

        //Assert
        expect(h2).toBeInTheDocument();
    });

    test('h1 heading renders', () => {
        // Arange
        render(headerComponent);

        //Act
        const h1 = screen.getByText('untitled');

        //Assert
        expect(h1).toBeInTheDocument();
    });

    test('given the h1 heading is clicked, then the page will navigate to the homepage', async () => {
        // Arange
        render(headerComponent);

        //Act
        const h1 = screen.getByText('untitled');
        await userEvent.click(h1);

        // Assert
        expect(h1.closest('a')).toHaveAttribute('href', '/');
    });
});
