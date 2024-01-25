const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const STUDIOS_TABLE = process.env.STUDIOS_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

const queryTableForStudio = async (id) => {
	const params = {
		TableName: STUDIOS_TABLE,
		Key: {
			_id: id,
		},
	};

	try {
		const { Item } = await client.send(new GetCommand(params));
		if (Item) {
			return Item;
		}
	} catch (error) {
		console.log({ 'Error fetching studio': error });
	}
};

module.exports = queryTableForStudio;
