<template>
  <div class="container">
    <grid-layout
      id="grid-layout"
      mode="render"
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
      :use-css-transforms="true">
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
        :preserve-aspect-ratio="item.preserveAspectRatio">
        <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
        <!-- <test-element :text="item.i" @removeItem="removeItem($event)"></test-element> -->
        <!--<button @click="clicked">CLICK ME!</button>-->
        <span>
          {{ item.i }}
        </span>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import GridItem from "../components/GridItem.vue";
  import GridLayout from "../components/GridLayout.vue";

  export default {
    components: { GridLayout, GridItem },
    data() {
      let ___dataCache___ = sessionStorage.getItem("___dataCache___");
      ___dataCache___ = JSON.parse(___dataCache___);
      let testLayout = ___dataCache___["/____app"].layout;
      return {
        mode: "edit",
        layout: JSON.parse(JSON.stringify(testLayout)),
        layout2: JSON.parse(JSON.stringify(testLayout)),
        draggable: false,
        resizable: false,
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
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/

    min-width: 1000px;
  }
</style>
