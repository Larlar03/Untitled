import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from '../header';

describe('Header', () => {
    beforeEach(() => {
        render(
            <Router>
                <Header subheading='I am a subheading' />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders headding', () => {
        const h1 = screen.getByText('aeriform');
        expect(h1).toBeInTheDocument();
    });

    it('renders subheading', () => {
        const h2 = screen.getByText('I am a subheading');
        expect(h2).toBeInTheDocument();
    });

    it('navigates to homepage when heading is clicked', () => {
        const h1 = screen.getByText('aeriform');
        fireEvent.click(h1);

        expect(h1.closest('a')).toHaveAttribute('href', '/');
        expect(window.location.href).toBe('http://localhost/');
    });
});
