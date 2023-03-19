<template>
  <div class="menu-sider">
    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('view-meta-list1')">
      <div class="icon" flex="cross:center main:center">
        <!-- <span class="iconfont icon-home"></span> -->
        <icon-font type="icon-home" />
      </div>
      <div class="name">我的</div>
    </div>
    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('view-meta-list')">
      <div class="icon" flex="cross:center main:center">
        <span class="iconfont icon-yemian2"></span>
      </div>
      <div class="name">视图</div>
    </div>
    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('compo-meta-list')">
      <div class="icon" flex="cross:center main:center">
        <span class="iconfont icon-pingtai_mokuai"></span>
      </div>
      <div class="name">组件</div>
    </div>
    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('compo-meta-li1st')">
      <div class="icon" flex="cross:center main:center">
        <span class="iconfont icon-database"></span>
      </div>
      <div class="name">数据</div>
    </div>

    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('compo-meta-list-local')" v-if="mode === 'dev'">
      <div class="icon" flex="cross:center main:center">
        <span class="iconfont icon-dev"></span>
      </div>
      <div class="name">开发</div>
    </div>

    <div class="item" flex="dir:top cross:center main:center" @click="openCommonDrawer('compo-meta-list-lo1cal')">
      <div class="icon" flex="cross:center main:center">
        <span class="iconfont icon-shezhi1"></span>
      </div>
      <div class="name">设置</div>
    </div>

    <!-- <div class="item" flex="dir:top cross:center main:center" @click="$emit('itemClick', 'co')">
      <div class="icon" flex="cross:center main:center">
        <a-icon type="plus-circle" />
      </div>
      <div class="name">组件</div>
    </div>
    <div class="item" flex="dir:top cross:center main:center" @click="$emit('itemClick', 'co')">
      <div class="icon" flex="cross:center main:center">
        <a-icon type="plus-circle" />
      </div>
      <div class="name">页面</div>
    </div> -->
  </div>
</template>

<script>
  import store from "./store.js";
  export { default as store } from "./store.js";

  export default {
    components: {},
    inject: ["work"],
    computed: {
      mode() {
        return this.work.mode;
      }
    },
    data() {
      return {
        coPanelVisible: false
      };
    },
    mounted() {},
    methods: {
      openCommonDrawer(componentName) {
        store.show();
        store.openComponent(componentName);
      }
    }
  };
</script>

<style lang="less" scoped>
  .menu-sider {
    height: 100%;
    position: relative;
  }
  .item {
    border-bottom: 1px solid #e6e6e6;
    height: 80px;
    &:hover {
      background: #f3f3f3;
    }
    cursor: pointer;
    .icon {
      width: 25px;
      height: 25px;
      border: 1px solid #e6e6e6;
      border-radius: 100px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .name {
      margin-top: 5px;
      font-size: 12px;
    }
  }
</style>
