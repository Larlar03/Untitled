import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import FormSectionThree from '../form-section-three';
import Services from '../../../constants/services';
import { MouseEvent } from 'react';
import Studio from '../../../types/studios';

const mockStoreServiceData = jest.fn();
const mockGoToFormPage = jest.fn();
const mockSubmitForm = jest.fn(function (e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    throw new Error('Function not implemented.');
});

describe('Upload Form Three', () => {
    beforeEach(() => {
        render(
            <Router>
                <FormSectionThree
                    formType='upload'
                    goToFormPage={mockGoToFormPage}
                    storeServiceData={mockStoreServiceData}
                    onSubmit={mockSubmitForm}
                    newStudio={new Studio()}
                />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('checkbox');
        const amountOfServices = Services.length;
        expect(textInputFields).toHaveLength(amountOfServices);
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
