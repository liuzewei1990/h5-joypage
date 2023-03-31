<template>
  <section class="popover-bar-container">
    <a-form-model :model="elStyle" @submit.native.prevent>
      <!-- {{ position }} -->
      <!-- 位置信息 -->
      <!-- <a-form-model-item class="work-popover-form-item" label="">
        <number-input-scale title="位置信息" :showScale="false" v-model="position" :scale.sync="elStyle.mar_s"></number-input-scale>
      </a-form-model-item> -->
      <a-form-model-item v-if="!item.isDerailed" class="work-popover-form-item" label="">
        <number-input-scale title="网格位置" input-tag="a-input" :showScale="false" v-model="gridPosition" :scale.sync="elStyle.mar_s">
          <span slot="header" style="margin-right: 10px">列数:144</span>
          <span slot="header">行数:无限</span>
        </number-input-scale>
        <!-- <span style="line-height: 10px">Tips:修改该参数会影响其他组件位置</span> -->
      </a-form-model-item>

      <!-- 背景 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <div flex="cross:center">
          <b style="width: 80px; color: #888">背景颜色</b>
          <popover-color v-model="elStyle.bgColor"></popover-color>
        </div>
        <span style="line-height: 10px">Tips:组件自有背景会覆盖当前设置</span>
      </a-form-model-item>
      <!-- 背景图片 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <div flex="cross:center">
          <b style="width: 80px; color: #888">背景图片</b>
          <div>
            <span style="margin-right: 5px">宽高铺满容器</span>
            <a-switch v-model="bgSize" size="small"></a-switch>
          </div>
        </div>
        <a-upload-dragger
          style="width: 100%; height: 100%; padding: 0px"
          name="file"
          accept="image/*"
          method="post"
          :showUploadList="false"
          :openFileDialogOnClick="true"
          :data="{ bizType: 'workimg', isRename: 'Y' }"
          :headers="{ accept: 'application/json' }"
          :multiple="true"
          action="/energy-admin/pubFileUpload/uploadFile"
          @change="handleChange">
          <p class="ant-upload-drag-icon" style="height: 50px" flex="cross:center main:center">
            <img height="100%" :src="elStyle.bgImg" v-if="elStyle.bgImg" alt="" />
            <a-icon type="inbox" v-else />
          </p>
          <p class="ant-upload-text">点击或拖入此处上传图片</p>
        </a-upload-dragger>
        <span style="line-height: 10px">Tips:组件自有背景会覆盖当前设置</span>
      </a-form-model-item>

      <!-- 边框设置 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <div flex="cross:center">
          <b style="width: 60px; color: #888">边框</b>
          <a-slider v-model="elStyle.border" :style="{ width: '80px' }" flex-box="1" :min="0" :max="20" />
          <popover-color v-model="elStyle.borderColor" flex-box="0" :style="{ width: '30px' }"></popover-color>
        </div>
      </a-form-model-item>

      <!-- 圆角设置 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <number-input-scale title="圆角" :min="0" :max="30" v-model="elStyle.borderRadius" :scale.sync="elStyle.bor_r_r"></number-input-scale>
      </a-form-model-item>

      <!-- 外边距设置 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <number-input-scale title="外边距" :min="0" :max="30" v-model="elStyle.margin" :scale.sync="elStyle.mar_s"></number-input-scale>
      </a-form-model-item>

      <!-- 内边距设置 -->
      <a-form-model-item class="work-popover-form-item" label="">
        <number-input-scale title="内边距" :min="0" :max="30" v-model="elStyle.padding" :scale.sync="elStyle.pad_s"></number-input-scale>
      </a-form-model-item>
    </a-form-model>
  </section>
</template>

<script>
  import { object } from "vue-types";
  import PopoverColor from "./popover-color.vue";
  import NumberInputScale from "./number-input-scale.vue";
  import NumberInput from "./number-input.vue";
  import { WorkComponentStyleClass } from "../../../class/work.class";
  const tits = { left: "X", top: "Y", width: "W", height: "H" };
  export default {
    components: { PopoverColor, NumberInputScale, NumberInput },
    inject: ["_EditorDataCache"],
    props: {
      item: object().def({}),
      styleConfig: object().def({})
    },
    computed: {
      // 利用引用特性修改props
      grid() {
        return this.item;
      },
      // 利用引用特性修改props
      pos() {
        return this.item.pos;
      },
      // 利用引用特性修改props
      elStyle() {
        return this.styleConfig;
      },

      // 关联pos位置信息
      position: {
        get() {
          const pos = [];
          pos[0] = { title: "X", val: this.pos.left };
          pos[1] = { title: "Y", val: this.pos.top };
          pos[2] = { title: "W", val: this.pos.width };
          pos[3] = { title: "H", val: this.pos.height };
          return pos;
        },
        set(val) {
          this.pos.left = val[0].val;
          this.pos.top = val[1].val;
          this.pos.width = val[2].val;
          this.pos.height = val[3].val;
        }
      },

      // 关联网格位置信息
      gridPosition: {
        get() {
          const pos = [];
          pos[0] = { title: "X(列)", val: this.grid.x, disabled: false };
          pos[1] = { title: "Y(行)", val: this.grid.y, disabled: true };
          pos[2] = { title: "W(列)", val: this.grid.w, disabled: false };
          pos[3] = { title: "H(行)", val: this.grid.h, disabled: false };
          return pos;
        },
        set: _.debounce(function (val) {
          this.grid.x = val[0].val;
          this.grid.y = val[1].val;
          this.grid.w = val[2].val || 2;
          this.grid.h = val[3].val || 2;
          // 触发更新
          window.VueGridLayout.verticalCompactHandler();
          console.log(window.VueGridLayout);
        }, 800)
      },

      // 关联bgSize
      bgSize: {
        get() {
          return this.elStyle.bgSize === "contain" ? false : true;
        },
        set(val) {
          this.elStyle.bgSize = val ? "100% 100%" : "contain";
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleChange(e) {
        if (e.file.status === "done") {
          this.elStyle.bgImg = e.file.response.src;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .popover-bar-container {
    max-height: 400px;
    overflow-y: auto;
    .work-popover-form-item {
      border: 1px dashed #cdcdcd;
      margin: 10px 0;
      padding: 5px;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        background: #f9f9f9;
      }
      // box-shadow: 0px 0px 5px #efefef;
    }
  }
</style>
