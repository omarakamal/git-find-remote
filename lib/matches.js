function matchesRepo(inputRepo, remoteRepo) {


    // Exact match:
    // facebook/react === facebook/react
    if (inputRepo.full === remoteRepo.full) {
        return true
    }


    // User only provided repo name:
    // react === facebook/react
    if (
        inputRepo.owner === null &&
        inputRepo.name === remoteRepo.name
    ) {
        return true
    }


    return false

}


module.exports = matchesRepo