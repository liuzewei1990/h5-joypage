<template>
  <div class="add-work-view" flex="dir:top main:center curss: center">
    <a-icon class="icon" type="plus" />
    <div>添加组件</div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .add-work-view {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #dadada;
    // transform: scale(3);
    color: #999;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
    }
    .icon {
      font-size: 50px;
    }
  }
</style>
