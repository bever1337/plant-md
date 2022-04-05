/* eslint-env node */

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("plants", function (collectionApi) {
    return collectionApi.getFilteredByTag("plants").sort(function (a, b) {
      return `${a.data.name}`.localeCompare(`${b.data.name}`);
    });
  });

  eleventyConfig.setLibrary(
    "md",
    require("markdown-it")()
      .use(require("markdown-it-table-of-contents"))
      .use(require("markdown-it-anchor"))
  );
  global.filters = eleventyConfig.javascriptFunctions;
  eleventyConfig.setPugOptions({ globals: ["filters"] });

  return {
    dir: {
      includes: "../_includes",
      input: "site",
      output: "public",
    },
    templateFormats: ["md", "pug"],
  };
};
