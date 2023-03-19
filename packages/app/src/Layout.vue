<template>
  <a-layout id="admin-layout-side" class="ant-pro-topmenu" style="min-height: 100vh">
    <LayoutSiderMenu class="app-slider" v-if="layout === 'sidemenu'" v-bind="$props"></LayoutSiderMenu>
    <a-layout class="app-container" :style="styles">
      <LayoutHeader class="app-header" v-bind="$props"></LayoutHeader>
      <LayoutContent v-bind="$props">
        <slot></slot>
        <component v-for="(plugin, index) in plugins" :key="index" :is="plugin.name"></component>
      </LayoutContent>
      <!-- <LayoutFooter></LayoutFooter> -->
    </a-layout>
  </a-layout>
</template>

<script>
  import LayoutHeader from "./components/LayoutHeader/index.vue";
  import LayoutSiderMenu from "./components/LayoutSiderMenu/index.vue";
  import LayoutContent from "./components/LayoutContent/index.vue";
  import LayoutFooter from "./components/LayoutFooter/index.vue";

  export default {
    inheritAttrs: false,
    components: { LayoutHeader, LayoutSiderMenu, LayoutContent, LayoutFooter },
    inject: ["app"],
    computed: {
      layout() {
        return this.app.layout;
      },
      collapsed() {
        return this.app.collapsed;
      },
      plugins() {
        return this.app.plugins;
      },
      styles() {
        return {
          ["transition"]: "margin-left 0.2s",
          ["margin-left"]: this.app.layout === "sidemenu" && this.app.fixSiderbar && (this.app.collapsed ? "80px" : this.app.siderWidth + "px")
        };
      }
    }
  };
</script>

<style lang="less">
  @import url(./style/index.less);
</style>
