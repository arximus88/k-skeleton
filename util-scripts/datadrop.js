import { connect, getDb, client } from '../src/db.js';

async function cleanupAndCreate() {
	await connect();

	//   myfirstmongodb
	//   sample_airbnb
	//   sample_analytics
	//   sample_geospatial
	//   sample_guides
	//   sample_mflix
	//   sample_restaurants
	//   sample_supplies
	//   sample_training
	//   sample_weatherdata
	//   test

	// Drop the test database
	await client.db('test').dropDatabase();

	// Drop the 'myfirstmongodb' database
	await client.db('myfirstmongodb').dropDatabase();
	await client.db('sample_airbnb').dropDatabase();
	await client.db('sample_analytics').dropDatabase();
	await client.db('sample_geospatial').dropDatabase();
	await client.db('sample_guides').dropDatabase();
	await client.db('sample_mflix').dropDatabase();
	await client.db('sample_restaurants').dropDatabase();
	await client.db('sample_supplies').dropDatabase();
	await client.db('sample_training').dropDatabase();
	await client.db('sample_weatherdata').dropDatabase();

	console.log('Databases and collections cleaned up, new database and collection created.');
	await client.close();
}

cleanupAndCreate().catch(console.error);
