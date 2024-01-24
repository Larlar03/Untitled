import { render, screen, cleanup, fireEvent, within } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchForm from '../search-form';
import mockServices from '../../../utils/mock-objects/mock-services';

const mockGetStudios = jest.fn();

describe('Search Options', () => {
    beforeEach(() => {
        render(
            <Router>
                <SearchForm getStudios={mockGetStudios} services={mockServices} />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders disabled submit button', () => {
        const submitButton = screen.getByTestId('cta-button');
        expect(submitButton).toBeDisabled();
    });

    it('renders an enabled submit button when a location and service is clicked', async () => {
        const optionButtons = screen.getAllByTestId('option-button');
        fireEvent.click(optionButtons[0]);

        const autocomplete = screen.getByTestId('autocomplete');
        const input = within(autocomplete).getByRole('combobox');

        // type city in the input field
        autocomplete.focus();
        fireEvent.change(input, { target: { value: 'Birmingham' } });
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
        fireEvent.keyDown(autocomplete, { key: 'Enter' });

        const submitButton = screen.getByTestId('cta-button');
        expect(submitButton).not.toBeDisabled();
    });

    it('prevents default behaviour on submit', async () => {
        fireEvent.click(screen.getAllByTestId('option-button')[0]);

        const autocomplete = screen.getByTestId('autocomplete');
        const input = within(autocomplete).getByRole('combobox');
        autocomplete.focus();
        fireEvent.change(input, { target: { value: 'Birmingham' } });
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
        fireEvent.keyDown(autocomplete, { key: 'Enter' });

        const submitButton = screen.getByTestId('cta-button');
        const isPrevented = fireEvent.click(submitButton);
        expect(isPrevented).toBe(false);
    });
});
