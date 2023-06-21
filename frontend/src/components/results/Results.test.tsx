import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Studio from '../../types/studios';
import Results from './Results';

test('given 1 result is returned, only 1 results card is displayed', () => {
    const mockOneResult: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockOneResult} />
        </Router>
    );

    const card = screen.getAllByTestId('results-card');
    const mockResultName = screen.getByText('Siren Asylum');

    expect(card).toHaveLength(1);
    expect(mockResultName).toBeInTheDocument();
});

test('given 2 results are returned, only the first result card is displayed', () => {
    const mockTwoResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 2,
            name: 'AYC Studios',
            phone_number: '07507797220',
            email_address: 'aerialyogicircus@gmail.com',
            location: {
                address: 'Unit 10B, Robins Business Park, Bagnall St, West Bromwich',
                post_code: 'DY4 7BS',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.aycstudios.co.uk',
                instagram: 'www.instagram.com/aycstudios',
                facebook: 'www.facebook.com/AYcircus'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1buuviZMRgDmN93Pabxt4ortY0ZaP_bvycJ3BRSV6kh4kkiZxXyvOB89rs2hXy7yxLcTVL49SGdZtwsqNNN2KBsoi9APGDRLjd1uVtACoCtth66YkHSL2JRRIIZIU4cfF1HNjw3EdiDQHdVrLC2Ar96M6qnpksy_L0b0RD3TzRWxsruf1Hs3uBh6Im_7vEcSBAmoABJotnJs6AgUHWqOG7aG9XfBWbXMbtMMg2BUlpMfavjty00zLImHWmH6bvBSDqQaiqjHufj0rAaEmHtzGZegtxADm_IWAVeDQuRovV2uB7w6aFwYHmIx4sfBf3hhC5WTeVnSz4mIdJU31u0pJJEE-1mJAckha6HYGq3NzLb-rTGxAcKxvW8OfFTfiEZ2E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockTwoResults} />
        </Router>
    );

    const card = screen.getAllByTestId('results-card');
    const mockResultName = screen.getByText('Siren Asylum');

    expect(card).toHaveLength(1);
    expect(mockResultName).toBeInTheDocument();
});

test('given 3 or more results are returned, only 3 result cards are displayed of the first 2 results and the last result', () => {
    const mockFiveResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 2,
            name: 'AYC Studios',
            phone_number: '07507797220',
            email_address: 'aerialyogicircus@gmail.com',
            location: {
                address: 'Unit 10B, Robins Business Park, Bagnall St, West Bromwich',
                post_code: 'DY4 7BS',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.aycstudios.co.uk',
                instagram: 'www.instagram.com/aycstudios',
                facebook: 'www.facebook.com/AYcircus'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1buuviZMRgDmN93Pabxt4ortY0ZaP_bvycJ3BRSV6kh4kkiZxXyvOB89rs2hXy7yxLcTVL49SGdZtwsqNNN2KBsoi9APGDRLjd1uVtACoCtth66YkHSL2JRRIIZIU4cfF1HNjw3EdiDQHdVrLC2Ar96M6qnpksy_L0b0RD3TzRWxsruf1Hs3uBh6Im_7vEcSBAmoABJotnJs6AgUHWqOG7aG9XfBWbXMbtMMg2BUlpMfavjty00zLImHWmH6bvBSDqQaiqjHufj0rAaEmHtzGZegtxADm_IWAVeDQuRovV2uB7w6aFwYHmIx4sfBf3hhC5WTeVnSz4mIdJU31u0pJJEE-1mJAckha6HYGq3NzLb-rTGxAcKxvW8OfFTfiEZ2E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 3,
            name: 'Body Synergy',
            phone_number: '07507797220',
            email_address: 'bodysynergymanagement@gmail.com',
            location: {
                address: 'One Fitness Academy, 509 Aldrige Road, Great Barr',
                post_code: 'B44 8NA',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.bodysynergy.co.uk/',
                instagram: 'www.instagram.com/bodysynergypole',
                facebook: 'www.facebook.com/poledancebirmingham'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1an6XBAzu7q3W4ptvZ7n-N3uGo9tHZB8M3811PLJ-SO8MseQj5rVZrsiiNUPGLjBisA3_nW4I_3IMJgyJOy-9wD78olC6UTQenAXVM6nxB9jhfP317JMjUdqAoYijfgoEQ2Q14LJUIqzNA7NxndyWV5-KGOcH52ONdkSnKs2dHvqEYbBIU9l5Sn7KUFxTt-yohdRfwYpip__j51Xia4yL2Y6v3W5G_sWrYQQl73VpVIQelV1W7Mka3UbQQM406a4rMxv2WhSfGMWz5mIPQx-lWfGUIJN_NVkA0gevisp-onryc8wvGLLq94T-3BxB2lGMGhQRwmMIYuuCmrpL_lqWI5VKG0EDVr8kPscGspdCsQbeHVZ9igo8gGx0LUCBTv-E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance']
        },
        {
            id: 5,
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance', 'Pole Fitness']
        }
    ];

    render(
        <Router>
            <Results results={mockFiveResults} />
        </Router>
    );

    const card = screen.getAllByTestId('results-card');
    const mockResultOne = screen.getByText('K Pole Cradely Heath');
    const mockResultTwo = screen.getByText('Siren Asylum');
    const mockResultThree = screen.getByText('AYC Studios');
    const mockResultsArr = [mockResultOne, mockResultTwo, mockResultThree];

    expect(card).toHaveLength(3);

    mockResultsArr.forEach((result) => {
        expect(result).toBeInTheDocument();
    });
});

