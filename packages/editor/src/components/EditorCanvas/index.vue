<template>
  <div class="canvas">
    <!-- <work-page> -->
    <work height="calc(100vh - 56px)" />
    <!-- </work-page> -->
  </div>
</template>

<script>
  import { createWork } from "@work/work";
  export default {
    components: { Work: createWork() },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .canvas {
    // padding: 5px 5px 0;
    background: #edf0f8;
    height: calc(100vh - 56px);
  }
</style>
