<template>
  <div>111</div>
</template>

<script>
  export default {
    data() {
      return {
        a: "3333333",
        b: true,
        c: [1, 2, 13, 4]
      };
    },
    mounted() {
      console.log(this);

      setTimeout(() => {
        this.a = "4e34343434";
      }, 1000);
    },
    // dataCacheKey: "组件a",
    dataCache: ["a", "c"]
  };
</script>

<style lang="less" scoped></style>
