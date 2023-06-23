const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// router
const newRouter = require('./router.js');

MongoClient.connect(process.env.MONGODB_URI) // This is the location of where your local database is living.
	.then((client) => {
		const db = client.db('aeriform'); // The name of the DB
		const studioCollection = db.collection('studios'); // The name of the collection inside the DB
		const studioRouter = newRouter(studioCollection); // We haven't built the router functionality yet, but we will next!

		app.use('/studios', studioRouter); // Defining the base route where we can later access our data
	})
	.catch(console.err);

app.listen(3000, function () {
	console.log(`Listening on this port: ${this.address().port}`);
});
