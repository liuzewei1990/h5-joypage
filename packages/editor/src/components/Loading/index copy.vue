<template>
  <div class="work-page-loading">
    <a-spin></a-spin>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .work-page-loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    background: #fff;
  }
</style>
