const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const placeholderImageData = require('./utils/placeholder-image-data');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	DeleteCommand,
	UpdateCommand,
	ScanCommand,
} = require('@aws-sdk/lib-dynamodb');
const extractLogoData = require('./utils/extract-logo-data');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const STUDIOS_TABLE = process.env.STUDIOS_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

// POST new studio
app.post('/studios', async function (req, res) {
	let newStudio = req.body;
	newStudio._id = uuidv4();

	newStudio.logo = extractLogoData(newStudio.logo, 'post');

	const params = {
		TableName: STUDIOS_TABLE,
		Item: newStudio,
	};

	try {
		const response = await client.send(new PutCommand(params));
		if (response) {
			console.log(response);
			res.status(201).send({ message: 'New studio created' });
		} else {
			res.status(404).json({ error: 'Could not create studio' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

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
		const { Items } = await client.send(new ScanCommand(params));
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
		res.status(500).json({ error: 'Error fetching data' });
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
		const { Items } = await client.send(new ScanCommand(params));
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
		res.status(500).json({ error: 'Error fetching data' });
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
		const { Items } = await client.send(new ScanCommand(params));
		if (Items) {
			res.status(200).json(Items);
		} else {
			res.status(404).json({ error: 'Studios in this location not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
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
		const { $metadata } = await client.send(new DeleteCommand(params));
		if ($metadata.httpStatusCode === 200) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: 'Studio not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

// UPDATE by id
app.put('/studios/:id', async function (req, res) {
	const studioId = req.params.id;
	let updatedStudio = req.body;

	// If new logo is uploaded
	const logo = updatedStudio.logo;
	console.log('LOGO', logo);
	const logoData = extractLogoData(logo);
	logoData && updatedStudio.logo;
	console.log('LOGO DATA', logoData);

	const params = {
		TableName: STUDIOS_TABLE,
		Key: {
			_id: studioId,
		},
		UpdateExpression:
			'SET #name = :name, #email_address = :email_address, #location = :location, #social_links = :social_links, #logo = :logo, #services = :services',
		ExpressionAttributeValues: {
			':name': updatedStudio.name,
			':email_address': updatedStudio.email_address,
			':location': updatedStudio.location,
			':social_links': updatedStudio.social_links,
			':logo': updatedStudio.logo,
			':services': updatedStudio.services,
		},
		ExpressionAttributeNames: {
			'#name': 'name',
			'#email_address': 'email_address',
			'#location': 'location',
			'#social_links': 'social_links',
			'#logo': 'logo',
			'#services': 'services',
		},
		ReturnValues: 'ALL_NEW',
	};

	try {
		// Find studio in db
		const { Item } = await client.send(
			new GetCommand({
				TableName: STUDIOS_TABLE,
				Key: {
					_id: studioId,
				},
			})
		);

		if (Item) {
			// Update studio in db
			const { $metadata } = await client.send(new UpdateCommand(params));
			$metadata.httpStatusCode === 200
				? res.status(204).send({ message: 'Studio updated' })
				: res.status(404).json({ error: 'Could not update studio' });
		} else {
			res.status(404).json({ error: 'Could not find studio to update' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
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
		const { Item } = await client.send(new GetCommand(params));
		if (Item) {
			res.status(200).json(Item);
		} else {
			res.status(404).json({ error: 'Studio not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

// GET all
app.get('/studios', async function (req, res) {
	const params = {
		TableName: STUDIOS_TABLE,
	};

	try {
		const { Items } = await client.send(new ScanCommand(params));
		if (Items) {
			res.status(200).json(Items);
		} else {
			res.status(404).json({ error: 'No studios found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports.handler = serverless(app);
