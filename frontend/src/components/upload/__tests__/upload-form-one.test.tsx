import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadFormOne from '../upload-form-one';

const mockNewStudioData = {};
const mockGoToFormPage = jest.fn();

describe('Page Not Found', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadFormOne goToFormPage={mockGoToFormPage} newStudioData={mockNewStudioData} />
            </Router>
        );
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('textbox');
        expect(textInputFields).toHaveLength(5);
    });

    it('renders select input fields', () => {
        const selectInputFields = screen.getAllByRole('combobox');
        expect(selectInputFields).toHaveLength(3);
    });

    it('renders button', () => {
        const nextButton = screen.getByRole('button');
        expect(nextButton).toBeVisible();
    });
});
