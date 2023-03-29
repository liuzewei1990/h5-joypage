<template>
  <section class="scale-number-slider">
    <!-- {{ numberList }} -->
    <div flex="cross:center" class="title-row">
      <b style="width: 80px; color: #888">{{ title }}</b>
      <span class="s" @click="reset">重置</span>
      <!-- <span class="s" @click="scaleVal--">放小</span> -->
      <a-slider v-model="scaleVal" flex-box="1" :min="min" :max="max" />
      <!-- <span class="s" @click="scaleVal++">放大</span> -->
    </div>
    <div flex="cross:center" class="input-row" style="margin-top: -10px">
      <!-- 对应数组下标0 -->
      <div flex="dir:top cross:center" v-for="item in numberList" :key="item.title">
        <span class="title">{{ item.title }}</span>
        <a-input-number v-model="item.val" style="width: 50px; margin: 0 5px 0 0" size="small" :min="min" :max="max"></a-input-number>
      </div>
    </div>
  </section>
</template>

<script>
  import { array, number, object, string } from "vue-types";

  export default {
    components: {},
    props: {
      title: string().def("标题："),
      min: number().def(0),
      max: number().def(20),
      scale: number().def(0),
      value: array().def([
        {
          title: "上1",
          val: 0
        },
        {
          title: "下",
          val: 0
        },
        {
          title: "左",
          val: 0
        },
        {
          title: "右",
          val: 0
        }
      ])
    },
    data() {
      return {
        scaleVal: this.scale,
        numberList: []
      };
    },
    created() {
      // 拷贝props数据
      this.numberList = JSON.parse(JSON.stringify(this.value));
      // this.scaleVal = this.scale;
      console.log(323232);
    },
    watch: {
      value: {
        immediate: true,
        handler() {}
      },
      scaleVal: {
        handler(val, oldVal) {
          console.log("val, oldVal", val, oldVal);
          this.$emit("update:scale", this.scaleVal);
          if (val > oldVal) {
            this.numberList.forEach((item) => {
              if (item.val !== this.max) {
                item.val += val - oldVal;
              }
            });
          } else {
            this.numberList.forEach((item) => {
              if (item.val !== this.min) {
                item.val -= oldVal - val;
              }
            });
          }
        }
      },
      numberList: {
        deep: true,
        handler(val) {
          this.$emit("input", val);
        }
      }
    },
    methods: {
      reset() {
        this.scaleVal = 0;
        this.numberList.forEach((item) => {
          item.val = 0;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .scale-number-slider {
    .title-row .s {
      border: 1px solid #d8d8d8;
      padding: 2px;
      line-height: 15px;
      transform: scale(0.8);
      font-size: 12px;
      padding: 0px 4px;
      color: #999;
      cursor: pointer;
    }
    .input-row .title {
      // border: 1px solid #d8d8d8;
      padding: 2px;
      line-height: 25px;
      transform: scale(0.9);
      font-size: 12px;
      padding: 0px 4px;
      color: #999;
    }
  }
</style>
