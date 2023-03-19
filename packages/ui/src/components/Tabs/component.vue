<template>
  <section class="tabs-container">
    <a-tabs class="tabs fix" :default-active-key="activeKey" @change="callback" :animated="false">
      <a-tab-pane :tab="item.title" v-for="item in work.state.views" :key="item.viewId"> </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script>
  export default {
    name: "Tabs",
    inject: ["work"],
    computed: {
      activeKey() {
        return this.work.state.activeViewId;
      }
    },
    created() {
      console.log("init tabs 组件1");
    },
    methods: {
      callback(viewId) {
        this.work.setWorkView(viewId);
      }
    }
  };
</script>

<style lang="less" scoped>
  .tabs-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    height: 45px;

    /deep/ .tabs {
      padding: 0 20px;
      height: 100%;
    }
    /deep/ .ant-tabs-bar {
      // height: 100%;
      // display: flex;
      // align-items: center;
    }
    /deep/ .tabs .ant-tabs-nav-container {
      font-size: 13px;
    }
    /deep/ .tabs .ant-tabs-tab {
      margin-right: 10px;
    }
    .fix {
      // position: absolute;
      // top: 0;
      // left: 0;
      // width: 100%;
      // background: red;
    }

    /deep/ .fix .ant-tabs-bar {
      margin: 0;
    }
  }
</style>
