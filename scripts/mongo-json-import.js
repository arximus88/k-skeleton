import { connect, getDb, client } from '../src/db.js';
import projects from '../src/lib/projects-table.json' assert { type: 'json' };

async function importData() {
	await connect();
	const db = getDb();
	const collection = db.collection('site_data');
	await collection.insertMany(projects);
	console.log('Data imported successfully!');
	await client.close(); // Close the connection
}

importData().catch(console.error);
