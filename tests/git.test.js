const getRemote = require("../lib/git")
const mock = require("mock-fs")


describe("getRemote", () => {


    afterEach(() => {
        mock.restore()
    })


    test("returns null when no git folder exists", async () => {


        mock({
            "/project": {}
        })


        const result = await getRemote(
            "/project"
        )


        expect(result).toBe(null)

    })


})