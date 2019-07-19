<template>
  <div v-if="isEmpty" class="evaluation-result">
    <div class="evaluation-result-header">
      <p>
        {{result.evalName}}测评结果
        <span class="start-eval-btn"><el-button @click="handleClick">重新测评</el-button></span>
      </p>
      <p>
        {{result.type1 | addPlusSymbol(result.type2)}}
      </p>
    </div>
    
    <el-row 
      type="flex"
      class="evaluation-result-chart">
      <el-col
        :span="13"
        :lg="13"
        :md="12"
        :sm="12"
        :xs="24"
        class="chart-content">
        <ve-radar
          height="17rem" 
          :settings="result.chart1.settings" 
          :data="result.chart1.data" 
          :extend="result.chart1.extend">
        </ve-radar>
      </el-col>
      <el-col
        :span="11"
        :lg="11"
        :md="12"
        :sm="12"
        :xs="24"
        class="chart-content">
        <ve-line 
          height="17rem" 
          :settings="result.chart2.settings" 
          :data="result.chart2.data" 
          :extend="result.chart2.extend">
        </ve-line>
      </el-col>
     
    </el-row>
    <el-row 
      type="flex"
      class="evaluation-result-text">
      <el-col
        :span="24"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24">
        <el-card v-if="result.type1 && result.text1">
          <p class="result-text">{{result.type1}}</p>
          <p class="result-text" v-html="result.text1"></p>
        </el-card>
      </el-col>
      <el-col
        v-if="result.type2 && result.text2"
        :span="24"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24">
        <el-card>
          <p class="result-text">{{result.type2}}</p>
          <p class="result-text" v-html="result.text2"></p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
