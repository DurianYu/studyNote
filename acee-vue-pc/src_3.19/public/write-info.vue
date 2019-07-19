<template>
<el-row type="flex" justify="center" class="write-info">
  <el-col :span="7" :xs="4" :sm="6" :md="7">
  </el-col>
  <el-col :span="9" :xs="16" :sm="12" :md="9">
    <div>
      <zs-select :options="provinceData" placeholder="请选择" v-model="provinceVal">
        省份
      </zs-select>
      <zs-select :options="[{value: 1, label: '文科'}, {value: 2, label: '理科'}]" placeholder="请选择" v-model="artScience">
        文理科
      </zs-select>
      <zs-select :options="getYear" placeholder="请选择" v-model="yearValue">
        毕业年份
      </zs-select>
      <el-row type="flex" justify="end">
        <el-col :span="12" :xs="8" :sm="10" :md="11"></el-col>
        <el-col :span="12" :xs="16" :sm="14" :md="13">
          <el-button type="success" @click.stop="comeBack">返回</el-button>
          <el-button type="primary" @click.stop="submitMess">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </el-col>
  <el-col :span="8" :xs="4" :sm="6" :md="8">
  </el-col>
</el-row>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
import zsSelect from '@/components/zs-select.vue'
import {
  prvnCodeToStr
} from '@/utils/convert';
export default {
  name: 'writeInfo',
  data () {
    return {
      provinceVal: null,
      artScience: null,
      yearValue: null,
      userInfo: store.state.userInfo,
      provinceData: [
        {
          value: '510000',
          label: '四川'
        },
        {
          value: '620000',
          label: '甘肃',
          disabled: true
        },
        {
          value: '530000',
          label: '云南',
          disabled: true
        },
        {
          value: '520000',
          label: '贵州',
          disabled: true
        },
        {
          value: '500000',
          label: '重庆',
          disabled: true
        }
      ]
    }
  },
  computed: {
    getYear () {
      let graduateYear = this.userInfo.enroll_year;
      let year = [];
      let maxYear = parseInt(graduateYear);
      for (let i = 0; i < 4; i++) {
        year.push({
          label: `${maxYear - i}年`,
          value: maxYear - i
        })
      }
      return year;
    }
  },
  methods: {
    comeBack: function () {
      this.$router.back();
    },
    submitMess: function () {
      let {
        userInfo,
        provinceVal,
        artScience,
        yearValue
      } = this;

      axios({
        method: 'post',
        url: `/asypc/${userInfo.province}/regist`,
        data: {
          province_code: provinceVal,
          category: artScience,
          graduate_year: yearValue
        }
      })
        .then(function (response) {
          let res = response.data;
          if (res.status === 1) {
            store.setUserInfoAction(Object.assign({}, userInfo, res.data));
            // store.setUserProvinceAction(prvnCodeToStr(provinceVal));
            this.$router.push({
              path: `/${prvnCodeToStr(provinceVal)}/index`
            });
          }
          if (res.status === -1) {
            this.$alert(res.msg, '注意', {
              confirmButtonText: '确定'
            });
          }
        })
      // ajax({
      //   url: `/asypc/${userInfo.province}/regist`,
      //   type: 'POST',
      //   dataType: 'json',
      //   data: {
      //     province_code: provinceVal,
      //     category: artScience,
      //     graduate_year: yearValue
      //   },
      //   success: (res) => {
      //     if (res.status === 1) {
      //       store.setUserInfoAction(Object.assign({}, userInfo, res.data));
      //       store.setUserProvinceAction(prvnCodeToStr(provinceVal));
      //       this.$router.push({
      //         path: `/${prvnCodeToStr(provinceVal)}/index`
      //       });
      //     }
      //     if (res.status === -1) {
      //       this.$alert(res.msg, '注意', {
      //         confirmButtonText: '确定'
      //       });
      //     }
      //   },
      //   error: () => {
      //     console.error('request error');
      //   }
      // });
    }
  },
  components: {
    zsSelect
  }
}
</script>

<style type="text/css">
.write-info {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  font-size: 16px;
  background-color: #d6d6d6;
}

.write-info>.el-col {
  box-sizing: border-box;
  position: absolute;
  top: 30%;
}

.write-info .el-col button {
  width: calc(45% - 20px);
  font-size: 1rem;
  margin: 20px 10px 0px;
}

.write-info .zs-select {
  margin: 10px 0px;
}

@media screen and (max-width: 767px) {
  .write-info {
    font-size: 12px;
  }

  .write-info .el-col button {
    font-size: 12px;
    padding: 10px 5px;
    width: calc(45% - 10px);
    margin: 20px 5px 0px;
  }
}
</style>
