import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from '../home-page';

const mockNotLoading = false;
const mockIsLoading = true;
const mockGetStudios = jest.fn();

describe('Home Page', () => {
    it('renders', () => {
        render(
            <Router>
                <HomePage isLoading={mockNotLoading} getStudios={mockGetStudios} />
            </Router>
        );
        const subHeading = screen.getByText('Aerial, pole & fitness classes near you.');
        expect(subHeading).toBeVisible();
    });

    it('renders loading spinner when loading', () => {
        render(
            <Router>
                <HomePage isLoading={mockIsLoading} getStudios={mockGetStudios} />
            </Router>
        );
        const subHeading = screen.getByTestId('loader');
        expect(subHeading).toBeVisible();
    });
});
