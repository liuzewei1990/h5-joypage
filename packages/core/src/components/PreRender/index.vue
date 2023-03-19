<template>
  <a-modal
    class="energy-modal11"
    :dialogStyle="{ top: '0px', paddingBottom: '0px' }"
    :visible="value"
    :destroyOnClose="true"
    width="100%"
    :footer="null"
    @cancel="hideModal"
    :bodyStyle="{ padding: '10px', height: 'calc(100vh - 55.5px)', minWidth: '1000px' }">
    <div slot="title" flex="cross:center">
      <!-- <span style="margin-right: 10px">预览内容</span> -->
      <div flex-box="1"></div>
      <div flex-box="0" flex>
        <div class="form-item" flex="cross:center">
          <label>显示布局标线</label>
          <a-switch size="small" v-model="switchVal" default-checked />
        </div>
        <div class="form-item">
          <!-- <label class="btn">发布</label> -->
        </div>
      </div>
      <div flex-box="1"></div>
      <div style="width: 50px"></div>
    </div>
    <render :switchVal="switchVal" height="calc(100vh - 55.5px - 20px)"></render>
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
    margin: 0 10px;
    label {
      font-size: 14px;
      color: #333;
      margin: 0 4px;
    }

    label.btn {
      cursor: pointer;
      color: rgb(18, 118, 232);
      &:hover {
        color: rgb(0, 30, 255);
      }
    }
  }
</style>
