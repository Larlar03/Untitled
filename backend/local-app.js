const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// router
const newRouterOne = require('./routers/studios');
const newRouterTwo = require('./routers/users');

const uri = 'mongodb://localhost:27017/aeriform';

const connectToMongoDb = async () => {
	try {
		return await MongoClient.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.error('Error connecting to db: ', error);
	}
};

const setupRouters = async (client) => {
	try {
		const db = await client.db();

		// Studios
		const studioCollection = db.collection('studios');
		const studioRouter = newRouterOne(studioCollection);

		// Users
		const usersCollection = db.collection('users');
		const usersRouter = newRouterTwo(usersCollection);

		app.use('/studios', studioRouter);
		app.use('/users', usersRouter);
	} catch (error) {
		console.error('Error setting up routers: ', error);
	}
};

const main = async () => {
	const mongoDbClient = await connectToMongoDb();
	await setupRouters(mongoDbClient);

	app.listen(3000, function () {
		console.log(`Listening on this port: ${this.address().port}`);
	});
};

main();
