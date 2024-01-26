const bcrypt = require('bcryptjs');
const saltRounds = 10;

/** Encrypts password to store in table */
const hashPassword = async (password) => {
	try {
		const hashedPassword = bcrypt.hashSync(password, saltRounds);

		return hashedPassword;
	} catch (err) {
		console.error('Error hashing password: ', err);
		throw err;
	}
};

/** Compares string password with encrypted password
 * 	1. Returns "true" if password match
 * 	2. Returns "false" if passwords don't match
 */
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
