const normalize = require("../lib/normalize");

describe("normalize functionality tests", () => {
  test("normalize https github urls", () => {
    const result = normalize("https://github.com/facebook/react.git");

    expect(result).toEqual({
      full: "facebook/react",
      owner: "facebook",
      name: "react",
    });
  });

  test("normalizes ssh github url", () => {
    const result = normalize("git@github.com:facebook/react.git");

    expect(result).toEqual({
      full: "facebook/react",
      owner: "facebook",
      name: "react",
    });
  });


    test("handles repository name only", () => {

        const result = normalize(
            "react"
        )


        expect(result).toEqual({
            full: "react",
            owner: null,
            name: "react"
        })

    })


    test("handles repository and username", () => {

        const result = normalize(
            "facebook/react"
        )


        expect(result).toEqual({
            full: "facebook/react",
            owner: "facebook",
            name: "react"
        })

    })
});
