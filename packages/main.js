const cdn = {
  vue: {
    js: "/workComponents/vue/dist/vue.min.js"
  },
  vueRouter: {
    js: "/workComponents/vue-router/dist/vue-router.min.js"
  },
  axios: {
    js: "/workComponents/axios/dist/axios.min.js"
  },
  moment: {
    js: "/workComponents/moment/dist/moment.min.js"
  },
  locale: {
    js: "/workComponents/moment/locale/zh-cn.js"
  },
  echarts: {
    js: "/workComponents/echarts/dist/echarts.umd.min.js"
  },
  antd: {
    js: "/workComponents/ant-design-vue/dist/antd.min.js",
    css: "/workComponents/ant-design-vue/dist/custom-antd-theme.css"
  },
  easytable: {
    js: "/workComponents/easytable/dist/easytable.umd.min.js",
    css: "/workComponents/easytable/dist/easytable.css"
  },
  work: {
    js: "/workComponents/work/dist/work.umd.min.js",
    css: "/workComponents/work/dist/work.css"
  }
};

const loadScript = function (url) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    let headTag = document.getElementsByTagName("head")[0];
    script.type = "text/javascript";
    script.onload = function () {
      script.onload = script.onerror = null;
      script.remove();
      resolve();
    };

    script.onerror = function () {
      script.onload = script.onerror = null;
      script.remove();
      reject();
    };

    script.src = url;
    headTag.appendChild(script);
  });
};

const loadCss = function (url) {
  return new Promise(function (resolve, reject) {
    let head = document.getElementsByTagName("head").item(0);
    let style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.type = "text/css";

    style.onload = function () {
      style.onload = style.onerror = null;
      resolve();
    };

    style.onerror = function () {
      style.onload = style.onerror = null;
      reject();
    };

    head.appendChild(style);
  });
};

async function start() {
  try {
    const promises = [];

    for (const key in cdn) {
      if (cdn[key].js) promises.push(loadScript(cdn[key].js));
      if (cdn[key].css) promises.push(loadCss(cdn[key].css));
    }
    await Promise.all(promises);
  } catch (error) {
    alert("cdn资源加载失败");
  }
}

start();
