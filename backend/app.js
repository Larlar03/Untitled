const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const client = new MongoClient(process.env.MONGODB_URI);

// Routers
const newRouterOne = require('./routers/studios');
const newRouterTwo = require('./routers/users');

const run = async () => {
	try {
		const db = client.db('aeriform');

		// Studios
		const studioCollection = db.collection('studios');
		const studioRouter = newRouterOne(studioCollection);
		app.use('/studios', studioRouter);

		// Users
		const usersCollection = db.collection('users');
		const usersRouter = newRouterTwo(usersCollection);
		app.use('/users', usersRouter);
	} catch (error) {
		console.error('Error connecting to db : ', error);
	}

	app.listen(3000, function () {
		console.log(`Listening on this port: ${this.address().port}`);
	});
};

run().catch(console.dir);
