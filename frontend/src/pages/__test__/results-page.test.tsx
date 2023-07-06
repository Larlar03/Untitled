import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ResultsPage from '../results-page';
import Studio from '../../types/studios';

const mockStudios: Studio[] = [
    {
        name: '',
        phone_number: '',
        email_address: '',
        location: {
            address: '',
            post_code: '',
            city: '',
            region: '',
            country: ''
        },
        social_links: {
            website: '',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: []
    }
];

const mockNoStudios: Studio[] = [];

describe('Results Page', () => {
    it('renders', () => {
        render(
            <Router>
                <ResultsPage results={mockStudios} />
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
