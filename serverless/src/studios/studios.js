const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	DeleteCommand,
	UpdateCommand,
	ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const STUDIOS_TABLE = process.env.STUDIOS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// GET by location and services
app.get('/studios/:location/services', async function (req, res) {
	const locationQuery = req.params.location;
	const servicesQuery = req.query.services;
	const serviceArray = Array.isArray(servicesQuery)
		? servicesQuery
		: [servicesQuery];

	const params = {
		TableName: STUDIOS_TABLE,
		// Query condition
		FilterExpression:
			'#studioLocation.#city = :query OR #studioLocation.#region = :query',
		// Query value
		ExpressionAttributeValues: {
			':query': locationQuery,
		},
		// Table keys
		ExpressionAttributeNames: {
			'#studioLocation': 'location',
			'#city': 'city',
			'#region': 'region',
		},
	};

	try {
		const { Items } = await dynamoDbClient.send(new ScanCommand(params));
		if (Items) {
			const results = Items.filter((studio) => {
				return serviceArray.some((service) =>
					studio.services.includes(service)
				);
			});
			res.status(200).json(results);
		} else {
			res.status(404).json({
				error: 'Studios in this location with these sevices not found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching studios' });
	}
});

//  GET by services
app.get('/studios/services', async function (req, res) {
	const serviceQuery = req.query.services;
	const serviceArray = Array.isArray(serviceQuery)
		? serviceQuery
		: [serviceQuery];

	const params = {
		TableName: STUDIOS_TABLE,
	};

	try {
		const { Items } = await dynamoDbClient.send(new ScanCommand(params));
		if (Items) {
			const results = Items.filter((studio) => {
				return serviceArray.some((service) =>
					studio.services.includes(service)
				);
			});
			res.status(200).json(results);
		} else {
			res.status(404).json({ error: 'Studios with these services not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching studios' });
	}
});

//  GET by location
app.get('/studios/location/:location', async function (req, res) {
	const locationQuery = req.params.location;

	const params = {
		TableName: STUDIOS_TABLE,
		// Query condition
		FilterExpression:
			'#studioLocation.#city = :query OR #studioLocation.#region = :query',
		// Query value
		ExpressionAttributeValues: {
			':query': locationQuery,
		},
		// Table keys
		ExpressionAttributeNames: {
			'#studioLocation': 'location',
			'#city': 'city',
			'#region': 'region',
		},
	};

	try {
		const { Items } = await dynamoDbClient.send(new ScanCommand(params));
		if (Items) {
			res.status(200).json(Items);
		} else {
			res.status(404).json({ error: 'Studios in this location not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching studios' });
	}
});

// GET by id
app.get('/studios/:id', async function (req, res) {
	const studioId = req.params.id;

	const params = {
		TableName: STUDIOS_TABLE,
		Key: {
			_id: studioId,
		},
	};

	try {
		const { Item } = await dynamoDbClient.send(new GetCommand(params));
		if (Item) {
			res.status(200).json(Item);
		} else {
			res.status(404).json({ error: 'Studio not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching studio' });
	}
});

// GET all
app.get('/studios', async function (req, res) {
	const params = {
		TableName: STUDIOS_TABLE,
	};

	try {
		const { Items } = await dynamoDbClient.send(new ScanCommand(params));
		if (Items) {
			res.status(200).json(Items);
		} else {
			res.status(404).json({ error: 'No studios found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not retreive studios' });
	}
});

// DELETE by id
app.delete('/studios/:id', async function (req, res) {
	const studioId = req.params.id;

	const params = {
		TableName: STUDIOS_TABLE,
		Key: {
			_id: studioId,
		},
	};

	try {
		const { $metadata } = await dynamoDbClient.send(new DeleteCommand(params));
		if ($metadata.httpStatusCode === 200) {
			res.status(204);
		} else {
			res.status(404).json({ error: 'No studios found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not retreive studios' });
	}
});

// POST new studio

// UPDATE by id

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports.handler = serverless(app);
