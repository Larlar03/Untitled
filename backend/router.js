const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

// This function will hold all the routing functionality for the database, and will be used in server.js
const newRouter = function (collection) {
	const router = express.Router();

	// Function for catching errors, this is to keep the code DRY
	const errorCatcher = function (error) {
		console.error(error);
		res.status(500);
		res.json({ status: 500, error: error });
	};

	// create new studio
	router.post('/', (req, res) => {
		let newStudio = req.body;
		const studioLogoFilePath = newStudio.logo;

		// Read the image file
		const logoData = fs.readFileSync(studioLogoFilePath);
		// Convert image data to a Buffer object to store in mongoDB
		const logoBuffer = Buffer.from(logoData);

		newStudio.logo = logoBuffer;

		collection
			.insertOne(newStudio)
			.then(() => {
				console.log('New studio stored successfully.');
				res.status(200).send('New studio stored successfully.');
			})
			.catch((error) => {
				console.error('Error storing image:', error);
				res.status(500).send('Error storing image.');
			});
	});

	// get all studios
	router.get('/', (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => res.json(docs))
			.catch((err) => errorCatcher(err));
	});

	// get studio by location
	router.get('/locations/:location', (req, res) => {
		const location = req.params.location;
		collection
			.find({
				$or: [
					{
						'location.region': location,
					},
					{
						'location.city': location,
					},
				],
			})
			.toArray()
			.then((doc) => res.json(doc))
			.catch((err) => errorCatcher(err));
	});

	// get all studios in location with services
	router.get('/:location/services', (req, res) => {
		const location = req.params.location;
		const services = req.query.services;
		if (Array.isArray(services)) {
			collection
				.find({
					$and: [
						{
							$or: [
								{ 'location.region': 'Birmingham' },
								{ 'location.city': 'Birmingham' },
							],
						},
						{ services: { $in: services } },
					],
				})
				.toArray()
				.then((docs) => res.json(docs))
				.catch((err) => errorCatcher(err));
		} else {
			collection
				.find({
					$and: [
						{
							$or: [
								{ 'location.region': location },
								{ 'location.city': location },
							],
						},
						{ services: services },
					],
				})
				.toArray()
				.then((docs) => res.json(docs))
				.catch((err) => errorCatcher(err));
		}
	});

	return router;
};

module.exports = newRouter;
