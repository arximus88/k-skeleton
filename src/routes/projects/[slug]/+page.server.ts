import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface ContentBlock {
    type: string;
    content: any;
}

/** 
 * Converts Markdown formatting to HTML
 * @param {string} text - Text with Markdown formatting
 * @returns {string} - HTML formatted text
 */
function convertMarkdownToHtml(text: string): string {
	let result = text
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold **text**
		.replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic *text*
		.replace(/^### (.*$)/gm, '<h3>$1</h3>') // Heading 3
		.replace(/^## (.*$)/gm, '<h2>$1</h2>') // Heading 2
		.replace(/^# (.*$)/gm, '<h1>$1</h1>'); // Heading 1
	
	// Handle bullet points - convert lines starting with "- " to list items
	if (result.includes('\n-   ') || result.startsWith('-   ')) {
		result = result.replace(/^-\s{3}(.*)$/gm, '<li>$1</li>');
		result = result.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
		result = result.replace(/<\/li>\s*<li>/g, '</li><li>');
	}
	
	return result;
}

/** 
 * Парсить контент проекту з Markdown або JSON в масив блоків
 * @param {string} content - Контент проекту
 * @returns {Array<ContentBlock>} - Масив блоків
 */
function parseContent(content: string): Array<ContentBlock> {
	if (!content) return [];

	try {
		// Розділяємо контент на частини, зберігаючи позиції JSON блоків
		const parts = content.split(/(?=```json|(?<=```\n\n))/);
		const blocks: Array<ContentBlock> = [];

		parts.forEach((part: string) => {
			part = part.trim();
			if (!part) return;

			// Перевіряємо, чи це JSON блок
			const jsonMatch = part.match(/```json\s*\n\s*(\{[\s\S]*?\})\s*\n\s*```/);
			if (jsonMatch) {
				try {
					const jsonData = JSON.parse(jsonMatch[1]);
					if (jsonData.from && jsonData.to) {
						blocks.push({
							type: 'slider',
							content: jsonData
						});
					}
				} catch (e) {
					console.error('Error parsing JSON block:', e);
				}
				
				// Обробляємо текст після JSON блоку, якщо він є
				const remainingText = part.replace(/```json\s*\n\s*\{[\s\S]*?\}\s*\n\s*```/, '').trim();
				if (remainingText) {
					parseTextContent(remainingText, blocks);
				}
			} else {
				// Обробляємо звичайний текстовий контент
				parseTextContent(part, blocks);
			}
		});

		return blocks;
	} catch (e) {
		console.error('Error parsing content:', e);
		return [{
			type: 'paragraph',
			content: content || ''
		}];
	}
}

/**
 * Парсить текстовий контент і додає його в масив блоків
 * @param {string} text - Текстовий контент
 * @param {Array<ContentBlock>} blocks - Масив блоків для додавання
 */
function parseTextContent(text: string, blocks: Array<ContentBlock>): void {
	const paragraphs = text.split('\n\n').filter((p: string) => p.trim() !== '');

	paragraphs.forEach((paragraph: string) => {
		paragraph = paragraph.trim();
		if (!paragraph) return;

		// Перевіряємо, чи це цитата
		if (paragraph.startsWith('&gt;') || paragraph.startsWith('>')) {
			blocks.push({
				type: 'quote',
				content: convertMarkdownToHtml(paragraph.replace(/^&gt;|^>/g, '').trim())
			});
		}
		// Перевіряємо, чи це заголовок
		else if (paragraph.match(/^#{1,3}\s+/)) {
			blocks.push({
				type: 'heading',
				content: convertMarkdownToHtml(paragraph)
			});
		}
		// Перевіряємо, чи це список
		else if (paragraph.includes('\n-   ') || paragraph.startsWith('-   ')) {
			blocks.push({
				type: 'list',
				content: convertMarkdownToHtml(paragraph)
			});
		} 
		// Перевіряємо, чи це роздільник
		else if (paragraph === '<br>' || paragraph === '<hr>') {
			blocks.push({
				type: 'divider',
				content: ''
			});
		}
		// Звичайний параграф
		else {
			blocks.push({
				type: 'paragraph',
				content: convertMarkdownToHtml(paragraph)
			});
		}
	});
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