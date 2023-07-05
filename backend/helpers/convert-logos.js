const fs = require('fs');

const convertLogosToBinary = (studios) => {
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
