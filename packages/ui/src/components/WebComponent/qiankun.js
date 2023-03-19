import { loadMicroApp } from "qiankun";
export default {
  data() {
    return {
      microApp: ""
    };
  },
  render(h) {
    return h("div");
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.microApp = this.createMicroApp();
    },
    createMicroApp() {
      return loadMicroApp({
        name: this.$attrs.name,
        entry: this.$attrs.url,
        container: this.$el,
        props: this.$attrs.config || { test: "测试props数据" }
      });
    }
  }
};
