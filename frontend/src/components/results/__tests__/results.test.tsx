import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Results from '../results';
import { mockOneStudio, mockTwoStudios, mockFiveStudios } from '../__mocks__/mockStudioResults.ts';

describe('Results', () => {
    it('displays 1 results card when 1 result is returned', () => {
        render(
            <Router>
                <Results results={mockOneStudio} />
            </Router>
        );

        const card = screen.getAllByTestId('results-card');
        const mockResultName = screen.getByText('Siren Asylum');

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
        const mockResultName = screen.getByText('Siren Asylum');

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

        const mockResultOne = screen.getByText('K Pole Cradely Heath');
        const mockResultTwo = screen.getByText('Siren Asylum');
        const mockResultThree = screen.getByText('AYC Studios');
        const mockResultsArr = [mockResultOne, mockResultTwo, mockResultThree];

        expect(card).toHaveLength(3);

        mockResultsArr.forEach((result) => {
            expect(result).toBeInTheDocument();
        });
    });
});
