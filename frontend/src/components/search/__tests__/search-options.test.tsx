import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchOptions from '../search-options/search-options';

const services = ['Aerial Hoop', 'Aerial Silks', 'Pole Fitness'];

describe('Search Options', () => {
    it('renders the option button', () => {
        const mockSelectOptions = jest.fn();

        render(
            <Router>
                <SearchOptions selectOptions={mockSelectOptions} services={services} />
            </Router>
        );

        const optionButtons = screen.getAllByTestId('option-button');
        expect(optionButtons.length).toBe(3);
    });
});
