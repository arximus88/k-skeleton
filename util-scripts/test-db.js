import { connect, getDb } from '../src/db.js';

async function testDb() {
  // Connect to the database
  await connect();

  // Get the database and collection
  const db = getDb();
  const collection = db.collection('site_data');

  // Insert a test document
  const testDoc = {
    key: 'test_key',
    value: 'test_value',
  };
  const result = await collection.insertOne(testDoc);
  console.log('Inserted test document with _id:', result.insertedId);

  // Query the test document
  const foundDoc = await collection.findOne({ key: 'test_key' });
  console.log('Found test document:', foundDoc);

  // Clean up - delete the test document
  await collection.deleteOne({ _id: result.insertedId });
  console.log('Deleted test document');
}

testDb().catch(console.error);
