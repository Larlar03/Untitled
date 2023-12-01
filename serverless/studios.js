const serverless = require('serverless-http');
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Middleware to connect to MongoDB Atlas
app.use(async (req, res, next) => {
	const uri =
		'mongodb+srv://larlar03:8OO10cats@clusterm0.jmydhpw.mongodb.net/?retryWrites=true&w=majority';

	try {
		const client = new MongoClient(uri);
		await client.connect();
		console.log('Connected to MongoDB Atlas');
		req.dbClient = client; // Attach the MongoDB client to the request object
		next();
	} catch (error) {
		console.error('Error connecting to MongoDB Atlas', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Define your routes
app.get('/', async (req, res) => {
	try {
		const db = req.dbClient.db('aeriform');
		const collection = db.collection('studios'); // Replace with your collection name
		const result = await collection.find().toArray();
		console.log('results', collection);
		res.status(200).json(result);
	} catch (error) {
		console.error('Error querying MongoDB', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports = { app, router: serverless(app) };
