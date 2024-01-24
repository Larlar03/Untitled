import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchOptions from '../search-options/search-options';
import mockServices from '../../../utils/mock-objects/mock-services';

const mockSelectOptions = jest.fn();

describe('Search Options', () => {
    beforeEach(() => {
        render(
            <Router>
                <SearchOptions selectOptions={mockSelectOptions} services={mockServices} />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders the option button', () => {
        const buttons = screen.getAllByTestId('option-button');
        expect(buttons.length).toBe(21);
    });

    it('applies button styling to selected option', async () => {
        const button = screen.getByText('Aerial Hoop');
        expect(button).not.toHaveClass('active');

        fireEvent.click(button);
        expect(button).toHaveClass('active');
    });

    it('removes button styling when option is deslected', async () => {
        const button = screen.getByText('Aerial Hoop');
        expect(button).not.toHaveClass('active');

        fireEvent.click(button);
        expect(button).toHaveClass('active');

        fireEvent.click(button);
        expect(button).not.toHaveClass('active');
    });

    it('sets the option array state when an option button is clicked', () => {
        const buttonOne = screen.getByText('Aerial Hoop');
        fireEvent.click(buttonOne);

        expect(mockSelectOptions).toHaveBeenCalledWith(['Aerial Hoop']);

        const buttonTwo = screen.getByText('Aerial Silks');
        fireEvent.click(buttonTwo);

        expect(mockSelectOptions).toHaveBeenCalledWith(['Aerial Hoop', 'Aerial Silks']);
    });

    it('removes an option from the array if the button is clicked twice', () => {
        const buttonOne = screen.getByText('Aerial Hoop');
        fireEvent.click(buttonOne);

        expect(mockSelectOptions).toHaveBeenCalledWith(['Aerial Hoop']);

        fireEvent.click(buttonOne);

        expect(mockSelectOptions).toHaveBeenCalledWith([]);
    });
});
