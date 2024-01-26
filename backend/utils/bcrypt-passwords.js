const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return hashedPassword;
	} catch (err) {
		console.error('Error hashing password: ', err);
		throw err;
	}
};

const comparePasswords = async (providedPassword, storedHashedPassword) => {
	try {
		const result = await bcrypt.compare(providedPassword, storedHashedPassword);

		if (result) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('Error comparing passwords: ', err);
		throw err;
	}
};

module.exports = { hashPassword, comparePasswords };
