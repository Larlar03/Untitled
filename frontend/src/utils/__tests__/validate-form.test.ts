import Studio from '../../types/studio';
import { validateForm } from '../validate-form';

const blankStudio: Studio = {
    name: '',
    email_address: '',
    location: {
        address: '',
        post_code: '',
        city: '',
        region: '',
        country: ''
    },
    social_links: {
        website: '',
        instagram: '',
        facebook: ''
    },
    logo: '',
    services: []
};

describe('Form Validation', () => {
    it('throws error for empty fields', () => {
        expect.assertions(1);

        try {
            validateForm(blankStudio);
        } catch (error) {
            expect(error).toHaveProperty(
                'message',
                'The following fields are empty: name, email_address, address, post_code, city, region, country, website'
            );
        }
    });
});
