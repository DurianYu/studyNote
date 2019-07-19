<template>
  <div 
    class="personnel-manage"
    ref="personnel">
    <div class="page-content">
      <div class="add-personnel">
        <el-button @click="personnelAdd">添加员工</el-button>
      </div>
      <el-table
        :data="tableData"
        :height="tableHei"
        class="personnel-manage-table"
        style="width: 100%">
        <el-table-column
          v-for="(col, index) of tableCol"
          :key="index"
          v-bind="col">
          <template slot-scope="scope">
            <template
              v-if="col.prop != 'name'">
              <el-button
                v-if="col.prop == 'bind'"
                size="mini"
                :type="scope.row[col.prop] ? 'success' : ''"
                @click="handleCellClick(scope)">
                {{scope.row[col.prop] | converText(col.prop)}}
              </el-button>
              <el-button
                v-if="col.prop == 'warrant'"
                size="mini"
                type="success"
                @click="handleCellClick(scope)">
                查看权限
              </el-button>
              <el-button
                v-if="col.prop == 'remove'"
                size="mini"
                type="danger"
                @click="handleCellClick(scope)">
                删除
              </el-button>
              <el-button
                v-if="col.prop == 'midify'"
                size="mini"
                type="primary"
                @click="handleCellClick(scope)">
                修改
              </el-button>
            </template>
            <span
              v-else>
              {{scope.row[col.prop]}}
            </span>
          </template>          
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :small="paginationSmall"
        :page-size="1"
        :total="totalNum"
        :current-page="currentPage"
        @current-change="pageContentChange">
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      :close-on-click-modal="dialogCloseModel"
      @close="dialogClose"
      class="base-dialog"
      :class="{
        'dialog-add': dialogVisible == 1,
        'dialog-midify': dialogVisible == 2,
        'dialog-bind': dialogVisible == 3,
      }">
      <el-card class="box-card">
        <div class="dialog-header" slot="header">
          <p v-show="dialogVisible == 1">添加员工</p>
          <p v-show="dialogVisible == 2">修改信息</p>
          <p v-show="dialogVisible == 3">扫码绑定(扫码后请点击确定扫码)</p>
        </div>
        <div>
          <!-- 添加 -->
          <el-form 
            v-show="dialogVisible == 1"
            ref="form" 
            :model="form"
            class="create-personnel"
            >
            <el-form-item label="姓名：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="权限：">
              <el-select v-model="form.warrant" placeholder="请选择权限">
                <el-option label="权限1" value="1"></el-option>
                <el-option label="权限2" value="2"></el-option>
                <el-option label="权限3" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="personnelCreate">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <!-- 编辑/修改 -->
          <el-row 
            v-show="dialogVisible == 2"
            class="clearfix personnel-base-info">
            <el-col :span="12" :lg="12" :md="12" :sm="12" :xs="24" class="personnel-info-input">
              <el-input v-model="personnelInfo.name" placeholder="请输入名字"></el-input>
            </el-col>
            <el-col :span="6" :lg="6" :md="6" :sm="6" :xs="12" class="personnel-warrant-btn">
              <el-button  
                @click="showWarrantDialog = true" 
                type="success">
                查看权限
              </el-button>
            </el-col>
            <el-col :span="6" :lg="6" :md="6" :sm="6" :xs="12" class="personnel-remove-btn">
              <el-button 
                @click="personnelRemove(personnelInfo)"
                type="danger">
                删除
              </el-button>
            </el-col>
            <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24" class="dialog-footer">
              <span>
                <el-button @click="dialogVisible = 0">取 消</el-button>
                <el-button type="primary" @click="submitMidifyInfo">确 定</el-button>
              </span>
            </el-col>
          </el-row>
          <!-- 扫码绑定 -->
          <div  
            v-show="dialogVisible == 3"
            class="bind-qr-code">
            <img class="qr-code-img" ref="bind-qr-code" src="">
            <span class="dialog-footer">
              <el-button @click="dialogVisible = 0">取消扫码</el-button>
              <el-button type="primary" @click="postBind(null)">确定扫码</el-button>
            </span>     
          </div>
        </div>
      </el-card>
    </el-dialog>
   
    <!-- 权限 -->
    <el-dialog
      :visible.sync="showWarrantDialog"
      class="warrant-dialog">
      <el-card class="box-card">
        <div class="dialog-header" slot="header">
          <p>权限</p>
        </div>
          <!-- 权限 -->
        <div>
          <el-radio-group v-model="personnelInfo.warrant">
            <el-radio :label="1">权限1</el-radio>
            <el-radio :label="2">权限2</el-radio>
            <el-radio :label="3">权限3</el-radio>
          </el-radio-group>
          <p class="dialog-footer">
            <el-button @click="showWarrantDialog = false">取 消</el-button>
            <el-button type="primary" @click="personnelWarrant">确 定</el-button>
          </p>  
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'personnelManage',

  data() {
    return {
      tableHei: null,
      totalNum: 1,
      currentPage: 1,
      personnelInfo: { // 员工信息
        bind: null,
        id: null,
        midify: null,
        name: null,
        remove: null,
        warrant: null,
      },
      form: {
        id: null,
        name: null,
        warrant: '',
      },
      dialogCloseModel: true,
      dialogVisible: 0, // 显示dialog。 1： 显示创建的dialog 2： 显示编辑的dialog 3：显示绑定的二维码
      showWarrantDialog: false,
      paginationSmall: false,
      tableCol: [
        {
          prop: 'name',
          label: '姓名',
          fixed: 'left'
        },
        {
          prop: 'bind',
          label: '绑定',
        },
        {
          prop: 'warrant',
          label: '权限',
        },
        {
          prop: 'remove',
          label: '删除',
        },
        {
          prop: 'midify',
          label: '修改',
        },
      ],
      tableData: [
        { 
          id: 1,
          name: '王小虎1',
          bind: 0, // 是否已绑定
          warrant: 1, // 拥有的权限
          remove: '删除', // 删除
          midify: '修改' // 修改
        }, {
          id: 2,
          name: '王小虎2',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          id: 3,
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }, {
          name: '王小虎',
          bind: 0,
          warrant: 0,
          remove: '删除',
          midify: '修改'
        }
      ]
    }
  },
  
  computed: {
    showDialog: {
      get() {
        return !!this.dialogVisible // 返回布尔值
      },
      set(val) {
        if (!val) {
          this.dialogVisible = 0;
        }
      }
    }
  },

  filters: {
    converText(value, type) {
      // 绑定
      if (type == "bind") {
        if(value == 0) {
          return '未绑定'
        } 
          return '已绑定'
      }
      return value
    }
  },

  created() {
    this.totalNum = 10;
    // axios.get('') // 请求数据
    // .then((response)=>{
    //   let res = response.data;
    // })
  },

  mounted() {
    this.tableHei = this.$refs['personnel'].clientHeight - 160; // 表格高度
    if (window.innerWidth < 669) { // 屏幕宽度小于669px
      this.paginationSmall = true; // 使用小型的分页组件
    }
  },

  methods: {
    pageContentChange(num) {
      console.log('num', num)
      const {tableData} = this;
      const vm = this;
      let data = [];
      tableData.forEach((item)=>{
        data.push(Object.assign({}, item, {name: num}))
      })
      this.tableData = data;
      this.currentPage = num; // 跳转页面

      // axios.get('', { // 请求下一页的数据
      //   params: {
      //     ID: num
      //   }
      //  })
      // .then((response)=>{
      //   let res = response.data;

      //   if (res.status != 1) {
      //     return vm.$confirm(res.msg, '提示').then(()=>{}).catch(()=>{})
      //   }

      //   vm.tableData = res.data; // 渲染后台传输的数据
      //   vm.currentPage = num; // 跳转页面
      // })
    },

    handleCellClick(scope) {
      console.log(scope)
      const {tableData, personnelInfo} = this;
      const {column, row} = scope;
      const vm = this;
      this.personnelInfo = Object.assign({}, row); // 保存点击行的用户数据
      
      // 修改
      if (column.property == 'midify') {
        this.dialogVisible = 2;
      }
      // 绑定
      if (column.property == 'bind') {
        this.dialogCloseModel = false;
        this.personnelBind(row)
      }
      // 删除
      if (column.property == 'remove') {
        this.personnelRemove(row)        
      }
      // 权限
      if (column.property == 'warrant') {
        this.showWarrantDialog = true;
      }
    },

    personnelBind(row) { // 扫码绑定
      const {personnelInfo, tableData} = this;
      const vm = this;

      if(row.bind) { // 已经绑定
        this.postBind(row)
      } else {
        this.dialogVisible = 3; // 绑定二维码
        this.$nextTick(()=>{
          this.$refs['bind-qr-code'].src = `${store.state.DOMAIN}/img/logo-qrcode.jpg`; // 图片
        })
      }
    },
    
    postBind(data) { // 扫码绑定请求
      const {personnelInfo, tableData} = this;
      const vm = this;
      if (!data) { // 没有传递参数
        data = personnelInfo;
      }
      // console.log(data)
      let bind = !data.bind; // 取反，解绑或绑定
      tableData.forEach((item, index)=>{
        if (data.id == item.id) { // 寻找id 相同的员工数据
          item.bind = bind; // 绑定
          // console.log(item)
        }
      })

      if(this.dialogVisible == 3) {
        this.dialogVisible = 0;
      }
      

      // axios.post('', { // 发送绑定请求
      //   data: {
      //     id: data.id,
      //     bind: bind,
      //   }
      // })
      // .then((response)=>{
      //   let res = response.data;

      //   if (res.status != 1) {
      //     vm.$confirm(res.msg, '提示')
      //   }
      // })
    },

    submitMidifyInfo() { // 提交修改
      const {personnelInfo, tableData} = this;
      const vm = this;
      tableData.forEach((item, index)=>{
        if (personnelInfo.id == item.id) {
          Object.assign(item, personnelInfo) // 用修改后的值覆盖原先的值
        }
      })
      this.dialogVisible = 0; // 关闭弹窗

      // axios.get('', { // 发送修改后的数据
      //   params: personnelInfo,
      // })
      // .then((response)=>{
      //   let res = response.data;

      //   if (res.status != 1) {
      //     vm.$confirm(res.msg, '提示')
      //   }
      // })
    },

    personnelRemove(data) { // 删除
      const {tableData} = this;
      const vm = this;
      tableData.forEach((item, index)=>{
         if (data.id == item.id) {
           tableData.splice(index, 1)
           if (vm.dialogVisible == 2) {
              vm.dialogVisible = 0;
            }
          }
       })
       // axios.get('', { // 点击删除后向后台发送请求，并获取新的数据
       //   params: {
       //     id: data.id,
       //   }
       // })
       // .then((response)=>{
       //   let res = response.data;
       //   if (res.status != 1) {
       //     vm.$confirm(res.msg, '提示')
       //   }
       //   tableData = res.data;
       // })
    },

    personnelWarrant() { // 权限
      const {tableData, personnelInfo} = this;
      const vm = this;
      tableData.forEach((item, index)=>{
        if (personnelInfo.id == item.id) { 
          item.warrant = personnelInfo.warrant; // 
        }
      })

      this.showWarrantDialog = false;

      // axios.get('', {
      //   params: personnelInfo
      // })
      // .then((response)=>{
      //   let res = response.data;

      //   if (res.status != 1) {
      //     vm.$confirm(res.msg, '提示')
      //   }
      // })
    },

    personnelCreate() {
      const {form, tableData} = this;
      const vm = this;

      this.currentPage = 1;

      let personnel = {
        name: form.name,
        warrant: parseInt(form.warrant),
        bind: 0,
        remove: '删除',
        midify: '修改'
      }
      console.log('新建', personnel)
      tableData.unshift(personnel)
      vm.dialogVisible = 0;
      this.form = {
        id: null,
        name: null,
        warrant: '',
      };

    },

    personnelAdd() { // 添加
      this.dialogVisible = 1; 
    },

    dialogClose() {
      this.dialogCloseModel = true; // 在点击dialog外面的蒙层时，可关闭dialog
    }
  }

}
</script>

