/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			spacing: {
				529: "33rem",
			},
			height: {
				670: "41.8rem",
			},
			fontFamily: {
				spacemono: ['"Space Mono"', "monospace"],
				spacegrotesk: ['"Space Grotesk"', "sans-serif"],
			},
		},
	},
	plugins: [],
};
