import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadFormThree from '../upload-form-three';

const mockNewStudioData = {};
const mockGoToFormPage = jest.fn();

describe('Page Not Found', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadFormThree goToFormPage={mockGoToFormPage} newStudioData={mockNewStudioData} />
            </Router>
        );
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('checkbox');
        expect(textInputFields).toHaveLength(13);
    });

    it('renders buttons', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveTextContent('Back');
        expect(buttons[1]).toHaveTextContent('Upload');
    });
});
