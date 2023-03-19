<template>
  <section class="container-wrap" :class="cssclass" :style="style">
    <div class="api-error" v-if="error" flex="main:center cross:center">
      <div style="text-align: center" @click="reloadComponent">
        <p>数据错误，点击重新加载</p>
        <span>错误信息：{{ errorMsg }}</span>
      </div>
    </div>
    <div :class="cssclass" v-bind="$attrs" :style="style" :key="loadKey">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  import { bool, string } from "vue-types";

  export default {
    props: {
      absolute: bool().def(false),
      minHeight: string().def("0px")
    },
    computed: {
      cssclass() {
        return {
          ["inset-0"]: this.absolute
        };
      },
      style() {
        return {
          ["min-height"]: this.minHeight
        };
      }
    },
    data() {
      return {
        // 重试的key
        loadKey: 1,
        error: false,
        errorMsg: ""
      };
    },
    errorCaptured(err, vm, info) {
      console.error("捕获到错误:", err);
      this.error = true;
      this.errorMsg = err.message;
      return false;
    },
    methods: {
      reloadComponent() {
        this.error = false;
        this.loadKey++;
      }
    }
  };
</script>

<style lang="less" scoped>
  .container-wrap {
    position: relative;
  }

  .api-error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    cursor: pointer;
    // pointer-events: none;
    border-radius: 15px;

    background: rgba(255, 255, 255, 0.8);
    p {
      font-size: 14px;
      // color: #fff;
    }
    span {
      font-size: 10px;
    }
  }

  .inset-0 {
    position: absolute;
    inset: 0;
  }
</style>
