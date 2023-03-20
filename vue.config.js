const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

function resolve(dir) {
  return path.join(__dirname, dir);
}

const vueConfig = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "theme.less")] // 引入全局样式变量
    }
  },
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
          // modifyVars: {
          //   "primary-color": "#FF5F70",
          //   "link-color": "#FF5F70",
          //   "font-size-base": "12px",
          //   "border-radius-base": "0px"
          // },
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
