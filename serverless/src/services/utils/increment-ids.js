const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
	ScanCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb');

const SERVICES_TABLE = process.env.SERVICES_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

/** Creates an incremented id for a new service.
 * 	1. Returns all table items and gets the length
 * 	2. Increment the length by 1 to create the new id.
 */
const incrementIds = async () => {
	try {
		// Scan table
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
