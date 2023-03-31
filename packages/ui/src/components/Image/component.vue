<template>
  <work-component-wrap absolute min-height="200px" class="conatiner" flex="cross:center main:center">
    <!-- {{ __observerData }} -->
    <!-- <p>{{ imgSrc }}</p> -->
    <img v-if="imgSrc" class="work-image" :src="imgSrc" alt="" />
    <a-upload-dragger v-else name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">拖动图片到此区域上传</p>
    </a-upload-dragger>
  </work-component-wrap>
</template>

<script>
  import { array, object, string } from "vue-types";
  export default {
    inject: ["__PropsData__"],
    props: {
      imgSrc: string().def(""),
      imgData: object().def({}),
      imgList: array().def([])
    },
    methods: {
      handleChange(e) {
        if (e.file.status === "done") {
          this.__PropsData__.imgSrc = e.file.response.src;
        }
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
