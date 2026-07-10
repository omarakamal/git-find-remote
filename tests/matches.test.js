const normalizeRepo = require("../lib/normalize")
const matchesRepo = require("../lib/matches")


describe("matchesRepo", () => {


    test("matches exact repository", () => {


        const input = normalizeRepo(
            "facebook/react"
        )


        const remote = normalizeRepo(
            "https://github.com/facebook/react.git"
        )


        expect(
            matchesRepo(input, remote)
        ).toBe(true)


    })



    test("matches repository name only", () => {


        const input = normalizeRepo(
            "react"
        )


        const remote = normalizeRepo(
            "facebook/react"
        )


        expect(
            matchesRepo(input, remote)
        ).toBe(true)


    })



    test("does not match different repositories", () => {


        const input = normalizeRepo(
            "vue"
        )


        const remote = normalizeRepo(
            "facebook/react"
        )


        expect(
            matchesRepo(input, remote)
        ).toBe(false)


    })


})