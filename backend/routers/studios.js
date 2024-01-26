const express = require('express');
const { ObjectId } = require('mongodb');
const fs = require('fs');

const studioRouter = function (collection) {
	const router = express.Router();

	const errorCatcher = function (status, error) {
		console.error('Error fetching data:', error);
		res.status(status).send('Error fetching data:', error);
	};

	// GET all
	router.get('/', (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => res.json(docs))
			.catch((error) => errorCatcher(500, error));
	});

	// GET by location
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
			.catch((error) => errorCatcher(500, error));
	});

	// GET by location and services
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
				.catch((error) => errorCatcher(500, error));
		};

		if (Array.isArray(services)) {
			serviceData = { $in: services };
			query(serviceData);
		} else {
			serviceData = services;
			query(serviceData);
		}
	});

	// GET by id
	router.get('/:id', (req, res) => {
		const id = req.params.id;
		const objectId = new ObjectId(id);

		collection
			.findOne({ _id: objectId })
			.then((doc) => res.json(doc))
			.catch((err) => errorCatcher(500, err));
	});

	// POST new studio
	router.post('/', (req, res) => {
		let isSentFromFrontend = req.body.isFrontend;
		let newStudio = req.body.newStudio;

		const newStudioLogo = newStudio.logo;

		if (isSentFromFrontend) {
			// Decode base64 image data and store it as a Buffer object
			const logoBuffer = Buffer.from(newStudioLogo.split(',')[1], 'base64');
			newStudio.logo = logoBuffer;
		} else {
			// Sent from postman
			// Read contents of file in file path and store it as a Buffer object
			const logoData = fs.readFileSync(newStudioLogo);
			const logoBuffer = Buffer.from(logoData);
			newStudio.logo = logoBuffer;
		}

		collection
			.insertOne(newStudio)
			.then(() => {
				res.status(201).send('New studio created.');
			})
			.catch((error) => errorCatcher(500, error));
	});

	// DELETE by id
	router.delete('/:id', (req, res) => {
		const id = req.params.id;
		const objectId = new ObjectId(id);

		collection
			.deleteOne({ _id: objectId })
			.then(() => res.status(204).send('Studio deleted.'))
			.catch((error) => errorCatcher(500, error));
	});

	// UPDATE by id
	router.put('/:id', (req, res) => {
		const studioId = req.params.id;
		let updatedStudio = req.body.studio;

		const objectId = new ObjectId(studioId);

		// Determine if studio image has been updated
		const updatedStudioLogo = updatedStudio.logo;
		const imageString = updatedStudioLogo.slice(0, 5);

		if (imageString === 'data:') {
			// Decode base64 image data and store it as a Buffer object
			const logoBuffer = Buffer.from(updatedStudioLogo.split(',')[1], 'base64');
			updatedStudio.logo = logoBuffer;
		}

		collection
			.findOneAndUpdate({ _id: objectId }, { $set: updatedStudio })
			.then(() => res.status(204).send('Studio updated.'))
			.catch((error) => errorCatcher(500, error));
	});

	return router;
};

module.exports = studioRouter;
