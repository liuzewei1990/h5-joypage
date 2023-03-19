<template>
  <div id="app">
    <!-- <h1 style="text-align: center">Vue Grid Layout</h1> -->
    <!--<pre>{{ layout | json }}</pre>-->
    <div>
      <div class="layoutJSON" style="height: 50px">
        Displayed as <code>[x, y, w, h]</code>:
        <div class="columns">
          <span class="layoutItem" v-for="item in layout" :key="item.i">
            <b>{{ item.i }}</b
            >: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
          </span>
        </div>
      </div>
      <!--<div class="layoutJSON">
                  Displayed as <code>[x, y, w, h]</code>:
                  <div class="columns">
                      <div class="layoutItem" v-for="item in layout2">
                          <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                      </div>
                  </div>
              </div>-->
    </div>
    <div id="content">
      <button @click="decreaseWidth">减小宽度</button>
      <button @click="increaseWidth">增加宽度</button>
      <button @click="addItem">添加</button>
      <button @click="addItemDynamically">尾部添加</button>
      <!-- Add to show rtl support -->
      <button @click="changeDirection">更改布局方向</button>
      <button @click="$router.push('/render')">预览模式</button>
      <input type="checkbox" v-model="draggable" /> 拖拽 <input type="checkbox" v-model="resizable" /> 改变大小 <input type="checkbox" v-model="bounded" /> 限制在容器内拖动
      <input type="checkbox" v-model="preventCollision" /> 防止碰撞 <input type="checkbox" v-model="compact" /> 自动吸顶
      <div style="margin-top: 10px; margin-bottom: 10px">
        Row Height: <input type="number" v-model="rowHeight" /> Col nums: <input type="number" v-model="colNum" /> Margin x: <input type="number" v-model="marginX" /> Margin y:
        <input type="number" v-model="marginY" />
      </div>
      <grid-layout
        id="grid-layout"
        :mode="mode"
        :margin="[parseInt(marginX), parseInt(marginY)]"
        :layout.sync="layout"
        :col-num="parseInt(colNum)"
        :row-height="rowHeight"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :is-bounded="bounded"
        :prevent-collision="preventCollision"
        :vertical-compact="compact"
        :restore-on-drag="restoreOnDrag"
        :use-css-transforms="true"
        @layout-created="layoutCreatedEvent"
        @layout-before-mount="layoutBeforeMountEvent"
        @layout-mounted="layoutMountedEvent"
        @layout-ready="layoutReadyEvent"
        @layout-updated="layoutUpdatedEvent"
        @breakpoint-changed="breakpointChangedEvent">
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :static="item.static"
          :position.sync="item.position"
          :left-scale.sync="item.leftScale"
          :width-scale.sync="item.widthScale"
          :is-derailed="item.isDerailed"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :min-w="item.minW"
          :max-w="item.maxW"
          :min-x="item.minX"
          :max-x="item.maxX"
          :min-y="item.minY"
          :max-y="item.maxY"
          :preserve-aspect-ratio="item.preserveAspectRatio"
          @resize="resize"
          @move="move"
          @resized="resized"
          @container-resized="containerResized"
          @moved="moved">
          <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
          <test-element :text="item.i" @removeItem="removeItem($event)"></test-element>
          <!--<button @click="clicked">CLICK ME!</button>-->
          <pre>
              <!-- {{ item }} -->
            </pre>
          <div class="tool">
            <span @click="clickDerailed(item)">{{ item.isDerailed ? "自由" : "约束" }}</span>
            <span @click="zIndex(item, '++')">上移</span>
            <span @click="zIndex(item, '--')">下移</span>
          </div>
        </grid-item>
      </grid-layout>
      <!--<grid-layout
                      :layout="layout2"
                      :col-num="12"
                      :row-height="rowHeight"
                      :is-draggable="draggable"
                      :is-resizable="resizable"
                      :vertical-compact="true"
                      :use-css-transforms="true"
              >
                  <grid-item v-for="item in layout2" :key="item.i"
                             :x="item.x"
                             :y="item.y"
                             :w="item.w"
                             :h="item.h"
                             :min-w="2"
                             :min-h="2"
                             :i="item.i"
                             :is-draggable="item.draggable"
                             :is-resizable="item.resizable"
                  >
                      <test-element :text="item.i"></test-element>
                  </grid-item>
              </grid-layout>-->
    </div>
  </div>
</template>

