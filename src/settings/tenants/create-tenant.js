// const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


const TABLE_NAME = process.env.TENANTS_TABLE

AWS.config.update({
    region: "us-east-1",
});

exports.lambdaHandler = async (event) => {
    const tenant = event.queryStringParameters.name;

    const date = new Date();

    const item = {
        id: AWS.util.uuid.v4(),
        tenant: tenant,
        date: date.toLocaleDateString()
    }

    const existItem = await existsItem(tenant);

    // const savedItem = await saveItem(item);

    return {
        statusCode: 200,
        // body: JSON.stringify(savedItem),
        body: JSON.stringify(existItem),
      }
}

async function existsItem(tenant) {
    const params = {
		TableName: TABLE_NAME,
		Key: {
            tenant: {S: tenant}
        }
	};

    return ddb.getItem(params).promise().then(() => {
        return !data.Item;
    });
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


    // TODO: Crear en people dev-transport-[tenant]
};