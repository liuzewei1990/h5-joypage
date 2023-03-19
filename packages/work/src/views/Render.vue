<template>
  <div id="app">
    <work height="100vh" workId="ylgd"></work>
  </div>
</template>
<script>
  import * as work from "../index";
  export default {
    components: { Work: work.renderWork() }
  };
</script>
