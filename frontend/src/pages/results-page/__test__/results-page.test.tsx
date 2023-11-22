import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ResultsPage from '../results-page';
import { mockOneStudio } from '../../../utils/mock-objects/mock-studios';
import Studio from '../../../types/studios';

const mockNoStudios: Studio[] = [];

describe('Results Page', () => {
    it('renders', () => {
        render(
            <Router>
                <ResultsPage results={[mockOneStudio]} />
            </Router>
        );
        const subHeading = screen.getByText('Results');
        expect(subHeading).toBeVisible();
    });

    it('renders no results component is 0 results are returned', () => {
        render(
            <Router>
                <ResultsPage results={mockNoStudios} />
            </Router>
        );
        const subHeading = screen.getByText('0 results');
        expect(subHeading).toBeVisible();
    });

    it('renders svg image when 0 results are returned', () => {
        render(
            <Router>
                <ResultsPage results={mockNoStudios} />
            </Router>
        );
        const subHeading = screen.getByRole('img');
        expect(subHeading).toBeVisible();
    });
});
