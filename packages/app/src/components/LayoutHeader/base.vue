<template>
  <div class="base-header" :class="classNames">
    <a-row type="flex">
      <a-col :flex="siderWidth + 'px'" v-if="layout === 'topmenu'">
        <Logo v-bind="{ title, logo, color: '#fff' }" v-if="visibleLogo" />
      </a-col>
      <a-col flex="65px">
        <a-icon class="trigger" v-if="!isTop" @click="app.switchCollapsed()" :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-col>
      <a-col :flex="1">
        <BaseMenu v-if="isTop && visibleSider" v-bind="{ mode: 'horizontal' }"></BaseMenu>
      </a-col>
      <a-col flex="300px"> </a-col>
    </a-row>
  </div>
</template>

<script>
  import BaseMenu from "../BaseMenu/index.vue";
  import Logo from "./logo.vue";

  export default {
    components: { BaseMenu, Logo },
    inject: ["app"],
    computed: {
      collapsed() {
        return this.app.collapsed;
      },
      title() {
        return this.app.title;
      },
      logo() {
        return this.app.logo;
      },
      siderWidth() {
        return this.app.siderWidth;
      },
      layout() {
        return this.app.layout;
      },
      isTop() {
        return this.app.layout === "topmenu";
      },
      menuComponentName() {
        return this.app.menu.coName || "";
      },
      visibleSider() {
        return this.app.visibleSider;
      },
      visibleLogo() {
        return this.app.visibleLogo;
      },
      classNames() {
        return {
          ["fixed-wide"]: this.app.layout === "topmenu" && this.app.contentWidth === "Fixed" ? true : false
        };
      }
    }
  };
</script>
