import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import NoResults from '../no-results/no-results';

describe('No Results', () => {
    beforeEach(() => {
        render(
            <Router>
                <NoResults />
            </Router>
        );
    });

    it('renders h1', () => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeVisible();
        expect(h1).toHaveTextContent('0 results');
    });

    it('renders svg image', () => {
        const svgImage = screen.getByRole('img');
        expect(svgImage).toBeVisible();
        expect(svgImage).toHaveAttribute('src', 'magnifying-glass.svg');
    });

    it('renders messages to go back to search page', () => {
        const message = screen.getByText('Back to');
        expect(message).toBeVisible();
    });

    it('renders link back to search page', () => {
        const link = screen.getByRole('link');
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('search');
        expect(link).toHaveAttribute('href', '/');
        expect(window.location.href).toBe('http://localhost/');
    });
});
