import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadFormTwo from '../upload-form-two';

const mockNewStudioData = {};
const mockGoToFormPage = jest.fn();

describe('Page Not Found', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadFormTwo goToFormPage={mockGoToFormPage} newStudioData={mockNewStudioData} />
            </Router>
        );
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('textbox');
        expect(textInputFields).toHaveLength(3);
    });

    it('renders file upload field', () => {
        const selectInputFields = screen.getByTestId('logo-upload-input');
        expect(selectInputFields).toBeVisible();
    });

    it('renders buttons', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveTextContent('Back');
        expect(buttons[1]).toHaveTextContent('Next');
    });
});
