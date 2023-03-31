<template>
  <grid-item :container-style="elStyle" :item="item" :static="true" :isResizable="item.isResizable">
    <template v-slot="scope">
      <!-- {{ item.coProps }} -->
      <!-- grid-item 中的 v-if="loaded"，可以解决已经存在keep-alive的component组件，二次挂载时created和activated同时执行的问题 -->
      <!-- <keep-alive> -->
      <Container>
        <RenderComponent :item="item" :__gridData="scope" v-bind="coProps"></RenderComponent>
      </Container>
      <!-- </keep-alive> -->
    </template>
  </grid-item>
</template>

<script>
  import * as utils from "@work/utils";
  import { number, object } from "vue-types";
  import { WorkComponentStyleClass } from "../../class/work.class";
  import GridItem from "../GridLayout/item.vue";
  import Tools from "./Tools.vue";
  import Container from "./container.vue";
  import RenderComponent from "./component.vue";

  export default {
    name: "WorkViewComponent",
    components: { GridItem, Container, Tools, RenderComponent },
    props: {
      item: object().def({}),
      index: number().def(0)
    },
    computed: {
      coProps() {
        return this.item.coProps;
      },
      // 将elStyle样式数据转换成css需要的px单位
      elStyle() {
        return WorkComponentStyleClass.transformStylePx(this.item.elStyle);
      }
    },
    mounted() {
      /**
       * 1.解决编辑时存量数据信息
       * 2.解决线上时存量数据配置
       * 3.解决WorkComponentStyleClass类新增配置字段同步
       */
      this.$set(this.item, "elStyle", utils.base.deepMerge(new WorkComponentStyleClass(), this.item.elStyle));
    }
  };
</script>
