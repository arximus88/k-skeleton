import { Client } from '@notionhq/client';
import { writeFile } from 'fs/promises';
import { loadEnv } from 'vite';
import fs from 'fs'; // Node.js file system module
import path from 'path'; // Node.js path module
import { waitForDebugger } from 'inspector';
let env = loadEnv('mock', process.cwd(), '');

// console.log(env.NOTION_SECRET)

// Get the projects from Notion and transform the data
export async function getProjects() {
	const notion = new Client({ auth: env.NOTION_SECRET });
	if (!env.NOTION_SECRET) throw Error('NOTION_SECRET not found in .env');

	// const database = await getDatabase('509b5015095349bdb37e231ecc5df787');
	const response = await notion.databases.query({
		database_id: '509b5015095349bdb37e231ecc5df787'
	});

	function getText(children) {
		let html = '';
		if (children && children.forEach)
			children.forEach((child) => {
				if (child.type === 'text') {
					if (child.annotations.bold) html += `<strong>${child.text.content}</strong>`;
					else if (child.annotations.italic) html += `<em>${child.text.content}</em>`;
					else if (child.annotations.strikethrough) html += `<del>${child.text.content}</del>`;
					else if (child.annotations.underline) html += `<u>${child.text.content}</u>`;
					else if (child.annotations.code) html += `<code>${child.text.content}</code>`;
					else if (child.text.link)
						html += `<a href="${child.text.link.url}">${child.text.content}</a>`;
					else html += child.text.content;
				}
			});

		return html;
	}

	async function serializeBlockChildren(children) {
		let array_of_blocks = [];

		class Block {
			constructor(type, content) {
				this.type = type;
				this.content = content;
			}
		}

		let html = '';
		if (children && children.forEach)
			for (const child of children) {
				switch (child.type) {
					case 'paragraph':
						array_of_blocks.push(new Block('paragraph', getText(child.paragraph.rich_text)));
						break;

					case 'quote':
						array_of_blocks.push(new Block('quote', getText(child.quote.rich_text)));
						break;
					case 'divider':
						array_of_blocks.push(new Block('divider', ''));
						break;
					case 'code':
						if (child.code.language === 'json') {
							try {
								let slider = JSON.parse(child.code.rich_text[0].plain_text);
								if (slider && slider.from && slider.to)
									array_of_blocks.push(new Block('slider', slider));
							} catch (error) {
								console.log(`Error parse json slider`);
							}
						}
						break;

          case 'column':
            let items = await notion.blocks.children.list({ block_id: child.id });
            let column_items = await serializeBlockChildren(items.results);
            array_of_blocks.push(new Block('column', column_items));
						break;

					case 'column_list':
						let columns = await notion.blocks.children.list({ block_id: child.id });
						let columns_items = await serializeBlockChildren(columns.results);
						array_of_blocks.push(new Block('column_list', columns_items));
						break;

					case 'image':
						array_of_blocks.push(new Block('image', child.image.file.url));
						break;

					case 'heading_3':
						array_of_blocks.push(new Block('heading_3', getText(child.heading_3.rich_text)));
						break;

					case 'bulleted_list_item':
						array_of_blocks.push(
							new Block('bulleted_list_item', getText(child.bulleted_list_item.rich_text))
						);
						break;

					// add
					// Block type image
					// Block type column_list
					// Block type divider
					// Block type heading_3
					// Block type bulleted_list_item

					default:
						console.log(`Unknown block type ${child.type}`);
				}
			}

		return array_of_blocks;
	}

	const projects = await Promise.all(
		response.results.map(async (page) => {
			let block = await notion.blocks.children.list({ block_id: page.id });

			let r = {
				id: page.id,
				url: page.url,
				title: page.properties['project-name'].title[0]?.text.content || '',
				clientName: page.properties['client-name']?.rich_text?.[0]?.text.content || '',
				clientUrl: page.properties['client-url'].url || '',
				projectUrl: page.properties['project-url'].url || '',
				androidUrl: page.properties['android-url'].url || '',
				iosUrl: page.properties['ios-url'].url || '',
				year: page.properties.year.number || '',
				description: page.properties.description.rich_text[0]?.text.content || '',
				order: page.properties.order.number || '',
				folder: page.properties.folder.rich_text[0]?.text.content || '',
				tags: page.properties.tags.multi_select.map((tag) => tag.name) || [],
				platforms: page.properties.platforms.multi_select.map((platform) => platform.name) || [],
				visible: page.properties.visible.checkbox || false,
				disabled: page.properties.disabled.checkbox || false,
				blocks: block.results,
				content:
					block.results && block.results.length > 0
						? await serializeBlockChildren(block.results)
						: ''
			};

			if (r.folder == 'visit-fallon') {
				console.log(block);
			}
			// console.log(r)
			console.log(page.id);
			console.log(page.url);

			return r;
		})
	);

	// console.log(projects)

	return projects.reverse();
}
