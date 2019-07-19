<template>
  <div class="index-left-panel">
    <ul class="list-group inset search-item-pane">
       
      <!-- <div class="search-item-content">
        <el-input placeholder="请输入内容"
        type="select"
        v-if="state.userInfo.score_triger"
        v-model="searchItem.score"
        @blur="postScore">
          <template slot="prepend">高考分</template>
        </el-input>
        <el-input placeholder="请输入内容"
        v-else
        v-model="searchItem.preScore"
        @blur="postScore">
          <template slot="prepend">预估分</template>
        </el-input>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.batch"
        :options="batchOptions"
        :multiple="true"
        selectValue="本科第一批">
          批次
        </zs-select>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.risk"
        :options="riskOptions"
        selectValue="冲刺">
          风险
        </zs-select>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.province"
        :options="provOptions"
        selectValue="全国">
          省份
        </zs-select>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.classify"
        :options="classifyOptions"
        selectValue="不限">
          类型
        </zs-select>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.feature"
        :options="featureOptions"
        selectValue="不限">
          特色
        </zs-select>
  
        <el-input placeholder="请输入内容"
        v-model="searchItem.subject" readonly
        @click.native="showPrfsModal = true">
          <template slot="prepend">专业</template>
        </el-input>
  
        <zs-select placeholder="请输入内容"
        v-model="searchItem.public"
        :options="[{label: '是', value: 1}, {label: '否', value: 2}]"
        selectValue="不限">
          公办
        </zs-select>
      </div> -->
      <zs-base-group
         class="search-input"
         :data="schSearchBox"
         :model.sync="searchItem"
         @btn-click="searchCoolege">
      </zs-base-group>
      <zs-base-group
       class="search-item-content"
       :data="schConditionBox"
       :model.sync="searchItem"
       @input-click="checkTarget">
      </zs-base-group>
    </ul>
    <prfs-search
     :prfsModal.sync="showPrfsModal"
     :major="true"
     :closeOnClickModal="true"
     @getSelected="subSelected"
    />
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import {OverTime} from '@/utils/util.js';
import {getParents} from '@/utils/dom.js';
import * as gsOption from '@/utils/sch-search-option.js';
export default {
  name: 'indexLeftpanel',

  data() {
    return {
      state: store.state,
      subjectBoxVal: '不限',
      showPrfsModal: false,
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      schSearchBox: [
        {
          type: 3, // button
          label: {
            title: '搜索'
          },
          attr: {
            type: 'primary',
            style: 'width: 100%; margin: 10px 0px'
          }
        },
        {
          type: 1, // input
          model: 'schoolName',
          attr: {
            placeholder: '请输入学校', // 占位符，当该组件没有占位符属性时， 不显示占位符
          }
        }
      ],
      batchOptions: [
        {label: "本科提前批", options: [
            {value: "61", label: '(A段) 特殊类'},
            {value: "62", label: '(B段) 贫困地区国家专项'},
            {value: "11", label: '(C段) 省属院校贫困地区国家专项'},
            {value: "12", label: '(D段) 地方高校专项'},
            {value: "21", label: '(E段) 精准扶贫专项'},
            {value: "22", label: '(F段) 革命老区专项'},
            {value: "31", label: '(F段) 藏区专项民语类'},
            {value: "32", label: '(F段) 藏区专项其他类'},
            {value: "41", label: '(F段) 其他民族地区专项'},
            // {value: "51", label: '(F段)综合试点院校'}
          ]
        },
        {label: "本科一批", options: [
            {value: "101", label: '(H段) 普通类及民族班'},
            {value: "102", label: '(I段) 其他类(定向)'},
            {value: "103", label: '(I段) 其他类(少数民族预科)'}
          ]
        },
        {label: "本科二批", options: [
            {value: "201", label: '(J段) 普通类及民族班'},
            {value: "202", label: '(K段) 其他类(定向)'},
            {value: "203", label: '(K段) 其他类(少数民族预科)'}
          ]
        },
        {label: "本科三批", options: [
            {value: "301", label: '(L段) 普通类'},
            {value: "302", label: '(M段) 其他类(定向)'},
            {value: "303", label: '(M段) 其他类(少数民族预科)'}
          ]
        },
        {label: "高职（专科）批特殊类", options: [
            {value: "70", label: '(N段) 直招士官'},
            {value: "80", label: '(N段) 公安武警类'},
            {value: "90", label: '(N段) 航空服务及空中乘务类'},
            {value: "100", label: '(N段) 藏区专项其他类'}
          ]
        },
        {label: "", options: [
            {value: "130", label: '(O段) 高职（专科）批普通类'}
          ]
        },
      ],
      provOptions: null,
    }
  },

  computed: {
    searchItem: {
      get: function() {
        return {
          schoolName: null,
          score: this.state.userInfo.score,
          preScore: this.state.userInfo.pre_score,
          batch: '101',
          risk: '1',
          province: 0,
          classify: 0,
          feature: 0,
          subject: '不限',
          subject_code: 0,
          public: 0
        };
      },
      set: function(value) {
      }
    },
    schConditionBox: {
      get: function() {
        return [
          {
            type: 1,
            isDisplay: this.state.userInfo.score_triger == 1,
            model: 'score',
            label: {
              title: '高考分'
            },
            attr: {
              placeholder: "请输入内容",
              value: this.state.userInfo.score,
            }
          },
          {
            type: 1,
            isDisplay: this.state.userInfo.score_triger == 0,
            model: 'preScore',
            label: {
              title: '预估分'
            },
            attr: {
              placeholder: "请输入内容",
              value: this.state.userInfo.pre_score,
            }
          },
          {
            type: 2, // select
            model: 'batch',
            label: {
              title: '批次'
            },
            props: {
              options: this.batchOptions,
              multiple: true,
              selectValue: "本科第一批"
            }
          },
          {
            type: 2,
            model: 'risk',
            label: {
              title: '风险'
            },
            props: {
              options: gsOption.riskOptions,
              selectValue: "冲刺"
            }
          },
          {
            type: 2,
            model: 'province',
            label: {
              title: '省份'
            },
            props: {
              options: this.provOptions,
              selectValue: "全国"
            }
          },
          {
            type: 2,
            model: 'classify',
            label: {
              title: '类型'
            },
            props: {
              options: gsOption.classifyOptions,
              selectValue: "不限"
            }
          },
          {
            type: 2,
            model: 'feature',
            label: {
              title: '特色'
            },
            props: {
              options: gsOption.featureOptions,
              selectValue: "不限"
            }
          },
          {
            type: 1,
            model: 'subject',
            label: {
              title: '专业'
            },
            class: {
              'subject-item': true,
            },
            attr: {
              value: this.subjectBoxVal,
              readonly: true,
              placeholder: "请输入内容"
            }
          },
          {
            type: 2,
            model: 'public',
            label: {
              title: '公办'
            },
            props: {
              options: [{label: '是', value: 1}, {label: '否', value: 2}],
              selectValue: "不限"
            }
          }
        ];
      }
    }    
  },

  created: function () {
    let vm = this;
    const PUBLIC_CDN_DOMAIN = this.state.PUBLIC_CDN_DOMAIN;
    const province_url = this.state.province;
    axiosPublicRes.get(PUBLIC_CDN_DOMAIN + '/json/provincejson.json')
      .then(function (response) {
        vm.provOptions = response.data;
      })
  },

  methods: {
    checkTarget: function(el) {
      let parent = getParents(el.target, 'subject-item');
      if (parent && parent.innerText.indexOf('专业') >= 0) {
        this.showPrfsModal = true
      }
    },
    searchCoolege: function () {
      this.$emit('leftSchSearch', this.searchItem)
    },
    subSelected: function (data) {
      this.subjectBoxVal =  data.name;
      this.searchItem.subject = data.name;
      this.searchItem.subject_code = data.code;
    },
    postScore: function (el) {
      const userInfo = this.state.userInfo;
      const province_url = userInfo.province ? userInfo.province : 'sc'
      let reg = /^[1-9]?[0-9]?[0-9]?$/; // 匹配不超过三位数的数字
      let score = el.target.value;
      if (score && reg.test(score) && score < 750 && score > 150) {
        if (userInfo.score_triger == 1 && userInfo.score === score) {
          return;
        }   
        axios({
          method: 'post',
          url: `/asypc/${province_url}/score/set`,
          data: {
            xscore: score,
          },
        })
        .then(function (response) {
          let res = response.data;
          if (res.status === 1) {
            if (userInfo.score_triger == 1) {
              // userInfo.score = score;
              store.setUserInfoAction({score});
              el.target.setAttribute('readonly', 'readonly');
            } else {
              // userInfo.pre_score = score;
              store.setUserInfoAction({pre_score: score})
            }
          }
          if (res.status === -1) {
            vm.$alert(res.msg, '', {
              confirmButtonText: '确定'
            })
            return;
          }
          // 超时登陆
          if (res.status === -2) {
            OverTime(vm, res.msg);
            return;
          }
          // 手机端输入同步
          if (res.status === -3) {
            if (userInfo.score_triger == 1) {
              // userInfo.score = res.score;
              store.setUserInfoAction({score: res.score})
              el.target.setAttribute('readonly', 'readonly');
            } else {
              // userInfo.pre_score = res.score;
              store.setUserInfoAction({pre_score: res.score})
            }
            el.target.value = res.score;
          }
        })
      }
    },

  }
}
</script>

<style>
  .index-left-panel {
    padding: 22px 0px 20px;
    background-color: #fff;
  }
  .search-item-pane {
    position: relative;
  }
  .left-pane .search-input {
    padding: 10px 15px;
    background-color: #f8f9fa;
  }
  .left-pane .search-input .el-input--suffix .el-input__inner {
    padding-right: 40px;
  }
  .left-pane .search-input .el-input__icon {
    font-size: 1.5rem;
    width: 35px;
  }
  .left-pane .search-item-content {
    padding: 0px 15px;
  }
  .left-pane .search-item-content .el-input-group__prepend,
  .left-pane .search-item-content .zs-select-title{
    background-color: #f5f7fa;
    font-size: 0.9rem;
    color: #909399;
    width: 4rem;
    padding: 0;
  }
</style>