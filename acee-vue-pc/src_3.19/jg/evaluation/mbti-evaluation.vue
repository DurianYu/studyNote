<template>
  <div 
    class="mbti-evaluation"
    ref="evaluation">
    <div 
      v-show="isShowModule == 0" 
      class="choose-btn">
      <el-row>
        <router-link to="/evaluation/result/mbti" tag="el-button">查看测评结果</router-link>
        <el-button type="success" @click="startEvaluation">开始性格测评</el-button>
      </el-row>
    </div>
    <div 
      v-if="data.length > 0"
      v-show="isShowModule == 1"
      class="mbti-evaluation-question">
      <div
        v-for="(groups, gs) of data"
        :key="gs"
        class="question-group"
        :class="{
          'is-sign-question': groups.length < 3,
          'is-display': (gs + 1) == currentPage
        }">
          <template v-if="groups[0].hasOwnProperty('title')">
            <el-card class="question-kind-title">
              {{groups[0].title}}
            </el-card>
          </template>
          <el-card 
            v-for="(items, is) of groups"
            v-if="Object.prototype.toString.call(items) == '[object Array]'"
            :key="is"
            class="question-items">
            <div 
              v-for="(item, index) of items"
              :key="index"
              class="question-item">
              <div v-if="item.hasOwnProperty('title')" class="question-item-title">
                {{item.id}}、{{item.title}}
              </div>
              <div class="question-item-ans">
                <template v-if="item.isRadio">
                   <el-radio
                    v-for="(answer, a) of item.answer"
                    :key="a"
                    :label="a"
                    :ref="'question_' + item.id"
                    @change.native="handleAnswerClick"
                    v-model="quesAnser[item.id]['res']">{{answer}}</el-radio>
                </template>
                <template v-else>
                   <el-checkbox
                    v-for="(answer, a) of item.answer"
                    :key="a"
                    :true-label="1"
                    :false-label="0"
                    :ref="'question_' + item.id"
                    @change.native="handleAnswerClick"
                    v-model="quesAnser[item.id]['res'][a]">{{answer}}</el-checkbox>
                </template>
              </div>
            </div>
            <div 
              class="submit-btn"
              v-if="isShowBtn(data, gs, groups, is)">
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
        layout="prev, next"
        :page-size="1"
        :total="pageNum"
        prev-text="上一页"
        next-text="下一页"
        :current-page="currentPage"
        @prev-click="prevPage"
        @next-click="nextPage">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import {dataMethods, dealwithAnswer} from '@/mixins/question-methods.js'
import {getParents} from '@/utils/dom.js'
export default {
  name: 'mbtiEvaluation',

  mixins: [dataMethods, dealwithAnswer],

  data() {
    return {
      state: store.state,
      domain: store.state.domain,
      data: [],  // 用于渲染的测评问题数据 必须，不能改变key值
      quesAnser: {}, // 答案 必须，不能改变key值
      pageNum: null, // 页数  必须，不能改变key值
      currentPage: 1, // 当前页码 必须，不能改变key值
      isShowModule: this.$route.query.hasOwnProperty('isShowModule') ? this.$route.query.isShowModule : 0, // 显示哪个模块： 0: 选择按钮, 1: 问题,
    }
  },

  created() {
    if (this.isShowModule == 1) {
      this.startEvaluation();
    }
  },

  methods: {
    startEvaluation: function() {
      const vm = this;
      const {domain} = this;
      axios.get(`${domain}/acee/wx/json/MBTI.json`)
      // axios.get(`/static/json/mbti.json`)
      .then(function(response) {
        let retData = vm.checkQueType(response.data); // 返回组合的问题数据，格式为[[[半页数据], []]]和答案model对象
        vm.data = retData.data;
        vm.quesAnser = retData.ansModel;
        vm.pageNum = retData.data.length;
        vm.isShowModule = 1;
      })
    },

    handleAnswerClick: function(el) {
      let answerOne = getParents(el.target, 'el-radio'); // 获取class为el-radio的父元素
      let sibling  = this.getSiblings(answerOne); // 获取兄弟元素
      sibling.forEach(function(node) {
        node.style.color = ''; // 取消按钮及其兄弟元素的标红
      })
    },
    submitAns: function() {
      const vm = this;
      if (!this.checkAnsAllQue()) { // 判断当前页面的问题是否回答完
        return false;
      }
      let postAns = this.assAns();
     
      console.log('mbti', JSON.stringify(postAns)) 

      axios({
         method: 'get',
         url: '/static/json/mbti-result.json',
        // method: 'post',
        // url: 'com/test/hld/set',
        // data: {
        //   hld: JSON.stringify(postAns)
        // }
      })
      .then(function(response) {
        let res = response.data;
        console.log('res', res)
        if (res.status != 1) {
          return vm.$confirm(res.msg, '提示').then(()=>{}).catch(()=>{})
        }
        vm.$router.push('/evaluation/result/mbti')
        localStorage.setItem('mbti', JSON.stringify(res.data))
      })
    },
  }
}
</script>

