const placeholderImageData = require('./placeholder-image-data');

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
