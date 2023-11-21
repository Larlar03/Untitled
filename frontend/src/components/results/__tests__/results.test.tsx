import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Results from '../results.tsx';
import { mockOneStudio, mockTwoStudios, mockFiveStudios } from '../../../utils/mock-objects/mock-studios.ts';

describe('Results', () => {
    afterEach(() => {
        cleanup();
    });
    it('displays 1 results card when 1 result is returned', () => {
        render(
            <Router>
                <Results results={mockOneStudio} />
            </Router>
        );

        const card = screen.getAllByTestId('results-card');
        const mockResultName = screen.getByText('Mock Studio One');

        expect(card).toHaveLength(1);
        expect(mockResultName).toBeInTheDocument();
    });

    it('displays the first result when 2 results are returned', () => {
        render(
            <Router>
                <Results results={mockTwoStudios} />
            </Router>
        );

        const card = screen.getAllByTestId('results-card');
        const mockResultName = screen.getByText('Mock Studio One');

        expect(card).toHaveLength(1);
        expect(mockResultName).toBeInTheDocument();
    });

    it('displays 3 cards of the first 2 and last 1 result when more than 2 results are returned', () => {
        render(
            <Router>
                <Results results={mockFiveStudios} />
            </Router>
        );

        const card = screen.getAllByTestId('results-card');

        const mockResultOne = screen.getByText('Mock Studio Five');
        const mockResultTwo = screen.getByText('Mock Studio One');
        const mockResultThree = screen.getByText('Mock Studio Two');
        const mockResultsArr = [mockResultOne, mockResultTwo, mockResultThree];

        expect(card).toHaveLength(3);

        mockResultsArr.forEach((result) => {
            expect(result).toBeInTheDocument();
        });
    });

    it('displays last result on the right card if right card is result 1 and previous button is clicked', () => {
        render(
            <Router>
                <Results results={mockFiveStudios} />
            </Router>
        );
        const prevArrow = screen.getByTestId('prev-arrow');

        // Arrange: get result 1 on right card
        fireEvent.click(prevArrow);

        // Act
        fireEvent.click(prevArrow);

        // Assert
        const rightCard = screen.getByTestId('right-card');
        const h3 = within(rightCard).getByRole('heading', { level: 3 });
        expect(h3).toHaveTextContent('Mock Studio Five');
    });

    it('displays last result on the left card if left card is result 1 and previous button is clicked', () => {
        render(
            <Router>
                <Results results={mockFiveStudios} />
            </Router>
        );

        const nextArrow = screen.getByTestId('next-arrow');
        const prevArrow = screen.getByTestId('prev-arrow');

        // Arrange: get result 1 on the left card
        fireEvent.click(nextArrow);

        // Act
        fireEvent.click(prevArrow);

        // Assert
        const leftCard = screen.getByTestId('left-card');
        const h3 = within(leftCard).getByRole('heading', { level: 3 });
        expect(h3).toHaveTextContent('Mock Studio Five');
    });

    it('displays result 1 on the right card when right card is the last result and the next button is clicked', () => {
        render(
            <Router>
                <Results results={mockFiveStudios} />
            </Router>
        );

        const prevArrow = screen.getByTestId('prev-arrow');
        const nextArrow = screen.getByTestId('next-arrow');

        // Arrange: get result 5 (last result) on right card
        fireEvent.click(prevArrow);
        fireEvent.click(prevArrow);

        // Act
        fireEvent.click(nextArrow);

        // Assert
        const rightCard = screen.getByTestId('right-card');
        const h3 = within(rightCard).getByRole('heading', { level: 3 });
        expect(h3).toHaveTextContent('Mock Studio One');
    });
});
