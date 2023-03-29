<!-- eslint-disable vue/no-mutating-props -->
<template>
  <grid-item
    :container-style="style"
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
    @click.native="clickSelf"
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
  import { WorkComponentStyleClass } from "../../class/work.class";

  export default {
    inheritAttrs: false,
    components: { GridItem },
    inject: ["work"],
    props: {
      item: object().def({})
    },
    computed: {
      // 将elStyle样式数据转换成css需要的px单位
      style() {
        const style = WorkComponentStyleClass.transformStylePx(this.item.elStyle);
        return style;
      }
    },
    data() {
      return {
        scope: {
          width: "",
          height: ""
        }
      };
    },
    mounted() {
      /**
       * 1.解决编辑时存量数据信息
       * 2.解决线上时存量数据配置
       * 3.解决WorkComponentStyleClass类新增配置字段同步
       */
      this.$set(this.item, "elStyle", { ...new WorkComponentStyleClass(), ...this.item.elStyle });
    },
    methods: {
      clickSelf(e) {
        this.work.emit("全局事件-网格项目-点击");
      },
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
    // background: #edf0f8; // 暂时写死 以后改成配置
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
