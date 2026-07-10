const fs = require("fs/promises")
const path = require("path")
const { execFile } = require("child_process")
const { promisify } = require("util")


const execFileAsync = promisify(execFile)


async function getRemote(folder) {


    const gitFolder = path.join(folder, ".git")


    try {

        await fs.access(gitFolder)

    } catch {

        // Not a git repository
        return null

    }


    try {

        const { stdout } = await execFileAsync(
            "git",
            [
                "-C",
                folder,
                "remote",
                "get-url",
                "origin"
            ]
        )


        return stdout.trim()


    } catch {

        return null

    }

}


module.exports = getRemote