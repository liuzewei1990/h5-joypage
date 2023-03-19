<template>
  <section class="nav-tabs">
    <div class="tabs-fixed">
      <component :is="'navMenu'"></component>
    </div>
  </section>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .nav-tabs {
    height: 40px;
    .tabs-fixed {
      height: 40px;
      width: 100%;
      width: -moz-available; /* WebKit-based browsers will ignore this. */
      width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
      width: fill-available;

      background: #fff;
      box-shadow: 0px 0px 5px rgb(189, 189, 189);
      position: fixed;
      z-index: 1000;
    }
  }
</style>
