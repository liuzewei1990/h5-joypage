<template>
  <div class="work-component-tools" :class="[isFrontier]" flex="dir:top">
    <!-- 常用工具 -->
    <div class="group" flex="dir:top">
      <a-tooltip placement="right" title="锁定位置">
        <span class="btn iconfont icon-suo" @click="lock" :class="{ active: item.static }"></span>
      </a-tooltip>

      <a-tooltip placement="right" title="浮动" v-if="!item.isDerailed">
        <span class="btn iconfont icon-caidancengji" @click="clickDerailed(true)"></span>
      </a-tooltip>
      <a-tooltip placement="right" title="取消浮动" v-else>
        <span class="btn iconfont icon-caidancengji" :class="{ active: item.isDerailed }" @click="clickDerailed(false)"></span>
      </a-tooltip>

      <a-popover class="my-popover" title="组件容器设置" placement="right" trigger="click" arrow-point-at-center>
        <popover-setting-style :item="item" slot="content" :style-config="elStyle"></popover-setting-style>
        <a-tooltip placement="right" title="组件容器设置">
          <span class="btn iconfont icon-shezhi-xianxing"></span>
        </a-tooltip>
      </a-popover>

      <!-- <a-tooltip placement="right" title="编辑组件属性">
        <span class="btn iconfont icon-bianji"></span>
      </a-tooltip> -->
      <a-tooltip placement="right" title="上移一级">
        <span class="btn iconfont icon-dashujukeshihuaico-1" @click="zIndex('++')"></span>
      </a-tooltip>
      <a-tooltip placement="right" title="下移一级">
        <span class="btn iconfont icon-dashujukeshihuaico-" @click="zIndex('--')"></span>
      </a-tooltip>
      <a-tooltip placement="right" title="移除组件">
        <span class="btn iconfont icon-shanchu1" @click="del"></span>
      </a-tooltip>
    </div>

    <!-- 辅助工具 -->
    <div class="group" flex="dir:top" v-if="!item.isDerailed">
      <a-tooltip placement="right" title="适应组件自身高度">
        <span class="btn iconfont icon-colum-height" @click="colH"></span>
      </a-tooltip>
      <a-tooltip placement="right" title="撑满剩余空间">
        <span class="btn iconfont icon-zhanmanzhenggerongqidegaodu" :class="{ active: item.fixedHeight }" @click="fullscreen"></span>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
  import { bool, number, object } from "vue-types";
  import PopoverSettingStyle from "./base/popover-setting-style.vue";
  export default {
    components: { PopoverSettingStyle },
    inject: ["work"],
    props: {
      item: object().def({}),
      index: number().def(0)
    },
    computed: {
      _coNameClass() {
        return "work-component-container-" + this.item.coName;
      },
      isFrontier() {
        return this.item.x + this.item.w > 141 ? (this.item.x < 3 ? "lt-0" : "rt") : "lt";
      },
      elStyle() {
        return this.item.elStyle;
      }
    },
    mounted() {},
    methods: {
      showTools() {
        this.work.resizableOpen(this.item.i);
      },
      colH() {
        this.work.setElementHeight(this.item.i);
      },
      del() {
        this.work.delWorkComponent(this.item.i);
      },
      lock() {
        this.work.lockCompo(this.item.i);
      },
      fullscreen() {
        this.work.fullscreen(this.item.i);
      },
      clickDerailed(bool) {
        this.$set(this.item, "fixedHeight", false); // 每次切换模式，都置为false
        this.$set(this.item, "isDerailed", bool);
      },
      zIndex(fo) {
        this.work.changezIndex(this.item.i, fo);
      }
    }
  };
</script>

<style lang="less" scoped>
  .work-component-tools {
    position: absolute;
    // z-index: 999; 原来的
    // z-index: 2;
    // left: 100%;
    top: 0;
    font-size: 15px;
    color: #fff;
    border-radius: 2px;
    padding: 3px 2px;
    cursor: pointer;
    transition: transform 0.3s;
    .group {
      // border-bottom: 1px solid red;
      background: #ffffff;
      margin-bottom: 5px;
      border-radius: 4px;
      box-shadow: 0px 0px 5px #cbcbcb;
      padding: 3px 0;
      // border: 1px solid red;
      padding: 5px;

      // a {
      //   display: inline-block;
      //   color: #fff;
      // }
    }

    .btn {
      display: block;
      color: #4a4a4a;
      // border: 1px solid red;
      margin: 4px 1px;
      position: relative;
      // width: 22px;
      // height: 22px;
      text-align: center;
      line-height: 22px;
      transition: transform 0.2s ease;
      font-size: 20px;
      border: 1px solid #d4d4d4;
      padding: 0px 3px;
      border-radius: 3px;
      span {
      }
      &:hover {
        transform: scale(1.2);
      }
      // &::before {
      //   // display: none;
      //   content: attr(data-tip);
      //   position: absolute;
      //   left: calc(100% + 20px);
      //   width: 100px;
      //   font-size: 12px;
      //   background: #fff;
      //   color: #000;
      //   padding: 10px;
      //   display: block;
      // }
    }
    .btn.active {
      color: #e74f09;
      // outline: 1px solid #ffed00;
      outline-offset: -2px;
      border: 1px solid #e74f09;
    }
  }

  .lt {
    transform: translateX(100%);
    right: -1px;
    // left: 100%;
  }
  .lt-0 {
    transform: translateX(0%);
  }
  .rt {
    transform: translateX(-100%);
    left: -1px;
    // left: -24px;
  }
</style>
