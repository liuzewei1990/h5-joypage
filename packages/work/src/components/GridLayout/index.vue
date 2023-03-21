<template>
  <grid-layout
    ref="gridLayout"
    @click.native.self="clickSelf"
    @layout-ready="layoutReadyEvent"
    :col-num="144"
    :max-rows="Infinity"
    :margin="[0, 0]"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :is-bounded="true"
    :auto-size="true"
    :vertical-compact="true"
    :restore-on-drag="false"
    :prevent-collision="false"
    :use-css-transforms="true"
    :use-style-cursor="false"
    v-bind="$attrs"
    :transformScale="1"
    v-on="$listeners">
    <!-- <div v-show="isLayoutReady"> -->
    <slot></slot>
    <!-- </div> -->
  </grid-layout>
</template>

<script>
  import { GridLayout } from "@work/vue-grid-layout";
  // import { GridLayout } from "vue-grid-layout";
  export default {
    inheritAttrs: false,
    components: { GridLayout },
    inject: ["work"],
    data() {
      return {
        isLayoutReady: false
      };
    },
    mounted() {
      window.gridLayout = this.$refs["gridLayout"];
    },
    methods: {
      layoutReadyEvent() {
        this.isLayoutReady = true;
      },
      clickSelf(e) {
        this.work.emit("全局事件-Canvas画板-点击");
      }
    }
  };
</script>
