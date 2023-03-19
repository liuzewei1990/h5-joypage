const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "../../libs/store/dist"),
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      library: "workStore"
    },
    plugins: [],
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
      "ant-design-vue": "antd"
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
});
