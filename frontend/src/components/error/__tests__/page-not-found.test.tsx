import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PageNotFound from '../page-not-found/page-not-found.tsx';

describe('Page Not Found', () => {
    beforeEach(() => {
        render(
            <Router>
                <PageNotFound />
            </Router>
        );
    });

    it('renders h1', () => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeVisible();
        expect(h1).toHaveTextContent('Page Not Found');
    });

    it('renders svg image', () => {
        const svgImages = screen.getAllByRole('img');
        expect(svgImages.length).toBe(2);
        svgImages.forEach((svg) => {
            expect(svg).toBeVisible();
        });
    });

    it('renders messages to go back to home page', () => {
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
