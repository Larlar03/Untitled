const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Middleware to parse JSON body
app.use(express.json());

// routers
const studioRouter = require('./routers/studios');

// connect to mongoDB
MongoClient.connect(process.env.MONGODB_URI)
	.then((client) => {
		const db = client.db('aeriform');
		const studioCollection = db.collection('studios');
		const studios = studioRouter(studioCollection); // Feed in collection to the router

		app.use('/studios', studios); // Defining the base route where we can access data
	})
	.catch(console.err);

app.listen(3000, function () {
	console.log(`Listening on port: ${this.address().port}`);
});
