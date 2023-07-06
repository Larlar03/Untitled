import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadSuccess from '../upload-success';

describe('Upload Success', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadSuccess />
            </Router>
        );
    });

    it('renders success message', () => {
        const message = screen.getByTestId('upload-success-message');
        expect(message).toBeVisible();
    });

    it('renders svg image', () => {
        const svgImage = screen.getByRole('img');
        expect(svgImage).toBeVisible();
    });
});
