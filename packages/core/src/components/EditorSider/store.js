import Vue from "vue";

class CompoClass extends Vue {
  constructor() {
    super();
    this.state = Vue.observable({
      visible: false,
      compoName: ""
    });
  }
  show() {
    this.state.visible = true;
  }
  close() {
    this.state.visible = false;
  }
  openComponent(compoName) {
    this.state.compoName = compoName;
  }
}

export default new CompoClass();
