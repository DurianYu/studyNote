<template>
  <div class="manage-center-left">
    <el-menu
     @open="handleOpen"
     @select="handleSelect"
     :router="true">
      <el-menu-item index="/userInfo">
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu index="/userInfo">
        <template slot="title">
          <span>页面配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/jg/manageCenter/jgSchConfig">
            学校配置
          </el-menu-item>
          <el-menu-item index="/userInfo">专业配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/userInfo">
        <span slot="title">数据查询</span>
      </el-menu-item>
      <el-menu-item index="/userInfo">
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/userInfo">
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="/jg/manageCenter/mgrClassroom">
        <span slot="title">课堂管理</span>
      </el-menu-item>
      <el-menu-item index="/jg/manageCenter/mgrPeople">
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="/jg/manageCenter/mgrJg">
        <span slot="title">机构管理</span>
      </el-menu-item>
      <el-menu-item index="/jg/manageCenter/mgrQRCode">
        <span slot="title">群二维码管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'manageCenter',

  data() {
    return {
     navLevels: []
    }
  },

  methods: {
    handleOpen: function(index, indexPath) {
      this.navLevels = indexPath
    },
    handleSelect: function(index, indexPath) {
      this.navLevels = indexPath
    },
  }
}
</script>

<style>
  .user-info-left {
 	  position: relative;
    padding-top: 10px;
	  width: 100%;
  }
  .user-info-left .el-menu {
    border-right: 0px;
  }

  .user-info-left .el-submenu .el-menu-item {
    min-width: 100px;
    padding: 0px 15px;
  }
</style>
