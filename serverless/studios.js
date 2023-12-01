const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
	return res.status(200).json({
		message: 'Hello from studios!',
	});
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports = { app, router: serverless(app) };
