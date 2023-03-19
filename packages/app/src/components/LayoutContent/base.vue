<template>
  <div class="base-content" :class="[classNames]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    inject: ["app"],
    computed: {
      layout() {
        return this.app.layout;
      },
      classNames() {
        return {
          ["fixed-wide"]: this.app.layout === "topmenu" && this.app.contentWidth === "Fixed" ? true : false
        };
      }
    }
  };
</script>
