const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "../../libs/data-cache/dist"),
  transpileDependencies: true,
  productionSourceMap: false
});
