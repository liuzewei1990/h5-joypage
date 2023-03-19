<template>
  <a-drawer
    placement="left"
    :closable="false"
    :mask="true"
    :visible="visible"
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
  import ViewMetaList from "../ViewMetaList/index.vue";
  import CompoMetaList from "../CompoMetaList/index.vue";
  import CompoMetaListLocal from "../CompoMetaListLocal/index.vue";
  import store from "./store.js";

  export default {
    components: { ViewMetaList, CompoMetaList, CompoMetaListLocal },
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
