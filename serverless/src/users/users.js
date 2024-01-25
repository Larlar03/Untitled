const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	DynamoDBDocumentClient,
	PutCommand,
	DeleteCommand,
	UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

const {
	hashPassword,
	comparePasswords,
} = require('./utils/bcrypt-passwords.js');
const queryTableForUser = require('./utils/query-users-table.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const USERS_TABLE = process.env.USERS_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

// login
app.post('/users/login', async function (req, res) {
	const userEmail = req.body.email;
	const providedPassword = req.body.password;

	try {
		const User = await queryTableForUser(userEmail);

		if (User) {
			const { email, username, password } = User;
			const result = await comparePasswords(providedPassword, password);
			res.status(200).json({ email, username, result });
		} else {
			res.status(404).json({ error: 'Could not retreive user.' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making login request' });
	}
});

// create user
app.post('/users', async function (req, res) {
	const { email, username, password } = req.body;

	if (
		typeof email !== 'string' ||
		typeof username !== 'string' ||
		typeof password !== 'string'
	) {
		res.status(400).json({ error: 'Values must be strings' });
	}

	try {
		const User = await queryTableForUser(email);

		if (User) {
			res
				.status(403)
				.json({ message: 'Account with this email already exists' });
		} else {
			const hashedPassword = await hashPassword(password);

			const params = {
				TableName: USERS_TABLE,
				Item: {
					email: email,
					username: username,
					password: hashedPassword,
				},
			};

			await client.send(new PutCommand(params));
			res.status(201).json({ message: 'Account created' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making request' });
	}
});

//  update password
app.put('/users/:userEmail', async function (req, res) {
	const email = req.params.userEmail;
	const { oldPassword, newPassword } = req.body;

	try {
		const Item = await queryTableForUser(email);

		if (Item) {
			const { password } = Item;
			const result = await comparePasswords(oldPassword, password);

			if (result === true) {
				const hashedPassword = await hashPassword(newPassword);

				const params = {
					TableName: USERS_TABLE,
					Key: {
						email: email,
					},
					UpdateExpression: 'set password = :password',
					ExpressionAttributeValues: {
						':password': hashedPassword,
					},
					ReturnValues: 'ALL_NEW',
				};

				await client.send(new UpdateCommand(params));
				res.status(204);
			} else {
				res.status(404).json({ error: 'Incorrect password' });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making request' });
	}
});

// delete user
app.delete('/users/:userEmail', async function (req, res) {
	const params = {
		TableName: USERS_TABLE,
		Key: {
			email: req.params.userEmail,
		},
	};

	try {
		await client.send(new DeleteCommand(params));
		res.status(204);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not delete user' });
	}
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports.handler = serverless(app);
