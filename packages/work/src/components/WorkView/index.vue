<template>
  <!-- 表示页面中的一个视图 -->
  <section class="work-view" v-bind="$attrs" :style="style" @click.self="clickSelf">
    <!-- {{ rowHeight }} -->
    <!-- {{ work.mode }} -->
    <!-- {{ work.isHasMode(["dev", "edit"]) }} -->
    <grid-layout :class="{ grid: work.isHasMode(['dev', 'edit']) }" :mode="mode" :layout.sync="layouts" :row-height="rowHeight" :style="gridLayoutStyle">
      <component :is="componentName" v-for="(item, index) in layouts" :key="item.i" :item="item" :index="index"></component>
    </grid-layout>
  </section>
</template>

<script>
  import { object, oneOfType, string, number } from "vue-types";
  import GridLayout from "../GridLayout/index.vue";
  import EditWorkComponent from "../WorkComponent/index.edit.vue";
  import RenderWorkComponent from "../WorkComponent/index.render.vue";
  // work模式映射组件列表
  const modeComponentMap = {
    ["dev"]: EditWorkComponent,
    ["edit"]: EditWorkComponent,
    ["pre-render"]: RenderWorkComponent,
    ["render"]: RenderWorkComponent
  };
  export default {
    components: { GridLayout, ...modeComponentMap },
    inject: ["work", "$Work"],
    props: {
      viewIndex: number().def(0),
      rowHeight: number().def(1),
      height: string().def("")
    },
    computed: {
      componentName() {
        return modeComponentMap[this.work.mode];
      },
      mode() {
        return this.work.mode;
      },
      views() {
        return this.work.state.views || [];
      },
      layouts({ workModel } = state) {
        return this.views[this.viewIndex].elements || [];
      },
      gridLayoutStyle() {
        return {
          // grid-layout高度 = 用work-view的高度 - work-view的padding-top - work-view的padding-bottom
          minHeight: `calc(${this.style.height} - ${this.padding.top}px - ${this.padding.bottom}px)`,
          "--grid": `calc(calc(100% - 0px) / 144) ${this.rowHeight}px`
        };
      },
      style() {
        return {
          padding: `${this.padding.top}px ${this.padding.right}px ${this.padding.bottom}px ${this.padding.left}px`,
          // work-view 高度计算 = 用父级work的高度 - 父级work的padding-top - 父级work的padding-bottom
          height: `calc(${this.height} - ${this.$Work.padding.top}px - ${this.$Work.padding.bottom}px)`
        };
      }
    },
    data() {
      return {
        padding: {
          top: "10",
          bottom: "0",
          left: "10",
          right: "10"
        }
      };
    },

    methods: {
      clickSelf(e) {
        // console.log(e.target);
      }
    },
    deactivated() {
      // this.work.removeAllListeners();
    },
    destroyed() {
      // this.work.removeAllListeners();
    }
  };
</script>

<style lang="less" scoped>
  .work-view {
    overflow-x: hidden;
    overflow-y: auto;
    // border: 1px solid red;

    &::-webkit-scrollbar {
      width: 6px;
      background: #e4e4e4;
    }
    /* 滚动条的滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: #cecece;
      border-radius: 3px;
      box-shadow: none;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    .grid {
      height: 100%;
      // min-height: calc(100vh - 56px);
    }
    .grid /deep/ .vue-grid-placeholder {
      background: #0a9df0 !important;
      z-index: 2;
    }

    .grid::before {
      pointer-events: none;
      content: "";
      background-size: var(--grid);
      background-image: linear-gradient(to right, lightgrey 0px, transparent 1px), linear-gradient(to bottom, lightgrey 0px, transparent 1px);
      height: calc(100% - 0px);
      width: calc(100% - 0px);
      background-repeat: repeat;
      margin: 0px;
      position: absolute;
      left: 0;
      top: 0;
      // background size = calc(calc(100% - (margin/2)) / colNum) rowHeight + margin;
      // height: calc(100% - (margin/2))
      // width: calc(100% - (margin/2))
      // margin: margin / 2
    }
  }
</style>
