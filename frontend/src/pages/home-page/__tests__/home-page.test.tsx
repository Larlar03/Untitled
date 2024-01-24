import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from '../home-page';
import mockServices from '../../../utils/mock-objects/mock-services';

const mockNotLoading = false;
const mockIsLoading = true;
const mockGetStudios = jest.fn();

describe('Home Page', () => {
    it('renders', () => {
        render(
            <Router>
                <HomePage isLoading={mockNotLoading} getStudios={mockGetStudios} services={mockServices} />
            </Router>
        );
        const subHeading = screen.getByText('Aerial, pole & fitness classes near you.');
        expect(subHeading).toBeVisible();
    });

    it('renders loading spinner when loading', () => {
        render(
            <Router>
                <HomePage isLoading={mockIsLoading} getStudios={mockGetStudios} services={mockServices} />
            </Router>
        );
        const loader = screen.getByTestId('bounce-loader');
        expect(loader).toBeVisible();
    });
});
