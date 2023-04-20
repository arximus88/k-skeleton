// import { error } from '@sveltejs/kit';
// import { Deta } from 'deta';
// import { DETA_PROJECT_KEY } from '$lib/vars.js';

// /** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
// 	const deta = Deta(DETA_PROJECT_KEY);
// 	const projects_db = deta.Base('projects');

// 	const projects = await projects_db.fetch();
// 	if (projects) return projects;
// 	else throw error(502, 'Not found');
// }

import { error } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$lib/vars.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const client = new MongoClient(MONGODB_URI);
	let projects;

	try {
		// Connect to the MongoDB database
		await client.connect();

		// Get the 'projects' collection
		const projectsCollection = client.db('kharchenko_work').collection('site_data');

		// Fetch all projects
		projects = await projectsCollection.find().toArray();
	} catch (err) {
		throw error(502, 'Failed to fetch projects');
	} finally {
		// Close the connection
		await client.close();
	}

	if (projects) return { data: { items: projects } };
	else throw error(502, 'Not found');
}
