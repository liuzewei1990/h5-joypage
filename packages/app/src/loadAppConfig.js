import * as service from "@work/service";
import * as api from "./api/index.js";
import * as utils from "@work/utils";

/**
 * 加载项目配置信息
 */
export default async function loadProjectConfig(appId) {
  if (!appId) {
    throw new Error(`appId必传！`);
  }
  try {
    let appConfig = utils.sessionStorage.get("app_config");

    if (!appConfig) {
      const params = new service.work.PageVo();
      params.andMap = {
        projectId: appId
      };
      const data = await api.getProjectById(params);
      const project = data.records[0];
      if (project) {
        const { config = "{}", projectName } = project;
        appConfig = JSON.parse(config);
        console.log("获取app配置信息：", appConfig);
      } else {
        throw new Error(`当前appId：${appId},暂无配置信息！`);
      }
    }

    utils.sessionStorage.set("app_id", appId);
    utils.sessionStorage.set("app_config", appConfig);
  } catch (error) {
    throw new Error("项目配置信息加载失败");
  }
}
