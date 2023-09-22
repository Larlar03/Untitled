import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import TimeoutError from '../timeout/timeout';

describe('No Results', () => {
    beforeEach(() => {
        render(
            <Router>
                <TimeoutError />
            </Router>
        );
    });

    it('renders h1', () => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeVisible();
        expect(h1).toHaveTextContent('Request Timeout');
    });

    it('renders svg image', () => {
        const svgImage = screen.getByRole('img');
        expect(svgImage).toBeVisible();
        expect(svgImage).toHaveAttribute('src', 'sparkle.svg');
    });

    it('renders messages to go back to search page', () => {
        const message = screen.getByText('Back to');
        expect(message).toBeVisible();
    });

    it('renders link back to home page', () => {
        const link = screen.getByRole('link');
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('home');
        expect(link).toHaveAttribute('href', '/');
        expect(window.location.href).toBe('http://localhost/');
    });
});
