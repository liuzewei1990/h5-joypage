<template>
  <a-drawer
    :wrapStyle="{}"
    :drawerStyle="{}"
    :headerStyle="{}"
    :bodyStyle="{ padding: 0, height: 'calc(100% - 55px)' }"
    :maskStyle="{}"
    title="Work JSON"
    placement="right"
    :destroyOnClose="true"
    :maskClosable="true"
    :closable="true"
    :visible="value"
    v-bind="$attrs"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    @close="onClose">
    <MonacoEditor v-if="isRenderMonacoEditor" :code="code"></MonacoEditor>
  </a-drawer>
</template>

<script>
  const MonacoEditor = () => import(/* webpackChunkName: "monaco-editor" */ "./MonacoEditor.vue");
  import { string, bool } from "vue-types";
  import loadBeautifier from "./loadBeautifier.js";
  import beautifierConf from "./beautifierConf.js";

  export default {
    components: { MonacoEditor },
    props: {
      value: bool().def(false),
      jsonStr: string().def("")
    },
    watch: {
      value(v) {
        if (v) this.onShow();
      }
    },
    data() {
      return {
        isRenderMonacoEditor: false,
        code: ""
      };
    },

    methods: {
      async onShow() {
        // console.log("this.jsonStr :>> ", this.jsonStr);
        await this.beautifier(this.jsonStr);
        this.isRenderMonacoEditor = true;
      },
      onClose() {
        this.$emit("input", false);
        this.isRenderMonacoEditor = false;
      },
      async beautifier(jsonStr) {
        window.beautifier || (await loadBeautifier());
        this.code = window.beautifier.js(jsonStr, beautifierConf.js);
      }
    }
  };
</script>
