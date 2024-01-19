const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hashPassword = async (password) => {
	try {
		const hashedPassword = bcrypt.hashSync(password, saltRounds);

		return hashedPassword;
	} catch (err) {
		console.error('Error hashing password: ', err);
		throw err;
	}
};

const comparePasswords = async (providedPassword, storedHashedPassword) => {
	try {
		const result = bcrypt.compareSync(providedPassword, storedHashedPassword);

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
