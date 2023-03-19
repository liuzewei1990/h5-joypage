<template>
  <work-component-wrap absolute min-height="200px" class="conatiner" flex="cross:center main:center">
    <!-- {{ __observerData }} -->
    <!-- <p>{{ imgSrc }}</p> -->
    <img v-if="imgSrc" class="work-image" :src="imgSrc" alt="" />
    <a-upload-dragger v-else name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
    </a-upload-dragger>
  </work-component-wrap>
</template>

<script>
  import { array, object, string } from "vue-types";
  import attr from "./attr.js";
  export default {
    props: {
      imgSrc: string().def(""),
      imgData: object().def({}),
      imgList: array().def([])
    },
    computed: {
      ...attr.mapProps({ src11: "imgSrc" })
    },
    methods: {
      handleChange(e) {
        console.log(e);
        this.src11 = window.URL.createObjectURL(e.file.originFileObj);
      }
    }
  };
</script>

<style lang="less" scoped>
  .conatiner {
  }
  .work-image {
    // width: 100%;
    height: 100%;
  }
</style>
