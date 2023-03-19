<template>
  <div id="app">
    <!-- <work-app :projectId="10000"></work-app> -->
    <!-- {{ formData }} -->
    <!-- <work-range-date :isFormat="true" :dateType.sync="formData.dateType" :dateValue.sync="formData.dateValue"></work-range-date> -->
    <work-editor :componentGroupList="[]"></work-editor>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {}
      };
    }
  };
</script>
