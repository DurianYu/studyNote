<template>
  <div class="index-left-panel">
    <ul class="list-group inset search-item-pane">
      <!-- <div class="search-input">
        <el-button
         type="primary" 
         @click="searchCoolege"
         style="width: 100%; margin: 10px 0px"
         >搜索</el-button>
        <el-input
        placeholder="请输入学校"
        v-model="searchItem.schoolName">
        </el-input>
      </div>
      <div class="search-item-content">
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
        
<!--       <zs-base-group
         class="search-input"
         :data="schSearchBox"
         :model.sync="searchItem"
         @btn-click="searchCoolege">
      </zs-base-group> -->




       <div class="search-input" style="padding-bottom: 7px">
        <el-button
         type="primary" 
         @click="searchCoolege"
         style="width: 100%; margin: 10px 0px"
         >搜索</el-button>
        <el-input
        placeholder="请输入学校名字"
        v-model="searchItem.schoolName">
        </el-input>
      </div>





      <div style="padding: 0 15px">
        <template v-if="state.userInfo.score_triger">
          <template v-if="xscore_condition">
            <el-input placeholder="请输入内容"
            disabled
            type="tel"
            maxlength="3"
            v-model="xscore_val"
            @blur="editScore">
              <template slot="prepend">高考分</template>
            </el-input>
          </template>
          <template v-else>
            <el-input placeholder="请输入内容"
            type="tel"
            maxlength="3"
            v-model="xscore_val"
            @blur="editScore">
              <template slot="prepend">高考分</template>
            </el-input>
          </template>          
        </template>
        <template v-else>
          <el-input placeholder="请输入内容"
            type="tel"
            maxlength="3"
          v-model="xscore_val"
          @blur="editScore">
            <template slot="prepend">预估分</template>
          </el-input>         
        </template>
        






      </div>

      <zs-base-group
       class="search-item-content"
       :data="schConditionBox"
       :model.sync="searchItem"
       @input-click="checkTarget">
      </zs-base-group>
    </ul>
    <prfs-search
    :width="'85%'"
     :prfsModal.sync="showPrfsModal"
     :major.sync="major"
     :closeOnClickModal="true"
     @getSelected="subSelected"
    />
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import * as util from '@/utils/util.js';
import {getParents} from '@/utils/dom.js';
import * as gsOption from '@/utils/sch-search-option.js';
export default {
  name: 'indexLeftpanel',

  data() {
    return {
      // xscore_condition: '', // 默认不锁定修改分数
      searchItem: {
        schoolName: null,
        score: store.state.userInfo.score,
        preScore: store.state.userInfo.pre_score,
        batch: '101',
        risk: '1',
        province: 0,
        classify: 0,
        feature: 0,
        subject: '不限',
        subject_code: 0,
        public: 0
      },
      state: store.state,
      province_url: store.state.userInfo.province ? store.state.userInfo.province : 'sc',
      xscore_val: store.state.userInfo.score_triger ? store.state.userInfo.score : store.state.userInfo.pre_score, // 预估分 录取分
      major: true,
      local_sch_name: '', // 搜索的学校名字
      subjectBoxVal: '不限',
      showPrfsModal: false,
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
        {label: "本科", options: [
            {value: "101", label: '本科第一批'},
            {value: "102", label: '本科第二批'}
          ]
        },
        {label: "专科", options: [
            {value: "130", label: '高职（专科）批'}
          ]
        },
        {label: "本科提前批", options: [
            {value: "61", label: '一本院校'},
            {value: "62", label: '二本院校'},
            {value: "11", label: '军校（一本）'},
            {value: "12", label: '军校（二本）'},
            {value: "21", label: '公安武警（一本）'},
            {value: "22", label: '公安武警（二本）'},
            {value: "31", label: '司法院校（一本）'},
            {value: "32", label: '司法院校（二本）'},
            {value: "41", label: '教育部直属师范'},
            {value: "51", label: '综合试点院校'}
          ]
        },
        {label: "专科提前批", options: [
            {value: "70", label: '定向培养士官'},
            {value: "80", label: '公安、武警院校'},
            {value: "90", label: '其他院校'}
          ]
        }
      ],
      provOptions: null,
    }
  },

  computed: {
    xscore_condition() {
     return store.state.userInfo.score_triger ? store.state.userInfo.score : store.state.userInfo.pre_score; // 预估分 录取分

    },

    schConditionBox: {
      get: function() {
        return [
          //                 {
          //   type: 1,
          //   isDisplay: this.state.userInfo.score_triger == 1,
          //   model: 'score',
          //   label: {
          //     title: '高考分'
          //   },
          //   attr: {
          //     placeholder: "请输入内容",
          //     value: this.state.userInfo.score,
          //   }
          // },
          // {
          //   type: 1,
          //   isDisplay: this.state.userInfo.score_triger == 0,
          //   model: 'preScore',
          //   label: {
          //     title: '预估分'
          //   },
          //   attr: {
          //     placeholder: "请输入内容",
          //     value: this.state.userInfo.pre_score,
          //   }
          // },
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
              selectValue: '0'
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
              selectValue: '0'
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
              options: [{label: '不限', value: '0'}, {label: '是', value: 1}, {label: '否', value: 2}],
              selectValue: '0'
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
    axiosPublicRes.get('/json/provincejson.json')
      .then(function (response) {
        vm.provOptions = response.data;
      })
  },

  watch: {
    'state.userInfo.score'() {
      this.searchItem.score = store.state.userInfo.score;
      util.getRelatedInfo.call(this, 'refresh').then(res => {});
    },
    'state.userInfo.preScore'() {
      this.searchItem.preScore = store.state.userInfo.pre_score;
      util.getRelatedInfo.call(this, 'refresh').then(res => {});
    },
  },

  methods: {
    // 修改分数
    editScore() {
      let reg = /^1[5-9]\d$|^[2-6]\d{2}$|^7[0-4]\d$|^750$/; // 匹配150到750之间的数字
      let {score_triger, pre_score, score} = store.state.userInfo;
      let cur_score = score_triger?score:pre_score;
      console.log('this.xscore_val', this.xscore_val);
      console.log('cur_score', cur_score);

      if (this.xscore_val == cur_score) return;
      if (this.xscore_val && reg.test(this.xscore_val)) {
      axios({
          url: `/${this.province_url}/score/set`,
          method: 'post',
          data: {
            xscore: this.xscore_val,
          }
          })
          .then(res => {
            res = res.data;
            console.log('success');
            if (res.status === 1) {
              store.setUserInfoAction({
                [`${score_triger?'score':'pre_score'}`]: this.xscore_val
              });
            }
            if (res.status === -1) {
              this.$alert({
                text: res.msg
              });
              return;
            }
            // 超时登陆
            if (res.status === -2) {
              util.OverTime(this, res.msg);
              return;
            }
            // 手机端输入同步
            if (res.status === -3) {
              store.setUserInfoAction({
                [`${score_triger?'score':'pre_score'}`]: this.xscore_val
              });
            }
          })
          .catch(error => {
            console.error('error', error);
          });
            
}
    },
    checkTarget: function(el) {
      let parent = getParents(el.target, 'subject-item');
      console.log(parent)
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
      let reg = /^1[5-9]\d$|^[2-6]\d{2}$|^7[0-4]\d$|^750$/; // 匹配150到750之间的数字
      let xscore = el.target.value;
      let cur_score = userInfo.score_triger?userInfo.score:userInfo.pre_score;

      if (xscore && reg.test(xscore)) {
        console.log(cur_score)
        console.log(xscore)

        if (cur_score == xscore) return; 
        axios({
          method: 'post',
          url: `/remark_dialog/${province_url}/score/set`,
          data: {
            xscore
          },
        })
        .then( response => {
          let res = response.data;
          if (res.status === 1) {
            if (userInfo.score_triger == 1) {
              // userInfo.score = score;
              store.setUserInfoAction({xscore});
              el.target.setAttribute('readonly', 'readonly');
            } else {
              // userInfo.pre_score = score;
              store.setUserInfoAction({pre_score: xscore})
            }
          }
          if (res.status === -1) {
            this.$alert(res.msg, '', {
              confirmButtonText: '确定'
            })
            return;
          }
          // 超时登陆
          if (res.status === -2) {
            util.OverTime(vm, res.msg);
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
    padding: 0;
    background-color: #fff;
  }
  .search-item-pane {
    position: relative;
  }
  .left-pane .search-input {
    padding: 0 15px;
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