import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import FormSectionOne from '../form-section-one';
import Studio from '../../../types/studios';

const mockStoreNewStudioData = jest.fn();
const mockGoToFormSection = jest.fn();

describe('Upload Form One', () => {
    beforeEach(() => {
        render(
            <Router>
                <FormSectionOne
                    goToFormSection={mockGoToFormSection}
                    storeNewStudioData={mockStoreNewStudioData}
                    newStudio={new Studio()}
                />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('textbox');
        expect(textInputFields).toHaveLength(4);
    });

    it('renders select input fields', () => {
        const selectInputFields = screen.getAllByRole('combobox');
        expect(selectInputFields).toHaveLength(3);
    });

    it('renders button', () => {
        const nextButton = screen.getByRole('button');
        expect(nextButton).toBeVisible();
    });

    it('calls function to go to next component when button is clicked', () => {
        const nextButton = screen.getByRole('button');
        fireEvent.click(nextButton);
        expect(mockGoToFormSection).toHaveBeenCalled();
    });
});
