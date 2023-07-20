const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// router
const newRouter = require('./router.js');

MongoClient.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then((client) => {
		const db = client.db();
		const studioCollection = db.collection('studios');
		const studioRouter = newRouter(studioCollection);

		app.use('/studios', studioRouter);
	})
	.catch('Error conecting to db:', console.err);

app.listen(3000, function () {
	console.log(`Listening on this port: ${this.address().port}`);
});
