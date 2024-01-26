const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	DeleteCommand,
	UpdateCommand,
	ScanCommand,
} = require('@aws-sdk/lib-dynamodb');
const incrementIds = require('./utils/increment-ids');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const SERVICES_TABLE = process.env.SERVICES_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

// POST new service
app.post('/services', async function (req, res) {
	let newService = req.body.service;

	try {
		const newId = await incrementIds();

		const params = {
			TableName: SERVICES_TABLE,
			Item: { _id: newId, service: newService },
		};

		await client.send(new PutCommand(params));
		res.status(201).send({ message: 'New service added' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making POST request' });
	}
});

// UPDATE by id
app.put('/services/:id', async function (req, res) {
	const serviceId = Number(req.params.id);
	const { updatedService } = req.body;

	const params = {
		TableName: SERVICES_TABLE,
		Key: {
			_id: serviceId,
		},
		UpdateExpression: 'set service = :service',
		ExpressionAttributeValues: {
			':service': updatedService,
		},
		ReturnValues: 'ALL_NEW',
	};

	try {
		await client.send(new UpdateCommand(params));
		res.status(200);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making PUT request' });
	}
});

// DELETE by id
app.delete('/services/:id', async function (req, res) {
	const serviceId = Number(req.params.id);

	const params = {
		TableName: SERVICES_TABLE,
		Key: {
			_id: serviceId,
		},
	};

	try {
		await client.send(new DeleteCommand(params));
		res.status(204);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making DELETE request' });
	}
});

// GET by id
app.get('/services/:id', async function (req, res) {
	const serviceId = Number(req.params.id);

	const params = {
		TableName: SERVICES_TABLE,
		Key: {
			_id: serviceId,
		},
	};

	try {
		const { Item } = await client.send(new GetCommand(params));
		if (Item) {
			res.status(200).json(Item);
		} else {
			res.status(404).json({ error: 'Service not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making GET request' });
	}
});

// GET all
app.get('/services', async function (req, res) {
	const params = {
		TableName: SERVICES_TABLE,
	};

	try {
		const { Items } = await client.send(new ScanCommand(params));
		if (Items) {
			// Sort the services alphabetically alphabetically
			const sortedItems = Items.sort((a, b) => {
				const serviceA = a.service.toLowerCase();
				const serviceB = b.service.toLowerCase();
				return serviceA.localeCompare(serviceB);
			});
			res.status(200).json(sortedItems);
		} else {
			res.status(404).json({ error: 'No services found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error making GET request' });
	}
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports.handler = serverless(app);
