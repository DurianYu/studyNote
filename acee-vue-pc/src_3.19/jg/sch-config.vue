<template>
  <div class="school-config">
    <div class="config-btn">
      <div class="config-title">组件选项:</div>
      <div class="btn-group">
        <zs-checkbox-group
          :data.sync="data"
          @change="handleChange">
        </zs-checkbox-group>
      </div>
    </div>
    <div class="display-result">
      <div class="config-title">布局展示:：</div>
      <i v-show="showloading" class="el-icon-loading loading-icon"></i>
      <el-row
        v-if="showConfig"
        type="flex"
        :id="schoolItem.schoolId.plan_id">
        <el-col
         class="sch-width fgrow"
         v-show="state.showCom.zsSchoolInfo"
         :style="state.comOrder.zsSchoolInfo"
         :span="4" 
         :lg="4" 
         :md="4" 
         :sm="9" 
         :xs="24">
          <zs-school-info
           :schoolItem="schoolItem.schoolInfo">
           </zs-school-info>
        </el-col>
        <el-col
         class="fgrow"
         v-show="state.showCom.zsTable"
         :style="state.comOrder.zsTable"
         :span="8" 
         :lg="10" 
         :md="10" 
         :sm="15" 
         :xs="24">
          <zs-table
          :tableData="schoolItem.enrollDetail">
          </zs-table>
        </el-col>
        <el-col
         class="fgrow"
         :class="{'line-btn-maxW': hasLine(state, 'schLine__c') }"
         v-show="state.showCom.schLine__p"
         :style="state.comOrder.schLine__p"
         :span="12" 
         :lg="10" 
         :md="10" 
         :sm="13" 
         :xs="24">
          <div class="line-button">
            <el-row
            type="flex">
              <el-col
               class="fgrow"
               v-for="(value, key, index) in schoolItem.schoolLineData"
               :key="key"
               v-show="state.showCom['schLine__c' + (parseInt(index) + 1)]"
               :style="state.comOrder['schLine__c' + (parseInt(index) + 1)]"
               :span="8" 
               :lg="8" 
               :md="8" 
               :sm="8" 
               :xs="8">
                <ve-line
                  :settings="settings"
                  :extend="extend"
                  :colors="getcolor(index)"
                  :data="lineData(value.columns, value.line_1, value.line_2)"
                  width="100%"
                  height="100%">
                </ve-line>
              </el-col>
            </el-row>
            <div
             class="func-button"
             v-show="state.showCom['schLine__c0']">
              <el-cascader
                placeholder="加入志愿"
                :options="volunOptions"
                ref="volunteer">
              </el-cascader>
              <el-button type="primary">加入比较</el-button>
            </div>
          </div>
        </el-col>
        <el-col
         v-show="state.showCom.radio"
         :span="12" 
         :lg="10" 
         :md="10" 
         :sm="13" 
         :xs="24"
         :style="state.comOrder.radio">
           <el-radio label="1">备选项</el-radio>
        </el-col>
        <el-col
         v-show="state.showCom.elButton"
         :span="12" 
         :lg="10" 
         :md="10" 
         :sm="13" 
         :xs="24"
         :style="state.comOrder.elButton">
          <el-button type="success" plain>成功按钮</el-button>
        </el-col>
        <el-col
        v-show="state.showCom.elInput"
         :span="12" 
         :lg="10" 
         :md="10" 
         :sm="13" 
         :xs="24"
         :style="state.comOrder.elInput">
          <el-input placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import zsCheckboxGroup from '@/components/checkbox-group'
