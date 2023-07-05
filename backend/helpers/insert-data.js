const insertDataToDb = (collection, data) => {
	collection.insertMany(data);
	console.log(`Inserted ${data.length} documents`);
};

module.exports = insertDataToDb;
