const placeholderImageData = require('./placeholder-image-data');

/** Extracts logo image data string to store in table
 *  POST
 * 	1. Checks if logo was uploaded
 * 	2. Splits logo string to the necessary data or returns data string for a placeholder logo
 *
 * 	PUT
 * 	1. Checks if a new logo was uploaded
 * 	2. Splits new logo or returns null (no new logo uploaded)
 */
const extractLogoData = (logo, method) => {
	let data;

	if (method === 'post') {
		data = logo.length > 0 ? logo.split(',')[1] : placeholderImageData;
	} else if (method === 'put') {
		const logoString = logo.slice(0, 5);
		data = logoString === 'data:' ? (data = logo.split(',')[1]) : (data = null);
	}

	return data;
};

module.exports = extractLogoData;
