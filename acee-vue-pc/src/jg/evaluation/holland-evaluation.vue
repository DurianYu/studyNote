<template>
  <div class="holland-evaluation">
    <div 
      v-show="isShowModule == 0" 
      class="choose-btn">
      <el-row>
        <router-link to="/jg/evaluation/result/holland" tag="el-button">查看测评结果</router-link>
        <el-button type="success" @click="startEvaluation">开始霍兰德测评</el-button>
      </el-row>
    </div>
    <div 
      class="holland-evaluation-que"
      v-if="question.length > 0"
      v-show="isShowModule == 1">
      <div 
        v-for="(groups, index) of question"
        :key="index"
        class="question-group"
        :class="[(index + 1) == currentPage ? 'is-display' : '']">
        <el-card
          class="question-items"
          v-for="(items, i) of groups"
          :key="i">
          <el-checkbox
            v-for="item of items"
            :key="item[0]"
            v-model="quesAnser[item[0]]['res']"
            :true-label="1"
            :false-label="0">
            {{item[1]}}
          </el-checkbox>
          <div 
            class="submit-btn"
            v-if="isShowBtn(groups, i, question, index)">
            <el-button 
              type="primary"
              @click="submitAns">
              提交
            </el-button>
          </div>
        </el-card>
      </div> 
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="pageNum"
        @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import {dataMethods} from '@/mixins/question-methods.js'
export default {
  name: 'hollandEvaluation',

  mixins: [dataMethods],
  
  data() {
    return {
      state: store.state,
      PUBLIC_CDN_DOMAIN: store.state.PUBLIC_CDN_DOMAIN,
      question: [],
      quesAnser: {}, // 答案 必须，不能改变key值
      pageNum: null, // 页数  必须，不能改变key值
      currentPage: 1, // 当前页码 必须，不能改变key值
      // 显示哪个模块： 0: 选择按钮, 1: 问题,
      isShowModule: this.$route.query.hasOwnProperty('isShowModule') ? this.$route.query.isShowModule : 0,

    }
  },


  created() {
    if (this.isShowModule == 1) {
      this.startEvaluation();
    }
  },

  methods: {
    startEvaluation: function() { // 开始测评
      const vm = this;
      const {PUBLIC_CDN_DOMAIN} = this;
      axios.get(`${PUBLIC_CDN_DOMAIN}/acee/wx/json/hld-test.json`)
      // axios.get(`/static/json/holland.json`)
      .then(function(response) {
        let retData = vm.checkQueType(response.data);
        vm.question = retData.data;
        vm.quesAnser = retData.ansModel;
        vm.pageNum = retData.data.length;
        vm.isShowModule = 1;
      })
    },
    changePage: function(num) {
      this.currentPage = num;
    },

    assAns: function() {
      const {quesAnser} = this;
      const vm = this;
      let answerArr = [];
      for(let key in quesAnser) {
        let ansItem = quesAnser[key];
        if (!ansItem.res) {
          quesAnser[key].res = 0;
        }
        answerArr.push(ansItem)
      }
      return answerArr;
    },

    submitAns: function() {
      const vm = this;
      let postAns = this.assAns();

      console.log('霍兰德答案', JSON.stringify(postAns))

      axios({
        method: 'post',
        url: `${store.state.AJAX_DOMAIN}com/test/hld/set`,
        data: {
          hld: JSON.stringify(postAns)
        }
      })
      .then(function(response) {
        let res = response.data;
        if (res.status != 1) {
          return vm.$confirm(res.msg, '提示')
        }
        vm.$router.push('/jg/evaluation/result/holland')
        localStorage.setItem('holland', JSON.stringify(res.data))
      })
    },
  }
}
</script>


<style>
  .holland-evaluation {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
  /*问题布局*/
  .holland-evaluation .question-group {
    display: none;
    flex-wrap: wrap;
    padding: 1.5rem;
    padding-top: 0px;
  }
  .holland-evaluation .question-group .question-items {
    width: 25rem;
  }
  @media screen and (min-width: 1130px) {
    .holland-evaluation .question-group .question-items:first-child {
      margin-right: 58px;
    }    
  }
  /*card*/
  .holland-evaluation .question-group,
  .holland-evaluation .question-group .question-items .el-card__body {
    justify-content: center;
  }
  .holland-evaluation .question-group .question-items .el-card__body {
    display: flex;
    flex-direction: column;
  }
  /*多选按钮*/
  .holland-evaluation .question-group .question-items .el-card__body .el-checkbox {
    display: flex;
    margin: 0.5rem;
    font-size: 1rem;
    white-space: normal;
    text-align: left;
  }
  
  .holland-evaluation .question-group .question-items .el-card__body .el-checkbox .el-checkbox__inner {
    top: 50%;
    transform: translateY(-55%);
  }
  
  /*分页*/
  .holland-evaluation .el-pagination {
    padding: 15px 5px;
  }
  
  .holland-evaluation .is-display {
    display: flex;
  }
  
  /*提交按钮*/
  .holland-evaluation .question-group .question-items .el-card__body .submit-btn {
    padding-top: 15px;
  }
  .holland-evaluation .question-group .question-items .el-card__body .submit-btn .el-button{
    width: 98px;
  }

  /*选择按钮*/
  .holland-evaluation .choose-btn {
    padding: 9% 0px;
  }
</style>