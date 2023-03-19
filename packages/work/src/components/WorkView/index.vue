<template>
  <!-- 表示页面中的一个视图 -->
  <section class="work-view" v-bind="$attrs" :style="{ height: height }">
    <!-- {{ work.mode }} -->
    <!-- {{ work.isHasMode(["dev", "edit"]) }} -->
    <grid-layout
      :class="{ grid: work.isHasMode(['dev', 'edit']) }"
      :mode="mode"
      :layout.sync="layouts"
      :row-height="rowHeight"
      :style="{ minHeight: height, '--grid': `calc(calc(100% - 0px) / 144) ${rowHeight}px` }">
      <component :is="componentName" v-for="(item, index) in layouts" :key="item.i" :item="item" :index="index"></component>
    </grid-layout>
  </section>
</template>

<script>
  import elementResizeDetectorMaker from "element-resize-detector";
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
    inject: ["work"],
    props: {
      viewIndex: number().def(0),
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
      }
    },
    data() {
      return {
        // 给grid-layout网格的可视区域分配1000行
        rowNum: 100,
        rowHeight: 1
      };
    },
    mounted() {
      // this.rowNum = this.$el.clientHeight;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(this.$el, () => {
        // this.rowHeight = this.$el.clientHeight / this.rowNum;
      });
    },
    deactivated() {
      this.work.removeAllListeners();
    },
    destroyed() {
      this.work.removeAllListeners();
    }
  };
</script>

<style lang="less" scoped>
  .work-view {
    overflow-x: hidden;
    overflow-y: auto;
    // border: 1px solid red;

    &::-webkit-scrollbar {
      width: 0px;
    }
    /* 滚动条的滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: #9c9c9c30;
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
