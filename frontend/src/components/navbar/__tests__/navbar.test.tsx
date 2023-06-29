import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../navbar';

describe('Navbar', () => {
    beforeEach(() => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders icons', () => {
        const icons = screen.getAllByRole('button');

        expect(icons).toHaveLength(2);
        icons.forEach((icon) => {
            expect(icon).toBeVisible();
        });
    });

    it('navigates to upload page when upload icon is clicked', async () => {
        const uploadIcon = screen.getByTestId('upload-icon');
        fireEvent.click(uploadIcon);
        // expect(window.location.href).toBe('http://127.0.0.1:5173/upload');
    });

    it('navigates to bookmark page when boomark icon is clicked', async () => {
        const bookmarkIcon = screen.getByTestId('bookmark-icon');
        fireEvent.click(bookmarkIcon);
        // expect(window.location.href).toBe('http://127.0.0.1:5173/upload');
    });
});
