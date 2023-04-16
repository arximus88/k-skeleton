import { Client } from '@notionhq/client';
import fs from 'fs';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Page URL to fetch
const pageUrl = 'https://www.notion.so/Virtually-Human-Studio-7b20b0417c504be4b4e5b583d8af10e8';

// Retrieve the page ID from the URL
const pageId = pageUrl.split('-').join('').substring(0, 32);

// Retrieve the page content
const pageResponse = await notion.pages.retrieve({ page_id: pageId });

// Retrieve the text blocks from the page
const textBlocks = pageResponse.properties['Text'].rich_text;

// Serialize the text blocks to HTML
let html = '';
textBlocks.forEach((block) => {
  const text = block.text.content;
  const type = block.type;
  switch (type) {
    case 'text':
      html += `<p>${text}</p>`;
      break;
    case 'header':
      html += `<h1>${text}</h1>`;
      break;
    case 'sub_header':
      html += `<h2>${text}</h2>`;
      break;
    case 'sub_sub_header':
      html += `<h3>${text}</h3>`;
      break;
    case 'quote':
      html += `<blockquote>${text}</blockquote>`;
      break;
    case 'bulleted_list_item':
      html += `<li>${text}</li>`;
      break;
    case 'numbered_list_item':
      html += `<li>${text}</li>`;
      break;
    case 'to_do':
      html += `<input type="checkbox" ${block.checked ? 'checked' : ''}>${text}</input>`;
      break;
    default:
      html += `<p>${text}</p>`;
      break;
  }
});

// Save the HTML to a file
fs.writeFileSync('page.html', html);
