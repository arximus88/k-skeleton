import { Client } from '@notionhq/client';
import { loadEnv } from 'vite';

let env = loadEnv('mock', process.cwd(), '');

const notion = new Client({ auth: env.NOTION_SECRET });

async function main() {
    try {
        console.log('Fetching database from Notion...');
        const databaseId = '509b5015095349bdb37e231ecc5df787';
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log('Database retrieved successfully:', response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();