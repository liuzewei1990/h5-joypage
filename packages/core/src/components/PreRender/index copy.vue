<template>
  <a-modal class="energy-modal" :visible="value" :destroyOnClose="true" width="90%" :footer="null" @cancel="hideModal" :bodyStyle="{ padding: '0', minWidth: '1000px' }">
    <div slot="title" flex="cross:center">
      <div flex-box="1">
        <span style="margin-right: 10px">预览work</span>
      </div>
      <div class="form-item" flex="cross:center">
        <label>显示布局标线</label>
        <a-switch size="small" v-model="switchVal" default-checked />
      </div>
      <div style="width: 50px"></div>
    </div>
    <div>
      <render :switchVal="switchVal"></render>
    </div>
  </a-modal>
</template>
<script>
  import { bool } from "vue-types";
  import Render from "./Render.vue";

  export default {
    components: { Render },
    inject: ["work"],
    props: {
      value: bool().def(false)
    },
    data() {
      return {
        switchVal: true
      };
    },
    methods: {
      hideModal() {
        this.$emit("input", false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .form-item {
    label {
      font-size: 14px;
      color: #333;
      margin: 0 4px;
    }
  }
</style>