test('given there are more than 3 results and the next arrow button is clicked, the last result will be removed from view and the 4th result will become visible', async () => {
    const mockFiveResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 2,
            name: 'AYC Studios',
            phone_number: '07507797220',
            email_address: 'aerialyogicircus@gmail.com',
            location: {
                address: 'Unit 10B, Robins Business Park, Bagnall St, West Bromwich',
                post_code: 'DY4 7BS',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.aycstudios.co.uk',
                instagram: 'www.instagram.com/aycstudios',
                facebook: 'www.facebook.com/AYcircus'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1buuviZMRgDmN93Pabxt4ortY0ZaP_bvycJ3BRSV6kh4kkiZxXyvOB89rs2hXy7yxLcTVL49SGdZtwsqNNN2KBsoi9APGDRLjd1uVtACoCtth66YkHSL2JRRIIZIU4cfF1HNjw3EdiDQHdVrLC2Ar96M6qnpksy_L0b0RD3TzRWxsruf1Hs3uBh6Im_7vEcSBAmoABJotnJs6AgUHWqOG7aG9XfBWbXMbtMMg2BUlpMfavjty00zLImHWmH6bvBSDqQaiqjHufj0rAaEmHtzGZegtxADm_IWAVeDQuRovV2uB7w6aFwYHmIx4sfBf3hhC5WTeVnSz4mIdJU31u0pJJEE-1mJAckha6HYGq3NzLb-rTGxAcKxvW8OfFTfiEZ2E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 3,
            name: 'Body Synergy',
            phone_number: '07507797220',
            email_address: 'bodysynergymanagement@gmail.com',
            location: {
                address: 'One Fitness Academy, 509 Aldrige Road, Great Barr',
                post_code: 'B44 8NA',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.bodysynergy.co.uk/',
                instagram: 'www.instagram.com/bodysynergypole',
                facebook: 'www.facebook.com/poledancebirmingham'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1an6XBAzu7q3W4ptvZ7n-N3uGo9tHZB8M3811PLJ-SO8MseQj5rVZrsiiNUPGLjBisA3_nW4I_3IMJgyJOy-9wD78olC6UTQenAXVM6nxB9jhfP317JMjUdqAoYijfgoEQ2Q14LJUIqzNA7NxndyWV5-KGOcH52ONdkSnKs2dHvqEYbBIU9l5Sn7KUFxTt-yohdRfwYpip__j51Xia4yL2Y6v3W5G_sWrYQQl73VpVIQelV1W7Mka3UbQQM406a4rMxv2WhSfGMWz5mIPQx-lWfGUIJN_NVkA0gevisp-onryc8wvGLLq94T-3BxB2lGMGhQRwmMIYuuCmrpL_lqWI5VKG0EDVr8kPscGspdCsQbeHVZ9igo8gGx0LUCBTv-E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance']
        },
        {
            id: 5,
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance', 'Pole Fitness']
        }
    ];

    render(
        <Router>
            <Results results={mockFiveResults} />
        </Router>
    );

    const mockResultOne = screen.getByText('K Pole Cradely Heath');
    const mockResultTwo = screen.getByText('Siren Asylum');
    const mockResultThree = screen.getByText('AYC Studios');
    const mockResultsArr = [mockResultOne, mockResultTwo, mockResultThree];

    mockResultsArr.forEach((result) => {
        expect(result).toBeInTheDocument();
    });

    const nextArrowButton = screen.getByTestId('next-arrow');
    await userEvent.click(nextArrowButton);

    const newMockResultOne = screen.getByText('Siren Asylum');
    const newMockResultTwo = screen.getByText('AYC Studios');
    const newMockResultThree = screen.getByText('Body Synergy');
    const newMockResultsArr = [newMockResultOne, newMockResultTwo, newMockResultThree];

    newMockResultsArr.forEach((result) => {
        expect(result).toBeInTheDocument();
    });
});

