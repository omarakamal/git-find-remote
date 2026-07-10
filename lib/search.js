const fs = require("fs/promises");
const path = require("path");
const getRemote = require("./git");
const normalizeRepo = require("./normalize");
const matchesRepo = require("./matches");

const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
]);

async function search(remoteInput) {
  const normalizedInput = normalizeRepo(remoteInput);

  const startingFolder = process.cwd();

  console.log("Searching for:");
  console.log(normalizedInput);
  console.log("Searching...");

  await searchFolder(startingFolder, normalizedInput);
}

async function searchFolder(folder, normalizedInput) {
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
          console.log("FOUND:");
          console.log(fullPath);
          console.log("");
        }
      }

      // Continue searching deeper
      await searchFolder(fullPath, normalizedInput);
    }
  }
}

module.exports = search;
