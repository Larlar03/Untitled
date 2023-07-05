const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
require('dotenv').config();
const studioData = require('./mock-databases/aeriform.studios.json');
const fs = require('fs');

const app = express();
app.use(cors());

// add Morgan to log HTTP requests
app.use(morgan('dev'));
// Middleware to parse JSON body
app.use(express.json());

// router
const newRouter = require('./router.js');

MongoClient.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then((client) => {
		console.log('Connected to MongoDB');
		const db = client.db(); // The name of the DB
		const studioCollection = db.collection('studios'); // The name of the collection inside the DB
		const studioRouter = newRouter(studioCollection); // Feed in collection to the router

		app.use('/studios', studioRouter); // Defining the base route where we can later access our data

		// Insert data to the DB
		const newData = studioData.map((studio) => {
			const logoData = fs.readFileSync(studio.logo);
			const logoBuffer = Buffer.from(logoData);

			studio.logo = logoBuffer;
			return studio;
		});

		studioCollection
			.insertMany(newData)
			.then((result) => {
				console.log('Document inserted:', result.ops[0]);
			})
			.catch((err) => {
				console.error('Error inserting document:', err);
			});
	})
	.catch(console.err);

app.listen(3000, function () {
	console.log(`Listening on port: ${this.address().port}`);
});
