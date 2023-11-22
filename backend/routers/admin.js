const express = require('express');
const { ObjectId } = require('mongodb');
const fs = require('fs');

const adminRouter = function (collection) {
	const router = express.Router();

	const errorCatcher = function (status, error) {
		console.error('Error fetching data:', error);
		res.status(status).send('Error fetching data:', error);
	};

	// GET all
	router.get('/', (req, res) => {
		let admin;
		collection
			.find()
			.toArray()
			.then((docs) => {
				admin = docs;
				console.log('admin', admin);
			})
			.catch((error) => errorCatcher(500, error));
	});

	// router.post('/', (req, res) => {
	// 	const password = 'bye';
	// 	const providedPassword = req.params.password;

	// 	collection
	// 		.findOne({ _id: objectId })
	// 		.then((doc) => res.json(doc))
	// 		.catch((err) => errorCatcher(err));
	// });

	// // GET by id
	// router.get('/:id', (req, res) => {
	// 	const id = req.params.id;
	// 	const objectId = new ObjectId(id);

	// 	collection
	// 		.findOne({ _id: objectId })
	// 		.then((doc) => res.json(doc))
	// 		.catch((err) => errorCatcher(err));
	// });

	return router;
};

module.exports = adminRouter;
