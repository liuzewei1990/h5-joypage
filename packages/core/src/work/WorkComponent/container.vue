<template>
  <div class="work-component-container">
    <!-- <div class="work-component-container" :class="[_coNameClass]"> -->
    <div class="work-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .work-component-container {
    // position: absolute;
    // left: 0;
    // top: 0;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    // justify-content: center;
    align-items: center;
    overflow: hidden;

    .work-center {
      flex: 1;
    }
  }
</style>
