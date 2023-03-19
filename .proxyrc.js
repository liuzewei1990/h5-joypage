module.exports = {
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
};
