import Work from "./Work/index.vue";

/**
 * 创建work 全局store
 * @returns Work Component
 */
export default function () {
  const components = { Work };
  const inject = ["work"];
  const render = function (h) {
    return this.work.loading === false && <Work props={this.$attrs}></Work>;
  };
  return { components, inject, render };
}
