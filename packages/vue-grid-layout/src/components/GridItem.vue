<template>
  <div ref="item" class="vue-grid-item" :class="classObj" :style="cssStyle">
    <div class="vue-grid-item-container" :style="containerStyle">
      <slot></slot>
    </div>
    <!-- {{ isDragging }} -->
    <!-- <p>left:{{ position.left }}</p> -->
    <!-- <p>top:{{ position.top }}</p> -->
    <!-- <p>width:{{ position.width }}</p> -->
    <!-- <p>height:{{ position.height }}</p> -->
    <!-- <pre>{{ containerWidth }}</pre> -->
    <!-- <pre style="margin: 0">innerX：{{ innerX }}</pre>
    <pre style="margin: 0">innerY：{{ innerY }}</pre>
    <pre style="margin: 0">innerW：{{ innerW }}</pre>
    <pre style="margin: 0">innerH：{{ innerH }}</pre> -->
    <!-- <pre style="margin: 0">scaleLeftValue：{{ scaleLeftValue }}</pre> -->
    <div class="shape_controller n w t-left"></div>
    <div class="shape_controller s w b-left"></div>
    <div class="shape_controller n e t-right"></div>
    <div class="shape_controller s e b-right"></div>

    <div class="shape_controller n d t-top"></div>
    <div class="shape_controller s d b-bottom"></div>
    <div class="shape_controller w t l-left"></div>
    <div class="shape_controller e t r-right"></div>
    <!-- <span v-if="resizableAndNotStatic" ref="handle" :class="resizableHandleClass"></span> -->
    <!--<span v-if="draggable" ref="dragHandle" class="vue-draggable-handle"></span>-->

    <div class="border-line left"></div>
    <div class="border-line top"></div>
    <div class="border-line right"></div>
    <div class="border-line bottom"></div>

    <div class="border-dashed-hover"></div>

    <div class="other-container">
      <slot name="other"></slot>
    </div>
  </div>
</template>
<style>
  .vue-grid-item {
    transition-timing-function: ease;
    /* transition: all 200ms ease; */
    transition-property: left, top, right;
    /* background: rgb(255, 255, 255); */
    /* transform-style: preserve-3d; 处理子集层级问题 */
    transform-style: preserve-3d;
    /* add right for rtl */
  }

  .tran-dura {
    transition-duration: 200ms;
  }

  .vue-grid-item.actived {
    /* outline: 1px solid #70c0ff !important; */
    /* transform: translateZ(10px); */
    /* z-index: 3; */
  }

  .vue-grid-item .vue-grid-item-container {
    position: absolute;
    inset: 0;
    transform: translateZ(9px);
    overflow: hidden;
  }

  .vue-grid-item.actived .border-line {
    position: absolute;
    inset: 0;
    outline: 1px solid #70c0ff !important;
    outline-offset: -1px;
    pointer-events: none;
    transform: translateZ(10px);
  }

  .vue-grid-item .border-dashed-hover {
    display: none;
    position: absolute;
    inset: 0;
    outline: 1px dashed #70c0ff !important;
    outline-offset: -1px;
    pointer-events: none;
    transform: translateZ(10px);
  }

  .vue-grid-item.mouse-on:hover .border-dashed-hover {
    display: block;
  }

  .vue-grid-item.actived .shape_controller {
    position: absolute;
    background: #fff;
    border: 1px solid #70c0ff;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    box-sizing: border-box;
    transform: translateZ(11px);
  }

  .vue-grid-item .other-container {
    transform: translateZ(15px);
  }

  .vue-grid-item.actived .t-left:hover {
    cursor: nw-resize;
  }
  .vue-grid-item.actived .t-right:hover {
    cursor: ne-resize;
  }
  .vue-grid-item.actived .t-top:hover {
    cursor: n-resize;
  }

  .vue-grid-item.actived .b-left:hover {
    cursor: sw-resize;
  }
  .vue-grid-item.actived .b-right:hover {
    cursor: se-resize;
  }
  .vue-grid-item.actived .b-bottom:hover {
    cursor: s-resize;
  }

  .vue-grid-item.actived .l-left:hover {
    cursor: w-resize;
  }
  .vue-grid-item.actived .r-right:hover {
    cursor: e-resize;
  }

  /* .shape_controller.n.w {
        cursor: nw-resize;
    }
    .shape_controller.n.e {
        cursor: ne-resize;
    }
    .shape_controller.s.w {
        cursor: sw-resize;
    }
    .shape_controller.s.e {
        cursor: se-resize;
    } */
  .vue-grid-item.actived .shape_controller.n {
    top: -4px;
  }
  .vue-grid-item.actived .shape_controller.w {
    left: -4px;
  }
  .vue-grid-item.actived .shape_controller.s {
    bottom: -4px;
  }
  .vue-grid-item.actived .shape_controller.e {
    right: -4px;
  }
  .vue-grid-item.actived .shape_controller.d {
    left: calc(50% - 4px);
  }
  .vue-grid-item.actived .shape_controller.t {
    top: calc(50% - 4px);
  }

  .vue-grid-item.no-touch {
    -ms-touch-action: none;
    touch-action: none;
  }

  .vue-grid-item.cssTransforms {
    transition-property: transform;
    left: 0;
    right: auto;
  }

  .vue-grid-item.resizing {
    opacity: 0.6;
    /* z-index: 3; */
    transition: all 0ms ease !important;
  }

  .vue-grid-item.vue-draggable-dragging {
    transition: none;
    /* z-index: 3; */
  }

  .vue-grid-item.vue-grid-placeholder {
    /* transition: all 0ms ease !important; */
    background: #0a9df0 !important;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .vue-grid-item.disable-userselect {
    user-select: none;
  }
