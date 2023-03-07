// express
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const mockSalons = require("./mock-databases/mock-salon-db.json");
const mockStudios = require("./mock-databases/mock-studio-db.json");

//  defining the express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// Port
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
	res.send("Care DB");
});

// Get all salons
app.get("/studios", (req, res) => {
	res.send(mockStudios);
});

app.get("/studios/:city", (req, res) => {
	const city = req.params.city;
	const studios = mockStudios.filter((s) => {
		return s.location.city === city;
	});
	res.send(studios);
});
