const fs = require('fs');

const convertLogosToBinary = (studios) => {
	if (!studios | (studios.length === 0)) {
		throw Error('studios is empty or  undefined');
	}

	const updatedStudios = studios.map((studio) => {
		const logoData = fs.readFileSync(studio.logo);
		const logoBuffer = Buffer.from(logoData);

		studio.logo = logoBuffer;
		return studio;
	});

	console.log(`Coverted the logos of ${updatedStudios.length} studios`);
	return updatedStudios;
};

module.exports = convertLogosToBinary;
