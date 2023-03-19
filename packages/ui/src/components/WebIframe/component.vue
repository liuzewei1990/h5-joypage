<template>
  <VueIframe :name="name" :src="url" allow="camera *; geolocation *; microphone *; autoplay *" :frame-id="name" @load="onLoad"> </VueIframe>
</template>

<script>
  import VueIframe from "./vue-iframe.vue";
  export default {
    name: "WebIframe",
    components: { VueIframe },
    props: {
      name: {
        type: String,
        default: "",
        required: true
      },
      url: {
        type: String,
        default: "",
        required: true
      }
    },
    methods: {
      onLoad() {}
    }
  };
</script>
