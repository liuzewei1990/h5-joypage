<template>
  <MonacoEditor
    :style="{ overflow: 'hidden' }"
    v-bind="$attrs"
    v-on="$listeners"
    height="100%"
    width="100%"
    language="json"
    :theme="'vs-dark'"
    :changeThrottle="0"
    :editorOptions="options"
    @mounted="onMounted"
    @codeChange="onCodeChange" />
</template>

<script>
  import MonacoEditor from "vue-monaco-editor";
  export default {
    components: { MonacoEditor },
    data() {
      return {
        options: {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: false,
          glyphMargin: true
        }
      };
    },
    methods: {
      onMounted() {},
      onCodeChange() {}
    }
  };
</script>

<style lang="less" scoped></style>
