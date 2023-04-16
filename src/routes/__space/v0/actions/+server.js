import { json } from '@sveltejs/kit';
import { notion_deta } from '$lib/scripts/notion-deta.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { event } = await request.json();

	if (event && event.id === 'notion_sync') return await json(notion_deta());

	return json(event);
}

export async function GET({ request }) {
	return await json(notion_deta());
}
