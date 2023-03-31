<template>
  <section class="scale-number-slider">
    <!-- {{ numberList }} -->
    <div flex="cross:center" class="title-row">
      <b flex-box="0" style="width: 80px; color: #888">{{ title }}</b>
      <div flex="cross:center" flex-box="1">
        <slot name="header">
          <div flex="cross:center" flex-box="1" v-if="showScale">
            <!-- <span class="s" @click="scaleVal--">放小</span> -->
            <a-slider v-model="scaleVal" flex-box="1" :min="min" :max="max" />
            <!-- <span class="s" @click="scaleVal++">放大</span> -->
            <span class="s" @click="reset">重置</span>
          </div>
        </slot>
      </div>
    </div>
    <div flex="cross:center" class="input-row" style="margin-top: -10px">
      <!-- 对应数组下标0 -->
      <div flex="dir:top cross:center" v-for="item in numberList" :key="item.title">
        <span class="title">{{ titleMap[item.title] || item.title }}</span>
        <component :is="inputTag" type="number" class="my-input" v-model="item.val" :disabled="item.disabled" style="width: 50px; margin: 0 5px 0 0" size="small" :min="min" :max="max"></component>
      </div>
    </div>
  </section>
</template>

<script>
  import { array, bool, number, object, string } from "vue-types";
  const titleMap = {
    t: "上",
    b: "下",
    l: "左",
    r: "右",
    lt: "左上",
    rt: "右上",
    lb: "左下",
    rb: "右下"
  };
  export default {
    components: {},
    props: {
      inputTag: string().def("a-input-number"),
      title: string().def("标题："),
      min: number().def(0),
      max: number().def(Infinity),
      showScale: bool().def(true),
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
      this.titleMap = titleMap;
      return {
        scaleVal: this.scale,
        numberList: []
      };
    },
    created() {
      // 拷贝props数据
      // this.scaleVal = this.scale;
    },
    watch: {
      value: {
        immediate: true,
        deep: true,
        handler() {
          this.numberList = this.value;
        }
      },
      scaleVal: {
        handler(val, oldVal) {
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
          // 统一强转Number类型，避免数据源计算错误
          val.forEach((item) => {
            item.val = Number(item.val);
          });
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
      margin-top: 2px;
      transform: scale(0.8);
      font-size: 12px;
      padding: 0px 4px;
      color: #999;
      cursor: pointer;
    }
    .input-row .title {
      // border: 1px solid #d8d8d8;
      // border-radius: 2px;
      padding: 2px;
      line-height: 25px;
      transform: scale(0.9);
      font-size: 12px;
      padding: 0px 4px;
      color: #999;
    }

    .my-input::-webkit-outer-spin-button,
    .my-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    .my-input[type="number"] {
      -moz-appearance: textfield;
    }
  }
</style>