test('given there are more than 3 results and the previous arrow button is clicked, the 2nd result will be removed from view and the 2nd to last result will become visible', async () => {
    const mockFiveResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 2,
            name: 'AYC Studios',
            phone_number: '07507797220',
            email_address: 'aerialyogicircus@gmail.com',
            location: {
                address: 'Unit 10B, Robins Business Park, Bagnall St, West Bromwich',
                post_code: 'DY4 7BS',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.aycstudios.co.uk',
                instagram: 'www.instagram.com/aycstudios',
                facebook: 'www.facebook.com/AYcircus'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1buuviZMRgDmN93Pabxt4ortY0ZaP_bvycJ3BRSV6kh4kkiZxXyvOB89rs2hXy7yxLcTVL49SGdZtwsqNNN2KBsoi9APGDRLjd1uVtACoCtth66YkHSL2JRRIIZIU4cfF1HNjw3EdiDQHdVrLC2Ar96M6qnpksy_L0b0RD3TzRWxsruf1Hs3uBh6Im_7vEcSBAmoABJotnJs6AgUHWqOG7aG9XfBWbXMbtMMg2BUlpMfavjty00zLImHWmH6bvBSDqQaiqjHufj0rAaEmHtzGZegtxADm_IWAVeDQuRovV2uB7w6aFwYHmIx4sfBf3hhC5WTeVnSz4mIdJU31u0pJJEE-1mJAckha6HYGq3NzLb-rTGxAcKxvW8OfFTfiEZ2E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        },
        {
            id: 3,
            name: 'Body Synergy',
            phone_number: '07507797220',
            email_address: 'bodysynergymanagement@gmail.com',
            location: {
                address: 'One Fitness Academy, 509 Aldrige Road, Great Barr',
                post_code: 'B44 8NA',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.bodysynergy.co.uk/',
                instagram: 'www.instagram.com/bodysynergypole',
                facebook: 'www.facebook.com/poledancebirmingham'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB1an6XBAzu7q3W4ptvZ7n-N3uGo9tHZB8M3811PLJ-SO8MseQj5rVZrsiiNUPGLjBisA3_nW4I_3IMJgyJOy-9wD78olC6UTQenAXVM6nxB9jhfP317JMjUdqAoYijfgoEQ2Q14LJUIqzNA7NxndyWV5-KGOcH52ONdkSnKs2dHvqEYbBIU9l5Sn7KUFxTt-yohdRfwYpip__j51Xia4yL2Y6v3W5G_sWrYQQl73VpVIQelV1W7Mka3UbQQM406a4rMxv2WhSfGMWz5mIPQx-lWfGUIJN_NVkA0gevisp-onryc8wvGLLq94T-3BxB2lGMGhQRwmMIYuuCmrpL_lqWI5VKG0EDVr8kPscGspdCsQbeHVZ9igo8gGx0LUCBTv-E/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance']
        },
        {
            id: 5,
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
                facebook: 'www.facebook.com/KpoleShirley'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB2ZwA9GdXF0hLKW8gU07OCogkpMOpG8wmRsYUPsit5bs0MzM8HNO7DShuOhJe3YL_C5jjIY5CihlD6yWJ34P7eQNRvMn-FBjZ0ZCyVJyCBjlOfhvhzzPLk2Wp2rkAGOlpw373ysjU-rHJRuI-29pkWd9o3_KW60rseaABGYm86N2GO4ocoHlGNGo9UY0-kNvBgoa8TzOQTbmvwGYVdsEsXjXDRxn6sRTsvdKAzyZvscPq47EZZLln8fhehHG6IJyI99oBJUtxKtQNIvM1g6yUvLiKqz-gtuzN0w3kvTnvSMbX5jUv06PM8QQpwRu9HUDhRrYAwnG6tSUm3JN5W3DufxEk44hPdVc3A6KVh53MnSe_NkhqqpsarXESRzUDpfbqM/p.png',
            services: ['Pole Dance', 'Pole Fitness']
        }
    ];

    render(
        <Router>
            <Results results={mockFiveResults} />
        </Router>
    );

    const mockResultOne = screen.getByText('K Pole Cradely Heath');
    const mockResultTwo = screen.getByText('Siren Asylum');
    const mockResultThree = screen.getByText('AYC Studios');
    const mockResultsArr = [mockResultOne, mockResultTwo, mockResultThree];

    mockResultsArr.forEach((result) => {
        expect(result).toBeInTheDocument();
    });

    const prevArrowButton = screen.getByTestId('prev-arrow');
    await userEvent.click(prevArrowButton);

    const newMockResultOne = screen.getByText('K Pole Solihull');
    const newMockResultTwo = screen.getByText('K Pole Cradely Heath');
    const newMockResultThree = screen.getByText('Siren Asylum');
    const newMockResultsArr = [newMockResultOne, newMockResultTwo, newMockResultThree];

    newMockResultsArr.forEach((result) => {
        expect(result).toBeInTheDocument();
    });
});

