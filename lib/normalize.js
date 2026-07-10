function normalizeRepo(input) {

    if (!input) {
        return null
    }


    let repo = input.trim().toLowerCase()


    // Remove .git ending
    repo = repo.replace(/\.git$/, "")


    // Convert SSH GitHub URLs
    repo = repo.replace(
        /^git@github\.com:/,
        ""
    )


    // Convert HTTPS GitHub URLs
    repo = repo.replace(
        /^https?:\/\/github\.com\//,
        ""
    )


    // Remove trailing slash
    repo = repo.replace(/\/$/, "")


    const parts = repo.split("/")


    return {
        full: repo,
        name: parts[parts.length - 1],
        owner: parts.length > 1 ? parts[parts.length - 2] : null
    }

}


module.exports = normalizeRepo