/**
 * [bilinearData 混入数据: 用于设置小图双折线的样式配置数据]
 * @type {Object}
 * 使用说明：请以混入的方式写入vue实例中
 *          必须是v-charts的折线图组件
 *          在其组件上绑定 :settings="settings" :extend="extend"即可
 *          如遇自己设置的样式修改无效时，请将自己设置的样式用extend对象进行重写
 */
export var bilinearData = {
  data () {
    return {
      settings: {
        min: ['dataMin'],
        max: ['dataMax']
      },
      extend: {
        tooltip: {
          show: false
        },
        series: {
          type: 'line',
          symbolSize: 6,
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        'series.0.label': {
          show: true,
          position: 'bottom',
          distance: 5,
          fontSize: 11,
          formatter: function (p) {
            if(typeof p.value[1] === 'string') {
              return '无'
            }
          }
        },
        'series.1.label': {
          show: true,
          position: 'top',
          distance: 8,
          fontSize: 11,
          formatter: function (p) {
            if(typeof p.value[1] === 'string') {
              return '无'
            }
          }
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
}
