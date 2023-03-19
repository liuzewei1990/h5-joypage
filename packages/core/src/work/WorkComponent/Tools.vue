<template>
  <div class="work-edit-container" @click="showTools">
    <slot ref="content"></slot>
    <div class="tools" :class="[isFrontier]" flex="dir:top" v-if="item.isResizable">
      <!-- <a-icon type="form" @click="edit" /> -->
      <!-- <a-icon class="btn" :type="item.static ? 'lock' : 'unlock'" @click="lock" />
      <a-icon class="btn" type="column-height" @click="colH" />
      <a-icon class="btn" :type="item.fixedHeight ? 'fullscreen-exit' : 'fullscreen'" @click="fullscreen" />
      <a-icon class="btn" type="delete" @click="del" /> -->

      <!-- <template>
        <span class="btn iconfont icon-grid" v-if="!item.isDerailed" @click="clickDerailed(true)"></span>
        <span class="btn iconfont icon-caidancengji" v-else @click="clickDerailed(false)"></span>
      </template>
      <span class="btn iconfont icon-colum-height" @click="colH" data-tip="提示内容：CSS实现效果"></span>
      <span class="btn iconfont icon-dashujukeshihuaico-1" @click="zIndex('++')"></span>
      <span class="btn iconfont icon-dashujukeshihuaico-" @click="zIndex('--')"></span>
      <span class="btn iconfont icon-shanchu1" @click="del"></span>
      <span class="btn iconfont icon-zhanmanzhenggerongqidegaodu" :class="{ active: item.fixedHeight }" @click="fullscreen"></span> -->
    </div>
  </div>
</template>

<script>
  import { bool, number, object } from "vue-types";
  export default {
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
        this.$set(this.item, "isDerailed", bool);
      },
      zIndex(fo) {
        this.work.changezIndex(this.item.i, fo);
      }
    }
  };
</script>

<style lang="less" scoped>
  .work-edit-container {
    position: absolute;
    height: 100%;
    width: 100%;
    // transform-style: preserve-3d;

    .tools {
      // transform: translateZ(10px);
      position: absolute;
      // z-index: 999; 原来的
      z-index: 2;
      // left: 100%;
      top: 0;
      font-size: 15px;
      color: #fff;
      background: #1890ff;
      border-radius: 2px;
      padding: 3px 2px;
      cursor: pointer;
      transition: transform 0.3s;

      .btn {
        // border: 1px solid red;
        margin: 1px 1px;
        font-size: 20px;
        height: 22px;
        position: relative;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
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
        background: #e45b5b;
      }
    }
    .lt {
      transform: translateX(100%) translateZ(10px);
      right: -3px;
      // left: 100%;
    }
    .lt-0 {
      left: 3px;
    }
    .rt {
      transform: translateX(-100%) translateZ(10px);
      left: -3px;
      // left: -24px;
    }
  }
</style>
