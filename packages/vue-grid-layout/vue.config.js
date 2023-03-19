const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [],
    externals: {
      // vue: "Vue",
      // vuex: "Vuex",
      // "vue-router": "VueRouter",
      // axios: "axios",
      // "ant-design-vue": "antd"
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
