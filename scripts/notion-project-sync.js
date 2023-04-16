import { Client } from '@notionhq/client';
import {loadEnv} from 'vite'

let env = loadEnv(
    'mock',
    process.cwd(),
    ''
)

if (!env.NOTION_SECRET) throw Error("NOTION_SECRET not found in .env")

const notion = new Client({ auth: env.NOTION_SECRET });

// Fetch the subpage IDs for a given project page
async function getSubpageIdsForProject(pageId) {
  const response = await notion.databases.query({
    database_id: '509b5015095349bdb37e231ecc5df787',
    filter: {
      property: 'parent',
      page: { id: pageId }
    },
    sorts: [
      {
        property: 'created_time',
        direction: 'descending'
      }
    ]
  });

  const subpageIds = response.results.map((subpage) => subpage.id);
  return subpageIds;
}

// Fetch the subpage IDs for all project pages in the database
async function getSubpageIdsForAllProjects() {
    const projectDatabaseId = await getDatabaseIdForTitle("Projects");
    const response = await notion.databases.query({
      database_id: projectDatabaseId,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });
    const projectPages = response.results;
    const subpageIds = await Promise.all(
      projectPages.map((page) => getSubpageIdsForProject(page.id))
    );
    console.log(subpageIds); // print out the subpageIds for all projects
    return subpageIds.flat();
  }
  

// Run the script and log the subpage IDs for each project to the console
(async function() {
  const projectSubpageIds = await getSubpageIdsForAllProjects();
  console.log(projectSubpageIds);
})();

