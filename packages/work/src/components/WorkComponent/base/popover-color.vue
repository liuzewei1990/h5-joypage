<template>
  <a-popover title="选择颜色" placement="bottom" trigger="click" arrow-point-at-center>
    <color-picker slot="content" style="width: 220px" theme="dark" :color="color" :colors-default="[]" @changeColor="changeColor" />
    <span class="popover-box" v-bind="$attrs">
      <span class="popover-color" :style="{ backgroundColor: color }"></span>
    </span>
    <!-- <span>透明度:{{ a }}</span> -->
  </a-popover>
</template>

<script>
  import colorPicker from "@caohenghu/vue-colorpicker";
  import { string } from "vue-types";
  let color = "";
  export default {
    components: { colorPicker },
    props: {
      value: string().def("#ffffff")
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.color = val;
        }
      }
    },
    data() {
      return {
        color: ""
      };
    },
    methods: {
      changeColor(color) {
        const { r, g, b, a } = color.rgba;
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.$emit("input", this.color);
      },
      openSucker(isOpen) {
        if (isOpen) {
          // ... canvas be created
          // this.suckerCanvas = canvas
          // this.suckerArea = [x1, y1, x2, y2]
        } else {
          // this.suckerCanvas && this.suckerCanvas.remove
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .popover-box {
    border: 1px solid #eaeaea;
    padding: 5px 5px;
    border-radius: 3px;
    line-height: 1px;
    width: 60px;
    .popover-color {
      border-radius: 2px;
      display: inline-block;
      width: 100%;
      height: 15px;
    }
  }
</style>
