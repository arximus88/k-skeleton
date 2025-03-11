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