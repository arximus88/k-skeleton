import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface ContentBlock {
    type: string;
    content: any;
}

/** 
 * Парсить контент проекту з Markdown або JSON в масив блоків
 * @param {string} content - Контент проекту
 * @returns {Array<ContentBlock>} - Масив блоків
 */
function parseContent(content: string): Array<ContentBlock> {
	if (!content) return [];

	try {
		// Перевіряємо, чи є в контенті JSON блоки
		const jsonBlocks: Array<ContentBlock> = [];
		const jsonRegex = /```json\s*\n\s*(\{[\s\S]*?\})\s*\n\s*```/g;
		let jsonMatch;
		
		while ((jsonMatch = jsonRegex.exec(content)) !== null) {
			try {
				const jsonData = JSON.parse(jsonMatch[1]);
				if (jsonData.from && jsonData.to) {
					jsonBlocks.push({
						type: 'slider',
						content: jsonData
					});
				}
			} catch (e) {
				console.error('Error parsing JSON block:', e);
			}
		}

		// Розділяємо контент на параграфи
		const paragraphs = content
			.replace(/```json\s*\n\s*\{[\s\S]*?\}\s*\n\s*```/g, '') // Видаляємо JSON блоки
			.split('\n\n')
			.filter((p: string) => p.trim() !== '');

		const blocks: Array<ContentBlock> = [];

		paragraphs.forEach((paragraph: string) => {
			// Перевіряємо, чи це цитата
			if (paragraph.trim().startsWith('_&gt;') || paragraph.trim().startsWith('_>')) {
				blocks.push({
					type: 'quote',
					content: paragraph.replace(/^_&gt;|^_>/g, '').trim()
				});
			} 
			// Перевіряємо, чи це роздільник
			else if (paragraph.trim() === '<br>' || paragraph.trim() === '<hr>') {
				blocks.push({
					type: 'divider',
					content: ''
				});
			}
			// Звичайний параграф
			else {
				blocks.push({
					type: 'paragraph',
					content: paragraph.trim()
				});
			}
		});

		// Додаємо JSON блоки в правильні місця
		if (jsonBlocks.length > 0) {
			// Для простоти додаємо їх на початок
			return [...jsonBlocks, ...blocks];
		}

		return blocks;
	} catch (e) {
		console.error('Error parsing content:', e);
		return [{
			type: 'paragraph',
			content: content || ''
		}];
	}
}

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch('/api/projects'); // отримуємо всі проекти
		const data = await response.json();
		const project = data.list.find((p: any) => p.folder === params.slug); // знаходимо проект за його папкою

		if (!project) {
			throw error(404, `Проект "${params.slug}" не знайдено`);
		}

		// Парсимо контент проекту
		const parsedContent = parseContent(project.content);

		return {
			project: {
				...project,
				parsedContent
			}
		};
	} catch (e) {
		console.error('Error loading project:', e);
		throw error(500, 'Помилка завантаження проекту');
	}
} 