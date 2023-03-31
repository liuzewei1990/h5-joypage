<!-- eslint-disable vue/no-mutating-props -->
<template>
  <grid-item
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

  export default {
    inheritAttrs: false,
    components: { GridItem },
    inject: ["work"],
    props: {
      item: object().def({})
    },
    data() {
      return {
        scope: {
          width: "",
          height: ""
        }
      };
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
  }
  .vue-grid-item-pre {
    /deep/ .border-dashed-hover {
      display: block;
    }
  }
</style>
