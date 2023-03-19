<template>
  <fragment :name="`【websocket】UID=${_webscoketUID}`">
    <slot v-bind="socketData"> </slot>
  </fragment>
</template>

<script>
  import Fragment from "./Fragment";
  export default {
    name: "UseWebsocket",
    components: { Fragment },
    props: {
      socketParams: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        socketData: {
          valMap: {}
        }
      };
    },
    watch: {
      socketParams: {
        immediate: true,
        deep: true,
        handler(val) {
          if (Object.keys(val).length > 0) {
            this.$socketSend(val);
          }
        }
      }
    },
    sockets: {
      onopen(event) {
        this.$emit("open", event);
      },
      onmessage(data, event) {
        this.socketData = data;
        this.$emit("message", data, event);
      },
      onerror(event) {
        this.$emit("error", event);
      },
      onclose(event) {
        this.$emit("close", event);
      }
    }
  };
</script>

<style></style>