<style>
  .mbti-evaluation {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group {
    display: none;
    flex-wrap: wrap;
    padding: 1.5rem;
    padding-top: 0px;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group.is-sign-question .question-kind-title,
  .mbti-evaluation .mbti-evaluation-question .question-group .question-kind-title {
    width: 30rem;
    margin-bottom: 10px;
    line-height: 1.2rem;
    text-align: left;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group.is-sign-question {
    flex-direction: column;
    align-items: center;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group.is-sign-question .question-items:last-child {
    margin-left: 0px;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group.is-display {
    display: flex;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items {
    width: 30rem;
  }
  @media screen and (min-width: 1213.8px) {
    .mbti-evaluation .mbti-evaluation-question .question-group .question-kind-title {
      width: 60rem;
    }    
  }
  @media screen and (min-width: 1300px) {
    .mbti-evaluation .mbti-evaluation-question .question-group .question-items:last-child {
      margin-left: 58px;
    }
    .mbti-evaluation .mbti-evaluation-question .question-group .question-kind-title {
      width: calc(60rem + 58px);
    }    
  }

  /*card*/
  .mbti-evaluation .mbti-evaluation-question .question-group,
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items .el-card__body {
    justify-content: center;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items .el-card__body {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items {
    text-align: left;
  }
  .mbti-evaluation-question .question-group .question-items .question-item-title {
    padding: 10px 0px;
  }
 

  /*单选按钮*/
  .mbti-evaluation .mbti-evaluation-question .question-group .el-radio {
    white-space: normal;
    margin: 6px 7px;
    line-height: 1.5;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group .el-radio+.el-radio {
    margin-left: 7px;
  }

  /*分页*/
  .mbti-evaluation .mbti-evaluation-question .el-pagination {
    padding: 15px 5px;
  }
  .mbti-evaluation .mbti-evaluation-question .el-pagination .btn-prev,
  .mbti-evaluation .mbti-evaluation-question .el-pagination .btn-next {
    width: 98px;
    text-align: center;
    font-weight: 500;
    background-color: #409EFF;
    border-color: #409EFF;
    border: 1px solid #dcdfe6;
    color: #fff;
    height: auto;
    line-height: 16px;
    border-radius: 4px;
  }
  .el-pagination.is-background .btn-next:disabled, 
  .el-pagination.is-background .btn-prev:disabled {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
  .mbti-evaluation .mbti-evaluation-question .el-pagination span:not([class*=suffix]) {
    font-size: 14px;
    height: auto;
    line-height: 16px;
    padding: 12px 20px;
  }
  
  /*提交按钮*/
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items .el-card__body .submit-btn {
    text-align: center;
    padding-top: 15px;
  }
  .mbti-evaluation .mbti-evaluation-question .question-group .question-items .el-card__body .submit-btn .el-button{
    width: 98px;
  }

    /*选择按钮*/
  .mbti-evaluation .choose-btn {
    padding: 9% 0px;
  }

</style>