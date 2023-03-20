<template>
  <a-drawer
    placement="left"
    :closable="false"
    :mask="true"
    :visible="true"
    :get-container="false"
    :drawer-style="{}"
    :mask-style="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
    :body-style="{ padding: 0, height: '100%' }"
    :wrap-style="{ position: 'fixed', zIndex: 998, top: '56px', height: 'calc(100vh - 56px)' }"
    v-bind="$attrs"
    @mouseover.native="mouseout"
    @close="onClose">
    <!-- <div class="container" @mouseover="onShow" @mouseout="onClose"> -->
    <div class="container">
      <keep-alive>
        <component :is="compoName"></component>
      </keep-alive>
    </div>
  </a-drawer>
</template>

<script>
  import MyHome from "./MyHome/index.vue";
  import PageSetting from "./PageSetting/index.vue";
  import ViewMetaList from "./ViewMetaList/index.vue";
  import ComponentMeta from "./ComponentMeta/index.vue";
  import ComponentMetaDev from "./ComponentMetaDev/index.vue";
  import DataBase from "./DataBase/index.vue";
  import Setting from "./Setting/index.vue";
  import store from "./store.js";

  export default {
    components: { MyHome, PageSetting, ViewMetaList, ComponentMeta, DataBase, ComponentMetaDev, Setting },
    computed: {
      visible() {
        return store.state.visible;
      },
      compoName() {
        return store.state.compoName || "compo-meta-list";
      }
    },
    methods: {
      mouseout(e) {
        if (e.target.classList.value === "ant-drawer-mask") {
          this.onClose();
        }
      },
      onShow() {
        store.show();
      },
      onClose() {
        store.close();
      }
    }
  };
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
  }
</style>
