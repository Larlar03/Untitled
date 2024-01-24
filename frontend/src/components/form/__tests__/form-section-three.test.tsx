import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import FormSectionThree from '../form-section-three';
import { MouseEvent } from 'react';
import Studio from '../../../types/studio';
import MockServices from '../../../utils/mock-objects/mock-services';

const mockStoreServiceData = jest.fn();
const mockGoToFormSection = jest.fn();
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
                    goToFormSection={mockGoToFormSection}
                    storeServiceData={mockStoreServiceData}
                    onSubmit={mockSubmitForm}
                    newStudio={new Studio()}
                    services={MockServices}
                />
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders text input fields', () => {
        const textInputFields = screen.getAllByRole('checkbox');
        const amountOfServices = MockServices.length;
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
        expect(mockGoToFormSection).toHaveBeenCalled();
    });

    it('calls function to go to submit form when upload button is clicked', () => {
        const uploadButton = screen.getByText('Upload');
        fireEvent.click(uploadButton);
        expect(mockSubmitForm).toHaveBeenCalled();
    });
});
