<template>
  <div ref="item" class="vue-grid-layout 父容器" :style="mergedStyle">
    <grid-item
      class="vue-grid-placeholder"
      v-if="isHasMode(['dev', 'edit'])"
      placeholder
      v-show="isDragging"
      :x="placeholder.x"
      :y="placeholder.y"
      :w="placeholder.w"
      :h="placeholder.h"
      :i="placeholder.i"></grid-item>
    <slot></slot>
  </div>
</template>
<style>
  .vue-grid-layout {
    position: relative;
    /* transform-style: preserve-3d; 处理子集层级问题 */
    transform-style: preserve-3d;
    transition: height 200ms ease;
    /* background: #f1f1f1; */
  }
</style>
<script>
  import Vue from "vue";
  const elementResizeDetectorMaker = require("element-resize-detector");

  import { bottom, compact, getLayoutItem, moveElement, validateLayout, cloneLayout, getAllCollisions } from "../helpers/utils";
  import { getBreakpointFromWidth, getColsFromBreakpoint, findOrGenerateResponsiveLayout } from "../helpers/responsiveUtils";
  //var eventBus = require('./eventBus');

  import Grid from "./Grid.vue";
  import GridItem from "./GridItem.vue";
  import { addWindowEventListener, removeWindowEventListener } from "../helpers/DOM";

  export default {
    name: "GridLayout",
    provide() {
      return {
        eventBus: null,
        layout: this
      };
    },
    components: {
      GridItem,
      Grid
    },
    props: {
      // dev or edit or pre-render or render
      mode: {
        type: String,
        default: "edit"
      },
      // If true, the container height swells and contracts to fit contents
      autoSize: {
        type: Boolean,
        default: true
      },
      colNum: {
        type: Number,
        default: 12
      },
      rowHeight: {
        type: Number,
        default: 150
      },
      maxRows: {
        type: Number,
        default: Infinity
      },
      margin: {
        type: Array,
        default: function () {
          return [10, 10];
        }
      },
      isDraggable: {
        type: Boolean,
        default: true
      },
      isResizable: {
        type: Boolean,
        default: true
      },
      isBounded: {
        type: Boolean,
        default: false
      },
      useCssTransforms: {
        type: Boolean,
        default: true
      },
      verticalCompact: {
        type: Boolean,
        default: true
      },
      restoreOnDrag: {
        type: Boolean,
        default: false
      },
      layout: {
        type: Array,
        required: true
      },
      cols: {
        type: Object,
        default: function () {
          return { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
        }
      },
      preventCollision: {
        type: Boolean,
        default: false
      },
      useStyleCursor: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        width: null,
        mergedStyle: {},
        lastLayoutLength: 0,
        isDragging: false,
        placeholder: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          i: -1
        },
        originalLayout: null // store original Layout
      };
    },
    created() {
      const self = this;

      // Accessible refernces of functions for removing in beforeDestroy
      self.resizeEventHandler = function (eventType, i, x, y, h, w) {
        self.resizeEvent(eventType, i, x, y, h, w);
      };

      self.dragEventHandler = function (eventType, i, x, y, h, w) {
        self.dragEvent(eventType, i, x, y, h, w);
      };

      self.verticalCompactHandler = function () {
        compact(self.layout, self.verticalCompact);
      };

      self._provided.eventBus = new Vue();
      self.eventBus = self._provided.eventBus;
      self.eventBus.$on("resizeEvent", self.resizeEventHandler);
      self.eventBus.$on("dragEvent", self.dragEventHandler);
      self.eventBus.$on("verticalCompact", self.verticalCompactHandler);
      self.$emit("layout-created", self.layout);

      // 将 实例存入window中 方便其他组件调用更新
      window.VueGridLayout = this;
    },
    beforeDestroy: function () {
      //Remove listeners
      this.eventBus.$off("resizeEvent", this.resizeEventHandler);
      this.eventBus.$off("dragEvent", this.dragEventHandler);
      this.eventBus.$off("verticalCompact", this.verticalCompactHandler);
      this.eventBus.$destroy();
      removeWindowEventListener("resize", this.onWindowResize);
      if (this.erd) {
        this.erd.uninstall(this.$refs.item);
      }
    },
    beforeMount: function () {
      this.$emit("layout-before-mount", this.layout);
    },
    mounted: function () {
      this.$emit("layout-mounted", this.layout);
      this.$nextTick(function () {
        // 第一步：验证props的layout数组，抛出错误
        validateLayout(this.layout);

        this.originalLayout = this.layout;
        const self = this;
        this.$nextTick(function () {
          // 计算layout容器宽度、执行resizeEvent方法
          self.onWindowResize();

          //self.width = self.$el.offsetWidth;
          // 监听window resize事件 重新执行resizeEvent方法
          addWindowEventListener("resize", self.onWindowResize);

          // 处理是否紧凑型布局，自动消除item垂直方向的间隙
          compact(self.layout, self.verticalCompact);

          self.$emit("layout-updated", self.layout);

          // 计算layout容器高度
          self.updateHeight();

          // 监听layout容器元素宽高变化。重新执行resizeEvent方法
          self.$nextTick(function () {
            this.erd = elementResizeDetectorMaker({
              strategy: "scroll", //<- For ultra performance.
              // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
              callOnAdd: false
            });
            this.erd.listenTo(self.$refs.item, function () {
              self.onWindowResize();
            });
          });
        });
      });
    },
    watch: {
      width: function (newval, oldval) {
        const self = this;
        this.$nextTick(function () {
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.$emit("updateWidth", this.width);
          if (oldval === null) {
            /*
                            If oldval == null is when the width has never been
                            set before. That only occurs when mouting is
                            finished, and onWindowResize has been called and
                            this.width has been changed the first time after it
                            got set to null in the constructor. It is now time
                            to issue layout-ready events as the GridItems have
                            their sizes configured properly.

                            The reason for emitting the layout-ready events on
                            the next tick is to allow for the newly-emitted
                            updateWidth event (above) to have reached the
                            children GridItem-s and had their effect, so we're
                            sure that they have the final size before we emit
                            layout-ready (for this GridLayout) and
                            item-layout-ready (for the GridItem-s).

                            This way any client event handlers can reliably
                            invistigate stable sizes of GridItem-s.
                        */
            this.$nextTick(() => {
              this.$emit("layout-ready", self.layout);
              this.eventBus.$emit("layoutReady");
              // console.log("layout-ready了");
            });
          }
          this.updateHeight();
        });
      },
      layout: function () {
        this.layoutUpdate();
      },
      colNum: function (val) {
        this.eventBus.$emit("setColNum", val);
      },
      rowHeight: function () {
        this.eventBus.$emit("setRowHeight", this.rowHeight);
      },
      isDraggable: function () {
        this.eventBus.$emit("setDraggable", this.isDraggable);
      },
      isResizable: function () {
        this.eventBus.$emit("setResizable", this.isResizable);
      },
      isBounded: function () {
        this.eventBus.$emit("setBounded", this.isBounded);
      },
      maxRows: function () {
        this.eventBus.$emit("setMaxRows", this.maxRows);
      },
      margin() {
        this.updateHeight();
      }
    },
    methods: {
      /**
       * layout 数组数据变化后重新布局
       */
      layoutUpdate() {
        if (this.layout !== undefined && this.originalLayout !== null) {
          if (this.layout.length !== this.originalLayout.length) {
            // console.log("### LAYOUT UPDATE!", this.layout.length, this.originalLayout.length);

            let diff = this.findDifference(this.layout, this.originalLayout);
            if (diff.length > 0) {
              // console.log(diff);
              if (this.layout.length > this.originalLayout.length) {
                this.originalLayout = this.originalLayout.concat(diff);
              } else {
                this.originalLayout = this.originalLayout.filter((obj) => {
                  return !diff.some((obj2) => {
                    return obj.i === obj2.i;
                  });
                });
              }
            }

            this.lastLayoutLength = this.layout.length;
          }

          compact(this.layout, this.verticalCompact);
          this.eventBus.$emit("updateWidth", this.width);
          this.updateHeight();

          this.$emit("layout-updated", this.layout);
        }
      },

      /**
       * 更新容器高度
       */
      updateHeight: function () {
        this.mergedStyle = {
          height: this.containerHeight()
        };
      },

      onWindowResize: function () {
        if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
          this.width = this.$refs.item.offsetWidth;
        }
        this.eventBus.$emit("windowResize");
        this.eventBus.$emit("resizeEvent");
      },
      containerHeight: function () {
        if (!this.autoSize) return;
        // console.log("bottom: " + bottom(this.layout))
        // console.log("rowHeight + margins: " + (this.rowHeight + this.margin[1]) + this.margin[1])
        const containerHeight = bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + "px";
        return containerHeight;
      },
      dragEvent: function (eventName, id, x, y, h, w) {
        //console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
        // 找到当前的item
        let l = getLayoutItem(this.layout, id);
        //GetLayoutItem sometimes returns null object
        if (l === undefined || l === null) {
          l = { x: 0, y: 0 };
        }

        if (eventName === "dragstart" && !this.verticalCompact) {
          // 当 非verticalCompact 时，记录每个item起始网格位置
          this.positionsBeforeDrag = this.layout.reduce(
            (result, { i, x, y }) => ({
              ...result,
              [i]: { x, y }
            }),
            {}
          );
        }

        if (eventName === "dragmove" || eventName === "dragstart") {
          this.placeholder.i = id;
          this.placeholder.x = l.x;
          this.placeholder.y = l.y;
          this.placeholder.w = w;
          this.placeholder.h = h;
          this.$nextTick(function () {
            this.isDragging = true;
          });
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.$emit("updateWidth", this.width);
        } else {
          this.$nextTick(function () {
            this.isDragging = false;
          });
        }

        // Move the element to the dragged location.
        // eslint-disable-next-line vue/no-mutating-props
        this.layout = moveElement(this.layout, l, x, y, true, this.preventCollision);

        if (this.restoreOnDrag) {
          // 指示在拖动项目后是否应恢复移动的网格项目。
          // Do not compact items more than in layout before drag
          // Set moved item as static to avoid to compact it
          l.static = true;
          compact(this.layout, this.verticalCompact, this.positionsBeforeDrag);
          l.static = false;
        } else {
          compact(this.layout, this.verticalCompact);
        }

        // needed because vue can't detect changes on array element properties
        // 需要，因为vue无法检测数组元素财产的更改
        this.eventBus.$emit("compact");
        this.updateHeight();
        if (eventName === "dragend") {
          delete this.positionsBeforeDrag;
          this.$emit("layout-updated", this.layout);
        }
      },
      resizeEvent: function (eventName, id, x, y, h, w) {
        let l = getLayoutItem(this.layout, id);
        //GetLayoutItem sometimes return null object
        if (l === undefined || l === null) {
          // 第一次初始化的宽高默认值
          l = { h: 0, w: 0 };
        }

        let hasCollisions;
        // 防止碰撞开启
        if (this.preventCollision) {
          const collisions = getAllCollisions(this.layout, { ...l, w, h }).filter((layoutItem) => layoutItem.i !== l.i);
          hasCollisions = collisions.length > 0;

          // If we're colliding, we need adjust the placeholder.
          if (hasCollisions) {
            // adjust w && h to maximum allowed space
            let leastX = Infinity,
              leastY = Infinity;
            collisions.forEach((layoutItem) => {
              if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
              if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
            });

            if (Number.isFinite(leastX)) l.w = leastX - l.x;
            if (Number.isFinite(leastY)) l.h = leastY - l.y;
          }
        }

        if (!hasCollisions) {
          // Set new width and height.
          l.x = x;
          l.y = y;
          l.w = w;
          l.h = h;
        }

        if (eventName === "resizestart" || eventName === "resizemove") {
          this.placeholder.i = id;
          this.placeholder.x = x;
          this.placeholder.y = y;
          this.placeholder.w = l.w;
          this.placeholder.h = l.h;
          this.$nextTick(function () {
            this.isDragging = true;
          });
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.$emit("updateWidth", this.width);
        } else {
          this.$nextTick(function () {
            this.isDragging = false;
          });
        }

        compact(this.layout, this.verticalCompact);
        this.eventBus.$emit("compact");
        this.updateHeight();

        if (eventName === "resizeend") this.$emit("layout-updated", this.layout);
      },

      // find difference in layouts
      findDifference(layout, originalLayout) {
        //Find values that are in result1 but not in result2
        let uniqueResultOne = layout.filter(function (obj) {
          return !originalLayout.some(function (obj2) {
            return obj.i === obj2.i;
          });
        });

        //Find values that are in result2 but not in result1
        let uniqueResultTwo = originalLayout.filter(function (obj) {
          return !layout.some(function (obj2) {
            return obj.i === obj2.i;
          });
        });

        //Combine the two arrays of unique entries#
        return uniqueResultOne.concat(uniqueResultTwo);
      },

      isHasMode(list = []) {
        return !!list.find((item) => item === this.mode);
      }
    }
  };
</script>
