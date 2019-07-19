<template>
  <div 
    class="midas-evaluation"
    ref="evaluation">
    <div 
      v-show="isShowModule == 0" 
      class="choose-btn">
      <el-row>
        <router-link to="/evaluation/result/midas" tag="el-button">查看测评结果</router-link>
        <el-button type="success" @click="startEvaluation">开始能力测评</el-button>
      </el-row>
    </div>
    <div 
      v-if="data"
      v-show="isShowModule == 1"
      class="midas-evaluation-question">
      <div
        v-for="(groups, gs) of data"
        :key="gs"
        class="question-group"
        :class="{
          'is-sign-question': groups.length < 3,
          'is-display': (gs + 1) == currentPage
        }">
        <div 
          v-for="(items, is) of groups"
          :key="is"
          class="question-items-content">
          <el-card 
            v-if="Object.prototype.toString.call(items) == '[object Object]' && items.hasOwnProperty('title')"
            class="question-kind-title">
            {{groups[0].title}}
          </el-card>
          <el-card 
            v-else-if="Object.prototype.toString.call(items) == '[object Array]'"
            class="question-items">
            <div 
              v-for="(item, index) of items"
              :key="index"
              class="question-item"
              :class="{
                'choose-question-item': isChooseQue
              }">
              <template
                v-if="!isChooseQue && item.hasOwnProperty('title')">
                <div class="question-item-title">
                  {{item.id}}、{{item.title}}
                </div>
              </template>
              <template
                v-else-if="isChooseQue && item.res">
                <el-checkbox 
                  v-model="quesAnser[item.id]['res']"
                  :true-label="parseInt(item.res) + 4"
                  :false-label="parseInt(item.res)"
                  @change="toggleSelected(item.id)">
                  {{item.id}}、{{item.title}}
                  <span class="question-answer--text">(&nbsp;{{ item.answer | convertText(item.res) }}&nbsp;)</span>
                </el-checkbox>
              </template>
              <div 
                class="question-item-ans"
                v-if="!isChooseQue">
                <template v-if="item.isRadio">
                   <el-radio
                    v-for="(answer, a) of item.answer"
                    :key="a"
                    :label="a + 1"
                    :ref="'question_' + item.id"
                    @change.native="handleAnswerClick($event, 'el-radio')"
                    v-model="quesAnser[item.id]['res']">{{answer}}</el-radio>
                </template>
                <template v-else>
                   <el-checkbox
                    v-for="(answer, a) of item.answer"
                    :key="a"
                    :true-label="1"
                    :false-label="0"
                    :ref="'question_' + item.id"
                    @change.native="handleAnswerClick($event, 'el-checkbox')"
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
import {dataMethods, dealwithAnswer} from '@/mixins/question-methods'
import {getParents} from '@/utils/dom.js'
export default {
  name: 'midasEvaluation',

  mixins: [dataMethods, dealwithAnswer],

  data() {
    return {
      state: store.state,
      nativeData: null, // 用于渲染的原始数据 
      allQuesData: null, // 后台传送的原始问题数据
      quesAnser: null, // 答案 必须，不能改变key值
      currentPage: null, // 当前页码 必须，不能改变key值
      pageNum: null, // 页数  必须，不能改变key值
      chooseNum: null, // 需要选择的题目数量
      isChooseQue: false, // 是否显示选择问题的布局
      interstingNum: 3, // 格外处理的题的数目
      selectedQueNum: [], // 选中的题的id
      isShowModule: this.$route.query.hasOwnProperty('isShowModule') ? this.$route.query.isShowModule : 0, // 显示哪个模块： 0: 选择按钮, 1: 问题,
    }
  },

  created() {
    if (this.isShowModule == 1) {
      this.startEvaluation();
    }
  },
  
  computed: {
    data() { // 用于页面渲染的测评问题数据 必须，不能改变计算属性名
      const {nativeData} = this;
      const vm = this;
      let queNum = 3;
      if (nativeData) {
        if (vm.isChooseQue) { // 显示选择问题的布局
          queNum = 5;
        }
        let retData = vm.checkQueType(nativeData, queNum); // 处理数据，返回答案的model和数据
        if (!vm.isChooseQue) {
          vm.quesAnser = retData.ansModel; // 答案的model
        }
        vm.pageNum = retData.data.length; // 页数,根据数据的length
        vm.currentPage = 1;
        return retData.data;
      }
    },
  },

  filters: {
    convertText(text, index) {
      return text[parseInt(index) - 1]; // 根据答案转换为相应的答案文字
    },
  },

  methods: {
    startEvaluation() {
      const domain = this.state.domain;
      const vm = this;
      axios.get(`${domain}/acee/wx/json/midas_ques.json`)
      // axios.get(`/static/json/midas.json`)
      .then((response)=>{
        vm.nativeData = response.data; // 原始渲染数据
        vm.allQuesData = response.data; // 原始问题数据
        vm.isShowModule = 1;
      })
    },

    toggleSelected(id) { // 删除或保存题目id
      let index = this.selectedQueNum.indexOf(id);
      if(index >= 0) {
        this.selectedQueNum.splice(index, 1)
      } else {
        this.selectedQueNum.push(id);
      }
    },
    handleAnswerClick(el, className) {
      let answerOne = getParents(el.target, className); // 获取class为el-radio的父元素
      let sibling  = this.getSiblings(answerOne); // 获取兄弟元素
      sibling.forEach(function(node) {
        node.style.color = ''; // 取消按钮及其兄弟元素的标红
      })
    },
    submitAns() {
      const vm = this;
      const {quesAnser, isChooseQue, selectedQueNum, chooseNum} = this;

      console.log('原始', JSON.stringify(quesAnser))

      if (!isChooseQue) { // 回答的问题
        let reverseArr = Object.values(quesAnser).sort(vm.objSort('res')) // 根据答案排序

        console.log('reverseArr', JSON.stringify(reverseArr))
        // 判断是否可以发送到后台,要求：挑出三个他得分最高的项目，（如果得分相同，他挑出最感兴趣的项目）
        if (this.checkIsPost(reverseArr)) { 
          vm.postAns() // 发送到后台
        }
      } else { // 挑选感兴趣的题
        let len = selectedQueNum.length; // 选选择的题的个数

        if (len != chooseNum) { // 没选择规定的数目
          return vm.$confirm(`请从中选择个${chooseNum}你挑出最感兴趣的项目`)
        }
        vm.postAns()
      }    
    },
    postAns() {
      const vm = this;
      let postData = JSON.stringify(this.assAns());
      console.log('posy', postData)
      // axios.post('com/test/career/set', {
      //   career: postData,
      // })
      axios.get('/static/json/midas-result.json')
      .then(function(response) {
        let res = response.data;
        console.log('res', res)
        if (res.status != 1) {
          return vm.$confirm(res.msg, '提示').then(()=>{}).catch(()=>{}) // 提示用户，传输数据错误
        }

        vm.$router.push('/evaluation/result/midas')
        localStorage.setItem('midas', JSON.stringify(res.data)) // 保存测评结果
      })
    },

    checkIsPost(data) { // 判断是否可发送到后台
      const {quesAnser, interstingNum} = this;
      if (data[interstingNum - 1].res != data[interstingNum].res) { // 判断是否得分相同

        for(let i = 0; i < interstingNum; i++) {
          quesAnser[data[i].id].res += 4; // 答案加4
        }
        return true;
      }

      if (data[interstingNum - 1].res == data[interstingNum].res) {
        console.log('res', data[interstingNum - 1].res)

        let someData = this.getSomeRes(data, data[interstingNum - 1].res); // 获取相同得分的数据
        console.log('someData', someData)

        let chooseQue = this.getChooseQue(someData.someArr) // 获取要选择题目的相关数据
        console.log('chooseQue', chooseQue)

        for(let i = 0; i < interstingNum; i++) {
          if (data[i].res != data[interstingNum - 1].res) { // 判断前interstingNum个不同得分的数据项
            console.log('id', data[i].id)
            quesAnser[data[i].id].res += 4; // 不同加4
            console.log('res', quesAnser[data[i].id].res)
          }
        }
        this.isChooseQue = true; // 显示选择题目的布局
        this.nativeData = Object.assign({}, this.nativeData, { // 传入数据
          title: `请从中选择个${someData.chooseNum}你挑出最感兴趣的项目`,
          content: chooseQue
        })
        return false;
      }
    },
    objSort(attr) { // 根据传入的属性给对象排序
      return function(a, b) {
        let v1 = a[attr];
        let v2 = b[attr];
        return v2 - v1;
      }
    },

    getSomeRes(data, res) { // 获取相同得分的题目
      const {interstingNum} = this;
      let someArr = [], chooseNum = 0;
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].res == res) { // 得分相同
          if (i < interstingNum) { // 前interstingNum个数据
            chooseNum++;
          }
          someArr.push(data[i]) // 保存
        } 
      }
      this.chooseNum = chooseNum; // 需要选择的题目数量
      return {someArr, chooseNum};
    },

    getChooseQue(someArr) { // 获取要选择的题目的相关数据
      const {allQuesData} = this;
      let data = []

      allQuesData.content.forEach(function(item) { // 循环原始问题数据
        someArr.forEach(function(val) { // 循环相同得分的数据
          if (item.id == val.id) { // id 相同
            data.push({id: val.id, res: val.res, title: item.title, answer: item.answer})
          }
        })
      }) 

      return data;
    },
  }

}
</script>

