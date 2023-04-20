import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$lib/vars';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        const db = client.db('kharchenko_work'); // Specify the correct database name
        const projectsCollection = db.collection('site_data'); // Specify the correct collection name

        const start = new Date().getTime();
        const projects = await projectsCollection.find().toArray();
        const end = new Date().getTime();
        console.log('MongoDB Fetch Time:', end - start, 'ms');

        const serializableProjects = projects.map((project) => {
            return {
                ...project,
                _id: project._id.toString() // Convert ObjectId to string
            };
        });

        return {
            data: {
                items: serializableProjects
            }
        };
    } catch (error) {
        console.error('Error in load function:', error);
        throw error;
    } finally {
        await client.close();
    }
}
