import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Results from '../results.tsx';
import { mockFiveStudios } from '../../../utils/mock-objects/mock-studios.ts';

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
        expect(resultsCounter).toBeVisible();
    });

    it('displays the number of the last result when the previous arrow is clicked', () => {
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);

        const resultsCounter = screen.getByText('5 of 5');

        expect(resultsCounter).toBeVisible();
    });

    it('displays the number of the next result when the next arrow is clicked', () => {
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);

        const resultsCounter = screen.getByText('2 of 5');

        expect(resultsCounter).toBeVisible();
    });

    it('displays the first result when on the last result and the next arrow is clicked', () => {
        // Go to last result
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);

        // Click next
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);
        const resultsCounter = screen.getByText('1 of 5');

        expect(resultsCounter).toBeVisible();
    });

    it('shifts cards to the left when the next arrow is clicked', () => {
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);

        const leftCard = screen.getByText('Mock Studio One');
        const middleCard = screen.getByText('Mock Studio Two');
        const rightCard = screen.getByText('Mock Studio Three');
        const cardArray = [leftCard, middleCard, rightCard];

        cardArray.forEach((card) => {
            expect(card).toBeVisible();
        });
    });

    it('shifts cards to the right when the prev arrow is clicked', () => {
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);

        const leftCard = screen.getByText('Mock Studio Four');
        const middleCard = screen.getByText('Mock Studio Five');
        const rightCard = screen.getByText('Mock Studio One');
        const cardArray = [leftCard, middleCard, rightCard];

        cardArray.forEach((card) => {
            expect(card).toBeVisible();
        });
    });
});
