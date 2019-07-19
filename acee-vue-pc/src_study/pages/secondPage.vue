<template lang="html">
    <el-row id="sec_page" type="flex"  justify="center" style="margin: 16px 0 64px 0;">
      <el-col :span="8">
        <el-card>
        <img src="@/assets/logo.png" class="image">
        <div class="under-text">
          <div v-loading="loading"></div>
          <transition
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
          >
          <div v-if="!loading">{{ res_msg }}</div>
          </transition>
          <a href="#" v-if="!loading" style="fontSize: 14px; color: #ccc;">{{ cur_date }}</a>
        </div>
        <bilinear
        :data="chartData"
        :width="'146px'"
        :height="'106px'"
        />
        <el-row>
          <el-col class="" :span="8" v-for="v of chart" :key="v">
            {{ v }}
            <ve-line
            :data="v.chartData"
            :extend="v.extend"
            :settings="settings"
            :width="'146px'"
            :height="'96px'"
            />
          </el-col>
        </el-row>
      </el-card>
      </el-col>
    </el-row>
</template>

<script>
import Bilinear from '@/components/bilinear'
import {
  global_data
} from '@/function/global'

import {
  bilinearData
} from '@/mixin/bilinear.js'
import {
  modifyMinValue
} from '@/function/bilinear-handle'

export default {
  mixins: [bilinearData],
  components: {
    bilinear: () =>
      import('@/components/bilinear')
  },
  data() {
    return {
      loading: true,
      res_msg: '欢迎来到第二个页面',
      cur_date: new Date(),
      chart: [],
      line: '',
      chartData: {
        columns: ['日期', '录取分', '平均分'],
        rows: [{
            '日期': '2015',
            '录取分': 0,
            '平均分': 0
          },
          {
            '日期': '2016',
            '录取分': 590,
            '平均分': 594
          },
          {
            '日期': '2017',
            '录取分': 576,
            '平均分': 581
          }
        ]
      },
      // extend: {
      //   'series.0.label': {
      //     formatter: function(p, line) {
      //       console.log('p ', p.value[1]);
      //       let m_line = modifyMinValue(line);
      //       console.log('m_line', m_line);
      //       if (m_line.zero && p.value[1] === m_line.zero) {
      //         return '无';
      //       }
      //       return p.value[1] > 0 ? p.value[1] : '无';
      //     }
      //   }
      // }
    }
  },
  created() {
    console.log('this.extend', this.extend);
    console.log('global_data', global_data);
    setTimeout(() => {
      console.log('姗姗来迟');
      let temp_chart = Object.assign({}, {
        chartData: this.chartData,
        extend: this.extend
      });
      let line1 = [0, 559, 529]; // 录取分
      let line2 = [0, 564, 539]; // 平均分
      let lineData = modifyMinValue(line1, line2);
      console.log('lineData', lineData);

      for (let i = 0, len = temp_chart.chartData.rows.length; i < len; i++) {
        temp_chart.chartData.rows[i]['录取分'] = lineData.line1.data[i];
        temp_chart.chartData.rows[i]['平均分'] = lineData.line2.data[i];
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
      this.chart.push(temp_chart);
      console.log('temp_chart', temp_chart);
      console.log('chart', this.chart);
    }, 1000);

  },
  beforeRouteEnter(to, from, next) {
    // 此时处于导航还没确认(resolve)前
    console.log('第二页面组件');
    console.log('this', this);
    next(vm => {
      console.log('vm', vm);
      console.log(from.name);
      // 这里获取了上个路由的信息
      // 异步获取
      setTimeout(() => {
        vm.res_msg = vm.res_msg + '--' + from.name;
        vm.loading = false;
      }, 1000);
    })
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        console.log('newVal', newVal); // 只向当前对象 chartData
        console.log('oldVal', oldVal); // 只向当前对象 chartData
        console.log('how can trigger?');
        console.log('bilinearData', bilinearData);
        console.log('this.$data', this.$data);
      },
      // 开启后该对象下的所有属性将进行监听
      deep: true
    }
  },
  mounted() {
    console.log(this.chartData[0].columns.splice(1, 1, '录取分'));
    console.log(this.chartData[0].columns);
  }
}
</script>

<style lang="scss">
// !default 表示该变量已经赋值则不能再被重新赋值
$coffee: #CFBFAD !default;
/* 咖啡颜色 会出现在css文件中*/
$highlight-border: solid 1px $coffee; // 高亮border，这种注释不会出现在打包后的css文件中
$com-transition: all 0.2s ease-in-out;
@mixin img-border {
    border: $highlight-border;
    padding: 0.25rem;
    border-radius: 0.25rem;
}
.nav-background {
    background: #fdd;
}
.nav-background a {
    background: aqua;
}
#sec_page {
    div {
        // 真正的局部变量，less是没有局部变量的
        $width: 120px;
        color: $coffee;
    }
    .under-text {
        // background: lightyellow;
        // 继承的方式， 有则使用当前的值，没有就使用继承的值
        // 继承包括.nav-background a {}这个类，继承的类下面的 a 标签也会被渲染
        @extend .nav-background;
    }
    .image {
        background: lightyellow;
        // 继承的方式， 有则使用当前的值，没有就使用继承的值
        @extend .nav-background;
        transition: $com-transition;
        // 混合写入的css
        @include img-border;
        // 自上而下，覆盖了原先设置的padding属性
        padding: 16px;
        &:hover {
            border-color: skyblue;
        }
        &:active {
            transform: scale3d(.9, .9, .9);
        }
    }
}
</style>
