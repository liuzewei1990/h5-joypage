<template>
  <a-tabs class="compo-meta-tabs" :default-active-key="0" :animated="false" tab-position="left">
    <a-tab-pane v-for="(item, i) in componentMetaList" :key="i">
      <div slot="tab" flex="dir:top main:center cross:center">
        <!-- <a-icon type="cloud" style="margin-right: 0" /> -->
        <span> {{ item.name }}</span>
      </div>
      <list :componentGroupList="item.componentGroupList"></list>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import workComponentMeta from "../../class/component.meta.class.js";
  import List from "./List.vue";

  export default {
    components: { List },
    inject: ["work"],
    data() {
      return {};
    },
    computed: {
      componentMetaList() {
        return workComponentMeta.componentMetaList;
      }
    }
  };
</script>

<style lang="less" scoped>
  /deep/ .ant-tabs-bar .ant-tabs-tab {
    font-size: 12px;
    padding: 15px 15px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0;
    text-align: center;
  }
  /deep/ .ant-tabs-content {
    padding-left: 2px;
  }

  .compo-meta-tabs {
    height: 100%;

    /deep/ .ant-tabs-content {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
