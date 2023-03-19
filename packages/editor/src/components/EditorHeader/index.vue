<template>
  <a-row type="flex">
    <a-col flex="1">
      <div flex="dir:left cross:center" style="margin-left: 10px">
        <a-icon type="arrow-left" @click="$router.back()" style="font-size: 23px" />
        <h3 style="margin: 0px 10px; font-size: 18px">
          <a-icon v-show="loading" type="loading" />
          <span v-show="!loading">{{ pageTitle }}</span>
        </h3>
      </div>
    </a-col>
    <a-col flex="1">
      <slot name="header.center"></slot>
    </a-col>
    <a-col flex="1">
      <div :style="{ float: 'right' }">
        <a-button type="link" @click="showPreRender"> 预览 </a-button>
        <a-button type="link" @click="showJson"> 查看json </a-button>
        <a-button type="link" @click="saveJson" :loading="saveLoading" :disabled="saveDisabled" v-if="mode === 'edit'"> 发布 </a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    inject: ["work"],
    computed: {
      pageTitle() {
        return this.work._apiData.pageTitle;
      },
      loading() {
        return this.work.loading;
      },
      saveLoading() {
        return this.work.saveLoading;
      },
      saveDisabled() {
        // 这里需要处理节流函数
        return JSON.stringify(this.work.state) === (this.work._apiData.pageInfo || "{}");
      },
      mode() {
        return this.work.mode;
      }
    },
    methods: {
      showPreRender() {
        this.$emit("show-pre-render");
      },
      showJson() {
        this.$emit("show-json");
      },
      async saveJson() {
        try {
          await this.work.saveJson();
          this.$message.success("保存成功");
        } catch (error) {
          this.$message.error("保存失败");
        }
      }
    }
  };
</script>

<style lang="less" scoped></style>
