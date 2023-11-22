import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    it('renders icons', () => {
        const icons = screen.getAllByRole('button');

        expect(icons).toHaveLength(3);
        icons.forEach((icon) => {
            expect(icon).toBeVisible();
        });
    });

    it('navigates to home page when home icon is clicked', async () => {
        const homeIcon = screen.getByTestId('home-icon');
        fireEvent.click(homeIcon);

        waitFor(() => {
            expect(window.location.href).toBe('http://127.0.0.1:5173/');
        });
    });

    it('navigates to upload page when upload icon is clicked', async () => {
        const uploadIcon = screen.getByTestId('upload-icon');
        fireEvent.click(uploadIcon);

        waitFor(() => {
            expect(window.location.href).toBe('http://127.0.0.1:5173/upload');
        });
    });

    it('navigates to edit page when edit icon is clicked', async () => {
        const bookmarkIcon = screen.getByTestId('edit-icon');
        fireEvent.click(bookmarkIcon);

        waitFor(() => {
            expect(window.location.href).toBe('http://127.0.0.1:5173/edit');
        });
    });
});
