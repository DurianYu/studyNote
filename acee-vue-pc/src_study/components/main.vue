<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="12">
        <img  :src="img_src" :alt="img_alt">
      </el-col>
      <el-col :span="12">
        <div class="center">
          <ve-bar :data="chartData" width='400px' class="center"></ve-bar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Rmain',
  components: {
  },
  data () {
    return {
      img_src: '',
      img_alt: '',
      center: {
        'text-align': 'center',
        'display': 'inline-block'
      },
      chartData: {
        columns: ['日期', '销售额'],
        rows: [{
          '日期': '1月1日',
          '销售额': 123
        },
        {
          '日期': '1月2日',
          '销售额': 1223
        },
        {
          '日期': '1月3日',
          '销售额': 2123
        },
        {
          '日期': '1月4日',
          '销售额': 4123
        },
        {
          '日期': '1月5日',
          '销售额': 3123
        },
        {
          '日期': '1月6日',
          '销售额': 7123
        }
        ]
      }
    }
  },
  created () {
    axios.get(`${store.state.PUBLIC_CDN_DOMAIN}/json/provincejson.json`)
      .then((res) => {
        console.log(res);
        console.log(res.data[9].name);
        /* 直接填在template是可以识别的，因为在编译template的时候进行了处理，
         但是用js进行注入的话，template已经编译好了，所以注入进去没有程序处理，
         就显示不了图片 */
        // @ 和 ./ 开头的 资源url 会被当作模块依赖进行处理，所以要用require()才能请求到数据
        this.img_src = require('@/assets/logo.png');
        // static文件夹是不经过webpack处理的，所以可以直接引用
        this.img_src = '/static/img/ljqr.jpg';
        this.img_alt = `${res.data[9].name}-最棒`;
        console.log('creted_this', this);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
</script>

<style lang="css" scoped>
.center {
  text-align: center;
  display: inline-block;
}
</style>
