<!-- 
/**
 * [使用说明: 确保使用该组件之前添加了element-ui插件的相关组件]
 * [最简用例]
 <el-button type="text" @click="schCmpModal = true">点击打开 sch-conpare</el-button>
   <sch-cmp
   :schCmpModal.sync="schCmpModal"
   :schInfo="schInfo"
   />
  * [参数说明]
  * @type  {[Object]} schInfo 必须参数 [学校的plan_id, 格式: schInfo{ plan_id: ['学校1的plan_id', '学校2的plan_id']}]
  * @type  {[Boolean]} schCmpModal 必须参数 [控制弹出框的关闭, .sync(必须): true:打开，false:关闭，默认值: false]
  * @type  {[String]} width 可选参数 [弹出框的宽度, 默认值: 80%]
  * @type  {[String]} customClass 可选参数 [自定义弹出框类名, 默认值: 无]
  * @type  {[Boolean]} closeOnClickModal 可选参数 [是否可以通过点击 modal 关闭弹出框, true:可以，false:禁止，默认值: false]
*/
 -->
<template lang="html">
  <div class="sch-cmp-box">

    <el-dialog
    title="学校比较"
    :visible="schCmpModal"
    @update:visible="closeSchCmpModal"
    @open="openComList"
    :width="width"
    :modal="false"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    >
      <el-row >
        <el-col :offset="1" :span="11">
          <keep-alive>
            <ve-line
            v-for="(v, i) of chart1"
            :data="v.chartData"
            :extend="v.extend"
            :key="i"
            :settings="settings"
            :height="'100px'"
            />
          </keep-alive>
        </el-col>
        <el-col :span="11">
          <keep-alive>

            <ve-line
            v-for="(v, i) of chart2"
            :data="v.chartData"
            :extend="v.extend"
            :key="i"
            :settings="settings"
            :height="'100px'"
            />
          </keep-alive>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :height="cmp_list_height"
        >
        <el-table-column
          prop="cmp_type"
          label="#"
          width="144"
          >
        </el-table-column>
        <el-table-column
          prop="sch_1_data"
          :label="sch_1_name"
          >
        </el-table-column>
        <el-table-column
          prop="sch_2_data"
          :label="sch_2_name"
          >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { modifyMinValue } from '@/utils/util.js'
import {toCollegeLevel, toCollegeType} from '@/utils/convert.js'
import { bilinearData } from '@/mixins/bilinear.js'