</style>
<script>
  import { setTopLeft, setTransform } from "../helpers/utils";
  import { getColsFromBreakpoint } from "../helpers/responsiveUtils";
  //    var eventBus = require('./eventBus');

  import "@interactjs/auto-start";
  import "@interactjs/auto-scroll";
  import "@interactjs/actions/drag";
  import "@interactjs/actions/resize";
  import "@interactjs/modifiers";
  import "@interactjs/dev-tools";
  import interact from "@interactjs/interact";

  export default {
    name: "GridItem",
    props: {
      /*cols: {
             type: Number,
             required: true
             },*/
      /*containerWidth: {
             type: Number,
             required: true

             },
             rowHeight: {
             type: Number,
             required: true
             },
             margin: {
             type: Array,
             required: true
             },
             maxRows: {
             type: Number,
             required: true
             },*/
      containerStyle: {
        type: Object,
        required: false,
        default: () => ({})
      },
      placeholder: {
        type: Boolean,
        default: false
      },
      // 新增 自由布局坐标系
      position: {
        type: Object,
        required: false,
        default: () => ({ top: 0 })
      },
      // 新增 pos的left缩放比
      leftScale: {
        type: Number,
        required: false,
        default: 0
      },
      // 新增 pos的width缩放比
      widthScale: {
        type: Number,
        required: false,
        default: 0
      },
      // 新增 是否使用自由布局
      isDerailed: {
        type: Boolean,
        required: false,
        default: null
      },
      isDraggable: {
        type: Boolean,
        required: false,
        default: null
      },
      isResizable: {
        type: Boolean,
        required: false,
        default: null
      },
      isBounded: {
        type: Boolean,
        required: false,
        default: null
      },
      /*useCssTransforms: {
             type: Boolean,
             required: true
             },
             */
      static: {
        type: Boolean,
        required: false,
        default: false
      },
      minH: {
        type: Number,
        required: false,
        default: 1
      },
      minW: {
        type: Number,
        required: false,
        default: 1
      },
      maxH: {
        type: Number,
        required: false,
        default: Infinity
      },
      maxW: {
        type: Number,
        required: false,
        default: Infinity
      },
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      w: {
        type: Number,
        required: true
      },
      h: {
        type: Number,
        required: true
      },
      i: {
        required: true
      },
      dragIgnoreFrom: {
        type: String,
        required: false,
        default: "a, button"
      },
      dragAllowFrom: {
        type: String,
        required: false,
        default: null
      },
      resizeIgnoreFrom: {
        type: String,
        required: false,
        default: "a, button"
      },
      // resize时保持纵横比
      preserveAspectRatio: {
        type: Boolean,
        required: false,
        default: false
      },
      dragOption: {
        type: Object,
        required: false,
        default: () => ({})
      },
      resizeOption: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    inject: ["eventBus", "layout"],
    data: function () {
      return {
        cols: 1,
        containerWidth: 100,
        rowHeight: 30,
        margin: [10, 10],
        maxRows: Infinity,
        draggable: null,
        resizable: null,
        useCssTransforms: true,
        useStyleCursor: true,

        // 新增-是否自由布局
        derailed: false,
        isDragging: false,
        dragging: null,
        isResizing: false,
        resizing: null,
        lastX: NaN,
        lastY: NaN,
        lastW: NaN,
        lastH: NaN,
        style: {},

        dragEventSet: false,
        resizeEventSet: false,

        // 上一次的宽
        previousW: null,
        previousH: null,
        previousX: null,
        previousY: null,
        innerX: this.x,
        innerY: this.y,
        innerW: this.w,
        innerH: this.h,
        pos: {
          // left: 10,
          // top: 100,
          // height: 200,
          // width: 200
        },
        scaleLeftValue: 0,
        scaleWidthValue: 0,
        layoutReady: false
      };
    },
    created() {
      let self = this;

      // Accessible refernces of functions for removing in beforeDestroy
      self.updateWidthHandler = function (width) {
        self.updateWidth(width);
      };

      self.compactHandler = function (layout) {
        self.compact(layout);
      };

      self.setDraggableHandler = function (isDraggable) {
        if (self.isDraggable === null) {
          self.draggable = isDraggable;
        }
      };

      self.setResizableHandler = function (isResizable) {
        if (self.isResizable === null) {
          self.resizable = isResizable;
        }
      };

      self.setBoundedHandler = function (isBounded) {
        if (self.isBounded === null) {
          self.bounded = isBounded;
        }
      };

      self.setRowHeightHandler = function (rowHeight) {
        self.rowHeight = rowHeight;
      };

      self.setMaxRowsHandler = function (maxRows) {
        self.maxRows = maxRows;
      };

      self.setColNum = (colNum) => {
        self.cols = parseInt(colNum);
      };

      self.layoutReadyHandler = () => {
        // this.layoutReady = true;
      };
      self.windowResizeHandler = () => {
        // this.windowResize = true;
        // this.layoutReady = true;
      };

      this.eventBus.$on("updateWidth", self.updateWidthHandler);
      this.eventBus.$on("compact", self.compactHandler);
      this.eventBus.$on("setDraggable", self.setDraggableHandler);
      this.eventBus.$on("setResizable", self.setResizableHandler);
      this.eventBus.$on("setBounded", self.setBoundedHandler);
      this.eventBus.$on("setRowHeight", self.setRowHeightHandler);
      this.eventBus.$on("setMaxRows", self.setMaxRowsHandler);
      this.eventBus.$on("setColNum", self.setColNum);
      this.eventBus.$on("layoutReady", self.layoutReadyHandler);
      this.eventBus.$on("windowResize", self.windowResizeHandler);
    },
    beforeDestroy: function () {
      let self = this;
      //Remove listeners
      this.eventBus.$off("updateWidth", self.updateWidthHandler);
      this.eventBus.$off("compact", self.compactHandler);
      this.eventBus.$off("setDraggable", self.setDraggableHandler);
      this.eventBus.$off("setResizable", self.setResizableHandler);
      this.eventBus.$off("setBounded", self.setBoundedHandler);
      this.eventBus.$off("setRowHeight", self.setRowHeightHandler);
      this.eventBus.$off("setMaxRows", self.setMaxRowsHandler);
      this.eventBus.$off("setColNum", self.setColNum);
      this.eventBus.$off("layoutReady", self.layoutReadyHandler);
      this.eventBus.$off("windowResize", self.windowResizeHandler);
      if (this.interactObj) {
        this.interactObj.unset(); // destroy interact intance
      }
    },
    mounted: function () {
      this.cols = this.layout.colNum;
      this.rowHeight = this.layout.rowHeight;
      this.containerWidth = this.layout.width !== null ? this.layout.width : 100;
      this.margin = this.layout.margin !== undefined ? this.layout.margin : [10, 10];
      this.maxRows = this.layout.maxRows;

      this.derailed = this.isDerailed;
      this.pos = Object.assign(this.pos, this.position);
      this.scaleLeftValue = this.leftScale;
      this.scaleWidthValue = this.widthScale;

      if (this.isDraggable === null) {
        this.draggable = this.layout.isDraggable;
      } else {
        this.draggable = this.isDraggable;
      }
      if (this.isResizable === null) {
        this.resizable = this.layout.isResizable;
      } else {
        this.resizable = this.isResizable;
      }
      if (this.isBounded === null) {
        this.bounded = this.layout.isBounded;
      } else {
        this.bounded = this.isBounded;
      }
      this.useCssTransforms = this.layout.useCssTransforms;
      this.useStyleCursor = this.layout.useStyleCursor;
      this.createStyle();
      setTimeout(() => {
        this.layoutReady = true;
      }, 0);
    },
    watch: {
      pos: function () {
        this.$emit("update:position", this.pos);
      },
      isDerailed: function () {
        this.derailed = this.isDerailed;
      },
      scaleLeftValue: function () {
        this.$emit("update:leftScale", this.scaleLeftValue);
      },
      scaleWidthValue: function () {
        this.$emit("update:widthScale", this.scaleWidthValue);
      },
      derailed: function () {
        this.scaleLeftValue = this.containerWidth / this.pos.left;
        this.scaleWidthValue = this.containerWidth / this.pos.width;
        this.createStyle();
        this.eventBus.$emit("verticalCompact"); // 通知父级重新计算约束布局网格项目的位置
      },
      isDraggable: function () {
        this.draggable = this.isDraggable;
      },
      static: function () {
        this.tryMakeDraggable();
        this.tryMakeResizable();
      },
      draggable: function () {
        this.tryMakeDraggable();
      },
      isResizable: function () {
        this.resizable = this.isResizable;
      },
      isBounded: function () {
        this.bounded = this.isBounded;
      },
      resizable: function () {
        this.tryMakeResizable();
      },
      rowHeight: function () {
        this.createStyle();
        this.emitContainerResized();
      },
      cols: function () {
        this.tryMakeResizable();
        this.createStyle();
        this.emitContainerResized();
      },
      containerWidth: function () {
        this.tryMakeResizable();
        this.createStyle();
        this.emitContainerResized();
      },
      x: function (newVal) {
        this.innerX = newVal;
        this.createStyle();
      },
      y: function (newVal) {
        this.innerY = newVal;
        this.createStyle();
      },
      h: function (newVal) {
        this.innerH = newVal;
        this.createStyle();
        // this.emitContainerResized();
      },
      w: function (newVal) {
        this.innerW = newVal;
        this.createStyle();
        // this.emitContainerResized();
      },
      minH: function () {
        this.tryMakeResizable();
      },
      maxH: function () {
        this.tryMakeResizable();
      },
      minW: function () {
        this.tryMakeResizable();
      },
      maxW: function () {
        this.tryMakeResizable();
      },
      "$parent.margin": function (margin) {
        if (!margin || (margin[0] == this.margin[0] && margin[1] == this.margin[1])) {
          return;
        }
        this.margin = margin.map((m) => Number(m));
        this.createStyle();
        this.emitContainerResized();
      }
    },
    computed: {
      classObj() {
        return {
          "mouse-on": this.layout.isHasMode(["dev", "edit", "pre-render"]),
          "tran-dura": this.layout.isHasMode(["dev", "edit"]) && this.layoutReady,
          "vue-resizable": this.resizableAndNotStatic,
          static: this.static,
          actived: this.resizable,
          resizing: this.isResizing,
          "vue-draggable-dragging": this.isDragging,
          cssTransforms: this.useCssTransforms,
          "disable-userselect": this.isDragging,
          "no-touch": this.isAndroid && this.draggableOrResizableAndNotStatic
        };
      },
      resizableAndNotStatic() {
        return this.resizable && !this.static;
      },
      draggableOrResizableAndNotStatic() {
        return (this.draggable || this.resizable) && !this.static;
      },
      isAndroid() {
        return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
      },

      cssStyle() {
        return { ...this.style };
      }
    },
    methods: {
      /**
       * 渲染函数，负责生成css坐标系
       * 将layout x、y、w、h坐标 转换成 style : left、top、width、height
       */
      createStyle: function () {
        // console.log("渲染");
        // 边界判断
        if (this.x + this.w > this.cols) {
          this.innerX = 0;
          this.innerW = this.w > this.cols ? this.cols : this.w;
        } else {
          this.innerX = this.x;
          this.innerW = this.w;
        }

        // console.log(this.innerX, this.innerY, this.innerW, this.innerH);
        let pos = {};
        if (this.derailed) {
          // 自由布局 直接赋值
          // pos = this.pos;
          pos = this.calcPositionPxScale(this.pos.left, this.pos.top, this.pos.width, this.pos.height);
        } else {
          // 约束布局 坐标系转换
          pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);
        }
        // console.log({...pos});

        if (this.isDragging) {
          pos.top = this.dragging.top;
          pos.left = this.dragging.left;
        }
        if (this.isResizing) {
          pos.left = this.resizing.left;
          pos.top = this.resizing.top;
          pos.width = this.resizing.width;
          pos.height = this.resizing.height;
        }

        // 限制容器内拖动和大小
        if (!this.placeholder) {
          pos.width = this.clamp(pos.width, 0, this.containerWidth);
          // pos.height = this.clamp(pos.height, 0, this.$el.offsetParent?.clientHeight - this.margin[1] * 2);
          pos.left = this.clamp(pos.left, 0, this.containerWidth - pos.width);
          pos.top = this.clamp(pos.top, 0, Infinity);
        }

        let style;
        // CSS Transforms support (default)
        if (this.useCssTransforms) {
          style = setTransform(pos.top, pos.left, pos.width, pos.height);
        } else {
          style = setTopLeft(pos.top, pos.left, pos.width, pos.height);
        }

        this.pos = { ...pos };
        this.style = style;
      },

      /**
       * 发送容器变化的事件 container-resized
       */
      emitContainerResized() {
        // this.style has width and height with trailing 'px'. The
        // resized event is without them
        let styleProps = {};
        for (let prop of ["width", "height"]) {
          let val = this.style[prop];
          let matches = val.match(/^(\d+)px$/);
          if (!matches) return;
          styleProps[prop] = matches[1];
        }
        this.$emit("container-resized", this.i, this.h, this.w, styleProps.height, styleProps.width);
      },

      /**
       * interactObj 改变大小的处理函数
       * @param {*} event
       */
      handleResize: function (event) {
        if (this.static) return;
        let newSize = { width: 0, height: 0, left: 0, top: 0 };
        newSize.left = this.pos.left;
        newSize.top = this.pos.top;
        let pos;
        switch (event.type) {
          case "resizestart": {
            this.tryMakeResizable();
            this.previousW = this.innerW;
            this.previousH = this.innerH;
            newSize.width = event.rect.width;
            newSize.height = event.rect.height;
            newSize.left += event.deltaRect.left;
            newSize.top += event.deltaRect.top;
            this.resizing = newSize;
            this.isResizing = true;
            break;
          }
          case "resizemove": {
            newSize.width = event.rect.width;
            newSize.height = event.rect.height;
            newSize.left += event.deltaRect.left;
            newSize.top += event.deltaRect.top;

            if (true) {
              // newSize.width = newSize.left + newSize.width > this.containerWidth ? this.containerWidth - newSize.left : newSize.width;
              // newSize.width = this.clamp(newSize.width, 0, this.containerWidth - newSize.left);
              // newSize.left = newSize.left < 0 ? 0 : newSize.left;
              // newSize.top = newSize.top < 0 ? 0 : newSize.top;
            }

            this.resizing = newSize;
            break;
          }
          case "resizeend": {
            newSize.width = event.rect.width;
            newSize.height = event.rect.height;
            newSize.left += event.deltaRect.left;
            newSize.top += event.deltaRect.top;
            this.resizing = null;
            this.isResizing = false;

            // 缓存元素width的占比
            this.scaleWidthValue = this.containerWidth / newSize.width;
            break;
          }
        }

        // Get new WH
        pos = { ...this.calcXY(newSize.top, newSize.left), ...this.calcWH(newSize.height, newSize.width) };
        if (pos.w < this.minW) {
          pos.w = this.minW;
        }
        if (pos.w > this.maxW) {
          pos.w = this.maxW;
        }
        if (pos.h < this.minH) {
          pos.h = this.minH;
        }
        if (pos.h > this.maxH) {
          pos.h = this.maxH;
        }

        if (pos.h < 1) {
          pos.h = 1;
        }
        if (pos.w < 1) {
          pos.w = 1;
        }

        if (this.innerW !== pos.w || this.innerH !== pos.h) {
          this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
        }
        if (event.type === "resizeend" && (this.previousW !== this.innerW || this.previousH !== this.innerH)) {
          this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
        }
        this.eventBus.$emit("resizeEvent", event.type, this.i, pos.x, pos.y, pos.h, pos.w);
      },

      /**
       * interactObj 拖拽的处理函数
       * @param {*} event
       */
      handleDrag(event) {
        if (this.static) return;
        if (this.isResizing) return;
        let newPosition = { left: 0, top: 0 };
        newPosition.left = this.pos.left;
        newPosition.top = this.pos.top;
        switch (event.type) {
          case "dragstart": {
            this.previousX = this.innerX;
            this.previousY = this.innerY;
            newPosition.left += event.dx;
            newPosition.top += event.dy;
            this.dragging = newPosition;
            this.isDragging = true;
            break;
          }
          case "dragmove": {
            newPosition.left += event.dx;
            newPosition.top += event.dy;
            // 限制在容器内拖拽
            // if (this.bounded || this.derailed) {
            if (true) {
              // bottomBoundary 底部剩余空间 = 父容器空间 - 当前item占用空间
              // const bottomBoundary = event.target.offsetParent.clientHeight - this.calcGridItemWHPx(this.h, this.rowHeight, this.margin[1]);
              // newPosition.top = this.clamp(newPosition.top, 0, bottomBoundary);
              // const colWidth = this.calcColWidth();
              // const rightBoundary = this.containerWidth - this.calcGridItemWHPx(this.w, colWidth, this.margin[0]);
              // newPosition.left = this.clamp(newPosition.left, 0, rightBoundary);
            }
            // console.log("### drag move1 => " + JSON.stringify(newPosition));
            this.dragging = newPosition;
            break;
          }
          case "dragend": {
            if (!this.isDragging) return;
            newPosition.left += event.dx;
            newPosition.top += event.dy;
            this.isDragging = false;

            // 缓存元素left的占比
            this.scaleLeftValue = newPosition.left === 0 ? this.containerWidth : this.containerWidth / newPosition.left;

            break;
          }
        }

        // Get new XY
        let pos;
        pos = this.calcXY(newPosition.top, newPosition.left);

        if (this.innerX !== pos.x || this.innerY !== pos.y) {
          this.$emit("move", this.i, pos.x, pos.y);
        }
        if (event.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY)) {
          this.$emit("moved", this.i, pos.x, pos.y);
        }
        this.eventBus.$emit("dragEvent", event.type, this.i, pos.x, pos.y, this.innerH, this.innerW);
      },

      /**
       * 将网格单位转换成像素
       * @param {*} x
       * @param {*} y
       * @param {*} w
       * @param {*} h
       */
      calcPosition: function (x, y, w, h) {
        const colWidth = this.calcColWidth();
        return {
          left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
          top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
          // 0 * Infinity === NaN, which causes problems with resize constriants;
          // Fix this if it occurs.
          // Note we do it here rather than later because Math.round(Infinity) causes deopt
          width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
          height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
        };
      },

      calcPositionPxScale(left, top, width, height) {
        return {
          left: this.containerWidth / this.scaleLeftValue,
          // left: left * (this.containerWidth / left),
          top: top,
          width: this.containerWidth / this.scaleWidthValue,
          height: height
        };
      },

      /**
       * 将像素转换成网格单位
       * Translate x and y coordinates from pixels to grid units.
       * @param  {Number} top  Top position (relative to parent) in pixels.
       * @param  {Number} left Left position (relative to parent) in pixels.
       * @return {Object} x and y in grid units.
       */
      // TODO check if this function needs change in order to support rtl.
      calcXY(top, left) {
        const colWidth = this.calcColWidth();

        // left = colWidth * x + margin * (x + 1)
        // l = cx + m(x+1)
        // l = cx + mx + m
        // l - m = cx + mx
        // l - m = x(c + m)
        // (l - m) / (c + m) = x
        // x = (left - margin) / (coldWidth + margin)
        let x = Math.round((left - this.margin[0]) / (colWidth + this.margin[0]));
        let y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));

        // Capping
        x = Math.max(Math.min(x, this.cols - this.innerW), 0);
        y = Math.max(Math.min(y, this.maxRows - this.innerH), 0);

        return { x, y };
      },

      /**
       * 将像素转换成网格单位
       * Given a height and width in pixel values, calculate grid units.
       * @param  {Number} height Height in pixels.
       * @param  {Number} width  Width in pixels.
       * @param  {Boolean} autoSizeFlag  function autoSize identifier.
       * @return {Object} w, h as grid units.
       */
      calcWH(height, width, autoSizeFlag = false) {
        const colWidth = this.calcColWidth();

        // width = colWidth * w - (margin * (w - 1))
        // ...
        // w = (width + margin) / (colWidth + margin)
        let w = Math.round((width + this.margin[0]) / (colWidth + this.margin[0]));
        let h = 0;
        if (!autoSizeFlag) {
          h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));
        } else {
          h = Math.ceil((height + this.margin[1]) / (this.rowHeight + this.margin[1]));
        }

        // Capping
        w = Math.max(Math.min(w, this.cols - this.innerX), 0);
        h = Math.max(Math.min(h, this.maxRows - this.innerY), 0);
        return { w, h };
      },

      /**
       * 得到一列的宽度像素px单位
       */
      calcColWidth() {
        //                     容器总宽度      -         margin占据的宽度
        const colWidth = (this.containerWidth - this.margin[0] * (this.cols + 1)) / this.cols;
        // console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth + " MARGIN " + this.margin[0]);
        return colWidth;
      },

      // This can either be called:
      // calcGridItemWHPx(w, colWidth, margin[0])
      // or
      // calcGridItemWHPx(h, rowHeight, margin[1])
      calcGridItemWHPx(gridUnits, colOrRowSize, marginPx) {
        // 0 * Infinity === NaN, which causes problems with resize contraints
        if (!Number.isFinite(gridUnits)) return gridUnits;
        return Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
      },

      // Similar to _.clamp
      // 将数字固定在一个有最小和最大的区间限制内
      clamp(num, lowerBound, upperBound) {
        return Math.max(Math.min(num, upperBound), lowerBound);
      },

      /**
       * 更新容器宽度
       * @param {*} width
       * @param {*} colNum
       */
      updateWidth: function (width, colNum) {
        this.containerWidth = width;
        if (colNum !== undefined && colNum !== null) {
          this.cols = colNum;
        }
      },
      /**
       * 当拖拽和改变大小时 接收 父级 compact 的事件，重新渲染样式
       */
      compact: function () {
        this.createStyle();
      },

      /**
       * 初始化 拖拽程序
       */
      tryMakeDraggable: function () {
        const self = this;
        if (this.interactObj === null || this.interactObj === undefined) {
          this.interactObj = interact(this.$refs.item);
          if (!this.useStyleCursor) {
            this.interactObj.styleCursor(false);
          }
        }
        if (this.draggable && !this.static) {
          // 开启
          const opts = {
            ignoreFrom: this.dragIgnoreFrom,
            allowFrom: this.dragAllowFrom,
            ...this.dragOption
          };
          this.interactObj.draggable(opts);
          /*this.interactObj.draggable({allowFrom: '.vue-draggable-handle'});*/
          if (!this.dragEventSet) {
            this.dragEventSet = true;
            this.interactObj.on("dragstart dragmove dragend", function (event) {
              self.handleDrag(event);
            });
          }
        } else {
          // 关闭
          this.interactObj.draggable({
            enabled: false
          });
        }
      },

      /**
       * 初始化 改变程序
       */
      tryMakeResizable: function () {
        const self = this;
        if (this.interactObj === null || this.interactObj === undefined) {
          this.interactObj = interact(this.$refs.item);
          if (!this.useStyleCursor) {
            this.interactObj.styleCursor(false);
          }
        }
        if (this.resizable && !this.static) {
          let maximum = this.calcPosition(0, 0, this.maxW, this.maxH);
          let minimum = this.calcPosition(0, 0, this.minW, this.minH);

          // console.log("### MAX " + JSON.stringify(maximum));
          // console.log("### MIN " + JSON.stringify(minimum));

          const opts = {
            allowFrom: ".shape_controller",
            ignoreFrom: this.resizeIgnoreFrom,
            // allowFrom: "." + this.resizableHandleClass.trim().replace(" ", "."),
            edges: {
              left: true,
              // right: "." + this.resizableHandleClass.trim().replace(" ", "."),
              bottom: true,
              right: true,
              top: true
            },
            restrictSize: {
              min: {
                height: minimum.height,
                width: minimum.width
              },
              max: {
                height: maximum.height,
                width: maximum.width
              }
            },
            ...this.resizeOption
          };

          if (this.preserveAspectRatio) {
            opts.modifiers = [
              interact.modifiers.aspectRatio({
                ratio: "preserve"
              })
            ];
          }
          this.interactObj.resizable(opts);
          if (!this.resizeEventSet) {
            this.resizeEventSet = true;
            this.interactObj.on("resizestart resizemove resizeend", function (event) {
              self.handleResize(event);
            });
          }
        } else {
          this.interactObj.resizable({
            enabled: false
          });
        }
      },

      /**
       * 暂时无用
       */
      autoSize: function () {
        // ok here we want to calculate if a resize is needed
        this.previousW = this.innerW;
        this.previousH = this.innerH;

        let newSize = this.$slots.default[0].elm.getBoundingClientRect();
        let pos = this.calcWH(newSize.height, newSize.width, true);
        if (pos.w < this.minW) {
          pos.w = this.minW;
        }
        if (pos.w > this.maxW) {
          pos.w = this.maxW;
        }
        if (pos.h < this.minH) {
          pos.h = this.minH;
        }
        if (pos.h > this.maxH) {
          pos.h = this.maxH;
        }

        if (pos.h < 1) {
          pos.h = 1;
        }
        if (pos.w < 1) {
          pos.w = 1;
        }

        // this.lastW = x; // basically, this is copied from resizehandler, but shouldn't be needed
        // this.lastH = y;

        if (this.innerW !== pos.w || this.innerH !== pos.h) {
          this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
        }
        if (this.previousW !== pos.w || this.previousH !== pos.h) {
          this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
          this.eventBus.$emit("resizeEvent", "resizeend", this.i, this.innerX, this.innerY, pos.h, pos.w);
        }
      }
    }
  };
</script>
