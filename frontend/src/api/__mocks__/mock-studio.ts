import Studio from '../../types/studios';

export const mockStudio: Studio = {
    name: 'Mock Studio One',
    phone_number: '00000000000',
    email_address: 'mockstudio@gmail.com',
    location: {
        address: '123 Street',
        post_code: '000 000',
        city: 'Birmingham',
        region: 'West Midlands',
        country: 'England'
    },
    social_links: {
        website: 'www.mockstudio.com',
        instagram: '',
        facebook: ''
    },
    logo: '',
    services: ['Aerial Silks']
};

export const mockAllStudios: Studio[] = [
    {
        name: 'Mock Studio One',
        phone_number: '00000000000',
        email_address: 'mockstudio@gmail.com',
        location: {
            address: '123 Street',
            post_code: '000 000',
            city: 'Birmingham',
            region: 'West Midlands',
            country: 'England'
        },
        social_links: {
            website: 'www.mockstudio.com',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: ['Aerial Silks']
    },
    {
        name: 'Mock Studio Two',
        phone_number: '00000000000',
        email_address: 'mockstudio@gmail.com',
        location: {
            address: '123 Street',
            post_code: '000 000',
            city: 'Birmingham',
            region: 'West Midlands',
            country: 'England'
        },
        social_links: {
            website: 'www.mockstudio.com',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: ['Aerial Hoop']
    },
    {
        name: 'Mock Studio Three',
        phone_number: '00000000000',
        email_address: 'mockstudio@gmail.com',
        location: {
            address: '123 Street',
            post_code: '000 000',
            city: 'Manchester',
            region: 'North West',
            country: 'England'
        },
        social_links: {
            website: 'www.mockstudio.com',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: ['Aerial Silks', 'Aerial Hoop']
    }
];
