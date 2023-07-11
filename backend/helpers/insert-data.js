const insertDataToDb = (collection, data) => {
	if (!collection) {
		throw Error('collection is undefined');
	}

	if (!data | (data.length === 0)) {
		throw Error('data is empty or  undefined');
	}

	collection.insertMany(data);
	console.log(`Inserted ${data.length} documents`);
};

module.exports = insertDataToDb;
