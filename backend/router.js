const express = require('express');
const ObjectID = require('mongodb').ObjectID;

// This function will hold all the routing functionality for the database, and will be used in server.js
const newRouter = function (collection) {
	const router = express.Router();

	// Function for catching errors, this is to keep the code DRY
	const errorCatcher = function (inputError) {
		console.error(inputError);
		res.status(500);
		res.json({ status: 500, error: inputError });
	};

	// Route for getting all studios
	router.get('/', (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => res.json(docs))
			.catch((err) => errorCatcher(err));
	});

	// Route for getting specific studio
	router.get('/:id', (req, res) => {
		const id = req.params.id;
		collection
			.findOne({ _id: ObjectID(id) })
			.then((doc) => res.json(doc))
			.catch((err) => errorCatcher(err));
	});

	return router;
};

module.exports = newRouter;
