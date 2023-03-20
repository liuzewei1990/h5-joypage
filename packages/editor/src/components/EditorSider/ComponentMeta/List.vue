<template>
  <div class="compo-meta-list">
    <div class="compo-group" v-for="(item, i) in componentGroupList" :key="i">
      <!-- <div class="title" flex="main:center cross:center">{{ item.title }}</div> -->
      <a-divider class="my-divider">{{ item.title }}</a-divider>
      <div class="compo-item" v-for="compo in item.items" :key="compo.type">
        <div class="hover" flex="dir:top">
          <div class="item"></div>
          <div class="img">
            <img alt="example" :src="compo.icon || require('../../../assets/err.png')" />
          </div>
          <p class="text">{{ compo.text }}</p>
        </div>
        <div class="compo-meta-add-btn" v-show="true" flex="main:center cross:center" @click="addWorkComponent(compo)">
          <a-icon class="compo-meta-icon" type="plus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { array } from "vue-types";

  export default {
    props: {
      componentGroupList: array().def([])
    },
    inject: ["work"],
    methods: {
      async addWorkComponent(compo) {
        const coName = compo.coName;
        this.work.addWorkComponent({ coName });
      }
    }
  };
</script>

<style lang="less" scoped>
  .compo-meta-list {
    padding: 10px;
    .compo-group {
    }

    .my-divider {
      /deep/ .ant-divider-inner-text {
        font-size: 12px;
        color: #888888;
      }
    }
    .title {
      height: 30px;
      background: #f7f7f7;
      margin-bottom: 10px;
    }
    .compo-item {
      display: inline-block;
      position: relative;
      // margin: 5px auto;
      width: calc(50% - 5px);
      // height: 105px;
      overflow: hidden;
      box-shadow: 0px 0px 10px #ececec;
      cursor: pointer;
      outline: 2px solid @joy-border-color;
      margin-bottom: 10px;

      &:hover {
        outline: 2px solid @primary-color;
      }

      .img {
        width: 80px;
        height: 70px;
        overflow: hidden;
        // outline: 1px solid red;
        outline-offset: -1px;
        margin: 0 auto;
        // border: 1px solid red;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        line-height: 25px;
        background: #f3f3f3;
        text-align: center;
        margin: 0;
        color: rgb(118, 118, 118);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 4px;
        width: calc(100% + 3px);
        font-size: 13px;
      }
    }
    .compo-item:nth-child(odd) {
      margin-left: 10px;
    }
  }

  .compo-meta-add-btn {
    // display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &:hover .compo-meta-icon {
      color: #999;
    }
  }
  .compo-meta-icon {
    font-size: 40px;
    color: transparent;
  }
</style>
