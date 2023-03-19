<template>
  <Work v-bind="$attrs"></Work>
</template>

<script>
  import Work from "../../work/Work/index.vue";
  import WorkRender from "../../class/work.render.class";
  import { bool } from "vue-types";
  const preWork = new WorkRender({ mode: "pre-render" });
  export default {
    components: { Work },
    props: {
      switchVal: bool().def(true)
    },
    inject: ["work"],
    provide() {
      return {
        work: preWork
      };
    },
    watch: {
      switchVal() {
        if (this.switchVal) {
          preWork.mode = "pre-render";
        } else {
          preWork.mode = "render";
        }
      }
    },
    created() {
      // 将编辑器中work实例的state数据拷贝到preWork预览模式的实例中，实现预览
      let copyState = JSON.parse(JSON.stringify(this.work.state));
      copyState.views = this.work.handleWorkComponentJson(copyState.views);
      preWork.initWork(copyState);
    }
  };
</script>

<style lang="less" scoped></style>
