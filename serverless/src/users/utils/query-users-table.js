const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const USERS_TABLE = process.env.USERS_TABLE;
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

const queryTableForUser = async (email) => {
	const params = {
		TableName: USERS_TABLE,
		Key: {
			email: email,
		},
	};

	try {
		const { Item } = await client.send(new GetCommand(params));
		if (Item) {
			return Item;
		}
	} catch (error) {
		console.log({ 'Error fetching user': error });
	}
};

module.exports = queryTableForUser;
