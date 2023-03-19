<template>
  <grid-item :item="item" :static="true" :isResizable="item.isResizable">
    <template v-slot="scope">
      <!-- {{ item.coProps }} -->
      <!-- grid-item 中的 v-if="loaded"，可以解决已经存在keep-alive的component组件，二次挂载时created和activated同时执行的问题 -->
      <!-- <keep-alive> -->
      <Container>
        <RenderComponent :item="item" :__gridData="scope" v-bind="item.coProps"></RenderComponent>
      </Container>
      <!-- </keep-alive> -->
    </template>
  </grid-item>
</template>

<script>
  import { number, object } from "vue-types";
  import GridItem from "../GridLayout/item.vue";
  import Tools from "./Tools.vue";
  import Container from "./container.vue";
  import RenderComponent from "./render.vue";

  export default {
    name: "WorkViewComponent",
    components: { GridItem, Container, Tools, RenderComponent },
    props: {
      item: object().def({}),
      index: number().def(0)
    }
  };
</script>
