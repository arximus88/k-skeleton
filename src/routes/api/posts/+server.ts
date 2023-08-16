import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'

async function getPosts() {
	const posts: Post[] = []

	// const paths = import.meta.glob('/personal/projects/*.md', { eager: true })
    const paths = import.meta.glob('/personal/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')
        
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			!post.disabled && posts.push(post)
		}
	}

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}