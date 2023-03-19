// import r from "./RadarChart.demo";
// import "./PieChart.demo";
import "./GaugeChart.demo";

import Vue from "vue";
import App from "./App.vue";

import echarts from "@work/echarts";

Vue.use(echarts);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
