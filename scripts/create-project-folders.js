const fs = require('fs');
const path = require('path');
const projects = require('./projects-table.json');

projects.forEach((project) => {
  const folderName = project.folder;
  const folderPath = path.resolve(__dirname, '..', 'src', 'routes', 'projects', folderName);

  try {
    fs.mkdirSync(folderPath);
    console.log(`Created folder for ${folderName} project.`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Folder for ${folderName} project already exists.`);
    } else {
      console.error(`Failed to create folder for ${folderName} project: ${err}`);
    }
  }
});
