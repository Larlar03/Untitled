import { mockBlankStudio } from '../mock-objects/mock-studios';
import { validateForm } from '../validate-form';

describe('Form Validation', () => {
    it('throws error for empty fields', () => {
        expect.assertions(1);

        try {
            validateForm(mockBlankStudio);
        } catch (error) {
            expect(error).toHaveProperty(
                'message',
                'The following fields are empty: name, email_address, address, post_code, city, region, country, website'
            );
        }
    });
});
