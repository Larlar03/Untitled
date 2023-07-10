import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ErrorPage from '../error-page';

describe('Error Page', () => {
    it('renders 404 message', () => {
        render(
            <Router>
                <ErrorPage />
            </Router>
        );

        expect(screen.getByText('Page Not Found')).toBeVisible();
    });

    it('renders eye svgs', () => {
        render(
            <Router>
                <ErrorPage />
            </Router>
        );

        const eyeSvgs = screen.getAllByRole('img');
        expect(eyeSvgs).toHaveLength(2);

        eyeSvgs.forEach((svg) => {
            expect(svg).toBeVisible();
        });
    });
});
