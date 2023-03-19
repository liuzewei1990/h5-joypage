import Base from "./base.class";
import * as service from "@work/service";
import * as api from "../api/index.js";

export default class App extends Base {
  constructor() {
    super();

    this._initData({
      loaded: false,
      // 坐侧边布局 或 上下顶栏布局 sidemenu | topmenu
      layout: "topmenu",
      // 是否显示header
      visibleHeader: true,
      // 是否显示sider
      visibleSider: true,
      // 是否显示tabs
      visibleTabs: false,
      // 固定header
      fixedHeader: true,
      // 固定menu
      fixSiderbar: true,
      // 局的内容模式，流体：自适应，固定：固定宽度1200px 'Fixed' | 'Fluid'布
      contentWidth: "Fixed",
      visibleLogo: true,
      // 系统标题
      title: "Work",
      // 系统logo
      logo: "",
      // 导航主题色 'light' | 'dark'
      theme: "#0a063a",
      // menu宽度
      siderWidth: 180,
      defaultHome: "",
      defaultHomeParams: "",
      // 菜单数据
      // 控制菜单的折叠和展开
      collapsed: false,
      // 菜单导航组件
      menu: "",
      // 白名单
      resolveWorkIds: [],
      plugins: []
    });
  }

  async getProjectConfig(id = "") {
    try {
      const params = new service.work.PageVo();
      params.andMap = {
        projectId: id
      };
      const data = await api.getProjectById(params);
      const project = data.records[0] || {};
      const { config, projectName } = project;
      this.init(JSON.parse(config));
      return JSON.parse(config);
    } catch (error) {
      throw error;
    }
  }

  init(config = {}) {
    for (const key in config) {
      if (Object.hasOwnProperty.call(this, key)) {
        this[key] = config[key];
      }
    }
  }
  switchCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
