/**
 * 动态加载一个js文件
 * @param {String} url js文件路径
 * @returns Promise
 */
export const loadScript = function (url) {
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

/**
 * 动态加载一个css文件
 * @param {String} url css文件路径
 * @returns Promise
 */
export const loadCss = function (url) {
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

/**
 * 有序加载一组脚本
 * @param {*} urlArray
 * @returns Promise
 */
export const loadScriptQueue = function () {};

/**
 * 无需加载一组脚本
 * @param {*} urlArray
 * @returns Promise
 */
export const loadScripts = function (urlArray) {
  let scriptArr = [];
  for (const url of urlArray) {
    if (!url) continue;

    if (url.includes("js")) {
      scriptArr.push(loadScript(url));
    }
    if (url.includes("css")) {
      scriptArr.push(loadCss(url));
    }
  }
  return Promise.all(scriptArr);
};

/**
 * 加载资源包 [{pkgName,jsUrl,cssUrl},{pkgName,jsUrl,cssUrl},{pkgName,jsUrl,cssUrl}]
 * @param {*} pkgs 资源包数组
 * @returns promise
 */
export const loadPkg = async function (pkgs) {
  if (!Array.isArray(pkgs) || pkgs.length === 0) return;

  pkgs = pkgs.reduce(function (target, item) {
    return target.concat([item.jsUrl, item.cssUrl].filter((i) => i)); // filter 去空
  }, []);

  try {
    await loadScripts(pkgs);
  } catch (error) {
    // message.error("项目依赖组件包加载失败");
    return Promise.reject();
  }
};
