// 导出所有方法 提供给lib库使用
export * from "echarts/core";

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
import "echarts-liquidfill";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart, SankeyChart, RadarChart, GaugeChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, VisualMapComponent } from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一1步
import { CanvasRenderer } from "echarts/renderers";

// import myTheme from "./customed.json";
// echarts.registerTheme("myTheme", myTheme);

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  SankeyChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  VisualMapComponent
]);

import VueEcharts from "vue-echarts";
const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  Vue.component("vue-chart", VueEcharts);
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