test('given the card name is clicked, it should navigate to the studio website', async () => {
    const mockResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockResults} />
        </Router>
    );

    const studioName = screen.getByRole('heading', { level: 3 });

    await userEvent.click(studioName);

    expect(studioName.closest('a')).toHaveAttribute('href', 'www.sirenasylum.co.uk');
});

test('given the card website link clicked, it should navigate to the studio website', async () => {
    const mockResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockResults} />
        </Router>
    );

    const studioWebsiteLink = screen.getByText('www.sirenasylum.co.uk');

    await userEvent.click(studioWebsiteLink);

    expect(studioWebsiteLink.closest('a')).toHaveAttribute('href', 'www.sirenasylum.co.uk');
});

test('given the card facebook link clicked, it should navigate to the studio facebook page', async () => {
    const mockResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockResults} />
        </Router>
    );

    const facebookLink = screen.getByTestId('facebook');

    await userEvent.click(facebookLink);

    expect(facebookLink.closest('a')).toHaveAttribute('href', 'www.facebook.com/sirenasylum');
});

test('given the card instagram link clicked, it should navigate to the studio insatgram page', async () => {
    const mockResults: Studio[] = [
        {
            id: 1,
            name: 'Siren Asylum',
            phone_number: '07784967677',
            email_address: 'info@sirenasylum.com',
            location: {
                address: '24 Missouri Ave',
                post_code: 'M50 2NP',
                city: 'Birmingham',
                region: 'West Midlands',
                country: 'England'
            },
            social_links: {
                website: 'www.sirenasylum.co.uk',
                instagram: 'www.instagram.com/sirenasylumfitness',
                facebook: 'www.facebook.com/sirenasylum'
            },
            logo: 'https://previews.dropbox.com/p/thumb/AB0f-LuJKBrA5Gj9gjfCqUYhpQWAAXeuxVzS1zxw1fHL1kMv7It2SI-CWnZnJxGmOO42BAOiNF5sDIjl-lj3aAdnW8CLE23rVYHAlnkRvsJTxBPaiBPN8D7Y3DDg3XwuG3Ya0aCeZABU-rBGdUwJj9vXKQR0pSPcydevvJZjuDDLVa0byIFSqUuOGHzWIo2hXjuLD47IDpMI3GPFefKgwRiKo8J5b_Bo40AxfcveGQHjRkcZSFxbGUv3AjqhTtj4ikM23j3CGaTIKpKLQ6j1JaRRLfsWEIVo03fUX_pug2k26Q79dT63wFRQs0en35pvOQzPg6MSYZX2GIOg6bVEPJ5gKmT_YUSwxu6uKLpC8pXNzZIgJ1uOeEKYFYk-p0-DUTg/p.png',
            services: ['Aerial Hoop', 'Aerial Silks', 'Contemporary Dance']
        }
    ];

    render(
        <Router>
            <Results results={mockResults} />
        </Router>
    );

    const instagramLink = screen.getByTestId('instagram');

    await userEvent.click(instagramLink);

    expect(instagramLink.closest('a')).toHaveAttribute('href', 'www.instagram.com/sirenasylumfitness');
});
