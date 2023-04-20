import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let isConnected = false;

async function connect() {
	if (!isConnected) {
		await client.connect();
		isConnected = true;
	}
}

function getDb() {
	return client.db('kharchenko_work'); // You can provide your database name as an argument, for example: client.db('yourDbName');
}

export { connect, getDb, client };
