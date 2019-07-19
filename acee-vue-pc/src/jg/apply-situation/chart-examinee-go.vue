<template>
  <div class="chart-examinee-go">
    <div class="chart-content">
      <h2 class="chart-title">{{year}}考生去向图</h2>
      <div class="chart-select">
        <p class="select-title">请选择批次：</p>
        <zs-select
          v-model="batch"
          :options="batchOptions"
          selectValue="理科 一本">
          批次
        </zs-select> 
      </div>
      <div class="chart-result">
        <ve-histogram
          :data="chartData"
          :settings="chartSettings"
          :extend="chartExtend">
        </ve-histogram>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
export default {
  name: 'chartExamineeGo',

  data() {
    return {
      state: store.state,
      PUBLIC_CDN_DOMAIN: store.state.PUBLIC_CDN_DOMAIN,
      batch: 'li_lin1_prov',
      chartSettings: {
        yAxisName: ['人数'],
        labelMap: {
          'name': '城市',
          'num': '人数'
        },
      },
      chartExtend: {
        grid: {
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            // interval: '0',
          }
        },
        yAxis: {
          max: 'dataMax'
        }
      },
      chartData: null,
      batchOptions: [
        {value: "li_lin1_prov", label: '理科 一本'},
        {value: "li_lin2_prov", label: '理科 二本'},
        {value: "li_lin3_prov", label: '理科 专科'},
        {value: "wen_lin1_prov", label: '文科 一本'},
        {value: "wen_lin2_prov", label: '文科 二本'},
        {value: "wen_lin3_prov", label: '文科 专科'},
      ]
    }
  },

  watch: {
    batch(file) {
      const vm = this;
      const {PUBLIC_CDN_DOMAIN} = this;
      axiosPublicRes.get(`/acee/wx/json/${file}.json`)
      .then((response) => {
        let res = response.data;
        vm.assignChartData(res)
      })
    }
  },

  computed: {
    year() {
      return new Date().getFullYear() - 1
    }
  },

  created() {
    const vm = this;
    const {PUBLIC_CDN_DOMAIN} = this;
    axiosPublicRes.get(`/acee/wx/json/li_lin1_prov.json`)
    .then((response) => {
      let res = response.data;
      vm.assignChartData(res)
    })
  },

  methods: {
    assignChartData(data) {
      this.chartData = {
        columns: ['name', 'num'],
        rows: [data.sc].concat(data.province)
      };
    }
  }
}
</script>

<style lang="scss">
  .chart-examinee-go {
    position: relative;
    padding-top: 20px;

    .chart-content {
      padding: 20px;
      background-color: #fff;

      .chart-title {
        text-align: center;
        padding: 10px;
      }

      .chart-select {
        width: 200px;
        margin-left: 20px;
        margin-bottom: 20px;

        .select-title {
          font-size: 0.9rem;
          text-align: left;
          padding-bottom: 10px;
        }
      }
    }
  }
</style>