<style lang="scss">
  .personnel-manage {
    height: fill-available;
    padding-top: 20px;

    /* 添加按钮 */
    .add-personnel {
      text-align: right;
    }
    
    /* 页面主内容 */
    .page-content {
      height: fill-available;
      background-color: #fff;
      padding: 20px;
    }

    .personnel-manage-table .cell {
      text-align: center;
    }

    /* 分页组件 */
    .el-pagination {
      margin-top: 1.2rem;
    }

    .el-dialog {
      width: 40%;

      .dialog-header {
        font-size: 1rem;
      }
    }

    .dialog-add {
      .el-dialog {
        width: 35%;
      }

      .create-personnel {
        .el-form-item {
          display: inline-flex;
          width: 100%;

          .el-form-item__label {
            width: 80px;
            flex-shrink: 0;
          }

          .el-form-item__content {
            flex-grow: 1;
            .el-select {
              width: 100%;
            }
          }
        }
        @media (max-width: 689.98px) and (min-width: 400px) {
          .el-form-item {
            .el-form-item__label {
              width: 60px;
            }
          }
        }
        @media screen and (max-width: 399.98px) {
          .el-form-item {
            flex-wrap: wrap;
            .el-form-item__label {
              text-align: left;
            }
          }
        }
      }
    }

    .dialog-midify {
      .personnel-base-info {
        text-align: right;

        .personnel-remove-btn {
          text-align: center;
        }

        .personnel-info-input {
          padding-right: 10px;
        }

        .dialog-footer {
          margin-top: 29px;
          text-align: center;
        }

        @media screen and (max-width: 768px) {
          .personnel-warrant-btn,
          .personnel-remove-btn {
            padding-top: 10px;
          }
        }
      }
    }

    .dialog-bind {
      .el-dialog {
        width: 30%;
      }

      .bind-qr-code {
        font-size: 1rem;
        .qr-code-img {
          width: 100%;
          height: auto;
        }
      }
    }

    .warrant-dialog {
      .dialog-footer {
        margin-top: 20px;
      }
    }
    @media screen and (max-width: 399.98px) {
      .base-dialog .el-dialog {
        width: 80%;
      }
    }
    @media (min-width: 400px) and (max-width: 668.98px) {
      .base-dialog .el-dialog {
        width: 70%;
      }
      .dialog-bind .el-dialog {
        width: 60%;
      }
    } 
    @media (min-width: 669px) and (max-width: 998.98px) {
      .base-dialog .el-dialog {
        width: 50%;
      }
    }
    @media (min-width: 999px) and (max-width: 1005.98px) {
      .base-dialog .el-dialog {
        width: 45%;
      }
    }   
  }
  
</style>
