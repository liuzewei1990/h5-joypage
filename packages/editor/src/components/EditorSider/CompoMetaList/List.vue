<template>
  <div class="compo-meta-list">
    <div class="compo-group" v-for="(item, i) in componentGroupList" :key="i">
      <div class="title" flex="main:center cross:center">{{ item.title }}</div>
      <div class="compo-item" v-for="compo in item.items" :key="compo.type">
        <div class="hover">
          <a-card hoverable size="small">
            <div slot="cover" class="item"></div>
            <div slot="cover" class="img">
              <img alt="example" :src="compo.icon || require('../../../assets/err.png')" />
            </div>
            <p style="text-align: center">{{ compo.text }}</p>
          </a-card>
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
    .title {
      height: 40px;
      background: #f3f3f3;
    }
    .compo-item {
      position: relative;
      margin: 5px auto;
      width: 90%;
      box-shadow: 0px 0px 10px #ececec;
      cursor: pointer;
      .img {
        width: 100%;
        height: 100px;
        overflow: hidden;
        // border: 1px solid red;
        img {
          width: 100%;
          // height: 100%;
        }
      }
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
