const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	ScanCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb');

const SERVICES_TABLE = process.env.SERVICES_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

const incrementIds = async () => {
	try {
		// Get number of items in table
		const { Items } = await client.send(
			new ScanCommand({
				TableName: SERVICES_TABLE,
			})
		);
		if (Items) {
			// Increment id
			const count = Items.length + 1;
			return count;
		}
	} catch (error) {
		console.log({ 'Error fetching services': error });
	}
};

module.exports = incrementIds;
