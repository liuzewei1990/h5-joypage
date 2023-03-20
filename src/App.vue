<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <work-editor :componentGroupList="[]" mode="dev"></work-editor>
    </a-config-provider>
  </div>
</template>
<script>
  import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

  export default {
    data() {
      return {
        locale: zhCN,
        formData: {}
      };
    }
  };
</script>
