import Studio from '../../types/studios';
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

const filledStudio: Studio = {
    name: 'Studio',
    email_address: 'studio@gmail.com',
    location: {
        address: '123 Street',
        post_code: '000 000',
        city: 'Birmingham',
        region: 'West Midlands',
        country: 'England'
    },
    social_links: {
        website: 'www.studio.com',
        instagram: '',
        facebook: ''
    },
    logo: '',
    services: ['Aerial Silks']
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
