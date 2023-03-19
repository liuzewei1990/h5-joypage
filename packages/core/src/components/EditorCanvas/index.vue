<template>
  <div class="canvas">
    <!-- <work-page> -->
    <work height="calc(100vh - 56px - 5px)" />
    <!-- </work-page> -->
  </div>
</template>

<script>
  import { createWorkPage } from "../../Render.js";
  import Work from "../../work/index.js";
  export default {
    components: { WorkPage: createWorkPage(), Work: Work() },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .canvas {
    padding: 5px 5px 0;
    background: #edf0f8;
  }
</style>
