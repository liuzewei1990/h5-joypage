import * as echarts from "@work/echarts";

var chartDom = document.getElementById("main");
var myChart = echarts.init(chartDom);
var option;

myChart.setOption({
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
    {
      name: "Pressure",
      type: "gauge",
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}"
      },
      data: [
        {
          value: 50,
          name: "SCORE"
        }
      ]
    }
  ]
});
