<!-- 
/**
 * @author 柳婷婷
 * @createDate 2018-09-27
 *@file .vue文件 表格组件，需父组件传递的参数有tableData、colnum
 *@param {Array} tableData - prop参数，父组件传参
 *@param {string}  label 表头信息
 *@param {string}  value 数据
 *@param {Boolean}  click 单元格是否添加点击事件 true:添加
 *@param {string}  class 单元格的类名
 *@param {string}  id 单元格的id
 *@param {number} colnum 一行显示多少单元格
 */
 数据格式： 
 [
  {
   label: string,
   value: string,
   click: Boolean,
   class: string,
   id: string
  }
 ]
 -->
<template>
  <div class="el-table-zs">
    <div class="el-tr-item" v-for="(value, key) in dataConver" :key="tableId + '_' + key">
      <template v-for="(item, index) of value">
        <div
        v-if="!item.click"
        class="el-tr-group" :key="tableId + '_' + key + index"
        :class="[item.class ? item.class : '']"
        :id="[item.class ? item.class : '']">
          <div class="el-th">{{item.label}}</div>
          <div class="el-td">{{item.value}}</div>
        </div>
        <div
        v-else
        class="el-tr-group look-cell" :key="tableId + '_' + key + index"
        :class="[item.class ? item.class : '']"
        :id="[item.class ? item.class : '']"
        @click="handleClick">
          <div class="el-th">{{item.label}}</div>
          <div class="el-td">{{item.value}}</div>
        </div>
      </template>
      
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'zsTable',
  
  data () {
    return {
      tableId: Math.round(Math.random() * 100000),
      // dataConver: null,
      width: 452
    }
  },
  props: {
    tableData: Array,
    colnum: {
      type: Number,
      default: null
    }
  },
  computed: {
    dataConver: function() {
      let {tableData, width} = this;
      let data = {0: []};
      let dataIndex = 0;
      let colnum;
      if (!this.colnum) {
        colnum = Math.round(width / 90); // 列数
      } else {
        colnum = this.colnum; // 规定的列数
      }
      for (let index in tableData) {
        if ( parseInt(index) % parseInt(colnum) === 0 ) {
          dataIndex++;
          data[dataIndex] = [];
        }
        data[dataIndex].push(tableData[index]);
      }
      if (data[dataIndex].length !== parseInt(colnum)) {
        let len = parseInt(colnum) - data[dataIndex].length;
        let concatArr = [];
        for (let i = 0; i < len; i++) {
          concatArr.push({label: '', value: ''});
        }
        data[dataIndex] = data[dataIndex].concat(concatArr)
      }
      return data;
    }
  },
  

  // watch: {
  //   width: function () {
  //     let {tableData, width} = this;
  //     let data = {0: []};
  //     let dataIndex = 0;
  //     let colnum;
  //     if (!this.colnum) {
  //       colnum = Math.round(width / 90);
  //     } else {
  //       colnum = this.colnum;
  //     }
  //     for (let index in tableData) {
  //       if ( parseInt(index) % parseInt(colnum) === 0 ) {
  //         dataIndex++;
  //         data[dataIndex] = [];
  //       }
  //       data[dataIndex].push(tableData[index]);
  //     }
  //     if (data[dataIndex].length !== parseInt(colnum)) {
  //       let len = parseInt(colnum) - data[dataIndex].length;
  //       let concatArr = [];
  //       for (let i = 0; i < len; i++) {
  //         concatArr.push({label: '', value: ''});
  //       }
  //       data[dataIndex] = data[dataIndex].concat(concatArr)
  //     }
  //     this.dataConver = data;
  //   }
  // },
  mounted: function () {
    const vm = this;
    this.width = this.$el.parentNode.clientWidth || this.width;
    window.addEventListener('resize', function () {
      vm.width = vm.$el.parentNode.clientWidth || vm.width;;
      window.removeEventListener('resize',()=>{});
    })
  },
  methods: {
    handleClick: function (event) {
      this.$emit('click', event);
    },
  }
}
</script>

<style type="text/css">
  .el-table-zs {
    display: inline-table;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    font-size: 12px;
    color: #aaa;
    border: 1px solid rgb(240 240 240);
    border-right: 0px;
    background-color: #fff; 
  }
  .el-table-zs .el-tr-item {
    display: table-row;
    box-sizing: border-box;
    width: 100%;
  }
  .el-table-zs .el-tr-item .el-tr-group {
    box-sizing: border-box;
    display: table-cell;
    border-right: 1px solid rgb(240 240 240);
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
  }
  .el-table-zs .el-tr-item .el-tr-group .el-th {
    background-color: #f0f9ff;
    color: #38b1ff;
  }
  .el-table-zs .el-tr-item .el-tr-group .el-th,
  .el-table-zs .el-tr-item .el-tr-group .el-td {
    box-sizing: border-box;
    height: 23px;
    padding: 3px 16px;
  }
  .el-table-zs .el-tr-item .el-tr-group.look-cell {
    cursor: pointer;
  }
  .el-table-zs .el-tr-item .el-tr-group.look-cell .el-td {
    color: #FF6600;
  }
</style>