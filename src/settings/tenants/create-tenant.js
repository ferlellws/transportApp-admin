// const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TENANTS_TABLE

exports.lambdaHandler = async (event) => {
    console.log(event);

    const name = event.queryStringParameters.name;

    const date = new Date();

    const item = {
        id: AWS.util.uuid.v4(),
        name: name,
        date: date.toLocaleDateString()
    }

    console.log(item);

    const savedItem = await saveItem(item);

    return {
        statusCode: 200,
        // body: JSON.stringify(item),
        body: JSON.stringify(savedItem),
      }
}

async function saveItem(item) {
    const params = {
		TableName: TABLE_NAME,
		Item: item
	};

    console.log(params)
    
    // return dynamo.put(params).promise().then(() => {
    //     return item;
    // });

    return dynamo.put(params).promise().then(() => {
        return item;
    });
};