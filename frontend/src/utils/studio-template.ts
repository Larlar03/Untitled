import Studio from '../types/studio';

/** Studio template to use in Form component */
export const studioTemplate: Studio = {
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
