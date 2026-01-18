module.exports = function(eleventyConfig) {
  // Things we're going to need.
  eleventyConfig.addPassthroughCopy("./src/styles.css");
  eleventyConfig.addPassthroughCopy("./src/scripts");
  eleventyConfig.addPassthroughCopy("./src/styles");

  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}