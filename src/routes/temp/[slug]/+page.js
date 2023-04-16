import { error } from '@sveltejs/kit';
import { projects } from '$lib/projectsData.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug) {
		const project = projects.find((p) => p.folder === params.slug);
		console.log(project);
		if (project) return project;
	}

	throw error(404, 'Not found');
}