<script>
  import GridItem from "../components/GridItem.vue";
  import GridLayout from "../components/GridLayout.vue";
  // import ResponsiveGridLayout from './components/ResponsiveGridLayout.vue';
  import TestElement from "../components/TestElement.vue";
  import CustomDragElement from "../components/CustomDragElement.vue";
  import { getDocumentDir, setDocumentDir } from "../helpers/DOM";
  //var eventBus = require('./eventBus');

  let testLayout = [
    // { x: 0, y: 0, w: 20, h: 20, i: "0", resizable: true, draggable: true, static: false, minY: 0, maxY: 2 },
    // { x: 0, y: 0, w: 20, h: 20, i: "1", resizable: true, draggable: true, static: false, minY: 0, maxY: 2, isDerailed: false }
    // {"x":2,"y":0,"w":20,"h":40,"i":"1", resizable: null, draggable: null, static: false},
    // {"x":4,"y":0,"w":2,"h":5,"i":"2", resizable: false, draggable: false, static: false, minX: 4, maxX: 4, minW: 2, maxW: 2, preserveAspectRatio: true},
    // {"x":6,"y":0,"w":2,"h":3,"i":"3", resizable: false, draggable: false, static: false, preserveAspectRatio: true},
    // {"x":8,"y":0,"w":2,"h":3,"i":"4", resizable: false, draggable: false, static: false},
    // {"x":10,"y":0,"w":2,"h":3,"i":"5", resizable: false, draggable: false, static: false},
    // {"x":0,"y":5,"w":2,"h":5,"i":"6", resizable: false, draggable: false, static: false},
    // {"x":2,"y":5,"w":2,"h":5,"i":"7", resizable: false, draggable: false, static: false},
    // {"x":4,"y":5,"w":2,"h":5,"i":"8", resizable: false, draggable: false, static: false},
    // {"x":6,"y":3,"w":2,"h":4,"i":"9", resizable: false, draggable: false, static: true},
    // {"x":8,"y":4,"w":2,"h":4,"i":"10", resizable: false, draggable: false, static: false},
    // {"x":10,"y":4,"w":2,"h":4,"i":"11", resizable: false, draggable: false, static: false, minY: 4},
    // {"x":0,"y":10,"w":2,"h":5,"i":"12", resizable: false, draggable: false, static: false},
    // {"x":2,"y":10,"w":2,"h":5,"i":"13", resizable: false, draggable: false, static: false},
    // {"x":4,"y":8,"w":2,"h":4,"i":"14", resizable: false, draggable: false, static: false},
    // {"x":6,"y":8,"w":2,"h":4,"i":"15", resizable: false, draggable: false, static: false},
    // {"x":8,"y":10,"w":2,"h":5,"i":"16", resizable: false, draggable: false, static: false},
    // {"x":10,"y":4,"w":2,"h":2,"i":"17", resizable: false, draggable: false, static: false},
    // {"x":0,"y":9,"w":2,"h":3,"i":"18", resizable: false, draggable: false, static: false},
    // {"x":2,"y":6,"w":2,"h":2,"i":"19", resizable: false, draggable: false, static: false}
  ];

  /*let testLayout = [
          { x: 0, y: 0, w: 2, h: 2, i: "0" },
          { x: 2, y: 0, w: 2, h: 2, i: "1" },
          { x: 4, y: 0, w: 2, h: 2, i: "2" },
          { x: 6, y: 0, w: 2, h: 2, i: "3" },
          { x: 8, y: 0, w: 2, h: 2, i: "4" },
      ];*/

  import * as utils from "@work/utils";

  export default {
    name: "app",
    dataCacheKey: "app",
    dataCache: ["layout"],
    components: {
      GridLayout,
      GridItem,
      TestElement,
      CustomDragElement
    },
    data() {
      return {
        mode: "edit",
        layout: JSON.parse(JSON.stringify(testLayout)),
        layout2: JSON.parse(JSON.stringify(testLayout)),
        draggable: true,
        resizable: true,
        bounded: true,
        transformScale: 1,
        preventCollision: false,
        compact: true,
        restoreOnDrag: false,
        rowHeight: 1,
        colNum: 144,
        index: 0,
        marginX: 10,
        marginY: 10
      };
    },
    mounted: function () {
      this.index = this.layout.length;
    },
    methods: {
      zIndex(item, fo) {
        let index = this.layout.indexOf(item);
        if (fo === "++") {
          if (index == this.layout.length - 1) return;
          this.$set(this.layout, index, this.layout[(index += 1)]);
          this.$set(this.layout, index, item);
        } else {
          if (index == 0) return;
          this.$set(this.layout, index, this.layout[(index -= 1)]);
          this.$set(this.layout, index, item);
        }
      },
      clickDerailed(item) {
        this.$set(item, "isDerailed", !item.isDerailed);
      },
      clicked: function () {
        window.alert("CLICK!");
      },
      increaseWidth: function () {
        let width = document.getElementById("content").offsetWidth;
        width += 20;
        document.getElementById("content").style.width = width + "px";
      },
      decreaseWidth: function () {
        let width = document.getElementById("content").offsetWidth;
        width -= 20;
        document.getElementById("content").style.width = width + "px";
      },
      scaleHalf: function () {
        this.transformScale = 0.5;
        document.getElementById("grid-layout").style.transform = "scale(0.5)";
      },
      scaleThreeQuarters: function () {
        this.transformScale = 0.75;
        document.getElementById("grid-layout").style.transform = "scale(0.75)";
      },
      scaleIdentity: function () {
        this.transformScale = 1;
        document.getElementById("grid-layout").style.transform = "scale(1)";
      },
      removeItem: function (i) {
        console.log("### REMOVE " + i);
        const index = this.layout.map((item) => item.i).indexOf(i);
        this.layout.splice(index, 1);
      },
      addItem: function () {
        // let self = this;
        //console.log("### LENGTH: " + this.layout.length);
        let item = { x: 0, y: 0, w: 20, h: 20, i: utils.base.guid("ID-xxxx-xxxx-xxxx"), whatever: "bbb" };
        // this.index++;
        this.layout.push(item);
      },
      addItemDynamically: function () {
        const x = (this.layout.length * 20) % (this.colNum || 12);
        const y = this.layout.length + (this.colNum || 12);
        console.log("X=" + x + " Y=" + y);
        let item = {
          x: x,
          y: y,
          w: 20,
          h: 20,
          i: this.index + ""
        };
        this.index++;
        this.layout.push(item);
      },
      move: function (i, newX, newY) {
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resize: function (i, newH, newW, newHPx, newWPx) {
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      moved: function (i, newX, newY) {
        console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resized: function (i, newH, newW, newHPx, newWPx) {
        console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      containerResized: function (i, newH, newW, newHPx, newWPx) {
        console.log("### CONTAINER RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      /**
       * Add change direction button
       */
      changeDirection() {
        let documentDirection = getDocumentDir();
        let toggle = "";
        if (documentDirection === "rtl") {
          toggle = "ltr";
        } else {
          toggle = "rtl";
        }
        setDocumentDir(toggle);
        //eventBus.$emit('directionchange');
      },

      layoutCreatedEvent: function (newLayout) {
        console.log("Created layout: ", newLayout);
      },
      layoutBeforeMountEvent: function (newLayout) {
        console.log("beforeMount layout: ", newLayout);
      },
      layoutMountedEvent: function (newLayout) {
        console.log("Mounted layout: ", newLayout);
      },
      layoutReadyEvent: function (newLayout) {
        console.log("Ready layout: ", newLayout);
      },
      layoutUpdatedEvent: function (newLayout) {
        console.log("Updated layout: ", newLayout);
      },
      breakpointChangedEvent: function (newBreakpoint, newLayout) {
        console.log("breakpoint changed breakpoint=", newBreakpoint, ", layout: ", newLayout);
      }
    }
  };
</script>

<style>
  /*    #app {
              font-family: 'Avenir', Helvetica, Arial, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-align: center;
              color: #2c3e50;
              margin-top: 60px;
          }
  
          h1, h2 {
              font-weight: normal;
          }
  
          ul {
              list-style-type: none;
              padding: 0;
          }
  
          li {
              display: inline-block;
              margin: 0 10px;
          }
  
          a {
              color: #42b983;
          }*/
</style>

<style lang="css">
  #grid-layout {
    min-height: 800px !important;
    /* max-width: 1000px !important; */
    margin: 0 auto;
  }

  .tool {
    position: absolute;
    left: 101%;
    top: 0;
  }

  .tool span {
    display: block;
    width: 30px;
    font-size: 12px;
    padding: 2px 5px;
    border: 1px solid rgb(165, 191, 251);
    border-radius: 3px;
    background: rgb(86, 143, 235);
    color: #fff;
    cursor: pointer;
    text-align: center;
  }
</style>
