/**
 * @type  {[String]} width 可选参数 [图表的宽度, 默认值: 100%]
 * @type  {[String]} height 可选参数 [图表的高度, 默认值: 400px]
 */
<template lang="html">
  <div class="chart-compete">
    <div>
      竞争力分析图
    </div>

    <ve-histogram
    :width="width"
    :height="height"
    :data="chartData"
    :extend="extend"
    :settings="settings"
    :mark-point="markPoint"
    :tooltip-visible="false"
   :legend-visible="false"
    >
    </ve-histogram>

    <div>
      分段总人数: {{ all_people }} 人
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js';
import {
  OverTime
} from '@/utils/util.js';
import 'echarts/lib/component/markPoint';
export default {
  name: 'chart-compete',
  props: {
    width: {
      type: String,
      default: '100%' // 图表 的宽度
    },
    height: {
      type: String,
      default: '400px' // 图表 的宽度
    }
  },
  data() {
    return {
      markPoint: {},
      all_people: 0, // 该分段的总人数
      chartData: {
        columns: ['分数', '人数'],
        rows: []
      },
      settings: {
        yAxisName: ['人数'],
        xAxisName: ['分数'],
        max: ['dataMax']
      },
      extend: {
        title: {
          text: 'Different Easing Functions',
          left: 'center'
        },
        grid: {
          right: '8%',
          containLabel: true
        },
        xAxis: {
          nameGap: 5, // 轴名距轴的距离
          nameLocation: 'end', // 轴名位置
          axisLine: { // 线
            show: true
          },
          axisTick: { // 刻度
            show: true,
            alignWithLabel: true, // 居中对齐
          },
        },
        yAxis: {
          nameLocation: 'end', // 轴名位置
          axisLine: { // 线
            show: true
          },
          axisTick: { // 刻度
            show: true,
            alignWithLabel: true, // 居中对齐
          },
        },
        'yAxis.1.show': false,
        series: {
          barCategoryGap: '40%',
          itemStyle: { //柱子的形状和渐变颜色
            barBorderRadius: [10, 10, 0, 0], //上面两个角为圆弧型
            color: new echarts.graphic.LinearGradient( //渐变
              0, 0, 0, 1, //第四个数据为透明度，1，为不透明,前三个数为鼠标hover柱体上，柱体的颜色某个部分变淡，或加深
              [{
                  offset: 0,
                  color: '#14c8d4'
                },
                {
                  offset: 1,
                  color: '#43eec6'
                },
              ])
          },
        }
      }
    }
  },
  computed: {
    userInfo: () => store.state.userInfo,
  },
  methods: {
    // 查找课堂数据的位置
    getIndex(score) {
      let index = '';
      let data = this.chartData.rows;
      for (let i = 0, len = data.length; i < len; i++) {
        if (String(data[i]['分数']) === String(score)) return i;
      }
    },
    // 获取竞争力图标的数据
    getCompeteList() {
      axios({
        url: '/assets',
      }).then(res => {
        res = res.data;
        if (res.status === 1) {
          this.renderData(res);
          this.painScore(res);
          // 设置该分段的总人数
          this.all_people = res.data.slice(-1)[0].cumulative - res.data[0].cumulative;
        }
        if (res.status === -1) {
          this.$alert(`${res.msg}`, '');
        }
        if (res.status === -2) {
          OverTime(this, res.msg);
        }
      }).catch(error => console.error(error));

    },
    // 渲染数据
    renderData(res) {
      for (let v of res.data) {
        this.chartData.rows.push({
          '分数': v.score,
          '人数': v.num
        });
      }
    },
    // 绘制用户分数
    painScore(res) {
      // 设置用户分数的标注
      let u_info = this.userInfo;
      // true为预估分 false为高考分
      let user_score = u_info.score_triger === 0 ? u_info.pre_score : u_info.score;
      // 没有分数则不画
      if (!user_score) return;
      let index = this.getIndex(user_score);
      let people = String(this.chartData.rows[index]['人数']);
      this.markPoint = {
        symbolSize: 60,
        data: [{
          name: '用户分数',
          coord: [String(user_score), String(people)],
          value: people,
          label: {
            fontSize: 14
          }
        }]
      }
    }
  },
  created() {
    this.getCompeteList();
  }
}
</script>

<style lang="css">
</style>
