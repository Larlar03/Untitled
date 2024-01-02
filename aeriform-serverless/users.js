const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
} = require('@aws-sdk/lib-dynamodb');
const express = require('express');
const serverless = require('serverless-http');
const { hashPassword } = require('./utils/bcrypt-passwords.js');

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

// get all
app.get('/users', async function (req, res) {
	const params = {
		TableName: USERS_TABLE,
	};

	try {
		const { Items } = await dynamoDbClient.send(new GetCommand(params));
		if (Items) {
			console.log(Items);
		} else {
			res.status(404).json({ error: 'Could not find any users"' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not retreive any users' });
	}
});

//  get by id - login
app.get('/users/:userId', async function (req, res) {
	const params = {
		TableName: USERS_TABLE,
		Key: {
			userId: req.params.userId,
		},
	};

	try {
		const { Item } = await dynamoDbClient.send(new GetCommand(params));
		if (Item) {
			const { userId, name } = Item;
			res.json({ userId, name });
		} else {
			res
				.status(404)
				.json({ error: 'Could not find user with provided "userId"' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not retreive user' });
	}
});

// create user
app.post('/users', async function (req, res) {
	const { email, username, password } = req.body;
	if (typeof email !== 'string') {
		res.status(400).json({ error: '"email" must be a string' });
	} else if (typeof username !== 'string') {
		res.status(400).json({ error: '"username" must be a string' });
	} else if (typeof password !== 'string') {
		res.status(400).json({ error: '"password" must be a string' });
	}

	try {
		const hashedPassword = await hashPassword(password);

		const params = {
			TableName: USERS_TABLE,
			Item: {
				email: email,
				username: username,
				password: hashedPassword,
			},
		};

		await dynamoDbClient.send(new PutCommand(params));
		res.json({ email, username, hashedPassword });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not create user' });
	}
});

//  update

// delete

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports.handler = serverless(app);