export default {
  name: 'evaluationResult',

  props: {
    eva: String,
  },

  data() {
    return {
      state: store.state,
      evalResult: null,
      evalType: null,
    }
  },

  computed: {
    result() {
      if (!this.evalResult) {
        return {}
      }
      const {evalResult, eva} = this;

      let chart1, chart2, evalName;

      if (eva == 'holland') {
        evalName = '霍兰德';
      } else if (eva == 'mbti') {
        evalName = 'MBTI职业性格';
      } else if (eva == 'midas') {
        evalName = '职业锚';
      } else {
        return {};
      }

      chart1 = this.radarChart();
      chart2 = this.lineChart();

      let data = {
        evalName,
        type1: evalResult.hasOwnProperty('type1') ? evalResult.type1 : evalResult.type,
        type2: evalResult.hasOwnProperty('type2') ? evalResult.type2 : null,
        chart1,
        chart2,
        text1: evalResult.hasOwnProperty('type1') ? '性格特点:&nbsp' + evalResult.character1 + '<br><br>' + '典型职业:&nbsp' + evalResult.job1 : evalResult.des,
        text2: evalResult.hasOwnProperty('type1') ? '性格特点:&nbsp' + evalResult.character2 + '<br><br>' + '典型职业:&nbsp' + evalResult.job2 : null,
      };
      
      return data;
    },
    isEmpty() {
      const {result} = this;
      let len = Object.getOwnPropertyNames(result).length;

      if (len > 0) {
        return true;
      }

      return false;
    }
  },

  filters: {
    addPlusSymbol(type1, type2) {
      if (type2) {
        return '您属于' + type1 + ' + ' + type2 + '类型'
      } else {
        return '您属于' + type1 + '类型'
      }
    },
  },

  created() {
    const vm = this;
    const {eva} = this;
    const domain = this.state.domain;
    let reqPath;
    console.log('eva', eva)

    if (eva == 'holland') {
      reqPath = 'hld-result';
      // reqPath = 'hld';
    } else if (eva == 'mbti') {
      reqPath = 'mbti-result';
      // reqPath = 'mbti';
    } else if (eva == 'midas') {
      reqPath = 'midas-result';
      // reqPath = 'career';
    } else {
      return;
    }

    axios({
      method: 'get',
      url: `/static/json/${reqPath}.json`
      // url: `com/test/${reqPath}/get`,
    })
    .then(function(response) {
      let res = response.data;
      if (res.status != 1) {
        vm.$confirm(res.msg, '提示')
      }

      vm.evalResult = res.data;
      vm.evalType = res.data.hasOwnProperty('score') ? 1 : res.data.hasOwnProperty('AU') ? 3 : 2;
      localStorage.setItem(eva, JSON.stringify(res.data))
    })
  },

  methods: {
    handleClick() {
      const {eva} = this;

      if (eva == 'holland') {
        this.$router.push({ path: '/evaluation/holland', query: { isShowModule: 1 } })
      } else if (eva == 'mbti') {
        this.$router.push({ path: '/evaluation/mbti', query: { isShowModule: 1 } })
      } else if (eva == 'midas') {
        this.$router.push({ path: '/evaluation/midas', query: { isShowModule: 1 } })
      } else {
        return;
      }
      // if (eva == 'holland') {
      //   this.$router.replace('/evaluation/holland')
      // } else if (eva == 'mbti') {
      //   this.$router.push('/evaluation/mbti')
      // } else if (eva == 'midas') {
      //   this.$router.push('/evaluation/midas')
      // } else {
      //   return;
      // }
    },
    radarChart: function() {
      const {evalResult, evalType} = this;
      let max;
      let data = {
        columns: ['图名'],
        rows: []
      };
      let settings = {};
      let extend = {};

      if (evalType == 1) { // 霍兰德测评
        max = evalResult.max;
        data.columns = data.columns.concat(Object.keys(evalResult.score).sort())
        data.rows[0] = Object.assign({}, {'图名': '二维对比'}, evalResult.score)

        
        extend.radar = {
          radius: '55%',
          indicator: [
            { name: 'A 艺术型', max, color: '#000'},
            { name: 'C 常规型', max, color: '#000'},
            { name: 'E 管理型', max, color: '#000'},
            { name: 'I 研究型', max, color: '#000'},
            { name: 'R 实际型', max, color: '#000'},
            { name: 'S 社会型', max, color: '#000'}
          ]
        }
      }

      if (evalType == 2) { // mbti测评
        let charType = {E: 'E 外向',S: 'S 实感', T: 'T 思考', J: 'J 判断',  I: 'I 内向',  N: 'N 直觉',  F: 'F 情感',  P: 'P 认知'}
        max = Math.max(evalResult.v1, evalResult.v2, evalResult.v3, evalResult.v4);
        data = {
          columns: ['图名', charType[evalResult.k1], charType[evalResult.k2], charType[evalResult.k3], 
          charType[evalResult.k4] ],
          rows: [{
            '图名': '二维对比', 
            [charType[evalResult.k1]]: evalResult.v1,
            [charType[evalResult.k2]]: evalResult.v2,
            [charType[evalResult.k3]]: evalResult.v3,
            [charType[evalResult.k4]]: evalResult.v4,
          }]
        };
        
        extend.radar = {
          radius: '55%',
          indicator: [
            {name: charType[evalResult.k1], max, color: '#000'},
            {name: charType[evalResult.k2], max, color: '#000'},
            {name: charType[evalResult.k3], max, color: '#000'},
            {name: charType[evalResult.k4], max, color: '#000'},
          ]
        }
      }

      if (evalType == 3) {
        max = Math.max(evalResult.AU, evalResult.CH, evalResult.EC, evalResult.GM, 
              evalResult.LS, evalResult.SE, evalResult.SV, evalResult.TF);
        data = {
          columns: ['图名', 'AU', 'CH', 'EC', 'GM', 'LS', 'SE', 'SV', 'TF'],
          rows: [{
            '图名': '二维对比',
            'AU': evalResult.AU, 
            'CH': evalResult.CH, 
            'EC': evalResult.EC, 
            'GM': evalResult.GM, 
            'LS': evalResult.LS, 
            'SE': evalResult.SE, 
            'SV': evalResult.SV, 
            'TF': evalResult.TF
          }]
        };
        
        extend.radar = {
          radius: '55%',
          indicator: [
            {name: 'AU', max, color: '#000'},
            {name: 'CH', max, color: '#000'}, 
            {name: 'EC', max, color: '#000'}, 
            {name: 'GM', max, color: '#000'}, 
            {name: 'LS', max, color: '#000'}, 
            {name: 'SE', max, color: '#000'}, 
            {name: 'SV', max, color: '#000'}, 
            {name: 'TF', max, color: '#000'}
          ]
        }
      }
      return {data, settings, extend};
    },

    lineChart: function() {
      const {evalResult, evalType} = this;
      let data = {
        columns: ['类型', '得分'],
        rows: []
      }
      let settings = {
        legendName: {
          '得分': '横向对比'
        }
      };
      let extend = {};

      if (evalType == 1) { // 霍兰德测评
        let type = {A: 'A 艺术型', C: 'C 常规型', E: 'E 管理型', I: 'I 研究型', R: 'R 实际型', S: 'S 社会型'}
        data = {
          columns: ['类型', '得分'],
          rows: []
        }
        settings = {
          legendName: {
            '得分': '横向对比'
          }
        };
        extend = {};
  
        for (let key in evalResult.score) {
          data.rows.push({'类型': type[key], '得分': evalResult.score[key]})
        }
      }

      if (evalType == 2) { // mbti测评
        let charType = {E: 'E 外向',S: 'S 实感', T: 'T 思考', J: 'J 判断',  I: 'I 内向',  N: 'N 直觉',  F: 'F 情感',  P: 'P 认知'}
        data = {
          columns: ['类型', '得分'],
          rows: [
            {'类型': charType[evalResult.k1], '得分': evalResult.v1},
            {'类型': charType[evalResult.k2], '得分': evalResult.v2},
            {'类型': charType[evalResult.k3], '得分': evalResult.v3},
            {'类型': charType[evalResult.k4], '得分': evalResult.v4}
          ]
        }
      }

      if (evalType == 3) {
        data = {
          columns: ['类型', '得分'],
          rows: [
            {'类型': 'AU', '得分': evalResult.AU},
            {'类型': 'CH', '得分': evalResult.CH}, 
            {'类型': 'EC', '得分': evalResult.EC}, 
            {'类型': 'GM', '得分': evalResult.GM}, 
            {'类型': 'LS', '得分': evalResult.LS}, 
            {'类型': 'SE', '得分': evalResult.SE}, 
            {'类型': 'SV', '得分': evalResult.SV}, 
            {'类型': 'TF', '得分': evalResult.TF}
          ]
        }
      }

      return {data, settings, extend};
    }
  }

}
</script>

