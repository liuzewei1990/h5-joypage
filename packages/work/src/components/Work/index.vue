<template>
  <!-- 表示路由页面根节点 -->
  <section class="work" :style="style">
    <!-- {{ $attrs }} -->
    <!-- <a-config-provider :locale="locale"> -->
    <!-- <keep-alive> -->
    <work-view :height="style.height" v-for="(item, index) in views" :key="item.viewId || index" :viewIndex="index" v-if="currViewIndex === index"></work-view>
    <!-- </keep-alive> -->
    <!-- </a-config-provider> -->
  </section>
</template>

<script>
  // import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
  import WorkView from "../WorkView";
  import WorkBase from "../../class/work.base.class";
  import { string } from "vue-types";

  export default {
    components: { WorkView },
    props: {
      height: string().def("")
    },
    provide() {
      return {
        $Work: this
      };
    },
    inject: ["work"],
    async created() {
      if (this.work instanceof WorkBase === false) {
        throw new Error('注意：inject: ["work"] 不属于 WorkBase 的实例');
      }
    },
    computed: {
      activeViewId() {
        return this.work.state.activeViewId;
      },
      currViewIndex() {
        return this.work.state.views.findIndex((item) => item.viewId === this.activeViewId);
      },
      views() {
        return this.work.state.views || [];
      },
      tabs() {
        return this.views.map((item) => ({ name: item.title }));
      },
      style() {
        return {
          padding: `${this.padding.top}px ${this.padding.right}px ${this.padding.bottom}px ${this.padding.left}px`,
          height: this.height
        };
      }
    },
    data() {
      return {
        // locale: zhCN,
        padding: {
          top: "10",
          bottom: "0",
          left: "10",
          right: "10"
        }
      };
    }
  };
</script>

<style lang="less" scoped>
  .work {
    position: relative;
    // 这里width会影响iframe和web component 出现滚动条，原则上所有组件和页面的尺寸都应该是100%
    min-width: 800px;
    min-height: 500px;
    // border: 1px solid red;
    // padding: 2px 2px;
    // box-sizing: border-box;
  }
</style>
