const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

const studioRouter = function (collection) {
    const router = express.Router();

    const errorCatcher = function (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data:', error);
    };

    // READ all
    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch((err) => errorCatcher(err));
    });

    // READ by location
    router.get('/locations/:location', (req, res) => {
        const location = req.params.location;
        collection
            .find({
                $or: [
                    {
                        'location.region': location,
                    },
                    {
                        'location.city': location,
                    },
                ],
            })
            .toArray()
            .then((doc) => res.json(doc))
            .catch((error) => errorCatcher(error));
    });

    // READ by location and services
    router.get('/:location/services', (req, res) => {
        const location = req.params.location;
        const services = req.query.services;
        let serviceData;

        const query = (serviceData) => {
            collection
                .find({
                    $and: [
                        {
                            $or: [
                                { 'location.region': location },
                                { 'location.city': location },
                            ],
                        },
                        { services: serviceData },
                    ],
                })
                .toArray()
                .then((docs) => res.json(docs))
                .catch((error) => errorCatcher(error));
        };

        if (Array.isArray(services)) {
            serviceData = { $in: services };
            query(serviceData);
        } else {
            serviceData = services;
            query(serviceData);
        }
    });

    // CREATE
    router.post('/', (req, res) => {
        let newStudio = req.body.newStudio;
        const nsLogo = newStudio.logo;

        // console.log('!!!!!FILE PATH!!!!!!!', studioLogoFilePath);
        // // read the image file
        // const logoData = fs.readFileSync(studioLogoFilePath);
        // console.log('!!!!!LOGO DATA!!!!!!!', logoData);
        // // convert image data to a Buffer object to store in mongoDB
        console.log('!!!!!FILE DATA!!!!!!!', nsLogo);
        const logoBuffer = Buffer.from(nsLogo.split(',')[1], 'base64');
        console.log('!!!!!LOGO BUFFER!!!!!!!', logoBuffer);

        newStudio.logo = logoBuffer;

        collection
            .insertOne(newStudio)
            .then(() => {
                console.log('New studio stored successfully.');
                res.status(200).send('New studio stored successfully.');
            })
            .catch((error) => {
                console.error('Error storing image:', error);
                res.status(500).send('Error storing image.');
            });
    });

    // GET by id
    // router.get('/:id', (req, res) => {
    // 	const id = req.params.id;
    // 	collection
    // 		.findOne({ _id: ObjectID(id) })
    // 		.then((doc) => res.json(doc))
    // 		.catch((err) => errorCatcher(err));
    // });

    // DELETE by id
    // router.delete('/:id', (req, res) => {
    // 		const id = req.params.id;
    // 		collection
    // 			.deleteOne({ _id: ObjectID(id) })
    // 			.then(() => collection.find().toArray())
    // 			.then((docs) => res.json(docs))
    // 			.catch((error) => errorCatcher(error));
    // 	});

    // UPDATE by id
    // router.put('/:id', (req, res) => {
    // 	const itemId = req.params.id;
    // 	const updatedItem = req.body;

    // 	collection
    // 		.findOneAndUpdate({ _id: ObjectID(itemId) }, { $set: updatedItem })
    // 		.then((result) => {
    // 			res.json(result.value);
    // 		})
    // 		.catch((error) => errorCatcher(error));
    // });

    return router;
};

module.exports = studioRouter;