<style>
  .midas-evaluation {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
  /*测评问题布局*/
  .midas-evaluation .midas-evaluation-question .question-group {
    display: none;
    flex-wrap: wrap;
    padding: 1.5rem;
    padding-top: 0px;
  }
  .midas-evaluation .midas-evaluation-question .question-group.is-display {
    display: flex;
  }
  .midas-evaluation .midas-evaluation-question .question-group.is-sign-question .question-kind-title,
  .midas-evaluation .midas-evaluation-question .question-group .question-kind-title {
    width: 30rem;
    margin-bottom: 10px;
    line-height: 1.2rem;
    text-align: left;
  }
  .midas-evaluation .midas-evaluation-question .question-group.is-sign-question {
    flex-direction: column;
    align-items: center;
  }
  .midas-evaluation .midas-evaluation-question .question-group.is-sign-question .question-items-content:last-child {
    margin-left: 0px;
  }

  .midas-evaluation .midas-evaluation-question .question-group .question-items {
    width: 30rem;
    height: 100%;
  }
  .midas-evaluation .midas-evaluation-question .question-group .question-items .question-answer--text {
    color: red;
  }
  @media screen and (min-width: 1213.8px) {
    .midas-evaluation .midas-evaluation-question .question-group .question-kind-title {
      width: 60rem;
    }    
  }
  @media screen and (min-width: 1300px) {
    .midas-evaluation .midas-evaluation-question .question-group .question-items-content:last-child {
      margin-left: 58px;
    }
    .midas-evaluation .midas-evaluation-question .question-group .question-kind-title {
      width: calc(60rem + 58px);
    }    
  }
  @media screen and (max-width: 669px) {
    .midas-evaluation .midas-evaluation-question .question-group .question-items-content {
      width: 100%;
    }
    .midas-evaluation .midas-evaluation-question .question-group .question-kind-title,
    .midas-evaluation .midas-evaluation-question .question-group .question-items  {
      width: 100% !important;
    }  
  }

  /*card*/
  .midas-evaluation .midas-evaluation-question .question-group,
  .midas-evaluation .midas-evaluation-question .question-group .question-items .el-card__body {
    justify-content: center;
  }
  .midas-evaluation .midas-evaluation-question .question-group .question-items .el-card__body {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  .midas-evaluation .midas-evaluation-question .question-group .question-items {
    text-align: left;
  }
  .midas-evaluation-question .question-group .question-items .question-item-title {
    padding: 12px 0px;
    line-height: 1.5;
  }
 

  /*单选按钮*/
  .midas-evaluation .midas-evaluation-question .question-group .el-radio {
    white-space: normal;
    margin: 6px 7px;
    line-height: 1.5;
  }
  .midas-evaluation .midas-evaluation-question .question-group .el-radio+.el-radio {
    margin-left: 7px;
  }

  /*分页*/
  .midas-evaluation .midas-evaluation-question .el-pagination {
    padding: 15px 5px;
  }
  .midas-evaluation .midas-evaluation-question .el-pagination .btn-prev,
  .midas-evaluation .midas-evaluation-question .el-pagination .btn-next {
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
  .midas-evaluation .midas-evaluation-question .el-pagination span:not([class*=suffix]) {
    font-size: 14px;
    height: auto;
    line-height: 16px;
    padding: 12px 20px;
  }
  
  /*提交按钮*/
  .midas-evaluation .midas-evaluation-question .question-group .question-items .el-card__body .submit-btn {
    text-align: center;
    padding-top: 15px;
  }
  .midas-evaluation .midas-evaluation-question .question-group .question-items .el-card__body .submit-btn .el-button{
    width: 98px;
  }

  /*选择问题的按钮*/
  .midas-evaluation .question-items .choose-question-item .el-checkbox{
    display: inline-flex;
    align-items: center;
    white-space: normal;
    margin: 1rem 0px;
  }


  .midas-evaluation .is-que-choose {
    border: 1px solid red !important;
    padding: 12px !important;
  }
  
  /*选择按钮*/
  .midas-evaluation .choose-btn {
    padding: 9% 0px;
  }

</style>