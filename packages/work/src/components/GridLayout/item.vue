<!-- eslint-disable vue/no-mutating-props -->
<template>
  <grid-item
    :style="style"
    v-bind="$attrs"
    :class="{ 'vue-grid-item-pre': work.mode === 'pre-render' }"
    :id="item.i"
    :i="item.i"
    :x="item.x"
    :y="item.y"
    :w="item.w"
    :h="item.h"
    :minH="5"
    :position.sync="item.pos"
    :left-scale.sync="item.lsca"
    :width-scale.sync="item.wsca"
    :is-derailed="item.isDerailed"
    ref="GridItem"
    @resize="resizeEvent"
    @resized="resizedEvent"
    @move="moveEvent"
    @moved="movedEvent"
    @hook:created="hookCreated"
    @hook:mounted="hookMounted"
    @container-resized="containerResizedEvent">
    <!-- {{ scope }} -->
    <!-- <div class="inner"> -->
    <slot v-bind="scope"></slot>
    <slot slot="other" name="other"></slot>
    <!-- </div> -->
  </grid-item>
</template>

<script>
  import { GridItem } from "@work/vue-grid-layout";
  // import { GridItem } from "vue-grid-layout";
  import { bool, object } from "vue-types";
  export default {
    inheritAttrs: false,
    components: { GridItem },
    inject: ["work"],
    props: {
      item: object().def({})
    },
    computed: {
      style() {
        const style = {};
        style["padding"] = "0px";
        // style["boxSizing"] = "border-box";
        // this.fixedHeight && (style["height"] = "100vh !important");
        // this.fixedHeight && (style["height"] = "800px");
        return style;
      }
    },
    data() {
      return {
        loaded: false,
        scope: {
          width: "",
          height: ""
        }
      };
    },
    mounted() {
      /**
       * 由于GridItem组件内部的style.width是经过多次异步更新计算的结果
       * 所以这里直接创建一个宏任务来拿到最新的值，再初始化work中的组件，将width和height传递进去
       */
      setTimeout(() => {
        // this.initWH();
        this.loaded = true;
      }, 0);
    },
    methods: {
      hookCreated() {
        // console.log("this.item.fixedHeight :>> ", this.item.fixedHeight);
        if (this.item.fixedHeight) {
          // this.item.h = 0;
        }
      },
      hookMounted() {
        setTimeout(() => {
          this.item.fixedHeight && this.work.setFullHeight(this.item.i);
        }, 0);
      },
      initWH() {
        this.scope.width = this.$refs["GridItem"].style.width;
        this.scope.height = this.$refs["GridItem"].style.height;
      },
      containerResizedEvent(i, newH, newW, newHPx, newWPx) {
        this.scope.width = newWPx + "px";
        this.scope.height = newHPx + "px";
      },
      resizeEvent(i, newH, newW, newHPx, newWPx) {
        // this.scope.width = newWPx + "px";
        // this.scope.height = newHPx + "px";
      },
      resizedEvent(i, newH, newW, newHPx, newWPx) {
        this.scope.width = newWPx + "px";
        this.scope.height = newHPx + "px";
      },
      moveEvent(i, newH, newW, newHPx, newWPx) {},
      movedEvent(i, newH, newW, newHPx, newWPx) {}
    }
  };
</script>

<style lang="less" scoped>
  .vue-grid-item:not(.vue-grid-placeholder) {
    position: relative;
    touch-action: none;
    // background: #edf0f8;
    // overflow: hidden;
    // box-shadow: 0px 0px 3px rgb(229, 229, 229);

    // outline: 1px dashed transparent;
  }
  .vue-grid-item-pre {
    /deep/ .border-dashed-hover {
      display: block;
    }
  }
  // .vue-grid-item .resizing {
  //   opacity: 0.9;
  // }

  // .vue-grid-item .text {
  //   // font-size: 24px;
  //   text-align: center;
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
  //   margin: auto;
  //   height: 100%;
  //   width: 100%;
  // }
  // .vue-grid-item .no-drag {
  //   height: 100%;
  //   width: 100%;
  // }
  // .vue-grid-item .minMax {
  //   font-size: 12px;
  // }
  // .vue-grid-item .add {
  //   cursor: pointer;
  // }
  // .vue-draggable-handle {
  //   position: absolute;
  //   width: 20px;
  //   height: 20px;
  //   top: 0;
  //   left: 0;
  //   background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  //   background-position: bottom right;
  //   padding: 0 8px 8px 0;
  //   background-repeat: no-repeat;
  //   background-origin: content-box;
  //   box-sizing: border-box;
  //   cursor: pointer;
  // }
</style>
