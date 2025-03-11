import { json } from '@sveltejs/kit';
import type { Project } from '$lib/types';

import { NOCODB_URL, NOCODB_API_KEY } from '$env/static/private';

async function getProjects() {
	try {
		const baseUrl = NOCODB_URL;
		const apiToken = NOCODB_API_KEY;
		const tableId = 'mok8y9m47n2m0pm';

		if (!baseUrl || !apiToken) {
			throw new Error('NOCODB_URL та NOCODB_API_KEY мають бути встановлені в .env файлі');
		}

		const apiUrl = `${baseUrl}/api/v2/tables/${tableId}/records`;
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'xc-token': apiToken,
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP помилка! статус: ${response.status}`);
		}

		const data = await response.json();

		// Фільтруємо проекти, щоб не показувати проекти з live === "disabled"
		return {
			list: data.list.filter((project: Project) => project.live !== 'disabled')
		};
	} catch (error) {
		console.error('Помилка при отриманні даних з NocoDB:', error);
		return { list: [] };
	}
}

export async function GET() {
	const projects = await getProjects();
	return json(projects);
}
