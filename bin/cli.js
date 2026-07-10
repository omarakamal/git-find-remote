#!/usr/bin/env node

const search = require("../lib/search")

const remoteUrl = process.argv[2]

if (!remoteUrl) {
    console.log("Please provide a git remote URL.")
    process.exit(1)
}

search(remoteUrl)