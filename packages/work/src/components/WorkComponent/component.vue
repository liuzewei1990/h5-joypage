<template>
  <component
    data-info="开发者组件"
    class="component"
    :class="item.i"
    :ref="coName"
    :is="coName"
    :style="style"
    :i="item.i"
    v-bind="$attrs"
    @hook:beforeCreate="onBeforeCreate"
    @hook:created="onCreated"
    @hook:mounted="onMounted"
    @hook:activated="onActivated"
    @hook:deactivated="onDeActivated"
    @hook:destroyed="onDestroyed">
  </component>
</template>

<script>
  import Vue from "vue";
  import { number, object, string } from "vue-types";
  // import { Empty } from "ant-design-vue";

  export default {
    inheritAttrs: true,
    // components: { Empty },
    inject: ["work"],
    provide() {
      const workApi = {
        // state: this.work.state,
        setWorkView: (...args) => this.work.setWorkView(...args),
        on: (...args) => this.work.on(...args),
        off: (...args) => this.work.off(...args),
        emit: (...args) => this.work.emit(...args)
      };
      // 为了state的安全性 只有指定的组件可提供注入state数据使用
      if (["WorkTabs"].indexOf(this.coName) !== -1) {
        workApi["state"] = this.work.state;
      }
      return { work: workApi };
    },
    props: {
      item: object().def({})
    },
    computed: {
      isComponent() {
        return Vue.component(this.item.coName) || ["router-view"].indexOf(this.item.coName) !== -1;
      },
      coName() {
        return this.isComponent ? this.item.coName : "Empty";
      },
      coProps() {
        return this.item.coProps;
      },
      style() {
        let style = {};
        style["position"] = "absolute";
        style["inset"] = "0px";
        style["overflow-y"] = "auto";
        style["height"] = "100%";

        return this.item.fixedHeight ? style : {};
      }
    },
    created() {},
    methods: {
      onBeforeCreate() {
        this.$emit("onBeforeCreate", this.$children[0]);
        // 给业务组件自动注入__observerData props
        // if (this.$children[0] && this.$children[0].$options.props) {
        //   this.$children[0].$options.props["__observerData__"] = object().def({});
        // }
      },
      onCreated() {},
      onMounted() {
        // 在舞台中新增组件时，并且组件加载完毕后，自动设置组件的高度为grid-item高度
        if (this.item._new_) this.autoSetHeight();
        delete this.item._new_;

        this.onBus();
      },
      onActivated() {
        // this.onBus();
      },
      onDeActivated() {
        // this.offBus();
      },
      onDestroyed() {
        this.offBus();
      },

      onBus() {
        this.work.on(this.coName, this.triggerEvent);
      },
      offBus() {
        this.work.off(this.coName, this.triggerEvent);
      },
      triggerEvent({ type, data }) {
        const instance = this.$refs[this.coName];
        const on = instance.$options.on || {};
        if (Object.keys(on).indexOf(type) !== -1) on[type].call(instance, { type, data });
      },
      autoSetHeight() {
        this.work.setElementHeight(this.item.i);
      }
    }
  };
</script>

<style></style>
