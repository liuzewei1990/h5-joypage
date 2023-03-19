<template>
  <grid-item :item="item" :static="item.static" :isResizable="item.fixedHeight ? false : item.isResizable" @click.native="showTools">
    <template v-slot="scope">
      <!-- grid-item 中的 v-if="loaded"，可以解决已经存在keep-alive的component组件，二次挂载时created和activated同时执行的问题 -->
      <!-- <keep-alive> -->
      <!-- <Tools ref="tools" v-bind="$props"> -->
      <Container>
        <RenderComponent :item="item" :__gridData="scope" :__observerData.sync="observerData" v-bind="item.coProps"></RenderComponent>
      </Container>
      <!-- </Tools> -->
      <!-- </keep-alive> -->
    </template>
    <template v-slot:other>
      <tool-bar :item="item" v-if="item.isResizable"></tool-bar>
    </template>
  </grid-item>
</template>

<script>
  import { number, object } from "vue-types";
  import GridItem from "../GridLayout/item.vue";
  import Tools from "./Tools.vue";
  import Container from "./container.vue";
  import RenderComponent from "./render.vue";
  import ToolBar from "./tool-bar.vue";

  export default {
    name: "WorkViewComponent",
    components: { GridItem, Container, Tools, RenderComponent, ToolBar },
    inject: ["work"],
    props: {
      item: object().def({}),
      index: number().def(0)
    },
    data() {
      return {
        observerData: {}
      };
    },
    watch: {
      observerData: {
        handler() {
          this.$set(this.item, "coProps", this.observerData);
        },
        deep: true
      }
    },
    methods: {
      showTools() {
        this.work.resizableOpen(this.item.i);
      }
    }
  };
</script>
