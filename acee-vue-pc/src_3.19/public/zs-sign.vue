<template>
<div class="zs-sign">
  <header>
    <div class="top-title" style="padding-top: 10px;">
      哲升志愿通
    </div>
    <div class="top-sub-title">
      哲升教育科技
    </div>
  </header>
  <div class="main-content">
    <div class="login-content">
      <el-row type="flex" justify="center">
        <el-col :xs="19" :sm="11" :md="7" class="qr-sign">
          <p>微信扫码登陆</p>
          <el-row type="flex" justify="center" v-show="showLoading" style="top: 0;">
            <el-col style="width: max-content;">
              <el-button circle :loading="true"></el-button>
            </el-col>
          </el-row>
          <img :src="Qr_URL" alt="二维码" v-show="!showLoading">
        </el-col>
        <el-col class="sign-gutter hidden-xs-only">
        </el-col>
        <el-col :xs="19" :sm="11" :md="7" class="account-sign">
          <div class="account-content center">
            <p>卡号密码登陆</p>
            <div class="account-input">
              <el-input size="large" placeholder="请输入账号" suffix-icon="el-icon-edit" v-model="userAccount">
              </el-input>
              <el-input size="large" placeholder="请输入密码" suffix-icon="el-icon-edit" v-model="userPassword">
              </el-input>
              <el-button type="primary" v-on:click="userLand">登陆</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <footer style="z-index: -1;">
    <div class="copy-right">
      <div>Copyright © 2018 哲升教育科技（成都）有限公司</div>
      <div>备案号：蜀ICP备150023123号-6</div>
    </div>
  </footer>
</div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
// import {
//   prvnCodeToStr
// } from '@/utils/index';
export default {
  name: 'zsSign',
  data () {
    return {
      userAccount: null,
      userPassword: null,
      userInfo: store.state.userInfo,
      Qr_URL: '/', // 二维码地址
      showLoading: true // 加载的过度动画
    }
  },
  methods: {
    click: function () {
      
    },
    userLand: function () {
      let vm = this;
      let {
        userAccount,
        userPassword
      } = this;
      if (!userAccount || !userPassword) {
        vm.$alert('', '请输入账号密码');
        return;
      }
      axios.post('/com/login', {
        account: userAccount,
        password: userPassword
      })
        .then(res => {
          res = res.data;
          if (res.status === 1) {
            store.setUserInfoAction(res); // 存储个人信息
            if (res.data.login === 1) {
              store.setUserInfoAction({province: res.data.province});
              // store.setUserProvinceAction(res.data.province);
              this.$router.push({
                path: `/${res.data.province}/index`
              });
            } else {
              store.setUserInfoAction = {enroll_year: res.data.year};
              this.$router.push({
                path: '/writeInfo'
              }); // 跳转身份信息输入页面
            }
          }
          if (res.status === -1) {
            vm.$alert(res.msg, '注意');
          }
        })
        .catch(error => console.error(error));
    },
    getQRimg: function () {
      return new Promise((resolve, reject) => {
        axios.post('/com/qrcode')
          .then(res => {
            res = res.data;
            if (res.status === 1) {
              this.showLoading = false;
              this.Qr_URL = res.Qr_URL;
              resolve('success');
            }
            if (res.status === -1) {
              reject(new Error('fail'));
            }
          })
          .catch(error => console.error(error));
      });
    },
    qrSetTime: function () {
      this.getQRimg().catch(() => {
        setTimeout(() => {
          this.getQRimg()
        }, 5000);
      });
    },
    QrCodeLogin: function () {
      let loginInter = setInterval(() => {
        axios({
          method: 'get',
          url: '/com/qr/login'
        })
          .then (function(response) {
            let res = response.data;
            if (res.status === 1) {
              clearInterval(loginInter);
              store.setUserInfoAction(res);
              // store.setUserProvinceAction(res.data.province);
              this.$router.push({
                path: `/${res.data.province}/index`
              });
              clearInterval(loginInter);
            }
            if (res.status === -1) {}
          })
        // ajax({
        //   url: '/com/qr/login',
        //   type: 'POST',
        //   dataType: 'json',
        //   data: {},
        //   success: (res) => {
        //     console.log('success');
        //     if (res.status === 1) {
        //       clearInterval(loginInter);
        //       store.setUserInfoAction(res);
        //       store.setUserProvinceAction(res.data.province);
        //       this.$router.push({
        //         path: `/${res.data.province}/index`
        //       });
        //       clearInterval(loginInter);
        //     }
        //     if (res.status === -1) {}
        //   },
        //   error: () => {
        //     console.error('request error');
        //   }
        // });
      }, 5000);
    }
  },
  created: function () {
    this.qrSetTime();
  },
  mounted () {
    this.QrCodeLogin();
  }
}
</script>

<style type="text/css">
.zs-sign {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
}

.zs-sign header {
  box-sizing: border-box;
  width: 100%;
}

.zs-sign button {
  width: 100%;
}

.el-row--flex {
  flex-wrap: wrap;
}

.top-title {
  text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #007bff;
  font-size: 3rem;
  line-height: 5rem;
  color: #fff;
}

.top-sub-title {
  text-align: center;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  height: 2rem;
  line-height: 1rem;
}

.zs-sign .main-content {
  position: relative;
}

.zs-sign .login-content {
  position: relative;
  top: 100px;
}

.zs-sign .el-row {
  position: relative;
  top: -110px;
  box-sizing: border-box;
  padding-top: 60px;
}

.zs-sign .sign-gutter {
  box-sizing: border-box;
  width: 0px !important;
  border-left: 1px solid rgb(240, 240, 240);
}

.qr-sign {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 8%;
}

.qr-sign img {
  width: 100%;
  height: auto;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 4px;
}

.qr-sign p,
.account-sign p {
  text-align: center;
  margin: 5px 0px 15px;
}

.account-sign {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  padding-left: 8%;
}

.account-sign .account-input {
  box-sizing: border-box;
  background-color: rgb(230, 230, 230);
  padding: 40px 20px 40px;
  border-radius: 4px;
}

.account-sign .account-input input {
  margin-bottom: 20px;
}

.zs-sign footer {
  position: relative;
  top: 100px;
  box-sizing: border-box;
  font-size: 12px;
  color: rgb(140, 140, 140);
  margin-bottom: 20px;
}

@media only screen and (max-width: 767px) {

  .qr-sign,
  .account-sign {
    width: 450px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media only screen and (max-width: 500px) {

  .qr-sign,
  .account-sign {
    padding: 10px 30px;
  }
}
</style>
