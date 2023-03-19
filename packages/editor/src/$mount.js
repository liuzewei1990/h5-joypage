import * as api from "./api/index.js";
import * as utils from "@work/utils";

/**
 * 第一步：加载依赖组件包资源
 * 第二部：挂载实例
 * @param {*} Vue
 * @param {*} options
 */
export default async function (el) {
  try {
    const promises = [];
    // 加载packages依赖包资源
    const data = await api.getPackageCdnUrls();
    const packages = data.records || [];
    console.table(packages);

    for (const key in packages) {
      if (packages[key].js) promises.push(utils.load.loadScript(packages[key].js));
      if (packages[key].css) promises.push(utils.load.loadCss(packages[key].css));
    }
    await Promise.all(promises);
  } catch (error) {
    this.$message.warning("资源加载失败，请检查控制台信息");
  }

  this.$mount(el);
}
