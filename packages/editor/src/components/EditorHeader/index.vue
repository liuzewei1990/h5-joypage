<template>
  <a-row type="flex">
    <a-col flex="1">
      <div flex="dir:left cross:center" style="margin-left: 15px; height: 100%">
        <!-- <a-icon type="arrow-left" @click="$router.back()" style="font-size: 23px" /> -->
        <!-- <h3 style="margin: 0px 10px; font-size: 18px">
          <a-icon v-show="loading" type="loading" />
          <span v-show="!loading">{{ pageTitle }}</span>
        </h3> -->
        <div class="logo" flex="cross:center main:center">
          <img src="../../assets/logo2.svg" width="40px" alt="" />
          <div flex="dir:top" style="margin-left: 5px">
            <img src="../../assets/logo-txt.svg" width="80px" alt="" style="margin-top: -10px" />
            <span style="position: absolute; width: 100%; line-height: 1; color: #3c3c3c; margin-top: 9px; margin-left: -0px; font-weight: 100; transfrom: scale(0.8) tran; font-size: 10px"
              >h5-joypage 让页面制作更简单！</span
            >
          </div>
        </div>
      </div>
    </a-col>
    <a-col flex="1">
      <slot name="header.center">
        <div flex="main:center" style="width: 100%">
          <a-button-group size="small">
            <a-button type="primary" style="width: 40px; height: 30px; border-top-left-radius: 3px; border-bottom-left-radius: 3px">
              <icon-font :style="{ fontSize: '20px', marginTop: '2px' }" type="icon-xianshiqi" />
            </a-button>
            <a-button type="" style="width: 40px; height: 30px; border-top-right-radius: 3px; border-bottom-right-radius: 3px">
              <icon-font :style="{ fontSize: '20px', marginTop: '2px' }" type="icon-shouji" />
            </a-button>
          </a-button-group>
        </div>
      </slot>
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
