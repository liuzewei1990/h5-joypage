<template>
  <grid-item :item="item" :static="item.static" :isResizable="item.fixedHeight ? false : item.isResizable" @click.native="showEdit">
    <template v-slot="scope">
      <!-- grid-item 中的 v-if="loaded"，可以解决已经存在keep-alive的component组件，二次挂载时created和activated同时执行的问题 -->
      <!-- <keep-alive> -->
      <!-- <Tools ref="tools" v-bind="$props"> -->
      <Container>
        <RenderComponent :item="item" :__gridData="scope" :__observerData.sync="observerData" v-bind="coProps"></RenderComponent>
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
  import * as utils from "@work/utils";
  import { number, object } from "vue-types";
  import { WorkComponentStyleClass } from "../../class/work.class";
  import GridItem from "../GridLayout/item.vue";
  import Tools from "./Tools.vue";
  import Container from "./container.vue";
  import RenderComponent from "./component.vue";
  import ToolBar from "./tool-bar.vue";

  export default {
    name: "WorkViewComponent",
    components: { GridItem, Container, Tools, RenderComponent, ToolBar },
    inject: ["work"],
    props: {
      item: object().def({}),
      index: number().def(0)
    },
    on: {
      ["全局事件-Canvas画板-点击"]() {
        this.closeEdit();
      }
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
    provide() {
      return {
        __PropsData__: this.observerData,
        // 子组件可通过 _editorDataCache 缓存需要的数据
        _EditorDataCache: this.editorDataCache
      };
    },
    data() {
      return {
        // 当前组件编辑状态的数据缓存
        editorDataCache: { q: 11 },
        // 收集业务组件定义的props
        collectComponentProps: {},
        // 观察者对象，用于业务组件的属性配置 和 jsonSchema之间的数据桥梁
        observerData: {}
      };
    },
    mounted() {
      /**
       * 1.解决编辑时存量数据信息
       * 2.解决线上时存量数据配置
       * 3.解决WorkComponentStyleClass类新增配置字段同步
       */
      this.$set(this.item, "elStyle", utils.base.deepMerge(new WorkComponentStyleClass(), this.item.elStyle));

      this.initObserverData();
    },
    watch: {
      observerData: {
        handler() {
          // console.log("observerData变化!");
          // 这里需要做个校验，避免意外的数据传入json schema
          this.$set(this.item, "coProps", this.observerData);
        },
        deep: true
      },
      editorDataCache: {
        deep: true,
        handler() {
          // console.log("_editorDataCache变化!");
        }
      }
    },
    methods: {
      // 打开编辑状态
      showEdit() {
        this.work.resizableOpen(this.item.i, true);
      },

      // 关闭编辑状态
      closeEdit() {
        this.work.resizableOpen(this.item.i, false);
      },

      // 初始化 observerData桥梁数据
      initObserverData() {
        const observerData = utils.base.deepMerge(this.collectComponentProps, this.item.coProps); // 深度合并字段
        for (const key in observerData) {
          this.$set(this.observerData, key, observerData[key]);
        }
      },

      // 收集收集业务组件定义的props, 通过业务组件props配置,得到key和默认值
      onBeforeCreate(vm) {
        if (!vm) return;
        const optionProps = vm.$options.props || {};
        for (const key in optionProps) {
          let defaultVal = optionProps[key].default;
          this.collectComponentProps[key] = typeof defaultVal === "function" ? defaultVal() : defaultVal;
        }
      }
    }
  };
</script>
