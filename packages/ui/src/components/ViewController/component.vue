<template>
  <section class="view-controller">
    <a-button-group>
      <a-button :type="currViewIndex === index ? 'primary' : ''" v-for="(item, index) in tabs" :key="index" @click="clickItem(item, index)"> {{ item.name }} </a-button>
    </a-button-group>
  </section>
</template>

<script>
  import { string, number, array } from "vue-types";
  export default {
    name: "ViewController",
    props: {
      tabs: array().def([{ name: "tab-1" }, { name: "tab-2" }, { name: "tab-3" }]),
      viewIndex: number().def(0)
    },
    watch: {
      viewIndex: {
        immediate: true,
        handler(newVal) {
          this.currViewIndex = newVal;
        }
      }
    },
    data() {
      return {
        currViewIndex: 0
      };
    },
    methods: {
      clickItem(item, index) {
        this.currViewIndex = index;
        window.setCurrViewIndex(index);
      }
    }
  };
</script>

<style lang="less" scoped>
  .view-controller {
    // position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
</style>
