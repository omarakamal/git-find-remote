#!/usr/bin/env node

const search = require("../lib/search")
const colors = require('colors')

const remoteUrl = process.argv[2]

if (!remoteUrl) {
    console.log(colors.red("Please provide a git remote URL."))
    process.exit(1)
}

search(remoteUrl)