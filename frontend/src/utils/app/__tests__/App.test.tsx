import { mockFilterStudiosInCity } from '../mock/mock-app-functions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockStudios = require('../mock/mock-studios.json');

describe('Filter studios by services', () => {
    test('Given one service is selected, and one studio has that service, that studio should be returned', () => {
        // arrange
        const mockServices = ['Stretch & Flexibility'];

        // act
        const results = mockFilterStudiosInCity(mockStudios, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 2,
                name: 'AYC Studios',
                phone_number: '07507797220',
                email_address: 'aerialyogicircus@gmail.com',
                location: {
                    address: 'Unit 10B, Robins Business Park, Bagnall Street, West Bromwich',
                    post_code: 'DY4 7BS',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.aycstudios.co.uk/',
                    instagram: 'www.instagram.com/aycstudios/',
                    'facebook:': 'www.facebook.com/AYcircus/'
                },
                services: [
                    'Aerial Hoop',
                    'Pole Dance',
                    'Pole Fitness',
                    'Aerial Silks',
                    'Lollipop',
                    'Stretch & Flexibility'
                ]
            }
        ]);
    });

    test('Given one service is selected, and two studios have that service, both studios should be returned', () => {
        // arrange
        const mockServices = ['Flying Pole'];

        // act
        const results = mockFilterStudiosInCity(mockStudios, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 4,
                name: 'K Pole Solihull',
                phone_number: '07800793337',
                email_address: 'kpoleshirley@hotmail.com',
                location: {
                    address: 'YogaHaven, Radway Road',
                    post_code: 'B90 4NR',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.kpole.co.uk',
                    instagram: 'www.instagram.com/kpole_danceandfitness',
                    'facebook:': 'www.facebook.com/KpoleShirley/'
                },
                services: ['Aerial Hoop', 'Pole Dance', 'Pole Fitness', 'Aerial Silks', 'Lollipop', 'Flying Pole']
            },
            {
                id: 4,
                name: 'K Pole Cradely Heath',
                phone_number: '07800793337',
                email_address: 'kpoleshirley@hotmail.com',
                location: {
                    address: '5 Market Square, Cradley Heath',
                    post_code: 'B64 5HH',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.kpole.co.uk',
                    instagram: 'www.instagram.com/kpole_danceandfitness',
                    'facebook:': 'www.facebook.com/KpoleShirley/'
                },
                services: ['Aerial Hoop', 'Pole Dance', 'Pole Fitness', 'Aerial Silks', 'Lollipop', 'Flying Pole']
            }
        ]);
    });

    test('Given multiple services are selected, studios with any of the selected services should be returned', () => {
        // arrange

        const mockServices = ['Flying Pole', 'Stretch & Flexibility'];

        // act
        const results = mockFilterStudiosInCity(mockStudios, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 2,
                name: 'AYC Studios',
                phone_number: '07507797220',
                email_address: 'aerialyogicircus@gmail.com',
                location: {
                    address: 'Unit 10B, Robins Business Park, Bagnall Street, West Bromwich',
                    post_code: 'DY4 7BS',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.aycstudios.co.uk/',
                    instagram: 'www.instagram.com/aycstudios/',
                    'facebook:': 'www.facebook.com/AYcircus/'
                },
                services: [
                    'Aerial Hoop',
                    'Pole Dance',
                    'Pole Fitness',
                    'Aerial Silks',
                    'Lollipop',
                    'Stretch & Flexibility'
                ]
            },
            {
                id: 4,
                name: 'K Pole Solihull',
                phone_number: '07800793337',
                email_address: 'kpoleshirley@hotmail.com',
                location: {
                    address: 'YogaHaven, Radway Road',
                    post_code: 'B90 4NR',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.kpole.co.uk',
                    instagram: 'www.instagram.com/kpole_danceandfitness',
                    'facebook:': 'www.facebook.com/KpoleShirley/'
                },
                services: ['Aerial Hoop', 'Pole Dance', 'Pole Fitness', 'Aerial Silks', 'Lollipop', 'Flying Pole']
            },
            {
                id: 4,
                name: 'K Pole Cradely Heath',
                phone_number: '07800793337',
                email_address: 'kpoleshirley@hotmail.com',
                location: {
                    address: '5 Market Square, Cradley Heath',
                    post_code: 'B64 5HH',
                    city: 'Birmingham',
                    region: 'West Midlands',
                    country: 'England'
                },
                social_links: {
                    website: 'www.kpole.co.uk',
                    instagram: 'www.instagram.com/kpole_danceandfitness',
                    'facebook:': 'www.facebook.com/KpoleShirley/'
                },
                services: ['Aerial Hoop', 'Pole Dance', 'Pole Fitness', 'Aerial Silks', 'Lollipop', 'Flying Pole']
            }
        ]);
    });

    test('Given multiple services are selected, and only one studio has these services, that studio should be returned', () => {
        // arrange

        const mockServices = ['Lyrical Pole', 'Burlesque'];

        // act
        const results = mockFilterStudiosInCity(mockStudios, mockServices);

        // assert
        expect(results).toEqual([
            {
                id: 1,
                name: 'Siren Asylum',
                phone_number: '07784967677',
                email_address: 'info@sirenasylum.com',
                location: {
                    address: '24 Missouri Ave',
                    post_code: 'M50 2NP',
                    city: 'Birmingham',
                    region: 'North West',
                    country: 'England'
                },
                social_links: {
                    website: 'www.sirenasylum.co.uk',
                    instagram: 'www.instagram.com/sirenasylumfitness',
                    'facebook:': 'www.facebook.com/sirenasylum'
                },
                services: [
                    'Aerial Hoop',
                    'Pole Dance',
                    'Pole Fitness',
                    'Aerial Silks',
                    'Lollipop',
                    'Lyrical Pole',
                    'Burlesque'
                ]
            }
        ]);
    });

    test('Given the service "any" is selected, all salons should be returned', () => {
        // arrange

        const mockServices = ['Any', 'Pole Fitness'];

        // act
        const results = mockFilterStudiosInCity(mockStudios, mockServices);

        // assert
        expect(results).toEqual(mockStudios);
    });
});
