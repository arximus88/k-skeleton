import { Deta } from 'deta';
import { getProjects } from '../../../scripts/notion.js';
import { loadEnv } from 'vite';

let env = loadEnv('mock', process.cwd(), '');

// Initialize with a Project Key
// locally, set the project key in an env var called DETA_PROJECT_KEY

export async function notion_deta() {
	// This how to connect to or create a database.
	const deta = Deta(env.DETA_PROJECT_KEY);
	const projects_db = deta.Base('projects');
	const projects_details_db = deta.Base('projects-details');

	const projects = await getProjects();

	if (projects && projects.forEach) {
		projects.forEach((project) => {
			projects_db.put({
				key: project.folder,
				id: project.id,
				folder: project.folder,
				title: project.title,
				description: project.description,
				clientName: project.clientName,
				tags: project.tags,
				year: project.year,
				disabled: project.disabled,
				visible: project.visible,
				order: project.order
			});

			projects_details_db.put({ key: project.folder, ...project });
		});
	}
}
