const fs = require("fs/promises");
const path = require("path");
const getRemote = require("./git");
const normalizeRepo = require("./normalize");
const matchesRepo = require("./matches");

const ora = require('ora');




const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
]);

async function search(remoteInput) {
  const results = []
  const normalizedInput = normalizeRepo(remoteInput);

  const startingFolder = process.cwd();

  console.log("Searching for:");
  console.log(normalizedInput);
  console.log("Searching...");
  const spinner = ora('Searching...').start();


  await searchFolder(startingFolder, normalizedInput, results);

  printFoundValues(results)
  spinner.succeed('Done!');

  return results
}

async function searchFolder(folder, normalizedInput, results) {
  let entries;

  try {
    entries = await fs.readdir(folder, {
      withFileTypes: true,
    });
  } catch (error) {
    // Cannot access folder, ignore it
    return;
  }

  for (const entry of entries) {
    // Skip ignored directories
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      // Check if this directory is a git repository
      const remote = await getRemote(fullPath);

      if (remote) {
        const normalizedRemote = normalizeRepo(remote);

        if (matchesRepo(normalizedInput, normalizedRemote)) {
          results.push(fullPath)
          console.log(`Found ${results.length} item${results.length > 1 ? "s" : ""}`);
        }
      }

      // Continue searching deeper
      await searchFolder(fullPath, normalizedInput, results);
    }
  }
}


function printFoundValues(foundResults){
  if(!foundResults.length){
    return console.log('No projects found')
  }
  console.log("")
  console.log("Your Results are here:")
  for(let path of foundResults){
    console.log(path)
  }
}

module.exports = search;
