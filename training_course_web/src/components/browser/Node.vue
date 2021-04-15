<template>
  <div id="myChart" ref="myChart"></div>
</template>

<script>
// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts')
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap.js'
// require('echarts/lib/chart/map')
import { nodeConfig } from './browser'
export default {
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // 实例化echarts对象
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(nodeConfig[this.$store.getters.currentCourse].echartOption)
    }
  }
}
</script>

<style lang="scss" scoped>
#myChart {
  width: 1168px;
  height: 540px;
  margin: 0 auto;
  border-radius: 5px;
  background: url('../../assets/images/echart-bg.jpg') no-repeat;
  background-size: cover;
}
</style>
