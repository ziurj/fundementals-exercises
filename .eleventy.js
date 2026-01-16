module.exports = function(eleventyConfig) {
  // Things we're going to need.
  eleventyConfig.addPassthroughCopy("./src/styles.css");
  // eleventyConfig.addPassthroughCopy("./src/assets");
  // eleventyConfig.addPassthroughCopy("./src/script.js");

  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}