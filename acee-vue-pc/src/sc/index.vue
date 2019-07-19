<template>
  <div class="sc-index clearfix" ref="page">
    <el-row type="flex">
      <el-col
       :span="4"
       :lg="4"
       :md="5"
       :sm="6"
       :xs="7"
       class="left-col">
        <div class="left-pane">
          <div class="login-box left">
            <div class="login-box-img">
              <img :src="state.DOMAIN + '/img/pc_logo.jpg'" alt="">
            </div>
            <div  class="left-pane-content">
              <router-view name="index-left-panel" @leftSchSearch ="searchCollege"></router-view>
              <router-view name="zs-left-panel"></router-view>
            </div>
          </div> 
        </div>
      </el-col>
      <el-col
       :span="20"
       :lg="20"
       :md="19"
       :sm="18"
       :xs="17"
       class="right-col">
        <div class="right-pane" style="justify-content: flex-end;">
          <zs-menu 
          :default-active="{index: '2'}"
           :menu-data="testData"  
           mode="horizontal"
           background-color="#2fdab8" 
           text-color="#fff"
           @item-click="navItemClick"
           ></zs-menu>
          <div class="page-content">
            <router-view name="index-right-panel" :postCollegeDat="postCollegeDat"></router-view>
            <router-view name="zs-right-panel"></router-view>
          </div>
        </div>
      </el-col>
    
   
    </el-row>

    <el-dialog
     title="修改密码"
     :visible.sync="dialogShow.showModifyPw"
     class="modifyPassword">
      <div>
        <p class="modify-node">请输入新密码:</p>
        <el-input placeholder="请输入内容" v-model="password.one" type="password">
          <template slot="prepend">密码</template>
        </el-input>
        <p class="modify-node">请再次输入密码:</p>
        <el-input placeholder="请输入内容" v-model="password.two" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>;
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow.showModifyPw = false;">取 消</el-button>
        <el-button type="primary" @click="modifyPassword">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>

<script type="text/javascript">
import {getParents} from '@/utils/dom.js';
import {OverTime} from '@/utils/util.js';
import {navMixin} from '@/mixins/nav-mixin.js';
import store from '@/store/index.js'

export default {
  name: 'scIndex',

  mixins: [navMixin],

  data () {
    return {
      state: store.state,
      compareSchList: store.state.compareSchList,
      province_url: store.state.userInfo.province ? store.state.userInfo.province : 'sc',
      showloading: false,
      dialogShow: {
        showModifyPw: false,
      },
      postCollegeDat: {
        batch: 101,
      },
      password: {
        one: null,
        two: null
      },
      testData: [
        {
          type: 'brand', 
          title: '欢迎使用哲升志愿通', 
          props: {
            index: '1',
          },
        },
        {
          type: 'item', 
          title: '首页', 
          props: {
            index: '2',
            route: '/sc/index',
          },
        },
        {
          type: 'item', 
          title: '帮助文档', 
          props: {
            index: '4',
            route: '/sc/help'
          },
        },
        // {
        //   type: 'item', 
        //   title: '测评', 
        //   props: {
        //     index: '5',
        //     route: '/evaluation/holland'
        //   },
        // },
        {
          type: 'item', 
          title: '修改密码',
          class: {
            'modify-pw-nav': true
          },
          props: {
            index: '6',
          },
        },
        {
          type: 'item', 
          title: '退出登录', 
          class: {
            'sign-out-nav': true
          },
          props: {
            index: '7',
          },
        },
      ]
    }
  },

  methods: {
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
    navItemClick: function(el) {
      if (el.$el.className.indexOf('sign-out-nav') >= 0) {
        console.log('??', this.signOut)
        this.signOut()
      }

      // 修改密码
      if (el.$el.className.indexOf('modify-pw-nav') >= 0) {
        this.dialogShow.showModifyPw = true;
      }
    },
    modifyPassword: function() {
      const vm = this;
      const {province_url} = this;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/;
      if (vm.password.one !== vm.password.two) {
        return this.$alert('请确认两次输入的密码是否一致', '注意', {
          confirmButtonText: '确认'
        });
      }
      if (!vm.password.one || !vm.password.two) {
        return this.$alert('密码输入不能为空', '注意', {
          confirmButtonText: '确认'
        });
      }
      if (!reg.test(vm.password.one)) {
        return this.$alert('请输入6到8位数长度且仅包含数字和字母的密码', '注意', {
          confirmButtonText: '确认'
        });
      }
      axios({
        method: 'post',
        url: `/${province_url}/change/psw`,
        data: {
          password: vm.password.one
        }
      })
      .then(function (response) {
        let res = response.data;
        if (res.status == 1) {
          vm.$alert('密码修改成功', '', {
            confirmButtonText: '确认',
            callback: action => {
              vm.dialogShow.showModifyPw = false;
            }
          });
        } else {
          vm.$alert(res.msg, '', {
            confirmButtonText: '确认',
          });
        }
      })
    },

    searchCollege: function(searchItem) {
      const vm = this;
      const userInfo = this.state.userInfo
      let reg = /^[1-9]?[0-9]?[0-9]?$/; // 匹配不超过三位数的数字

      if (userInfo.score_triger === 0) {
        if (!searchItem.preScore || !reg.test(searchItem.preScore) || searchItem.preScore > 750 || searchItem.preScore < 150) {
          return this.$alert('请输入150~750之间的分数', '注意', {
            confirmButtonText: '确定'
          })
        }
      } else {
        if (!searchItem.score || !reg.test(searchItem.score) || searchItem.score > 750 || searchItem.score < 150) {
          return this.$alert('请输入150~750之间的分数', '注意', {
            confirmButtonText: '确定'
          })
        }
      }

      vm.postCollegeDat = {
        college_name: searchItem.schoolName,
        province_code: searchItem.province,
        classify: searchItem.classify,
        batch: searchItem.batch,
        subject: searchItem.subject_code,
        feature: searchItem.feature,
        score_range: 0,
        position: searchItem.position,
        // category: searchItem.category,
        xscore: store.state.userInfo.score_triger == 1?searchItem.score:searchItem.preScore,
        risk: searchItem.risk,
        public: searchItem.public,
      };

      console.log('searchItem', searchItem);
      console.log(vm.postCollegeDat)
    },
  },

}
</script>

