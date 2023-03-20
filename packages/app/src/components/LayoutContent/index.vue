<template>
  <a-layout-content class="app-content" flex="dir:top" :class="classNames">
    <nav-bar flex-box="0" v-if="visibleTabs"></nav-bar>
    <BaseContent flex-box="1" style="height: 1px"><slot></slot></BaseContent>
  </a-layout-content>
</template>

<script>
  import NavBar from "./navBar.vue";
  import BaseContent from "./base.vue";

  export default {
    name: "LayoutContent",
    components: { BaseContent, NavBar },
    inject: ["app"],
    computed: {
      visibleTabs() {
        return this.app.visibleTabs;
      },
      classNames() {
        return {
          ["fix-header-content-top"]: this.app.visibleHeader && this.app.fixedHeader
        };
      }
    }
  };
</script>
