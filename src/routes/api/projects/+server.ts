import { json } from '@sveltejs/kit'
import type { Project } from '$lib/types'

async function getProjects() {
	const projects: Project[] = []

    const paths = import.meta.glob('/src/content/projects/*.md', { eager: true }) // отримуємо всі файли в папці projects

	for (const path in paths) {
		const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')
        console.log({meta: file.metadata})
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Project, 'slug'> // отримуємо метадані з файлу
			const project = { ...metadata, slug } satisfies Project // створюємо новий об'єкт проекту з метаданими та slug
			console.log(project)
			if (!project.disabled && project.visible) {
				projects.push(project) // додаємо проект до масиву, якщо він не відключений і видимий
			}
		}
	}

	return projects
}

export async function GET() {
	const projects = await getProjects()
	return json(projects) // повертаємо дані в JSON
}