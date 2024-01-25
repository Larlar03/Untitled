const placeholderImageData = require('./placeholder-image-data');

const extractLogoData = (logo, method) => {
	let result;

	if (method === 'post') {
		if (logo.length > 0) {
			result = logo.split(',')[1];
		} else {
			result = placeholderImageData;
		}
	} else if (method === 'put') {
		const logoString = logo.slice(0, 5);

		if (logoString === 'data:') {
			result = logo.split(',')[1];
		} else {
			result = null;
		}
	}

	return result;
};

module.exports = extractLogoData;
