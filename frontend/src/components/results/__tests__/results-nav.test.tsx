import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Results from '../results';
import { mockFiveStudios } from '../__mocks__/mockStudioResults.ts';

describe('Results Navigation', () => {
    beforeEach(() => {
        render(
            <Router>
                <Results results={mockFiveStudios} />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('displays the total amount of results on the counter', () => {
        const resultsCounter = screen.getByText('1 of 5');
        expect(resultsCounter).toBeInTheDocument();
    });

    it('renders return arrow button', () => {
        const returnIcon = screen.getByTestId('return-arrow');
        expect(returnIcon).toBeInTheDocument();
    });

    it('navigates to the home page when the return icon is clicked', () => {
        const returnIcon = screen.getByTestId('return-arrow');
        fireEvent.click(returnIcon);

        expect(returnIcon.closest('a')).toHaveAttribute('href', '/');
        expect(window.location.href).toBe('http://localhost/');
    });

    it('displays the number of the last result when the previous arrow is clicked', () => {
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);

        const resultsCounter = screen.getByText('5 of 5');

        expect(resultsCounter).toBeInTheDocument();
    });

    it('displays the number of the next result when the next arrow is clicked', () => {
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);

        const resultsCounter = screen.getByText('2 of 5');

        expect(resultsCounter).toBeInTheDocument();
    });

    it('displays the first result when on the last result and the next arrow is clicked', () => {
        // Go to last result
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);

        // Click next
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);
        const resultsCounter = screen.getByText('1 of 5');

        expect(resultsCounter).toBeInTheDocument();
    });
});

describe('Results Navigation 0 Results', () => {
    it('displays 0 on the counter if there are no results', () => {
        render(
            <Router>
                <Results results={[]} />
            </Router>
        );

        const resultsCounter = screen.getByText('0 Results');
        expect(resultsCounter).toBeInTheDocument();
    });
});
