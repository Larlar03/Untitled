const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

const studioRouter = function (collection) {
	const router = express.Router();

	const errorCatcher = function (error) {
		console.error('Error fetching data:', error);
		res.status(500).send('Error fetching data:', error);
	};

	// CREATE
	router.post('/', (req, res) => {
		let newStudio = req.body;
		const studioLogoFilePath = newStudio.logo;

		// read the image file
		const logoData = fs.readFileSync(studioLogoFilePath);
		// convert image data to a Buffer object to store in mongoDB
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

	// READ all
	router.get('/', (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => res.json(docs))
			.catch((err) => errorCatcher(err));
	});

	// READ by location
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

	// READ by location and services
	router.get('/:location/services', (req, res) => {
		const location = req.params.location;
		const services = req.query.services;
		let serviceData;

		const query = (serviceData) => {
			collection
				.find({
					$and: [
						{
							$or: [
								{ 'location.region': location },
								{ 'location.city': location },
							],
						},
						{ services: serviceData },
					],
				})
				.toArray()
				.then((docs) => res.json(docs))
				.catch((err) => errorCatcher(err));
		};

		if (Array.isArray(services)) {
			serviceData = { $in: services };
			query(serviceData);
		} else {
			serviceData = services;
			query(serviceData);
		}
	});

	return router;
};

module.exports = studioRouter;
