var dataMethods = {
  // beforeRouteEnter (to, from, next) {
  //   console.log('to', to)
  //   console.log('from', from)
  //   next(vm => {
  //     if (from.name == 'evaReault' && from.meta.hasOwnProperty('fromResult')) {
  //       vm.isShowModule = from.meta.fromResult;
  //     }
  //   })
  // },
  methods: {
  	checkQueType: function(question, number) {
      let type = Object.prototype.toString.call(question); // 获取数据类型

      if (type == '[object Object]') { // 对象
        return this.assObjQue(question, number) // 整合对象数据
      }

      if (type == '[object Array]') { // 数组
        return this.assArrQue(question, number) // 整合数组数据
      }
    },

    assObjQue: function(question, number) { // 整合对象数据，question： 问题数据， number： 每组显示个数 
      let quesNum; // 每组显示个数
      let remainder; // 余数
      let diviResult; // 商
      let storageNum = 0; // 数据分组计数
      let prevAdd = false; // true: 向前添加数据，
      let prevCut = false; // true: 向后添加数据
      let ansModel = {}; // 答案
      let data = []; // 整合后的数据
      let assCon = [], groupCon = []; // assCon: 保存一组数据，groupCon： 保存两组数据
      let groupInd = 0; // groupCon 的索引
      let questionMes = {}; // 保存问题的一些信息：如是单选还是多选
      let ansLen = question.content[0].answer.length; // 有多少个答案

      for(let key in question) {
        let type = typeof question[key];
        if (type != 'object' && type != 'string') {
          questionMes[key] = question[key];
        }
      }
      
      // 有三个以上的答案并且问题有题目
      if (ansLen > 3 && question.content[0].hasOwnProperty('title')) {
        quesNum = number || 2; // 每组个数
      } else if (ansLen > 3) { // 有三个以上的答案
        quesNum = number || 4;
      } else if (question.content[0].hasOwnProperty('title')) { // 问题有题目
        quesNum = number || 4;
      } else { // 有三个以下的答案并且问题没有题目
        quesNum = number || 10;
      }
      
      remainder = question.content.length % quesNum; // 分组后余下的题的数量，不足以构成一组
      diviResult = Math.floor(question.content.length / quesNum); // 分多少组

      // 有余数，并且最后余下一组，余数小于分组数目的1/2
      if (remainder > 0 && diviResult % 2 == 0 && remainder < quesNum * 1/2) {
        prevAdd = true;
      }

      if (remainder > 0 && diviResult % 2 == 0 && remainder >= quesNum * 1/2 && remainder < quesNum * 3/4) {
        prevCut = true;
      }
     
      question.content.forEach(function(item, index) {
        let num = quesNum;
        if (index <= ((diviResult - remainder) * quesNum) && prevAdd) {
          num = quesNum + 1;
        }
      
        if (index >= ((diviResult - (quesNum - remainder - 1)) * quesNum) && prevCut) {
          num = quesNum - 1;
        }
        

        ansModel[item.id] = {
          id: item.id,
          res: questionMes.hasOwnProperty('isRadio') ? questionMes.isRadio ? '' : Array.apply(null, {length: ansLen}) : '',
        };



        storageNum++;
        assCon.push(Object.assign({}, item, questionMes));
        

        if ( storageNum == num) {
          groupCon[groupInd] = assCon;
          storageNum = 0;
          assCon = [];
          groupInd++;

          if (groupInd == 2) {
            if (question.hasOwnProperty('title')) {
              groupCon.unshift({'title': question.title})
            }
            data.push(groupCon);
            groupInd = 0;
            groupCon = [];
          }
        }
      })

      if (assCon.length > 0) {
        groupCon.push(assCon)
      }

      if (groupCon.length > 0) {
        groupCon.unshift({'title': question.title})
        data.push(groupCon)
      }

      return {data, ansModel}
    },
    assArrQue: function(question, number) {
      const vm = this;
      let data = [];
      let ansModel = {};
      let type = Object.prototype.toString.call(question[0]);

      if (type == '[object Object]') {
        question.forEach(function(item) {
          let retData = vm.assObjQue(item, number);
          data = data.concat(retData.data);
          ansModel = Object.assign({}, ansModel, retData.ansModel)
        })

        return {data, ansModel};
      }

      if (type == '[object Array]') {
        let num = number || 10;
        let assData = [];
        let groupCon = [];
        let groupInd = 0;

        question.forEach(function(item, index) {

          assData.push(item);
          if ((index + 1) % num === 0) {

            groupCon[groupInd] = assData;
            assData = [];
            groupInd++;

            if (groupInd == 2) {
              data.push(groupCon);
              groupInd = 0;
              groupCon = [];
            }
          }

          ansModel[item[0]] = {
            id: item[0],
            res: undefined
          }
        }) 
        

        if (assData.length > 0) {
          groupCon.push(assData)
        }

        if (groupCon.length > 0) {
          data.push(groupCon)
        }
        return {data, ansModel};
      }
    },
    isShowBtn: function(data, q, items, is) { // 按钮显示在最后一页的最后数据项里
      return (data.length - 1 == q) && (items.length - 1 == is);
    },
  }
};

