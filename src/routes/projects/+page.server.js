import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const response = await fetch('api/projects'); // отримуємо дані з API
		const projects = await response.json(); // парсимо дані в JSON
		return { projects }; // повертаємо дані в сторінку
	} catch (err) {
		console.error('Помилка:', err);
		throw error(500, 'Internal Server Error');
	}
}

// import { error } from '@sveltejs/kit';
// import { Deta } from 'deta';
// import { DETA_PROJECT_KEY } from '$lib/vars.js';

// /** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
// const deta = Deta(DETA_PROJECT_KEY);
// const projects_db = deta.Base('projects');

//     const start = new Date().getTime();
//     const projects = await projects_db.fetch();
//     const end = new Date().getTime();
//     console.log('test')
//     console.log('Deta DB Fetch Time:', end - start, 'ms');

// if (projects) return projects;
// else throw error(502, 'Not found');
// }
