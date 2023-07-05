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

// Import studio data
const studios = require('./mocks/mock_db/aeriform.studios.json');

// Import helpers
const convertLogosToBinary = require('./helpers/convert-logos');
const insertDataToDb = require('./helpers/insert-data');

// Import router
const studioRouter = require('./routers/studios');

const initialiseData = async (collection) => {
	try {
		const convertedStudios = await convertLogosToBinary(studios);
		const result = await insertDataToDb(collection, convertedStudios);
		console.log('Initialising db data');
	} catch (error) {
		console.error('Error inserting data:', error);
	}
};

MongoClient.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then((client) => {
		const db = client.db();
		const studioCollection = db.collection('studios');
		const studios = studioRouter(studioCollection);

		// Setting routes
		app.use('/studios', studios);

		// Inserting data in the mongo docker container db
		initialiseData(studioCollection);
	})
	.catch('Error conecting to db:', console.err);

app.listen(3000, function () {
	console.log(`Listening on port: ${this.address().port}`);
});
