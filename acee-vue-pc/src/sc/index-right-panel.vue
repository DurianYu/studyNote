<template>
<div class="index-sch-card">
  <el-row class="search-content-title bg-light" type="flex">
<!--     <el-col class="search-title-tag search-title" :xs="12" :sm="5" :md="4" :lg="3">
      <el-tag>
        <span>姓名: </span>
        <span v-if="state.cur_student_info.name" :style="{color: uniform_color[0]}">
          {{state.cur_student_info.name.slice(0, 5)}}
        </span>
        <span v-else :style="{color: uniform_color[1]}">
          &emsp;&emsp;&emsp;&emsp;
        </span>
      </el-tag>
    </el-col> -->

    <el-col v-if="state.cur_student_info" class="search-title-tag" :xs="12" :sm="4" :md="5" :lg="2" style="position: absolute; right: 16px;">
      <zs-volunteer :show_add_btn="show_add_btn" :nodes="VolunDat" :show_popover.sync="show_volunteer" @addSchEvent="addSchEvent" @volun-empty="handleVolunEmpty" @volun-up="handleVolunUp" @volun-down="handleVolunDown" @volun-item-empty="handleItemEmpty"
        @volun-role-change="volunRoleChange">
      </zs-volunteer>
      <el-button type="primary" plain @click="showVolunteer(false)">志愿表</el-button>
    </el-col>

    <!-- 分数、位次 -->
    <el-col class="" :xs="15" :sm="19" :md="19" :lg="12" style="text-align: left;">
      <el-tag v-for="v,i of related_socre" :key="i" style="margin-left: 4px; min-width: 100px;"> {{ v.name }}: <span :style="{color: uniform_color[0]}">{{ String(v.value)?v.value:'' }}</span></el-tag>
    </el-col>

    <!-- <el-col class="" :xs="6" :sm="4" :md="3" :lg="2" :span="2">
      <span class="cursor_point my_4" type="warning">等位分：</span>
    </el-col>

    <el-col class="search-title-chart" v-if="chart2.length" v-for="v, i of chart2" :key="'chart'+i" :xs="24" :sm="24" :md="5" :lg="5">
      <keep-alive>
        <ve-line :data="v.chartData" :extend="v.extend" :settings="settings" :height="'6rem'" :width="'100%'" style="display: inline-block; position: absolute; top: -0px; left: 0px;" />
      </keep-alive>
    </el-col> -->
  </el-row>

  <div class="search-result-content">
    <template v-if="schoolItemData.length != 0">
      <el-row class="school-item" type="flex" v-for="(item) in schoolItemData" :key="item.schoolId.id + '' + item.schoolId.plan_id" :id="item.schoolId.plan_id">
        <el-col class="fgrow sch-width" v-if="state.showCom.zsSchoolInfo" :style="state.comOrder.zsSchoolInfo" :span="4" :lg="4" :md="4" :sm="9" :xs="24">
          <zs-school-info :schoolItem="item.schoolInfo">
          </zs-school-info>
        </el-col>
        <el-col class="fgrow" v-if="state.showCom.zsTable" :style="state.comOrder.zsTable" :span="8" :lg="10" :md="10" :sm="15" :xs="24">
          <zs-table :tableData="item.enrollDetail" @click="lookInfo(item.schoolId, item.schoolLineData, $event, item)">
          </zs-table>
        </el-col>
        <el-col class="fgrow" :class="{'line-btn-maxW': hasLine(state, 'schLine__c') }" v-if="state.showCom.schLine__p" :style="state.comOrder.schLine__p" :span="12" :lg="10" :md="10" :sm="24" :xs="24">
          <div class="line-button">
            <el-row type="flex">
              <el-col class="fgrow" v-for="(value, key, index) in item.schoolLineData" v-if="state.showCom['schLine__c' + (parseInt(index) + 1)]" :key="key" :style="state.comOrder['schLine__c' + (parseInt(index) + 1)]" :span="8" :lg="8" :md="8" :sm="8"
                :xs="8">
                <ve-line :settings="settings" :extend="extend" :colors="getcolor(index)" :data="lineData(value.columns, value.line_1, value.line_2)" width="100%" height="100%">
                </ve-line>
              </el-col>
            </el-row>
            <div class="func-button" v-show="state.showCom['schLine__c0']">
              <el-button v-if="state.cur_student_info" @click="lookInfo(item.schoolId, item.schoolLineData, $event, item, 'subDetail')" type="success">加入志愿</el-button>
              <!-- <template v-if="item.schoolId.batch_code.substring(0, 2) == '提前'">
                <el-cascader placeholder="加入志愿" :options="volunOptions.slice(0,3)" @change="joinVolun(item.schoolId.college_name, $event[0])" @focus="clearJoinBtn" ref="volunteer">
                </el-cascader>
              </template>
              <template v-else>
                <el-cascader placeholder="加入志愿" :options="volunOptions" @change="joinVolun(item.schoolId.college_name, $event[0])" @focus="clearJoinBtn" ref="volunteer">
                </el-cascader>
              </template> -->
              <el-button type="primary" @click="joinCompare(item.schoolId)">加入比较</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <div>
        <i v-show="showloading" class="el-icon-loading loading-icon"></i>
      </div>
      <el-button v-if="buttonShow.college" type="primary" class="mb-2" @click="addCollege">更多</el-button>
      <p v-else class="my-2">{{promptText.college}}</p>
    </template>
  </div>

  <div class="dialog-content">
    <!-- 学校比较结果 -->
    <sch-cmp :schCmpModal.sync="dialogShow.showCompareRes" :schInfo="compareSchInfo" class="sch-compare" />

    <!-- 学校比较  -->
    <el-dialog title="学校比较" :visible.sync="dialogShow.showCompareInput" class="compareDialog">
      <el-form :model="compareSchList">
        <el-form-item label="学校名称">
          <el-input v-model="compareSchList.one.college_name" autocomplete="off" disabled>
            <i slot="suffix" class="el-input__icon el-icon-close" @click="compareSchList.one={college_name: null}">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="compareSchList.two.college_name" autocomplete="off" disabled>
            <i slot="suffix" class="el-input__icon el-icon-close" @click="compareSchList.two={college_name: null}">
            </i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow.showCompareInput = false">取 消</el-button>
        <el-button type="primary" @click="compareSchool">比 较</el-button>
      </div>
    </el-dialog>

    <!-- 专业备注 -->
    <el-dialog title="备注" :visible.sync="dialogShow.showComment" width="50%">
      <p>{{subComment.subject_comment}}</p>
      <p>{{subComment.college_comment}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogShow.showComment = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 专业详情 -->
    <el-dialog :title="subDetail.title" :visible.sync="dialogShow.showSubDetail" class="sub-detail" height="70%">
      <div>
        <el-row type="flex" justify="space-around" class="fwrap">
          <el-col :span="6" :xs="12" v-for="(value, key, index) in subDetail.schoolLineData" :key="key">
            <ve-line :settings="settings" :extend="extend" :colors="getcolor(index)" :data="lineData(value.columns, value.line_1, value.line_2)" width="100%" height="100%">
            </ve-line>
          </el-col>
        </el-row>
      </div>
      <div class="college-subject">
        <div class="subject-item" v-for="(item) in subDetail.subItemData" :key="item.subId.id + item.subId.plan_id">
          <div class="sub-item-title">
            <div class="adm-prob">
              <img v-bind:src="item.risk" alt=''>
            </div>
            {{item.subject_name}}
          </div>
          <div class="subject-item-content">
            <zs-table :tableData="item.subDetail" @click="lookErollRemarks(item.subId, subDetail.collegeDat, $event)">
            </zs-table>
            <el-row class="line-button fwrap" type="flex" justify="space-around">
              <el-col class="line-content" :span="18" :xs="24">
                <ve-line v-for="(value, key, index) in item.subLineData" :key="key" :settings="settings" :extend="extend" :colors="getcolor(parseInt(index) + 3, 1)" :data="lineData(value.columns, value.line_1)" width="100%" height="100%">
                </ve-line>
              </el-col>
              <el-col class="func-button" :span="5" :xs="24">
                <!-- <template>
                  <el-cascader placeholder="加入志愿" :options="subVolunOptions" @change="hasSchool(item.subId.subject_name, subDetail.collegeDat.college_name ,$event)" @focus="clearJoinBtn" ref="volunteer">
                  </el-cascader>
                </template> -->
                <el-button v-show="state.cur_student_info" @click="joinSubj(item)" type="success">加入志愿</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-button v-if="buttonShow.subject" type="primary" class="my-2" @click="addSubject(subDetail.collegeDat)">
          更多
        </el-button>
        <p v-else class="my-2">{{promptText.subject}}</p>
      </div>
    </el-dialog>

    <!-- 招生章程 -->
    <!--       <el-dialog
        :title="enrollRole.title"
        :visible.sync="dialogShow.showEnrollRole"
        class="enrollRoleDialog"
        height="40%">
        <div v-html="enrollRole.data"></div>
        <el-button
          type="primary"
          @click="dialogShow.showEnrollRole = false">
           确定
        </el-button>
      </el-dialog>
 -->

    <!-- 博士 or 硕士 -->
    <el-dialog :title="doctorOrMaster.title" :visible.sync="dialogShow.showGranting" class="doctor-master" height="40%">
      <el-tree :data="doctorOrMaster.data" node-key="id" accordion></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="buttonShow.mOrd" type="primary" @click="addMasterDoctor(doctorOrMaster)">
          更 多
        </el-button>
        <p v-else class="my-2">{{promptText.mOrd}}</p>
      </span>
    </el-dialog>

  </div>
</div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import {
  bilinearData
} from '@/mixins/bilinear.js'
import * as convert from '@/utils/convert.js';
import * as volun from '@/utils/volun.js';
import * as util from '@/utils/util.js';
import {
  replaceKey
} from '@/utils/char-util';
export default {
  name: 'indexRightpanel',

  mixins: [bilinearData],

  props: {
    postCollegeDat: Object,
  },

  data() {
    return {
      uniform_color: ['#E6A23C', 'red'],
      clk_join_info: '', // 点击加入志愿表的相关信息
      show_volunteer: false, // 是否显示志愿表
      show_add_btn: false, // 显示志愿表 第几嵌套层级 下的添加、替换按钮
      chart2: [], // 存储所有chartData数据
      chartData: {
        columns: ['date', '等位分', ''],
        rows: [{
            'date': '2015',
            '等位分': 0,
            '平均分': 0,
          },
          {
            'date': '2016',
            '等位分': 590,
            '平均分': 0,
          },
          {
            'date': '2017',
            '等位分': 576,
            '平均分': 0,
          }
        ]
      },
      etc_extend: {
        grid: {
          top: 35,
          left: 5,
          right: 5,
          bottom: 0
        },
        legend: {
          // orient: 'vertical',
          itemGap: 5, // 间隔
          itemWidth: 5,
          itemHeight: 4,
          right: 0,
          textStyle: {
            color: '#aaa'
          }
        },
        xAxis: {
          axisLine: { // 线
            show: true
          },
          axisTick: { // 刻度
            show: true
          },
          axisLabel: { // 标签
            color: '#409EFF'
          }
        },
        'series.0.label': {
          show: true,
          position: 'top',
          distance: 4,
          fontSize: 12,
          formatter: function(p) {

          }
        },
        'series.1.label': {
          show: true,
          position: 'bottom',
          distance: 4,
          fontSize: 12,
          formatter: function(p) {

          }
        }
      },

      state: store.state,
      compareSchList: store.state.compareSchList,
      province_url: store.state.userInfo.province ? store.state.userInfo.province : 'sc',
      showloading: false,
      isVolunShow: false,
      isJoinVolun: true,
      buttonShow: {
        college: true,
        subject: true,
        mOrd: true,
      },
      promptText: {
        college: null,
        subject: null,
        mOrd: null,
      },
      compareSchInfo: {
        plan_id: []
      },
      refreshNum: {
        collegeRefr: 0,
        subjectRefr: 0,
        masterRefr: 0,
        doctorRefr: 0,
      },
      dialogShow: {
        showSubDetail: false,
        showComment: false,
        showCompareInput: false,
        showGranting: false,
        showCompareRes: false,
        // showEnrollRole: false,
      },
      doctorOrMaster: {
        title: null,
        college_code: null,
        subject_code: null,
        data: null
      },
      // enrollRole: {
      //   title: null,
      //   data: null
      // },
      schoolItemData: [],
      subDetail: {
        title: null,
        schoolLineData: null,
        collegeDat: null,
        subItemData: [],
      },
      subComment: {
        subject_comment: null,
        college_comment: null
      },
      VolunDat: [],
    }
  },


  computed: {
    related_socre: function() {
      return [{
        name: '分数',
        value: store.state.userInfo.score_triger ? store.state.userInfo.score : store.state.userInfo.pre_score
      }, {
        name: '文理科',
        value: store.state.cur_student_info.category == 1? '文科': '理科',
      }, {
        name: '批次',
        value: convert.toCollegeBatch(store.state.cur_student_info.batch_code)
      }, {
        name: '分线差',
        value: store.state.cur_student_info.score_diff
      }, {
        name: '位次',
        value: store.state.cur_student_info.position_start ? `${store.state.cur_student_info.position_start} - ${store.state.cur_student_info.position_end}` : ''
      }];
    },
    volunOptions: function() {
      return [{
          value: null,
          label: '当前所属:' + convert.toTotalBatchName(this.postCollegeDat.batch),
          disabled: true,
        },
        {
          value: this.postCollegeDat.batch + ',A',
          label: '志愿A',
        },
        {
          value: this.postCollegeDat.batch + ',B',
          label: '志愿B',
        },
        {
          value: this.postCollegeDat.batch + ',C',
          label: '志愿C',
        },
        {
          value: this.postCollegeDat.batch + ',D',
          label: '志愿D',
        },
        {
          value: this.postCollegeDat.batch + ',E',
          label: '志愿E',
        },
        {
          value: this.postCollegeDat.batch + ',F',
          label: '志愿F',
        }
      ];
    },
    subVolunOptions: function() {
      return [{
          value: null,
          label: '当前所属:' + convert.toTotalBatchName(this.postCollegeDat.batch),
          disabled: true,
        },
        {
          value: this.postCollegeDat.batch + ',subj_1',
          label: '专业一',
        },
        {
          value: this.postCollegeDat.batch + ',subj_2',
          label: '专业二',
        },
        {
          value: this.postCollegeDat.batch + ',subj_3',
          label: '专业三',
        },
        {
          value: this.postCollegeDat.batch + ',subj_4',
          label: '专业四',
        },
        {
          value: this.postCollegeDat.batch + ',subj_5',
          label: '专业五',
        },
        {
          value: this.postCollegeDat.batch + ',subj_6',
          label: '专业六',
        }
      ];
    }
  },

  watch: {
    postCollegeDat: {
      handler: function(postCollegeDat) {
        const vm = this;
        const {
          refreshNum,
          schoolItemData,
          province_url
        } = this;
        if (Object.keys(postCollegeDat).length < 3) {
          return;
        }
        vm.showloading = true;
        axios({
            method: 'post',
            url: `/${province_url}/search/college`,
            data: vm.postCollegeDat
          })
          .then(function(response) {
            let res = response.data;
            // 报错提示
            if (res.status === -1) {
               vm.$alert(res.msg, '', {
                confirmButtonText: '确定'
              })
            }
            if (res.status === -2) {
              util.OverTime(vm, res.msg);
            }
            vm.buttonShow.college = true; // 显示更多按钮
            refreshNum.collegeRefr = 0;
            schoolItemData.splice(0); // 清空学校数据
            vm.showloading = false;
            if (res.status == 1) {
            vm.assembleData(response)
            }
          })
      },
      deep: true,
    }
  },

  methods: {

    joinSubj(card_info) {
      console.log('card_info', card_info);
      this.clk_join_info = Object.assign({}, this.clk_join_info, card_info);
      console.log('this.clk_join_info', this.clk_join_info);
      this.showVolunteer(3);
    },
    joinSch(card_info) {
      console.log('card_info', card_info);
      this.clk_join_info = Object.assign({}, card_info);
      this.showVolunteer(2);
    },
    // 显示志愿表
    showVolunteer(show_add_btn) {
      // 是否显示加入志愿的按钮
      this.show_add_btn = show_add_btn;
      this.show_volunteer = true;
    },
    // 添加学校到志愿表
    addSchEvent(childNodes) {
      console.log('oprator panel', childNodes);
      console.log('this.clk_join_info', this.clk_join_info);
      if (childNodes.lvl == 2) {
        volun.postJoin.call(this, {
          batch_index: childNodes.batch_index,
          college_index: childNodes.college_index,
          subject_index: childNodes.pos + 1,
          college_name: this.clk_join_info.schoolId.college_name,
          college_plan_id: this.clk_join_info.schoolId.plan_id,
          college_code: this.clk_join_info.schoolId.college_code,
          subject_name: '',
          subject_plan_id: '',
          subject_code: '',
        }).then(res => {
          childNodes.value = this.clk_join_info.schoolId.college_name;
        });
      }

      if (childNodes.lvl == 3) {
        // 找寻学校 在对象数组里的位置
        let sch_index = volun.getSchIndex(this.VolunDat, childNodes.batch_index, childNodes.college_index);
        let sch = this.VolunDat[childNodes.batch_index - 1]['children'][sch_index];
        // 非 同批次
        if (sch.batch_index !== convert.CHSbatchToIndex(this.clk_join_info.schoolId.batch_code)) {
          return this.$alert('批次不一致', '');
        }
        // 非 同学校
        console.log('sch', sch);
        if (sch.value && sch.plan_id !== this.clk_join_info.schoolId.plan_id) {
          return this.$alert('学校不一致', '');
        }
        volun.postJoin.call(this, {
          batch_index: childNodes.batch_index,
          college_index: childNodes.college_index,
          subject_index: childNodes.pos + 1,
          college_name: this.clk_join_info.schoolId.college_name,
          college_plan_id: this.clk_join_info.schoolId.plan_id,
          college_code: this.clk_join_info.schoolId.college_code,
          subject_name: this.clk_join_info.subId.subject_name,
          subject_plan_id: this.clk_join_info.subId.plan_id,
          subject_code: this.clk_join_info.subId.subject_code,
        }).then(res => {
          childNodes.value = this.clk_join_info.subId.subject_name;
          console.log('sch_index', sch_index);
          this.VolunDat[childNodes.batch_index - 1]['children'][sch_index].value = this.clk_join_info.schoolId.college_name;
          // 添加 college_code
          this.VolunDat[childNodes.batch_index - 1]['children'][sch_index].plan_id = this.clk_join_info.schoolId.plan_id;
        });
      }



    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    painEqual() {
      // let line1 = [444, 444, 546]; //  录取分
      // let line2 = [0, 555, 0]; //  平均分
      // if (!this.chart2.length) this.chart2.push(this.setChart(line1, line2));
      // this.chart2.push(this.setChart(line1,line2));
      // this.chart2.push(this.setChart(line1,line2));
    },
    // 图表注入数据、填无等处理
    setChart(line1, line2) {
      let temp_chart = {
        chartData: this.clone(this.chartData),
        extend: this.clone(Object.assign({}, this.extend, this.etc_extend))
      };
      let lineData = util.modifyMinValue(line1, line2);
      console.log('lineData', lineData);

      // let timeData = [`${store.state.userInfo.enroll_year - 2}`, `${store.state.userInfo.enroll_year - 1}`, `${store.state.userInfo.enroll_year}`];
      let timeData = ['一本', '二本', '专科']
      for (let i = 0, len = temp_chart.chartData.rows.length; i < len; i++) {
        if (lineData.line1.data) {
          temp_chart.chartData.rows[i]['等位分'] = lineData.line1.data[i] === '' ? 0 : lineData.line1.data[i];
        }
        if (lineData.line2.data) {
          temp_chart.chartData.rows[i]['等位分'] = lineData.line2.data[i] === '' ? 0 : lineData.line2.data[i];
        }
        temp_chart.chartData.rows[i]['date'] = timeData[i];
      }
      temp_chart.extend['series.0.label']['formatter'] = function(p) {
        console.log('p ', p.value[1]);
        if (lineData.line1.zero && p.value[1] === lineData.line1.zero) {
          return '无';
        }
        return p.value[1] > 0 ? p.value[1] : '无';
      }
      temp_chart.extend['series.1.label']['formatter'] = function(p) {
        console.log('p ', p.value[1]);
        if (lineData.line2.zero && p.value[1] === lineData.line2.zero) {
          return '无';
        }
        return p.value[1] > 0 ? p.value[1] : '无';
      }
      return temp_chart;
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
    hasLine: function(state, preStr) {
      let i = 1;
      while (state.showCom.hasOwnProperty(preStr + i)) {
        if (state.showCom[preStr + i]) {
          return false;
        }
        i++;
      }
      return true;
    },
    addCollege: function(event) {
      const vm = this;
      const {
        refreshNum,
        postCollegeDat,
        province_url
      } = this;
      vm.showloading = true;
      axios({
          method: 'post',
          url: `/${province_url}/search/college`,
          data: Object.assign({}, {
            refresh_cnt: ++refreshNum.collegeRefr
          }, postCollegeDat)
        })
        .then(function(response) {
          let res = response.data;
            vm.showloading = false;
          // 没有可加载的内容时
          if (res.status === -1) {
            vm.buttonShow.college = false;
            vm.promptText.college = res.msg
          }
          if (res.status === -2) {
            util.OverTime(vm, res.msg);
          }
          if (res.status === 1) {
            vm.assembleData(response)
          }
        })
    },
    addSubject: function(collegeDat) {
      const vm = this;
      const {
        refreshNum,
        province_url
      } = this;
      axios({
          method: 'get',
          url: `/${province_url}/search/college/subject`,
          params: {
            plan_id: collegeDat.plan_id,
            refresh_cnt: ++refreshNum.subjectRefr
          }
        })
        .then(function(response) {
          if (response.data.status == 1) {
            vm.assembleSubData(response)
            vm.dialogShow.showSubDetail = true;
          }

          if (response.data.status == -1) {
            vm.buttonShow.subject = false;
            vm.promptText.subject = response.data.msg;
          }
        })
    },
    addMasterDoctor: function(params) {
      const vm = this;
      const {
        refreshNum,
        province_url
      } = this;
      let m_or_d;
      if (params.title.indexOf('硕士研究方向') >= 0) { // 查看硕士
        m_or_d = 'master';
      }
      if (params.title.indexOf('博士研究方向') >= 0) { // 查看博士
        m_or_d = 'doctor';
      }

      axios({
          method: 'get',
          url: `/${province_url}/${m_or_d}/direction`,
          params: {
            college_code: params.college_code,
            subject_code: params.subject_code,
            refresh_cnt: m_or_d == 'master' ? ++refreshNum.master_num : ++refreshNum.doctorRefr,
          },
        })
        .then(function(response) {
          let res = response.data;
          if (res.status == -1) {
            vm.buttonShow.mOrd = false;
            vm.promptText.mOrd = res.msg;
          }
          vm.showDocMas(res)
        })
    },
    assembleData: function(response) {
      const userInfo = this.state.userInfo
      const PUBLIC_CDN_DOMAIN = this.state.PUBLIC_CDN_DOMAIN;
      const DOMAIN = this.state.DOMAIN;

      const {
        schoolItemData
      } = this;
      const vm = this;
      // console.log(PUBLIC_CDN_DOMAIN)
      let res = response.data;
      if (typeof res !== 'object' && typeof res !== 'number') {
        res = JSON.parse(res);
      }
      let colNames = res.col_names;
      let rows = res.data;

      // 公有数据名称
      let po_id = colNames.indexOf('id');
      let po_plan_id = colNames.indexOf('plan_id'); // 不同批次下的学校记录,以它区分学校
      let po_batch_code = colNames.indexOf('batch_code'); // 批次
      let po_risk = colNames.indexOf('risk'); //  稳 保 冲
      let po_enroll_num = colNames.indexOf('enroll_num');

      // 学校数据
      let po_category = colNames.indexOf('category');
      let po_college_code = colNames.indexOf('college_code'); // 学校代码
      // 表格招生数据
      let po_college_rank = colNames.indexOf('college_rank');
      let po_college_type = colNames.indexOf('college_type');
      let po_college_level = colNames.indexOf('college_level');
      let po_belong_to = colNames.indexOf('belong_to');
      let po_is_public = colNames.indexOf('is_public');
      let po_recruit_code = colNames.indexOf('recruit_code');
      let po_master_num = colNames.indexOf('master_num');
      let po_doctor_num = colNames.indexOf('doctor_num');
      let po_key_subject_num = colNames.indexOf('key_subject_num'); // 重点学科数目

      // 学校信息
      let po_province_name = colNames.indexOf('province_name');
      let po_college_name = colNames.indexOf('college_name');
      let po_is985 = colNames.indexOf('is985');
      let po_is211 = colNames.indexOf('is211');
      let po_firstclass_type = colNames.indexOf('firstclass_type'); // 1: '一流大学',2: '一流学科'


      // 折线数据
      let po_1_adjust_score = colNames.indexOf('adjust_score1');
      let po_2_adjust_score = colNames.indexOf('adjust_score2');
      let po_3_adjust_score = colNames.indexOf('adjust_score3');

      let po_1_avg_score = colNames.indexOf('avg_score1');
      let po_2_avg_score = colNames.indexOf('avg_score2');
      let po_3_avg_score = colNames.indexOf('avg_score3');

      let po_position1_s = colNames.indexOf('position1_s');
      let po_position2_s = colNames.indexOf('position2_s');
      let po_position3_s = colNames.indexOf('position3_s');

      let po_position1_e = colNames.indexOf('position1_e');
      let po_position2_e = colNames.indexOf('position2_e');
      let po_position3_e = colNames.indexOf('position3_e');

      let po_dif_adjust_score1 = colNames.indexOf('dif_adjust_score1');
      let po_dif_adjust_score2 = colNames.indexOf('dif_adjust_score2');
      let po_dif_adjust_score3 = colNames.indexOf('dif_adjust_score3');

      let po_dif_avg_score1 = colNames.indexOf('dif_avg_score1');
      let po_dif_avg_score2 = colNames.indexOf('dif_avg_score2');
      let po_dif_avg_score3 = colNames.indexOf('dif_avg_score3');

      rows.forEach(function(row) {
        let arrow_name = '' // 左上角 稳 保 冲 图片的名字
        // 学校校徽图片文件夹名
        let img_code = po_college_code ? row[po_college_code].toString().slice(-2, -1) : null;
        let schoolInfo, enrollDetail, schoolLineData = {},
          schoolId;

        switch (parseInt(row[po_risk])) {
          case 1:
            arrow_name = 'sprint';
            break;
          case 2:
            arrow_name = 'stable';
            break;
          case 3:
            arrow_name = 'guarantee';
            break;
          default:
            arrow_name = 'no';
            break;
        }
        schoolInfo = {
          risk: DOMAIN + '/img/' + arrow_name + '.png',
          schoolBadge: PUBLIC_CDN_DOMAIN + '/college-logo/' + img_code + '/p' + row[po_college_code] + '.jpg',
          province: row[po_province_name],
          is985: row[po_is985],
          is211: row[po_is211],
          firstclass: row[po_firstclass_type],
          firstsub: row[po_firstclass_type],
          college_name: row[po_college_name],
        };
        // console.log('schoolInfo', schoolInfo)

        enrollDetail = [{
            label: '办学层次',
            value: convert.toCollegeLevel(row[po_college_level])
          },
          {
            label: '录取批次',
            value: convert.toCollegeBatch(row[po_batch_code])
          },
          {
            label: userInfo.enroll_year.toString().slice(-2) + '年招生',
            value: row[po_enroll_num] + '人'
          },
          {
            label: '招生代码',
            value: row[po_recruit_code]
          },
          {
            label: '综合排名',
            value: row[po_college_rank]
          },
          {
            label: '硕士点数',
            value: row[po_master_num]
          },
          {
            label: '博士点数',
            value: row[po_doctor_num]
          },
          {
            label: '重点学科',
            value: row[po_key_subject_num]
          },
          {
            label: '院校类型',
            value: convert.toCollegeType(row[po_college_type])
          },
          {
            label: '院校性质',
            value: convert.toPublicCollege(row[po_is_public])
          },
          {
            label: '主管部门',
            value: row[po_belong_to]
          },
          {
            label: '专业详情',
            value: '查看',
            click: true,
            class: 'subDetail'
          },
          {
            label: '招生章程',
            value: '查看',
            click: true,
            class: 'enrollRole'
          }
        ];
        // console.log('enrollDetail', enrollDetail)

        schoolLineData = {
          line_img_1: {
            columns: ['录取分', '平均分'],
            line_1: [row[po_3_adjust_score], row[po_2_adjust_score], row[po_1_adjust_score]], // 录取分
            line_2: [row[po_3_avg_score], row[po_2_avg_score], row[po_1_avg_score]], // 平均分
          },
          line_img_2: {
            columns: ['录取分差', '平均分差'],
            line_1: [row[po_dif_adjust_score3], row[po_dif_adjust_score2], row[po_dif_adjust_score1]],
            // 录取分差
            line_2: [row[po_dif_avg_score3], row[po_dif_avg_score2], row[po_dif_avg_score1]] // 平均分差
          },
          line_img_3: {
            columns: ['位次起点', '位次终点'],
            line_1: [row[po_position3_s], row[po_position2_s], row[po_position1_s]], // 位次起点
            line_2: [row[po_position3_e], row[po_position2_e], row[po_position1_e]], // 位次终点
          }
        };

        schoolId = {
          id: row[po_id],
          category: row[po_category],
          plan_id: row[po_plan_id], // 不同批次下的学校记录,以它区分学校
          college_code: row[po_college_code], // 学校代码
          college_name: row[po_college_name],
          batch_code: convert.toCollegeBatch(row[po_batch_code]), // 批次
        };

        schoolItemData.push({
          schoolId,
          schoolInfo,
          enrollDetail,
          schoolLineData
        })

        if (vm.fileName >= 2) {
          vm.fileName = 1;
        } else {
          vm.fileName++;
        }
      })
    },
    assembleSubData: function(response) {
      const userInfo = this.state.userInfo
      const DOMAIN = this.state.DOMAIN;
      const subItemData = this.subDetail.subItemData;
      const vm = this;
      let res = response.data;
      if (typeof res !== 'object' && typeof res !== 'number') {
        res = JSON.parse(res);
      }
      let colNames = res.col_names;
      let rows = res.data;

      // 专业数据
      let po_id = colNames.indexOf('id');
      let po_plan_id = colNames.indexOf('plan_id'); // 不同批次下的学校记录,以它区分学校
      let po_batch_code = colNames.indexOf('batch_code'); // 批次
      let po_risk = colNames.indexOf('risk'); //  稳 保 冲
      let po_enroll_num = colNames.indexOf('enroll_num');


      let po_subject_name = colNames.indexOf('subject_name');
      let po_subject_code = colNames.indexOf('subject_code');
      let po_subject_rank = colNames.indexOf('subject_rank');
      let po_isKeySubject = colNames.indexOf('isKeySubject');
      let po_study_length = colNames.indexOf('study_length');
      let po_study_money = colNames.indexOf('study_money');
      let po_subject_recruit_code = colNames.indexOf('subject_recruit_code');


      let po_estimate_position1 = colNames.indexOf('estimate_position1');
      let po_estimate_position2 = colNames.indexOf('estimate_position2');
      let po_estimate_position3 = colNames.indexOf('estimate_position3');
      let po_subject_score1 = colNames.indexOf('subject_score1');
      let po_subject_score2 = colNames.indexOf('subject_score2');
      let po_subject_score3 = colNames.indexOf('subject_score3');
      let po_dif_subject_score1 = colNames.indexOf('dif_subject_score1');
      let po_dif_subject_score2 = colNames.indexOf('dif_subject_score2');
      let po_dif_subject_score3 = colNames.indexOf('dif_subject_score3');

      let po_has_master = colNames.indexOf('has_master');
      let po_has_doctor = colNames.indexOf('has_doctor');

      rows.forEach(function(row) {
        let arrow_name = '' // 左上角 稳 保 冲 图片的名字
        let subDetail, subLineData, subId;

        switch (parseInt(row[po_risk])) {
          case 1:
            arrow_name = 'sprint';
            break;
          case 2:
            arrow_name = 'stable';
            break;
          case 3:
            arrow_name = 'guarantee';
            break;
          default:
            arrow_name = 'no';
            break;
        }

        subDetail = [{
            label: '专业排名',
            value: convert.toSubjectLevel(row[po_subject_rank])
          },
          {
            label: '招生代码',
            value: row[po_subject_recruit_code]
          },
          {
            label: userInfo.enroll_year.toString().slice(-2) + '年招生',
            value: row[po_enroll_num] + '人'
          },
          {
            label: '重点学科',
            value: row[po_isKeySubject] === 1 ? '是' : '否'
          },
          {
            label: '招生备注',
            value: '查看',
            click: true,
            class: 'enrollDetail'
          },
          {
            label: '学费',
            value: row[po_study_money]
          },
          {
            label: '学制',
            value: row[po_study_length]
          },
          {
            label: '硕士授予权',
            value: row[po_has_master] ? '有(查看)' : '',
            click: true,
            class: 'look-master'
          },
          {
            label: '博士授予权',
            value: row[po_has_doctor] ? '有(查看)' : '',
            click: true,
            class: 'look-doctor'
          }
        ]

        subLineData = {
          line_img_1: {
            columns: ['专业分'],
            line_1: [row[po_subject_score3], row[po_subject_score2], row[po_subject_score1]],
          },
          line_img_2: {
            columns: ['专业分线差'],
            line_1: [row[po_dif_subject_score3], row[po_dif_subject_score2], row[po_dif_subject_score1]],
          }
        }

        subId = {
          id: row[po_id],
          plan_id: row[po_plan_id], // 不同批次下的学校记录,以它区分学校
          subject_code: row[po_subject_code], // 学校代码
          subject_name: row[po_subject_name],
          batch_code: convert.toCollegeBatch(row[po_batch_code]), // 批次
        };

        subItemData.push({
          risk: DOMAIN + '/img/' + arrow_name + '.png',
          subject_name: row[po_subject_name],
          subId,
          subLineData,
          subDetail
        })
      })
    },
    lineData: function(columns, line1, line2) {
      return util.calcData(columns, line1, line2, this.state.userInfo.enroll_year);
    },
    joinVolun: function(name, value, isSub) {
      // if (isSub && typeof isSub !== 'boolean') {
      //   return console.error('error: 请传入boolean类型的值')
      // }
      // const {
      //   VolunDat
      // } = this;
      // let volun = value.split(',');
      // let vm = this;
      // let num = parseInt(convert.toTotalBatch(parseInt(volun[0])));
      // let volunChild = VolunDat[num - 1],
      //   volunParent;
      // let isHasVolun = false,
      //   volunteer, hasSchool = false,
      //   confirmTitle;
      // if (VolunDat[num - 1].id != num) {
      //   console.error('error: 与志愿表id不同')
      // }
      // for (let i = 1, length = volun.length; i < length; i++) {
      //   isHasVolun = false;
      //   hasSchool = false;
      //   volunChild = volunChild.children;
      //   volunChild.forEach(function(currentValue) {
      //     if (currentValue.id == volun[i]) {
      //       if (currentValue.hasOwnProperty('value') && currentValue.value) {
      //         hasSchool = true;
      //       }
      //       volunParent = volunChild;
      //       volunChild = currentValue;
      //     }
      //     if (currentValue.value == name && !isSub) {
      //       isHasVolun = true;
      //       volunteer = currentValue;
      //     }
      //   })
      // }
      // // console.log('volunParent', volunParent)
      // // console.log('volunChild', volunChild)
      // // console.log('volunteer', volunteer)
      // confirmTitle = '是否要加入志愿表'
      // if (hasSchool) {
      //   confirmTitle = '该位置已有志愿，是否替换?'
      // }
      // if (isHasVolun && !isSub) {
      //   confirmTitle = '该志愿表已有该志愿，是否替换?'
      // }
      // this.$confirm(confirmTitle, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   vm.isJoinVolun = true;
      //   if (hasSchool && isHasVolun && volunChild.value != name) {
      //     volunChild.value = name;
      //     volunChild.children = JSON.parse(JSON.stringify(volunteer.children.slice(0)));
      //     volun.emptyData(vm, volunteer);
      //   }
      //   if (hasSchool && !isHasVolun) {
      //     volunChild.value = name;
      //     volunChild.children ? volun.emptyData(vm, volunChild.children) : '';
      //   }
      //   if (!hasSchool && isHasVolun) {
      //     volunChild.value = name;
      //     volunChild.children = JSON.parse(JSON.stringify(volunteer.children.slice(0)));
      //     volun.emptyData(vm, volunteer);
      //   }
      //   if (!isHasVolun && !hasSchool) {
      //     volunChild.value = name;
      //   }
      //   vm.postVolun(vm.VolunDat, num);
      //   this.$message({
      //     type: 'success',
      //     message: '加入志愿!'
      //   });
      // }).catch(() => {
      //   vm.isJoinVolun = false;
      //   this.$message({
      //     type: 'info',
      //     message: '已取消加入志愿'
      //   });
      // });

    },
    hasSchool: function(sub_name, college_name, value) {
      // console.log('sub_name', sub_name)
      // console.log('college_name', college_name)
      let num = convert.toTotalBatch(parseInt(value[0].split(',')[0]))
      let idArr = value[0].split(',');
      let volun = this.VolunDat[num - 1];
      let hasSchool = false,
        id;
      for (let i = 0, len = volun.children.length; i < len; i++) {
        if (volun.children[i].value == college_name) {
          hasSchool = true;
          id = volun.children[i].id;

        }
      }
      if (!hasSchool) {
        this.isJoinVolun = false;
        return this.$alert('请先将学校加入志愿表', '注意', {
          confirmButtonText: '确定',
        });
      }
      idArr.splice(1, 0, id);
      this.joinVolun(sub_name, idArr.join(','), true)

    },
    handleVolunEmpty: function(el, index, childNodes) {
      console.log('childNodes', childNodes);
      // 新版
      // 删除批次
      volun.postDel.call(this, 'batch', {
        batch_index: childNodes.batch_index
      }).then(res => {
        volun.emptyData.call(this, this.VolunDat, childNodes);
        let temp_student_info = Object.assign({}, store.state.cur_student_info, {
          volunteer: this.VolunDat
        })
        // 更新至 全局
        store.setCurStudentInfoAction(temp_student_info);
      });
    },
    handleVolunUp: function(el, value, index, childNodes) {
      if (childNodes.lvl == 2) {
        volun.postMove.call(this, 'up', {
          college_index: childNodes.college_index
        }, '/college').then(res => {
          volun.volunMove(this.VolunDat, index, 1, childNodes);
          let temp_student_info = Object.assign({}, store.state.cur_student_info, {
            volunteer: this.VolunDat
          })
          // 更新至 全局
          store.setCurStudentInfoAction(temp_student_info);
        });
      }
      if (childNodes.lvl == 3) {
        volun.postMove.call(this, 'up', {
          college_index: childNodes.college_index,
          subject_index: childNodes.pos + 1
        }).then(res => {
          volun.volunMove(this.VolunDat, index, 1, childNodes);
          let temp_student_info = Object.assign({}, store.state.cur_student_info, {
            volunteer: this.VolunDat
          })
          // 更新至 全局
          store.setCurStudentInfoAction(temp_student_info);
        });
      }
    },
    handleVolunDown: function(el, value, index, childNodes) {
      if (childNodes.lvl == 2) {
        volun.postMove.call(this, 'down', {
          college_index: childNodes.college_index
        }, '/college').then(res => {
          volun.volunMove(this.VolunDat, index, 'down', childNodes);
          let temp_student_info = Object.assign({}, store.state.cur_student_info, {
            volunteer: this.VolunDat
          })
          // 更新至 全局
          store.setCurStudentInfoAction(temp_student_info);
        });
      }
      if (childNodes.lvl == 3) {
        volun.postMove.call(this, 'down', {
          college_index: childNodes.college_index,
          subject_index: childNodes.pos + 1
        }).then(res => {
          volun.volunMove(this.VolunDat, index, 'down', childNodes);
          let temp_student_info = Object.assign({}, store.state.cur_student_info, {
            volunteer: this.VolunDat
          })
          // 更新至 全局
          store.setCurStudentInfoAction(temp_student_info);
        });
      }
    },
    handleItemEmpty: function(el, value, index, childNodes) {
      console.log('childNodes', childNodes);
      let data = this.VolunDat;
      let parent;
      // 原版
      // index.forEach(function(id) {
      //   // console.log('id', id)
      //   data.forEach(function(currentValue) {
      //     // console.log(currentValue.id)
      //     if (currentValue.id == id) {
      //       parent = currentValue;
      //       data = currentValue.hasOwnProperty('children') ? currentValue.children : currentValue;
      //     }
      //   })
      // });
      // 原版
      // volun.emptyData(this, parent);
      // this.postVolun(this.VolunDat, index[0])

      // 新版
      // 删除专业、学校
      // console.log('parent', parent);
      volun.postDel(childNodes.lvl == 2 ? 'college' : 'one', {
        college_index: childNodes.college_index,
        subject_index: childNodes.lvl == 2 ? '' : childNodes.pos + 1
      }).then(res => {
        volun.emptyData.call(this, this.VolunDat, childNodes);
        let temp_student_info = Object.assign({}, store.state.cur_student_info, {
          volunteer: this.VolunDat
        })
        // 更新至 全局
        store.setCurStudentInfoAction(temp_student_info);
      });
    },
    volunRoleChange: function(value, index, childNodes) {
      console.log('childNodes', childNodes);
      // 专业调配
      if (childNodes.id == '01') {
        volun.postAdjust.call(this, childNodes.checked ? 'set' : 'unset', childNodes.college_index, '/subject').catch(res => {
          childNodes.checked = !childNodes.checked;
        });
      }
      // 定向调配
      if (childNodes.id == '02') {
        volun.postAdjust.call(this, childNodes.checked ? 'set' : 'unset', childNodes.college_index).catch(res => {
          childNodes.checked = !childNodes.checked;
        });
      }
      // this.postVolun(this.VolunDat, index[0])
    },
    postVolun: function(data, num) {
      const {
        province_url
      } = this;
      volun.postVolunteer(volun.transformVolun(data.slice(parseInt(num) - 1, parseInt(num)), num), num, province_url)
      console.log(volun.transformVolun(data.slice(parseInt(num) - 1, parseInt(num)), num))
    },
    toggleVolunShow: function() {
      this.isVolunShow = !this.isVolunShow
    },
    clearJoinBtn: function(el) {
      const vm = this;
      let volunteer;
      if (!el.target.defaultValue) {
        return;
      }
      volunteer = this.$refs.volunteer;
      for (let i = 0, len = volunteer.length; i < len; i++) {
        let currentValue = volunteer[i];
        if (el.target.parentNode != currentValue.$el.childNodes['0'] && vm.isJoinVolun) {
          if (el.target.defaultValue == currentValue.currentLabels[0]) {
            currentValue.$data.currentValue = [];
          }
        } else if (!vm.isJoinVolun) {
          currentValue.$data.currentValue = [];
        }
      }
    },
    lookInfo: function(collegeDat, schoolLineData, el, item) {
      console.log('collegeDat', collegeDat);
      console.log('schoolLineData', schoolLineData);
      console.log('item', item);

      const vm = this;
      const {
        refreshNum,
        province_url
      } = this;

      if (el.target.parentNode.className.indexOf('subDetail') >= 0 || subDetail) {
        this.clk_join_info = Object.assign({}, this.clk_join_info, item);
        if (collegeDat === this.subDetail.collegeDat) {
          vm.dialogShow.showSubDetail = true;
          return;
        }
        this.subDetail.title = collegeDat.college_name + '-' + (collegeDat.category === 1 ? '文科' : '理科');
        this.subDetail.schoolLineData = schoolLineData;
        this.subDetail.collegeDat = collegeDat;
        this.subDetail.subItemData = [];
        refreshNum.subjectRefr = 0;
        vm.buttonShow.subject = true; // 显示更多按钮

        axios({
            method: 'get',
            url: `/${province_url}/search/college/subject`,
            params: {
              plan_id: collegeDat.plan_id,
              refresh_cnt: 0
            }
          })
          .then(function(response) {
            if (response.data.status == 1) {
              console.log(11)
              vm.assembleSubData(response)
              vm.dialogShow.showSubDetail = true;
            }
          })
      }
      if (el.target.parentNode.className.indexOf('enrollRole') >= 0) {
        axios({
            method: 'get',
            url: `/${province_url}/get/constitution/`,
            params: {
              college_code: collegeDat.college_code
            }
          })
          .then(function(response) {
            let res = response.data;
            if (res.status === 1) {

              // vm.enrollRole.title = res.data.title;
              // vm.enrollRole.data = res.data.constitution;
              // vm.dialogShow.showEnrollRole = true;

              vm.$confirm(replaceKey(res.data.constitution), res.data.title, {
                customClass: 'constitution',
                showCancelButton: false,
                dangerouslyUseHTMLString: true
              });

              setTimeout(() => {
                document.getElementsByClassName('el-message-box__wrapper')[0].scrollTo(0, 0)
              }, 500)


            }
            if (res.status === -1) {
              vm.$alert(res.msg, '', {
                confirmButtonText: '确定'
              })
            }
            if (res.status === -2) {
              util.OverTime(vm, res.msg);
              return;
            }
          })
      }
    },
    lookErollRemarks: function(sub, college, el) {
      const vm = this;
      const {
        refreshNum,
        province_url
      } = this;
      let m_or_d;
      refreshNum.master_num = 0;
      refreshNum.doctor_num = 0;
      vm.buttonShow.mOrd = true; // 显示更多按钮
      if (el.target.parentNode.className.indexOf('enrollDetail') >= 0) { // 专业备注
        axios({
            method: 'get',
            url: `/${province_url}/subject/comment`,
            params: {
              id: sub.id,
            }
          })
          .then(function(response) {
            if (response.data.status == 1) {
              vm.subComment = {
                subject_comment: response.data.subject_comment,
                college_comment: response.data.college_comment,
              }
              vm.dialogShow.showComment = true;
            }
          })
        return;
      }

      if (el.target.parentNode.className.indexOf('look-master') >= 0) { // 查看硕士
        m_or_d = 'master';
        vm.doctorOrMaster.title = sub.subject_name + '-' + (vm.state.userInfo.category === 1 ? '文科' : '理科') +
          '-硕士研究方向';
      }
      if (el.target.parentNode.className.indexOf('look-doctor') >= 0) { // 查看博士
        m_or_d = 'doctor';
        vm.doctorOrMaster.title = sub.subject_name + '-' + (vm.state.userInfo.category === 1 ? '文科' : '理科') +
          '-博士研究方向';
      }
      vm.doctorOrMaster.data = null;
      axios({
          method: 'get',
          url: `/${province_url}/${m_or_d}/direction`,
          params: {
            college_code: college.college_code,
            subject_code: sub.subject_code,
          },
        })
        .then(function(response) {

          let res = response.data;

          if (res.status == -1) {
            return vm.$alert(res.msg, '', {
              confirmButtonText: '确定',
            })
          }

          vm.doctorOrMaster.college_code = college.college_code;
          vm.doctorOrMaster.subject_code = sub.subject_code;
          vm.showDocMas(res)

        })

    },
    showDocMas: function(data) {
      let col = data.col_names;
      let po_id = col.indexOf('id');
      let po_subject_name = col.indexOf('subject_name');
      let po_direction = col.indexOf('direction'); // 研究方向
      let po_department = col.indexOf('department'); // 所属学院
      let renderDat = [];
      data.direction.forEach(function(curValue, index) {
        let directionArr = curValue[po_direction].split(',');
        let child = [];
        directionArr.forEach(function(value) {
          child.push({
            label: value
          })
        })
        renderDat[index] = {
          label: curValue[po_subject_name] + '(' + curValue[po_department] + ')',
          id: curValue[po_id],
          children: child
        };
      })
      this.dialogShow.showGranting = true;
      this.doctorOrMaster.data = this.doctorOrMaster.data ? this.doctorOrMaster.data.concat(renderDat) : renderDat;
    },
    joinCompare: function(college) {
      const vm = this;
      vm.dialogShow.showCompareInput = true;
      if (!vm.compareSchList.one.college_name) {
        store.setCompareSchListAction({
          one: college
        });
        Object.assign(vm.compareSchList.one, college);
        return;
      }
      if (!vm.compareSchList.two.college_name) {
        store.setCompareSchListAction({
          two: college
        });
        Object.assign(vm.compareSchList.two, college);
        return;
      }
      if (vm.compareSchList.one.college_name && vm.compareSchList.two.college_name) {
        setTimeout(function() {
          vm.$alert('对比列表已满，请先处理', '注意', {
            confirmButtonText: '确定',
          });
        }, 500)

      }
    },
    compareSchool: function() {
      const vm = this;
      if (!vm.compareSchList.one.college_name || !vm.compareSchList.two.college_name) {
        this.$alert('请加入所要比较的学校', '注意', {
          confirmButtonText: '确定',
        });
        return;
      }
      if (convert.toTotalBatchName(vm.compareSchList.one.batch_code) != convert.toTotalBatchName(vm.compareSchList.two.batch_code)) {
        this.$alert('请选择同一批次学校进行比较', '注意', {
          confirmButtonText: '确定',
        });
        return;
      }
      if (vm.compareSchList.one.college_name == vm.compareSchList.two.college_name) {
        this.$alert('请选择不同学校进行比较', '注意', {
          confirmButtonText: '确定',
        })
        return;
      }

      vm.compareSchInfo.plan_id = [vm.compareSchList.one.plan_id, vm.compareSchList.two.plan_id];
      vm.dialogShow.showCompareRes = true;
    },

  },

  created: function() {
    let vm = this;
    const PUBLIC_CDN_DOMAIN = this.state.PUBLIC_CDN_DOMAIN;
    const {
      province_url
    } = this;

    // 获取相关信息 等位分..
    util.getRelatedInfo.call(this).then(res => {
      // 获取志愿表数据
      volun.getAllVolunteer.call(this).then(res => {
        store.setCurStudentInfoAction(Object.assign({}, store.state.cur_student_info, {
          volunteer: res
        }));
        console.log('VolunDat', this.VolunDat);
        this.VolunDat = util.deepClone(this.state.cur_student_info.volunteer);
      });
      // 绘制等位分
      if (!this.chart2.length && store.state.cur_student_info) {
        let line2 = [store.state.cur_student_info.equal_score1, store.state.cur_student_info.equal_score2, store.state.cur_student_info.equal_score3]; //  分
        this.chart2.push(this.setChart('', line2));
      }
    });

    // 获取志愿表结构
    volun.getStruct.call(this).then(res => {
      // 处理志愿表结构
      this.VolunDat = volun.handleStruct(res);
      console.log('VolunDat', this.VolunDat);
      if (this.state.cur_student_info) {
        this.VolunDat = util.deepClone(this.state.cur_student_info.volunteer);
      }
    });
  },
  // mounted: function () {
  //   const vm = this
  //   document.getElementsByTagName('body')[0].addEventListener('click', function(el) {
  //     if (el.target.className.indexOf('volunTableTitle') < 0 ) {
  //       vm.isVolunShow = false;
  //     }
  //   });
  // }
}
</script>

<style>
.my_4 {
  margin: 0px 4px;
}

.text-r {
  text-align: right;
}

.text-l {
  text-align: left;
}

.flex {
  display: flex
}

.cursor_point {
  cursor: pointer;
}

.index-sch-card {
  position: relative;
  height: 100%;
  padding-top: 0.5rem;
  background-color: #eceff1;
}

/*学校结果面板的标题栏*/
.index-sch-card .search-content-title {
  padding: 0px 15px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  margin-bottom: 0;
  line-height: 6rem;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.1);
}

.index-sch-card .search-content-title .search-title-tag {
  max-width: 100px;
}

.index-sch-card .search-content-title .el-row--flex {
  flex-wrap: wrap;
}

.index-sch-card .search-content-title .search-title-chart {
  position: relative;
  min-height: 4.5rem;
}

.index-sch-card .search-content-title .ve-line,
.index-sch-card .search-content-title .search-title-chart {
  max-width: 270px;
  min-width: 150px;
}

@media screen and (min-width: 768px) {
  .index-sch-card .search-content-title .search-title {
    max-width: 120px;
  }
}

@media screen and (min-width: 1200px) {

  .index-sch-card .search-content-title .ve-line,
  .index-sch-card .search-content-title .search-title-chart {
    min-width: 170px;
  }
}

@media (min-width: 998px) and (max-width: 1026px) {

  .index-sch-card .search-content-title .ve-line,
  .index-sch-card .search-content-title .search-title-chart {
    min-width: 200px;
  }
}

@media (min-width: 614px) and (max-width: 764px) {

  .index-sch-card .search-content-title .ve-line,
  .index-sch-card .search-content-title .search-title-chart {
    max-width: 200px;
    min-width: 100px;
  }
}

@media screen and (max-width: 597.8px) {
  .index-sch-card .search-content-title .search-title-chart {
    flex-grow: 1;
  }
}

.index-sch-card .el-button--default {
  background-color: rgba(64, 158, 255, .1);
  border: 1px solid rgba(64, 158, 255, .2);
  color: #409EFF;
  padding: 11px 8px;
  min-width: 88px;
}

/*学校搜索结果页*/
.index-sch-card .search-result-content {
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  height: calc(100% - 6rem);
  padding-bottom: 20px;
  background-color: #eceff1;
}

.index-sch-card .search-result-content .school-item {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  height: auto;
  font-size: 0.9rem;
  color: rgb(160, 160, 160);
  text-align: left;
}

.index-sch-card .search-result-content .school-item .el-table-zs {
  margin: 20px 0px;
}

.index-sch-card .search-result-content .school-item .line-button {
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  padding: 10px 0;
}

@media screen and (min-width: 1000px) {
  .index-sch-card .search-result-content .school-item .line-btn-maxW {
    box-sizing: border-box;
    padding-top: 30px;
  }
}

.index-sch-card .search-result-content .school-item .line-content {
  box-sizing: border-box;
  height: 65%;
  width: 100%;
  display: inline-flex;
}

.index-sch-card .search-result-content .school-item .func-button {
  margin: 3% 0px 2%;
}

.index-sch-card .search-result-content .school-item .func-button .el-cascader {
  width: 109px;
  margin-right: 40px;
}

.el-dialog .college-subject .subject-item {
  margin: 20px 0px 30px;
}

.el-dialog .college-subject .sub-item-title {
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 1rem;
}

.el-dialog .college-subject .subject-item-content {
  display: flex;
  flex-direction: column;
}

.el-dialog .college-subject .subject-item .line-button {
  align-items: center;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .el-dialog .college-subject .subject-item .line-button .func-button {
    margin-top: 20px;
  }
}

.el-dialog .college-subject .line-content {
  display: inline-flex;
  height: 100px;
}

.el-dialog .college-subject .adm-prob {
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.el-dialog .college-subject .adm-prob img {
  height: 100%;
  width: auto;
}

.compareDialog .el-input__suffix {
  padding: 0px 10px;
}

.compareDialog .el-input__suffix .el-icon-close {
  color: #318cea;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
}

.doctor-master .el-dialog {
  height: 85%;
}

.doctor-master .el-dialog__body {
  height: 65%;
  overflow-y: scroll;
}

.doctor-master .el-dialog__header {
  padding: 20px 40px 0px 20px;
  text-align: left;
  white-space: pre-wrap;
}

.doctor-master .el-dialog__header .el-dialog__title,
.doctor-master .el-tree-node__label {
  font-size: 1rem;
}

.func-button .el-cascader .el-input__inner {
  border: 1px solid #409EFF;
}

.el-message-box.constitution {
  width: 67%;
}
</style>
