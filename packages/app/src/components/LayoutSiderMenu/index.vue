<template>
  <a-layout-sider :style="style" :class="classNames" :width="siderWidth" :collapsedWidth="80" v-model="collapsed" collapsible :trigger="null">
    <Logo v-bind="{ logo, title, collapsed }" v-if="visibleLogo" />
    <BaseMenu />
  </a-layout-sider>
</template>

<script>
  import BaseMenu from "../BaseMenu/index.vue";
  import Logo from "../LayoutHeader/logo.vue";

  export default {
    inheritAttrs: false,
    components: { BaseMenu, Logo },
    inject: ["app"],
    computed: {
      logo() {
        return this.app.logo;
      },
      title() {
        return this.app.title;
      },
      collapsed() {
        return this.app.collapsed;
      },
      theme() {
        return this.app.theme;
      },
      siderWidth() {
        return this.app.siderWidth;
      },
      visibleLogo() {
        return this.app.visibleLogo;
      },
      style() {
        return {
          ["backgroundColor"]: this.app.theme
        };
      },
      classNames() {
        return {
          ["fix-sider"]: this.app.fixSiderbar
        };
      }
    }
  };
</script>
