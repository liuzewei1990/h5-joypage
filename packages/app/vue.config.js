const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "../../libs/app/dist"),
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
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
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/energy-api": {
        target: "http://192.168.7.19:8080",
        secure: false,
        changeOrigin: true
      },
      "/energy-admin": {
        target: "http://192.168.7.19:8080",
        secure: false,
        changeOrigin: true
      },
      "/workComponents": {
        target: "http://192.168.7.19:8080",
        secure: false,
        changeOrigin: true
      }
    }
  }
});
