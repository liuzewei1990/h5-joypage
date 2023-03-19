const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

function resolve(dir) {
  return path.join(__dirname, dir);
}

const vueConfig = {
  configureWebpack: (config) => {
    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      // "@work/work": "work",
      "ant-design-vue": "antd"
    };
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    // config.resolve.alias.set("@", resolve("node_modules/vpdsmart/src"));
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
      },
      "/workJs": {
        target: "http://192.168.7.19:8080",
        secure: false,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: []
};

module.exports = vueConfig;