import {calcData} from '@/utils/util.js';
import {bilinearData} from '@/mixins/bilinear.js'
import store from '@/store/index.js'
export default {
  name: 'schConfig',

  mixins: [bilinearData],

  components: {
    zsCheckboxGroup
  },

  data() {
    return {
      state: store.state,
      showConfig: true,
      showloading: false,
      data: {
        checkList: [],
        itemAttr: [
          { 
            value: '学校图标',
            label: 'zsSchoolInfo',
          },
          {
            value: '招生详情',
            label: 'zsTable'
          },
          {
            value: '加入志愿与学校比较按钮',
            label: 'schLine__c0'
          },
          {
            value: '分数折线图',
            label: 'schLine__c1'
          },
          {
            value: '分差折线图',
            label: 'schLine__c2'
          },
          {
            value: '位次起始折线图',
            label: 'schLine__c3'
          }, 
          {
            value: '单选按钮',
            label: 'radio'
          },
          {
            value: '按钮',
            label: 'elButton'
          },
          {
            value: '输入',
            label: 'elInput'
          }
        ]
      },
      oldCheckList: [],
      volunOptions: [
        {
          value: null,
          label: '当前所属:本科第一批',
          disabled: true,
        },
        {
          value: 'A',
          label: '志愿A',
        },
        {
          value: 'B',
          label: '志愿B',
        },
        {
          value: 'C',
          label: '志愿C',
        },
        {
          value: 'D',
          label: '志愿D',
        },
        {
          value: 'E',
          label: '志愿E',
        },
        {
          value: 'F',
          label: '志愿F',
        }
      ],
      schoolItem: {
        "schoolId": {
          "id":2475,
          "category":1,
          "plan_id":7483,
          "college_code":10698,
          "college_name":"西安交通大学",
          "batch_code":"本一"
        },
        "schoolInfo":{
          "risk":"http://www.ieac-edu.com/img/sprint.png",
          "schoolBadge":"http://www.ieac-edu.com/college_logo/9/p10698.jpg",
          "province":"陕西.西安","is985":1,"is211":1,"firstclass":1,"firstsub":1,
          "college_name":"西安交通大学"
        },
        "enrollDetail":[
          {"label":"办学层次","value":"本科"},
          {"label":"录取批次","value":"本一"},
          {"label":"17年招生","value":"4人"},
          {"label":"招生代码","value":"0058"},
          {"label":"综合排名","value":14},
          {"label":"硕士点数","value":153},
          {"label":"博士点数","value":73},
          {"label":"重点学科","value":16},
          {"label":"院校类型","value":"综合"},
          {"label":"院校性质","value":"公办"},
          {"label":"主管部门","value":"教育部"},
          {"label":"专业详情","value":"查看","click":true,"class":"subDetail"},
          {"label":"招生章程","value":"查看","click":true,"class":"enrollRole"}
        ],
        "schoolLineData":{
          "line_img_1":{
            "columns":["录取分","平均分"],
            "line_1":[588,592,598],
            "line_2":[589,593,600]
          },
          "line_img_2":{
            "columns":["录取分差","平均分差"],
            "line_1":[45,52,61],
            "line_2":[46,53,63]
          },
          "line_img_3":{
            "columns":["位次起点","位次终点"],
            "line_1":[1879,1490,1446],
            "line_2":[1978,1576,1524]
          }
        }
      },
    }
  },

  created: function() {
    const showCom = this.state.showCom;
    for (let key in showCom) {
      if (showCom[key]) {
        if (key.indexOf('__p') < 0) {
          this.data.checkList.push(key);
          this.oldCheckList.push(key);
        }
      }
    }
  },

  methods: {
    handleChange: function(value) {
      const {oldCheckList} = this;
      const vm = this;
      let comArr;
      let isAdd = true;  // true : add
      this.showConfig = false;
      this.showloading = true;
      
      if (value.length > oldCheckList.length) {
        comArr = this.getCom(value, oldCheckList);
      } else {
        comArr = this.getCom(oldCheckList, value);
        isAdd = false;
      }

      for (let value of comArr) {
        if (value.indexOf('__c') > 0) {
          let parent = value.slice(0, value.indexOf('__c')) + '__p';
          if (!vm.state.showCom[parent]) { // 判断父组件是否显示，
            vm.showCom(parent); // 显示父节点
          }
        }
        vm.toggleCom(value);
      } 
      
      this.oldCheckList = value;
      setTimeout(function() {
        vm.showloading = false;
        vm.showConfig = true;
      }, 500)
    },
    // uncheck: function(key) {
    //   let index = this.data.checkList.indexOf(key);
    //   this.data.checkList.splice(index, 1);
    // },
    // check: function(key) {
    //   this.data.checkList.push(key) // 勾选
    // },
    toggleCom: function (key) {
      if (this.state.showCom[key]) {
        this.hideCom(key);
      } else {
        this.showCom(key);
      }
    },
    showCom: function (key) {
      const vm = this;
      store.setShowComAction({[key]: true})
      store.setComOrderAction({[key]: {
        order: parseInt(vm.getMax(vm.state.comOrder)) + 1,
      }})    
    },
    hideCom: function (key) {
      store.setShowComAction({[key]: false})
      store.setComOrderAction({[key]: {
        order: 0,
      }})  
    },
    getCom: function(comList1, comList2) {
      let deleteCom = [];
      comList1.forEach(function(currentValue) {
        let hasCom = false;
        comList2.forEach( function(value) {
          if (currentValue === value) {
            hasCom = true;
          }
        })
        if (!hasCom) {
          deleteCom.push(currentValue);
        }
      })
      return deleteCom;
    },

    getMax: function(obj, key = 'order') {
      let max = 0;
      for (let k in obj) {
        if (obj[k][key] > max) {
          max = obj[k][key];
        }
      }
      return max;
    },
    hasLine: function(state, preStr) {
      let i = 1;
      while(state.showCom.hasOwnProperty(preStr + i)) {
        if (state.showCom[preStr + i]) {
          return false;
        }
        i++;
      }
      return true;
    },
    getcolor: function(index, len = 2) {
      let color = ["#FF0033", "#FF6600", "#009999", "#99CC00", "#006699", "#CC3333"];
      let colorArr = [color[0]];

      if (len == 1) {
        colorArr[0] = color[parseInt(index) + 1];
      } else if (len > 1) {
        for (let i = 1; i < len; i++) {
          colorArr.push(color[parseInt(index) + 1])
        }      
      }

      return colorArr;
    },
    lineData: function(columns, line1, line2) {
      return calcData(columns, line1, line2, this.state.userInfo.enroll_year);
    },
    // getObjLen: function(obj) {
    //   let arr = Object.keys(obj)
    //   return arr.length
    // }
  },
}
</script>

<style type="text/css">
.school-config {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  padding-left: 0px;
  font-size: 0.9rem;
}
.school-config .config-title {
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  padding: 0px 1.5rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  text-align: left;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.1);
}
.school-config .config-btn {
  margin-bottom: 30px;
}
.school-config .display-result .el-row--flex {
  flex-wrap: wrap;
  padding: 1rem;
  background-color: #fff;
}
.school-config .line-button{
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  padding: 10px 20px;
}
.school-config .display-result .el-cascader {
  width: 105px;
  margin: 20px;
}
</style>