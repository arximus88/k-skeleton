import { Client } from '@notionhq/client';
import { loadEnv } from 'vite';
let env = loadEnv('mock', process.cwd(), '');
if (!env.NOTION_SECRET) throw Error('NOTION_SECRET not found in .env');

const notion = new Client({ auth: env.NOTION_SECRET });

// (async () => {
// 	const blockId = 'a6102d9c612f417eb206c43148964054';
// 	const response = await notion.blocks.children.list({
// 		block_id: blockId
// 	});
// 	const paragraphs = response.results.filter((block) => block.type === 'paragraph');
// 	const texts = paragraphs.reduce((acc, block) => {
// 		if (block.paragraph && block.paragraph.text) {
// 			acc.push(block.paragraph.text.map((text) => text.text).join(''));
// 		}
// 		return acc;
// 	}, []);

// 	//   console.log(texts);
// 	console.log(response);
// })();

async function getProjects() {
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

	function serializeBlockChildren(children) {
		let array_of_blocks = [];

		class Block {
			constructor(type, content) {
				this.type = type;
				this.content = content;
			}
		}

		let html = '';
		if (children && children.forEach)
			children.forEach((child) => {
				switch (child.type) {
					case 'paragraph':
						array_of_blocks.push(new Block('paragraph', getText(child.paragraph.rich_text)));
						break;

					case 'quote':
						array_of_blocks.push(new Block('quote', getText(child.quote.rich_text)));
						break;

					case 'code':
                        if (child.code.language === "json") {
                            try {
                               let slider =  JSON.parse(child.code.rich_text[0].plain_text);
                                array_of_blocks.push(new Block('slider', slider));
                            } catch (error) {
                                console.log(`Error parse json slider`)
                            }
                        }
						break;

					default:
						console.log(`Unknown block type ${child.type}`);
				}
			});

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
					block.results && block.results.length > 0 ? serializeBlockChildren(block.results) : ''
			};
			// console.log(r)
			console.log(page.id);
			console.log(page.url);
			return r;
		})
	);

	// console.log(projects)

	return projects;
}

(async () => {
	// const blockId = 'a6102d9c612f417eb206c43148964054';
	// const response = await notion.blocks.children.list({ block_id: blockId });

	// const codeBlocks = response.results.filter((block) => block.type === 'code');
	// const paragraphBlocks = response.results.filter((block) => block.type === 'paragraph');
	// const quoteBlocks = response.results.filter((block) => block.type === 'quote');

	// console.log('Code blocks:', codeBlocks);
	// console.log('Paragraph blocks:', paragraphBlocks);
	// console.log('Quote blocks:', quoteBlocks);

	getProjects();
})();
