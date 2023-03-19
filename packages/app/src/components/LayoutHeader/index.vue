<template>
  <a-layout-header :class="classNames" theme="dark" :style="styles" v-if="visibleHeader">
    <BaseHeader></BaseHeader>
  </a-layout-header>
</template>

<script>
  import BaseHeader from "./base.vue";

  export default {
    name: "LayoutHeader",
    inheritAttrs: false,
    components: { BaseHeader },
    inject: ["app"],
    computed: {
      visibleHeader() {
        return this.app.visibleHeader;
      },
      siderWidth() {
        return this.app.siderWidth;
      },
      classNames() {
        return {
          ["fix-header"]: this.app.fixedHeader
          // ["header-treme-" + this.app.theme]: this.app.layout === "topmenu"
        };
      },
      styles() {
        return {
          ["backgroundColor"]: this.app.layout === "topmenu" && this.app.theme,
          ["padding"]: 0,
          ["right"]: 0,
          ["transition"]: "width 0.2s",
          ["width"]: this.app.layout === "sidemenu" && this.app.fixedHeader ? (this.app.collapsed ? `calc(100% - ${80}px)` : `calc(100% - ${this.app.siderWidth}px)`) : "100%"
        };
      }
    }
  };
</script>
