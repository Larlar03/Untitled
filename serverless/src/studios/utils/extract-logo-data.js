const placeholderImageData = require('./placeholder-image-data');

const extractLogoData = (logo, method) => {
	let result;

	if (method === 'post') {
		result = logo.length > 0 ? logo.split(',')[1] : placeholderImageData;
	} else if (method === 'put') {
		const logoString = logo.slice(0, 5);
		result =
			logoString === 'data:' ? (result = logo.split(',')[1]) : (result = null);
	}

	return result;
};

module.exports = extractLogoData;