export {dataMethods};

var dealwithAnswer = {
  methods: {
    prevPage: function() { // 上一页按钮点击事件
      if (this.currentPage > 1) { // 当前页不为一
        this.currentPage--;
      }
    },
    nextPage: function(el) {
      const vm = this;
      const {pageNum} = this;
      if (this.checkAnsAllQue()) { // 判断是否有未回答的问题
        this.currentPage++;
      } 
      if (this.currentPage == 1) { // 判断当前是否为第一页
        setTimeout(function() { // 设置上一页按钮不可点击
          vm.$refs['evaluation'].querySelectorAll('.el-pagination .btn-prev')[0].setAttribute('disabled', 'disabled')
        }, 1000)
      } 
      if (this.currentPage == 2) {
         setTimeout(function() { // 设置上一页按钮可点击
          vm.$refs['evaluation'].querySelectorAll('.el-pagination .btn-prev')[0].removeAttribute('disabled', 'disabled')
        }, 1000)
      }
      if (this.currentPage < pageNum) {
        setTimeout(function() { // 设置下一页按钮可点击
          vm.$refs['evaluation'].querySelectorAll('.el-pagination .btn-next')[0].removeAttribute('disabled', 'disabled')
        }, 1000)
      }
    },
    checkAnsAllQue: function() { // 判断问题是否回答完
      // data： 用于渲染的测评问题数据
      // currentPage: 当前页码
      // quesAnser: 问题答案
      const {currentPage, quesAnser, data} = this;
      const vm = this;
      let checkNum = currentPage - 1; // 页码减一对应问题数据里的index
      let noAnswer = []; // 没有回答的问题的id
      let quesNum = 0; // 当前页面显示问题的数目
      let startId = null, stopId = null; // 显示的问题范围
      
      for (let i = 0, len = data[checkNum].length; i < len; i++) {
        let value = data[checkNum][i];
        let type = Object.prototype.toString.call(value);
 
        if (type == '[object Array]') { // 问题数据
          
          // 当初始id为初始值时
          if (Object.prototype.toString.call(startId) == '[object Null]') {
            startId = value[0].id; // 保存开始id
          }
          
          // 最后的问题数据时
          if (i == len-1) {
            stopId = value[value.length - 1].id;
          }
          quesNum += value.length;
        }
      }

      for (let i = startId, len = stopId; i <= len; i++ ) {

        let type = typeof quesAnser[i].res;
        // 答案是布尔值、数字、不是空字符串的字符串
        if (type == 'string' && !quesAnser[i].res && type != 'boolean' && type != 'number') {
          noAnswer.push(quesAnser[i].id);
        }
      }
      
      if (noAnswer.length > 0) { // 有没有回答的问题
        vm.$confirm('请完成所有的题目').then(()=>{}).catch(()=> {})
        noAnswer.forEach(function(id){
          vm.$refs['question_'+id].forEach(function(vnode) {  // 答案标红
            vnode.$el.style.color = 'red';
          })
        })
        return false;
      }
      return true;
    },
    getSiblings: function(el) { // 获取兄弟元素
      return el.parentNode.childNodes;
    },
    assAns: function() { // 组装成后台需要的数据格式
      const {quesAnser} = this;
      const vm = this;
      let answerArr = [];
      let noAnswer=[];
      for(let key in quesAnser) {
        let ansItem = quesAnser[key];
        
        if (!ansItem.res) {
          ansItem.res = 0;
        }
        answerArr.push(ansItem)
      }

      return answerArr;
    },
  }
}

export {dealwithAnswer};