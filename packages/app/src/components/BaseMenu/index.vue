<template>
  <component v-bind="{ ...$attrs }" :is="menuComponentName" :resolveWorks="menuResolveWorkIds" :logo="logo" :title="title" :collapsed="collapsed"></component>
</template>

<script>
  export default {
    inheritAttrs: false,
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
      menuComponentName() {
        return this.app.menu || "";
      },
      menuResolveWorkIds() {
        return this.app.resolveWorkIds || [];
      }
    }
  };
</script>
