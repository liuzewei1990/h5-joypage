import Vue from "vue";
import { localStorage } from "@work/utils";

class UserInfo {
  constructor() {
    // super();
    this.appId = "";
    this.state = Vue.observable({
      userName: "",
      id: "",
      phoneNum: "",
      token: ""
    });
  }

  login(appId, userInfo = {}) {
    this.appId = appId;
    for (const key in userInfo) {
      if (Object.hasOwnProperty.call(this.state, key)) {
        this.state[key] = userInfo[key];
      }
    }
    // 重新设置时可更新时长
    localStorage.set(this.appId, { ...this.state }, 1000 * 60 * 60);
  }

  loout() {
    for (const key in this.state) {
      this.state[key] = "";
    }
  }
}
export default new UserInfo();
