<template>
  <div class="chart-fraction-seg">
    <div class="chart-header">
      <h2>历年考生分数正态分布图</h2>
      <!-- <div class="input-score">
        <span class="input-score_title">请输入成绩</span>
        <el-input 
          placeholder="请输入成绩"
          v-model="score">
          <template slot="prepend">成绩</template>
        </el-input>
      </div> -->
    </div>
    <template v-if="chartData[0] && chartData[1]">
      <div 
        v-for="(chart, index) of chartData"
        class="chart-histogram">
        <p class="chart-histogram_title">{{chart.title}}</p>
        <ve-histogram
          :data="chart.data"
          :settings="chartSettings"
          :extend="extend"
          :mark-point="chart.markPoint"><!-- :extend="chartExtend" -->
        </ve-histogram>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import 'echarts/lib/component/markPoint'
export default {
  name: 'chartFractionSeg',

  data() {
    return {
      state: store.state,
      PUBLIC_CDN_DOMAIN: store.state.PUBLIC_CDN_DOMAIN,
      chartData: [],
      chartSettings:{
        yAxisName: ['人数'],
        xAxisName: ['分数'],
        labelMap: {
          'score': '成绩',
          'num': '人数'
        },
      },
      extend: {
        grid: {
          right: '8%',
          containLabel: true
        },
        xAxis: {
          nameGap: 5, // 轴名距轴的距离
          nameLocation: 'end', // 轴名位置
        },
        yAxis: {
          nameLocation: 'end', // 轴名位置
        },
      }
      // score: 566,
    }
  },

  // watch:{
  //   score(score, oldVal) {
  //     const vm = this;
  //     const {chartData} = this;
  //     let reg = /^[0-9]{0,3}$/;

  //     if (!reg.test(score)) {
  //       return this.$confirm('请输入小于750的数字', '提示')
  //     }

  //     chartData.forEach((chart)=>{
  //       let coord = vm.getCoord(chart)
  //       chart.markPoint.data[0].coord = coord;
  //       chart.markPoint.data[0].value = score;
  //     })
  //   }
  // },

  created() {
    const vm = this;
    const userInfo = this.state.userInfo;
    let jsonFile;
    let chartTtile;
    let coord;
    let now = new Date().getFullYear();

    for (let i = 1; i < 4; i++) {
      let year = now - i;
      switch (userInfo.category) {
        case 1: // 文科
          chartTtile = `${year}文科考生分数正态分布图`;
          jsonFile = year + "_wen";
          break;
        case 2: // 理科
          chartTtile = `${year}理科考生分数正态分布图`;
          jsonFile = year + "_li";
          break;
      }
     this.assignChartData(jsonFile, chartTtile, year, i)
    }
  },

  methods: {
    assignChartData(jsonFile, title, year, index) {
      const {PUBLIC_CDN_DOMAIN, state} = this;
      // 0： 预估分 1：高考分
      const score = state.userInfo.score_triger ? state.userInfo.score : state.userInfo.pre_score
      const vm = this;

      axios.get(`${PUBLIC_CDN_DOMAIN}/acee/wx/json/` + jsonFile + ".json")
      .then((response)=>{
      	let data = response.data;
        let coord;
        let chart = {
          data: {
            columns: ['score', 'num'],
            rows: data.rows
          },
          markPoint: {
            label: {
              show: true,
            },
            data: [
              {
                value: score,
                coord: []
              }
            ]
          },
          title,
          year,
        }


        coord = vm.getCoord(chart, score)
        chart.markPoint.data[0].coord = coord;
        console.log(chart.title)
        vm.$set(vm.chartData, index - 1, chart)
      })
    },

    getCoord(chartData, score) {
      const {markPoint} = this;
      let rows = chartData.data.rows;

      for (let i = 0, len = rows.length; i < len; i++) {
        let oneScore = rows[i].score;

        if (score == oneScore) {
          return [i, rows[i].num];
          break;
        }

        if (score - oneScore > 0 && score - oneScore < 5) {
          // let inset;

          // if (i == 0) {
          //   if (oneScore > rows[i + 1].score) {
          //     inset = i;
          //   } else {
          //     inset = i = 1;
          //   }
          // }

          rows.splice(i, 0, {
            score,
            num: rows[i].num - 20
          })
          return [i, rows[i].num - 20];
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .chart-fraction-seg {
    position: relative;
    padding-top: 20px;

    .chart-header {
      background-color: #fff;
      padding: 20px;

      .input-score {
        width: 250px;
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;

        .input-score_title {
          color: #333;
        }
      }
    }

    .chart-histogram {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px;

      .chart-histogram_title {
        margin-bottom: 15px;
      }
    }
  }
</style>