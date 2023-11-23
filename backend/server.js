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

MongoClient.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then((client) => {
		const db = client.db();

		// Studios
		const studioCollection = db.collection('studios');
		const studioRouter = newRouterOne(studioCollection);

		app.use('/studios', studioRouter);

		// Users
		const usersCollection = db.collection('users');
		const usersRouter = newRouterTwo(usersCollection);

		app.use('/users', usersRouter);
	})
	.catch('Error connecting to db:', console.err);

app.listen(3000, function () {
	console.log(`Listening on this port: ${this.address().port}`);
});
