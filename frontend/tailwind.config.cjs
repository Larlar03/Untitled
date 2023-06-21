/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            spacing: {
                529: '33rem'
            },
            height: {
                670: '41.8rem'
            },
            fontFamily: {
                spacemono: ['"Space Mono"', 'monospace'],
                spacegrotesk: ['"Space Grotesk"', 'sans-serif']
            },
            colors: {
                main: {
                    100: '#241E92',
                    200: '#5432D3',
                    300: '#7B6CF6',
                    400: '#C6A3FF'
                },
                greyscale: {
                    100: '#1A1A1A',
                    200: '#3B3B3B',
                    300: '#A1A1A1',
                    400: '#EEEEEE',
                    500: '#F8F7F6'
                }
            }
        }
    },
    plugins: []
};