export default {
  mixins: [bilinearData],
  name: 'schCmp',
  props: {
    schInfo: Object, // 比较的学校相关信息
    schCmpModal: {
      type: Boolean,
      default: false // 显示或关闭学校比较的modal
    },
    customClass: {
      type: String // Dialog 的自定义类名
    },
    'closeOnClickModal': {
      type: Boolean,
      default: true // 是否可以通过点击 modal 关闭 Dialog
    },
    width: {
      type: String,
      default: '50%' // dialog 的宽度
    }
  },
  data() {
    return {
      name: 'sch-cmp',
      sch_1_name: '', // 学校1的名字
      sch_2_name: '', // 学校2的名字
      tableData: [], // 学校比较的数据
      settings: {
        labelMap: {

        }
      },
      chart1: [], // 存储所有chartData数据
      chart2: [], // 存储所有chartData数据
      chartData: {
        columns: ['date', '录取分'],
        rows: [{
            'date': '2015',
            '录取分': 0
          },
          {
            'date': '2016',
            '录取分': 590
          },
          {
            'date': '2017',
            '录取分': 576
          }
        ]
      },
      extend: {
        'series.1.label': {
          show: true,
          position: 'bottom',
          distance: 8,
          fontSize: 11,
          formatter: function(p) {

          }
        }
      }
    }
  },
  methods: {
    openComList() {
      axios.post(`${store.state.userInfo.province}/college/compare`, {
          college1: this.schInfo.plan_id[0],
          college2: this.schInfo.plan_id[1]
        })
        .then(res => {
          res = res.data;
          console.log(res);
          if (res.status === 1) {
            this.sch_1_name = res.college1.college_name;
            this.sch_2_name = res.college2.college_name;
            let temp_table_data = [{
              cmp_type: '特色',
              sch_1_data: `${res.college1.is985?'985':''} ${res.college1.is211?'211':''} ${res.college1.firstclass_type===1?'一流大学':''} ${res.college1.firstclass_type===2?'一流学科':''}`,
              sch_2_data: `${res.college2.is985?'985':''} ${res.college2.is211?'211':''} ${res.college2.firstclass_type===1?'一流大学':''} ${res.college2.firstclass_type===2?'一流学科':''}`
            }, {
              cmp_type: '办学层次',
              sch_1_data: `${toCollegeLevel(res.college1.college_level)}`,
              sch_2_data: `${toCollegeLevel(res.college2.college_level)}`
            }, {
              cmp_type: `${(store.state.userInfo.enroll_year+1).toString().slice(-2)}年招生`,
              sch_1_data: `${res.college1.enroll_num}`,
              sch_2_data: `${res.college2.enroll_num}`
            }, {
              cmp_type: `综合排名`,
              sch_1_data: `${res.college1.college_rank}`,
              sch_2_data: `${res.college2.college_rank}`
            }, {
              cmp_type: `硕士点数`,
              sch_1_data: `${res.college1.master_num}`,
              sch_2_data: `${res.college2.master_num}`
            }, {
              cmp_type: `博士点数`,
              sch_1_data: `${res.college1.doctor_num}`,
              sch_2_data: `${res.college2.doctor_num}`
            }, {
              cmp_type: `重点学科`,
              sch_1_data: `${res.college1.key_subject_num}`,
              sch_2_data: `${res.college2.key_subject_num}`
            }, {
              cmp_type: `院校类型`,
              sch_1_data: `${toCollegeType(res.college1.college_type)}`,
              sch_2_data: `${toCollegeType(res.college2.college_type)}`
            }, {
              cmp_type: `主管部门`,
              sch_1_data: `${res.college1.belong_to}`,
              sch_2_data: `${res.college2.belong_to}`
            }];
            this.tableData = temp_table_data;
            let line1 = [res.college1.adjust_score3, res.college1.adjust_score2, res.college1.adjust_score1]; //  录取分
            let line2 = [res.college2.adjust_score3, res.college2.adjust_score2, res.college2.adjust_score1]; //  录取分
            this.chart1.push(this.setChart(line1));
            this.chart2.push(this.setChart(line2));
          }
          if (res.status === -1) {
            this.$alert(res.msg, '提示', {
              center: true,
              modal: false,
              type: 'warning',
            });
          }
          if (res.status === -2) {
            this.$confirm(res.msg, '提示', {
              center: true,
              modal: false,
              confirmButtonText: '前往',
              type: 'warning',
            }).then(() => {
              this.$router.push({path: '/'});
            });
          }
        })
        .catch(error => console.error(error));
    },
    // 图表注入数据、填无等处理
    setChart(line1, line2) {
      let temp_chart = {
        chartData: this.clone(this.chartData),
        extend: this.clone(this.extend)
      };
      let lineData = modifyMinValue(line1);
      let timeData = [`${store.state.userInfo.enroll_year - 2}`, `${store.state.userInfo.enroll_year - 1}`, `${store.state.userInfo.enroll_year}`];
      for (let i = 0, len = temp_chart.chartData.rows.length; i < len; i++) {
        temp_chart.chartData.rows[i]['录取分'] = lineData.line1.data[i] === '' ? 0 : lineData.line1.data[i];
        // temp_chart.chartData.rows[i]['平均分'] = lineData.line2.data[i]  === '' ? 0 : lineData.line2.data[i];
        temp_chart.chartData.rows[i]['date'] = timeData[i];
      }
      temp_chart.extend['series.0.label']['formatter'] = function(p) {
        console.log('p ', p.value[1]);
        if (lineData.line1.zero && p.value[1] === lineData.line1.zero) {
          return '无';
        }
        return p.value[1] > 0 ? p.value[1] : '无';
      }
      // temp_chart.extend['series.1.label']['formatter'] = function(p) {
      //   console.log('p ', p.value[1]);
      //   if (lineData.line2.zero && p.value[1] === lineData.line2.zero) {
      //     return '无';
      //   }
      //   return p.value[1] > 0 ? p.value[1] : '无';
      // }
      return temp_chart;
    },
    closeSchCmpModal() {
      this.$emit('update:schCmpModal', false);
    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  },
  computed: {
    cmp_list_height() {
      return document.body.clientHeight - 208;
    }

  },
  created() {


  }
}
</script>

<style lang="scss">
.sch-cmp-box {
    width: auto;
    height: 100%;
    .el-dialog {
        margin-top: 12px !important;
        margin-bottom: 0 !important;
        .el-dialog__body {
            padding: 16px;
        }
    }
}
</style>
