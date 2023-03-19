<template>
  <a-layout id="admin-layout-side" class="ant-pro-topmenu" style="min-height: 100vh">
    <a-layout-header class="layout-header">
      <slot name="header"></slot>
    </a-layout-header>

    <a-layout>
      <a-layout-sider :width="60" theme="light" class="layout-sider">
        <slot name="sider"></slot>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <div class="layout-main">
          <slot name="canvas"></slot>
          <!-- <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer> -->
        </div>
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-sider :width="200" theme="light" class="layout-panel">
      <slot name="panel"></slot>
    </a-layout-sider> -->
  </a-layout>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .layout-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding: 0;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
  }
  .layout-sider {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 56px;
    height: calc(100vh - 56px);
    overflow: auto;
    border-right: 1px solid #e6e6e6;
  }
  .layout-content {
    margin-top: 56px;
    margin-left: 60px;
    background: #f8f8f8;
    position: relative;
    height: calc(100vh - 56px);
    overflow-x: hidden;
    overflow-y: hidden;

    .layout-main {
      // min-height: 200vh;
    }
  }
  .layout-panel {
    margin-top: 56px;
  }
</style>
