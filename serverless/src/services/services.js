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

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const SERVICES_TABLE = process.env.SERVICES_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

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
			res.status(404).json({ error: 'Studio not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
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
		res.status(204).json({ message: 'User ' + params.Key._id + ' updated' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
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
		res.status(204).json({ message: 'User ' + params.Key._id + ' deleted' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Could not delete user' });
	}
});

// POST new service
app.post('/services', async function (req, res) {
	let newService = req.body.service;

	try {
		// Get number of items in table
		const { Items } = await client.send(
			new ScanCommand({
				TableName: SERVICES_TABLE,
			})
		);
		if (Items) {
			const count = Items.length + 1;
			await client.send(
				new PutCommand({
					TableName: SERVICES_TABLE,
					Item: { _id: count, service: newService },
				})
			);
			res.status(201).send({ message: 'New service added' });
		} else {
			res.status(404).json({ error: 'Error adding new service' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error fetching data' });
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
			res.status(200).json(Items);
		} else {
			res.status(404).json({ error: 'No services found' });
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