<style type="text/css">
    /*答案布局*/
  .evaluation-result {
    position: relative;
    height: 100%;
    padding-right: 15px;
    padding-top: 20px;
  }
  .evaluation-result .evaluation-result-header {
    padding-bottom: 17px;
  }
  .evaluation-result .evaluation-result-header p {
    position: relative;
  }
  .evaluation-result .evaluation-result-header .start-eval-btn {
    position: absolute;
    top: 0;
    right: 50px;
    cursor: pointer;
  }
  @media screen and (max-width: 720px) {
    .evaluation-result .evaluation-result-header {
      text-align: left;
    }
    .evaluation-result .evaluation-result-header .start-eval-btn {
      right: 20px;
    }
  }
  .evaluation-result .evaluation-result-header .start-eval-btn .el-button{
    background-color: rgb(47, 218, 184);
    color: #fff;
  }
  .evaluation-result .el-row--flex {
    flex-wrap: wrap;
  }
  .evaluation-result .evaluation-result-text {
    padding-left: 20px;
  }
  .evaluation-result .evaluation-result-text .el-card {
    margin-bottom: 20px;
    text-align: left;
  }
  .evaluation-result .evaluation-result-text .el-card .result-text {
    line-height: 1.5;
    padding-bottom: 10px;
    color: #5d5c5c;
  }
  
</style>