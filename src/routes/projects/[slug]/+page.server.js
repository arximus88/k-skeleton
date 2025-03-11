import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		// Змінюємо шлях з personal/projects на src/content/projects
		const post = await import(`../../../content/projects/${params.slug}.md`);
        
		console.log(post.metadata)
		return {
			// content: json(post.default),
			meta: post.metadata
		}
	} catch (e) {
		throw error(404, `Проект "${params.slug}" не знайдено`)
	}
}
