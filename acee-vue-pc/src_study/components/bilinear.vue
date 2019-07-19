<template lang="html">
  <div class="">

    <ve-line
    :height="height"
    :width="width"
    :data="data"
    :settings="settings"
    :extend="extend"
    :colors="colors"
    />
    {{extend}}
  </div>
</template>

<script>

export default {
  name: 'Bilinear',
  props: {
    width: String,
    height: String,
    data: Object,
    colors: Array,
    settings: {
      type: Object,
      default() {
        return {
          min: ['dataMin'],
          max: ['dataMax'],
        }
      }
    },
    extend: {
      type: Object,
      default() {
        return {
          tooltip: {
            show: false
          },
          series: {
            symbolSize: 6,
            smooth: true,
            lineStyle: {
              width: 1
            }
          },
          'series.0.label': {
            show: true,
            position: 'bottom',
            distance: 1,
            fontSize: 11
          },
          'series.1.label': {
            show: true,
            position: 'top',
            distance: 1,
            fontSize: 11
          },
          grid: {
            top: 45,
            left: 5,
            right: 5,
            bottom: 0
          },
          legend: {
            itemGap: 5, // 间隔
            itemWidth: 5,
            itemHeight: 8,
            right: 0,
            textStyle: {
              color: '#aaa'
            }
          },
          yAxis: {
            show: false, // 直接隐藏y轴
            axisLabel: {
              show: false // y轴上的 刻度标签， 即是y轴上显示的值。 ！！！若不关闭 会继续占据空间！！！
            }
          },
          xAxis: {
            axisLine: { // 线
              show: true
            },
            axisTick: { // 刻度
              show: true
            },
            axisLabel: { // 标签
              color: '#ddd'
            }
          }
        }
      }
    }
  },
  components: {
  },
  created () {
    console.log(this);
    console.log('this.props', this.$props);
  },
  data() {
    return {
      fg: '2233'
    }
  }
}
</script>

<style lang="scss">
</style>
