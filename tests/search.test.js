const mock = require("mock-fs");
const path = require('path')

const projectsDir = path.resolve(path.sep, "projects");

// Mock git.js before importing search.js
jest.mock("../lib/git", () => {

    const path = require("path");

    return jest.fn((folder) => {

            console.log("Checking git:", folder)

        const remotes = {
            [path.join(path.resolve(path.sep, "projects"), "react-app")]:
                "https://github.com/facebook/react.git",

            [path.join(path.resolve(path.sep, "projects"), "vue-app")]:
                "https://github.com/vuejs/vue.git"
        };

        const normalizedFolder = path.resolve(folder);

        return Promise.resolve(
            Object.entries(remotes).find(([remoteFolder]) => path.resolve(remoteFolder) === normalizedFolder)?.[1] || null
        );
    });

});


const search = require("../lib/search");


describe("search", () => {


    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });



    test("finds matching repositories recursively", async () => {


        mock({
            [projectsDir]: {

                "react-app": {
                    ".git": {}
                },


                "vue-app": {
                    ".git": {}
                }

            }
        });



        process.chdir(projectsDir);


        const results = await search(
            "react"
        );


        expect(results).toHaveLength(1);


        expect(path.normalize(results[0]))
            .toBe(path.normalize(path.join(projectsDir, "react-app")));

    });



    test("ignores node_modules directories", async () => {


        mock({

            [projectsDir]: {

                "node_modules": {

                    "fake": {

                        ".git": {}

                    }

                },


                "real-project": {

                    ".git": {}

                }

            }

        });


        process.chdir("/projects");



        const results = await search(
            "fake"
        );


        expect(results)
            .toHaveLength(0);

    });



    test("returns empty array when nothing matches", async () => {


        mock({

            [projectsDir]: {

                "random-folder": {}

            }

        });



        process.chdir("/projects");



        const results = await search(
            "does-not-exist"
        );



        expect(results)
            .toEqual([]);

    });



});