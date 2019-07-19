<template lang="html">
  <div class="mgr-jg" ref="mgr-jg" style="height: -webkit-fill-available;">
    <el-table
      class="classrom-table"
      :height="h_table"
      :data="_main_ary"
      style="width: 100%">
      <el-table-column
        prop="cover_img"
        label="封面"
        width="180"
        >
        <template slot-scope="scope">
          <img :src="scope.row.cover_img" alt="封面" style="height: 100px; width: 160px;">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="introduce"
        label="介绍"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row, cur_page_num)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-out-box">
      <el-card class="box-card">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="20"
            :total="total"
            :pager-count="11"
            :current-page.sync="cur_page_num"
            @current-change="pageChg"
            >
          </el-pagination>
      </el-card>
    </div>

    <el-dialog
    ref="edit-dialog"
    custom-class="jg-edit-dialog"
    :modal="false"
    :visible.sync="edit_dialog"

     >
     <component
     :is="eidt_cmpt_name"
     v-if="edit_dialog"
     @eiit-success="renderEdit"
     >
     </component>
    </el-dialog>

  </div>
</template>

<script>
import store from '@/store/index.js';
import {
  OverTime
} from '@/utils/util.js';
export default {
  components: {
    JgCre: () =>
      import('@/jg/manage/jg-create'),
  },
  data() {
    return {
      edit_dialog: false, // 编辑内容时 启用的dialog
      eidt_cmpt_name: '', // 编辑时 启用的组件名字
      total: 1000, // 一共多少条数据
      cur_page_num: 1, // 当前页面的页码, 初始为第一页
      h_table: '1px', // 表格的高度
      cur_category: '0', // 当前栏目的实际值
      main_ary: '', // 存储所有页面加载过的机构数据
      _main_ary: '', // 存储当前页面的机构数据
    }
  },
  computed: {
    jg_info: () => store.state.jg_info,
  },
  methods: {
    // 编辑成功时， 渲染编辑内容
    renderEdit(info) {
      this.edit_dialog = false;
      let id = info.id;
      // 找到在数组中的位置
      let index = this.getIndex(id);
      // 执行更改
      this.main_ary[index] = info;
      // 渲染
      this.renderMain({
        category: this.cur_category
      }, this.cur_page_num);
    },
    // 页码改变时触发
    pageChg(val) {
      console.log(val);
      this.renderMain({
        category: this.cur_category
      }, this.cur_page_num);
    },
    // 切换栏目时触发
    categoryChg(val) {
      this.renderMain({
        category: this.cur_category
      }, this.cur_page_num, 'reset');
    },
    // 查找机构数据的位置
    getIndex(id) {
      let index = '';
      for (let i = 0, len = this.main_ary.length; i < len; i++) {
        if (String(this.main_ary[i].id) === String(id)) {
          index = i;
        }
      }
      return index;
    },
    // 渲染时初始化相关参数
    initSet() {
      // 数据条数初始化
      for (let i = 0, len = res.total; i < len; i++) {
        this.main_ary[i] = '';
      }
    },
    // 保存点击的机构信息到全局变量
    saveInfo(id) {
      let index = this.getIndex(id);
      store.setClassroomInfoAction(this.main_ary[index]);
      return this.jg_info;
    },
    // 渲染机构列表
    renderMain(info, page_num, reset) {
      // 标签页从1开始，减一得对应数组下标
      page_num = page_num - 1;
      let start = 2 * page_num;
      let end = start + 19;
      // 本地没有数据时
      if (!this.main_ary[start] || !this.main_ary[end]) {
        this.getMainList(info, page_num).then(res => {
          // 初始化
          if (reset) this.initSet(res);
          // 处理数据
          let data = 'res';
          // 存储
          for (let i = start; i < 20; i++) {
            this.main_ary[i] = data;
          }
          // 渲染
          this._main_ary = data;
        });
      }
      // 本地有数据时
      if (this.main_ary[start] && this.main_ary[end]) {
        // 渲染
        this._main_ary = this.main_ary.slice(start, end + 1);
      }
    },
    // 编辑
    edit(row) {
      let id = row.id;
      this.saveInfo(id);
      this.edit_dialog = true;
      // 看类型打开对应的组件
      this.eidt_cmpt_name = `jg-cre`;
      // 处理dialog宽高
      let dialog = this.$refs[`edit-dialog`].$refs['dialog'];
      let target = this.$refs['mgr-jg'];
      if (dialog.style.height !== target.offsetHeight + 'px') dialog.style.height = target.offsetHeight + 'px';
      if (dialog.style.width !== target.offsetWidth + 'px') dialog.style.width = target.offsetWidth + 'px';
    },
    // 删除
    del(row, page_num) {
      let id = row.id;
      // 找到在数组中的位置
      let index = this.getIndex(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          url: '/assets',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          res = res.data;
          if (res.status === 1) {
            let index = this.getIndex(id);
            // 执行更改
            this.main_ary.splice(index, 1);
            // 更新数据总条数
            this.total = this.main_ary.length;
            // 渲染
            this.renderMain({
              category: this.cur_category
            }, this.cur_page_num);
          }
          if (res.status === -1) {
            this.$alert(`${res.msg}`, '');
          }
          if (res.status === -2) {
            OverTime(this, res.msg);
          }
        }).catch(error => console.error(error));
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消错作'
        });
      });
    },
    // 请求机构列表
    getMainList(info, page_num) {
      // 转换成对象
      info = Object.assign({}, info);
      return new Promise((resolve, reject) => {
        axios({
          url: `/acee-pc/asypc/sc/search/college`,
          method: 'post',
          data: {
            category: info.category,
            default_id: '哲升',
            refresh_cnt: page_num
          }
        }).then(res => {
          res = res.data;
          if (res.status === 1) {
            resolve(res);
          }
          if (res.status === -1) {
            app.dialog.alert(`${res.msg}`, '');
            reject();
          }
          if (res.status === -2) {
            OverTime(this, res.msg);
            reject();
          }
        }).catch(error => console.error(error));
      });
    }
  },
  created() {
    console.log(this);
    /* ********* 初始化默认设置 ********* */

    // 刷新当前栏目的机构列表
    this.renderMain({
      category: this.cur_category
    }, 0, 'reset');
    this._main_ary = [{
      id: 1,
      type: 'record',
      category: '1',
      name: '语音合集语音合集语音合集语音合集',
      introduce: '啊盛大盛大盛大啊盛大盛大盛大啊盛大盛大盛大啊盛大盛大盛大啊盛大盛大盛大啊盛大盛大盛大',
      cover_img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=683843878,2887351194&fm=26&gp=0.jpg'
    }, {
      id: 2,
      type: 'video',
      category: '1',
      name: '最全视频',
      cover_img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=683843878,2887351194&fm=26&gp=0.jpg'
    }, {
      id: 3,
      type: 'video',
      category: '2',
      name: '初级学习',
      cover_img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=683843878,2887351194&fm=26&gp=0.jpg'
    }, {
      id: 4,
      type: 'video',
      category: '2',
      name: '初级学习',
      cover_img: `${store.state.PUBLIC_CDN_DOMAIN}` + '/img/pc_logo.jpg'
    }];
  },
  mounted() {
    this.$nextTick(() => {
      this.h_table = this.$refs['mgr-jg'].clientHeight - 73;
    });

  }
}
</script>

<style lang="scss">
.mgr-jg {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;

    .classrom-table {
        padding: 0 20px;
    }
    .operate-box {
        background: #fff;
        padding: 20px 20px 0;
    }
    .jg-edit-dialog {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0;

        .el-dialog__header {
            padding: 0;
            .el-dialog__headerbtn {
                z-index: 6666;
            }
        }
        .el-dialog__body {
            @extend .el-dialog__header;
        }
    }
}
</style>
