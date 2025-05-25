import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { getProjects } from "./notion.js";

const projects = await getProjects();
const filePath = path.join(".", "src", "lib", "projects-table.json");
const backupFilePath = path.join(".", "src", "lib", "projects-table.json.bkp");
try {
  // Rename the existing file to a backup file, if it exists
  await fs.promises.access(filePath);
  await fs.promises.rename(filePath, backupFilePath);
  console.log(`Existing file ${filePath} renamed to ${backupFilePath}`);
} catch (err) {
  if (err.code !== "ENOENT") {
    console.error(`Error renaming existing file ${filePath}:`, err);
  }
}
await writeFile(filePath, JSON.stringify(projects, null, 2));
console.log(`New projects saved to file ${filePath}!`);

export default projects