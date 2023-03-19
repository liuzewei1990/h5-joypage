import * as utils from "@work/utils";
import * as store from "@work/store";

export default function () {
  const projectId = location.href.split("#/")[1].split("/")[0];

  if (/^\d{5}$/.test(projectId) !== true) {
    return this;
  }

  const queryParams = utils.base.getQueryStr();

  if (queryParams.token) {
    // url登录
    store.userInfo.login(projectId, queryParams);
    return this;
  }

  // 缓存登录
  const userInfo = utils.localStorage.get(projectId);
  if (userInfo) {
    store.userInfo.login(projectId, userInfo);
    return this;
  } else {
    location.href = "http://baidu.com";
  }
}