<style type="text/css">
  /*utils class*/
  .fgrow {
    flex-grow: 1 !important;
  }
  .fwrap{
    flex-wrap: wrap !important;
  }
  .sch-width {
    min-width: 140px;
    max-width: 200px;
  }
  @media screen and (min-width: 900px) {
    .line-btn-maxW {
      max-width: 300px;
    }
  }
  .clearfix:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  .bg-light {
    background-color: #f8f9fa !important;
  }
  .gutter {
    height: 100%;
    width: 1px;
    background: linear-gradient(to bottom, transparent 0%, rgb(220, 220, 220) 30%, rgb(210, 210, 210) 50%,
      rgb(220, 220, 220) 70%, transparent 100%);
  }
  .height_1 {
    height: 100% !important;
  }
  .py-1 {
    padding: 0px 1rem !important;
  }
  .mb-2 {
    margin-bottom: 2rem !important;
  }
  .mt-2 {
    margin-top: 2rem !important;
  }
  .my-2 {
    margin: 2rem 0px !important;
  }
  .loading-icon {
    font-size: 2rem;
  }
  .el-message-box__wrapper {
    overflow: scroll !important;
  }


  /*index页面*/
  .sc-index {
    box-sizing: border-box;
    position: relative;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    padding-right: 4px;
  }
  .sc-index>.el-row {
    height: 100%;
  }
  .sc-index>.el-row>.left-col {
    align-items: stretch;
  }
  .sc-index>.el-row>.right-col {
    height: 100%;
  }
  .sc-index .el-input.is-disabled .el-input__inner {
    color: #636569;
  }
  /*左面搜索面板*/
   .sc-index .left-col {
  height: 100%;
    box-sizing: border-box;
    min-width: 170px;
   }
  .sc-index .left-pane {
    box-sizing: border-box;
    position: relative;
    padding-right: 20px;
    height: 100%;
  }
  .sc-index .left-pane .login-box {
    background-color: #fff;
    margin: 0 0 0 0px; 
    padding: 0;
    height: 100%;
  }
  .sc-index .left-pane .login-box-img {
    width: 100%;
    height: 4rem;
    background-color: #f8f9fa !important;
  }
  .sc-index .left-pane .login-box-img img {
    width: auto;
    height: 100%;
    display: table;
    margin: 0 auto; 
    padding: 0.5rem 0;
  }
  .sc-index .left-pane .left-pane-content {
      height: calc(100% - 4rem);
  background-color: #fff;
  overflow: hidden auto;
  }

 /* .sc-index .left-pane .left-pane-content::-webkit-scrollbar {
    width: 5px;
    background-color: #fff;
  }

  .sc-index .left-pane .left-pane-content::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dbdee0;
  }*/
  
  /*右面显示面板*/
  .sc-index .right-col {
    box-sizing: border-box;
    min-width: 330px;
   }
  .sc-index .right-pane {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #eceff1;
  }
  .sc-index .page-content {
    height: calc(100% - 6rem);
    position: relative;
    border-top:1px solid transparent
  }  
  .sc-index .doctor-master .el-dialog__footer {
    text-align: center;
  }
  .sc-index .modifyPassword .modify-node {
    padding: 14px 0px;
    font-size: 1rem;
    text-align: left;
  }
  .sc-index .modifyPassword .el-input {
    padding-left: 10px;
  }
  
  @media screen and (max-width: 768px) {
    .sub-detail.el-dialog__wrapper .el-dialog,
    .sch-compare .el-dialog{
      width: 80%;
    }
  }
  @media screen and (min-width: 768px) {
    .sub-detail.el-dialog__wrapper .el-dialog,
    .sch-compare .el-dialog {
      width: 70%;
    }
  }
  @media screen and (min-width: 992px) {
    .sub-detail.el-dialog__wrapper .el-dialog,
    .sch-compare .el-dialog {
      width: 60%;
    }
  }

  .right-pane .zs-nav li:nth-of-type(1) {
    position: absolute;
    left: 0;
  }

</style>