const express = require('express');
const {
	hashPassword,
	comparePasswords,
} = require('../helpers/bcrypt-passwords.js');

const usersRouter = function (collection) {
	const router = express.Router();

	const errorCatcher = function (status, error) {
		console.error('Error fetching data:', error);
		res.status(status).send('Error fetching data:', error);
	};

	// GET all
	router.get('/', (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => res.json(docs))
			.catch((error) => errorCatcher(404, error));
	});

	// CREATE user
	router.post('/', (req, res) => {
		const newUser = req.body;
		const userPassword = req.body.password;

		hashPassword(userPassword)
			.then((hashedPassword) => {
				newUser.password = hashedPassword;
			})
			.then(() => {
				collection
					.insertOne(newUser)
					.then(() => {
						res.status(201).send('Created.');
					})
					.catch((error) => errorCatcher(500, error));
			})
			.catch((err) => {
				console.error('Error creating new user: ', err);
			});
	});

	// UPDATE user password
	router.put('/:username', async (req, res) => {
		const username = req.params.username;
		const newPassword = req.body.newPassword;
		let updatedUser;

		hashPassword(newPassword)
			.then((hashedNewPassword) => {
				updatedUser = {
					username: username,
					password: hashedNewPassword,
				};
			})
			.then(() => {
				collection
					.findOneAndUpdate({ username: username }, { $set: updatedUser })
					.then(() => res.status(204).send('User password updated.'))
					.catch((error) => errorCatcher(500, error));
			})
			.catch((err) => {
				console.error('Error updating user: ', err);
			});
	});

	// DELETE user
	router.delete('/:username', (req, res) => {
		const username = req.params.username;

		collection
			.deleteOne({ username: username })
			.then(() => res.status(204).send('User deleted.'))
			.catch((error) => errorCatcher(500, error));
	});

	// LOGIN
	router.post('/login', async (req, res) => {
		const username = req.body.username;
		const providedPassword = req.body.password;

		collection
			.findOne({ username: username })
			.then(async (user) => {
				const result = await comparePasswords(providedPassword, user.password);
				if (result === true) {
					res.status(200).json({ message: 'Access granted' });
				} else {
					res.status(401).json({ error: 'Access denied' });
				}
			})
			.catch((err) => errorCatcher(500, err));
	});

	return router;
};

module.exports = usersRouter;
