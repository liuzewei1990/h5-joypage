<template>
  <div>
    <list :componentGroupList="componentGroupList"></list>
  </div>
</template>

<script>
  import List from "../ComponentMeta/List.vue";

  export default {
    components: { List },
    inject: ["work"],
    computed: {
      componentGroupList() {
        return this.work.componentGroupList;
      }
    }
  };
</script>

<style lang="less" scoped></style>
