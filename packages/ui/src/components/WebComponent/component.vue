<template>
  <div class="web-component">
    <micro-app :name="name" :url="url"></micro-app>
  </div>
</template>

<script>
  // import Qiankun from "./qiankun";
  export default {
    name: "WebComponent",
    // components: { Qiankun },
    props: {
      name: {
        type: String,
        default: "",
        required: true
      },
      url: {
        type: String,
        default: "",
        required: true
      }
    },
    mounted() {}
  };
</script>

<style lang="less">
  .web-component {
  }
</style>
