/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    important: true,
    theme: {
        extend: {
            fontFamily: {
                spacemono: ['"Space Mono"', 'monospace'],
                spacegrotesk: ['"Space Grotesk"', 'sans-serif']
            },
            colors: {
                main: {
                    'jacksons-purple': '#241E92',
                    'purple-heart': '#5432D3',
                    'cornflower-blue': '#7B6CF6',
                    mauve: '#C6A3FF'
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
