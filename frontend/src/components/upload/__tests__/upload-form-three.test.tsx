import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UploadFormThree from '../upload-form-three';

const mockStoreServiceData = jest.fn();
const mockGoToFormPage = jest.fn();
const mockSubmitForm = jest.fn();

describe('Page Not Found', () => {
    beforeEach(() => {
        render(
            <Router>
                <UploadFormThree
                    goToFormPage={mockGoToFormPage}
                    storeServiceData={mockStoreServiceData}
                    submitForm={mockSubmitForm}
                />
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

    it('calls function to go to previous component when back button is clicked', () => {
        const backButton = screen.getByText('Back');
        fireEvent.click(backButton);
        expect(mockGoToFormPage).toHaveBeenCalled();
    });

    it('calls function to go to submit form when upload button is clicked', () => {
        const uploadButton = screen.getByText('Upload');
        fireEvent.click(uploadButton);
        expect(mockSubmitForm).toHaveBeenCalled();
    });
});
