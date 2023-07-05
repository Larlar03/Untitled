const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());

// add Morgan to log HTTP requests
app.use(morgan('dev'));
// Middleware to parse JSON body
app.use(express.json());

// router
const newRouter = require('./router.js');

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) // This is the location of where your local database is living.
	.then((client) => {
		const db = client.db(); // The name of the DB
		const studioCollection = db.collection('studios'); // The name of the collection inside the DB
		const studioRouter = newRouter(studioCollection); // Feed in collection to the router

		app.use('/studios', studioRouter); // Defining the base route where we can later access our data
	})
	.catch(console.err);

app.listen(3000, function () {
	console.log(`Listening on port: ${this.address().port}`);
});
