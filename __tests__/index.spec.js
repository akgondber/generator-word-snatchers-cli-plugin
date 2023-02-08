const yAssert = require("yeoman-assert");

describe("Template file", () => {
  test("should have main template stuff", () => {
    yAssert.file("app/templates/_package.json");
    yAssert.file("app/templates/_index.js");
    yAssert.file("app/templates/tests/_index.test.js");
  });

  test("should have some configs, docs and other stuff", () => {
    yAssert.file("app/templates/gitignore");
    yAssert.file("app/templates/_README.md");
    yAssert.file("app/templates/_LICENSE");
  });
});
