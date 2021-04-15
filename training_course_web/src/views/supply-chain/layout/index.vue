<template>
  <div class="supply-layout all-height">
    <div class="supply-layout-header flex-con">
      <div class="lf">
        <h2 class="font1">智惠供应链金融系统</h2>
      </div>
      <div class="rg">管理员</div>
    </div>
    <div class="supply-layout-content">
      <Menu :active-name="currentActiveName">
        <div v-for="(item, index) in menuList" :key="index">
          <MenuItem :name="item.name" :to="{ name: item.linkName }" v-if="!item.children || item.children.length === 0">
            <Icon :type="item.icon" />
            {{ item.title }}
          </MenuItem>
          <Submenu :name="item.name" v-else>
            <template slot="title">
              <Icon :type="item.icon" />
              {{ item.title }}
            </template>
            <MenuItem v-for="(cls, _index) in item.children" :to="{ name: cls.linkName }" :name="cls.name" :key="`${index}-${_index}`">
              {{ cls.title }}
            </MenuItem>
          </Submenu>
        </div>
      </Menu>
      <div class="supply-layout-con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Submenu } from 'view-design'
import menuList from './menu'
import { mapGetters } from 'vuex'
import { roleName } from '@/config/index'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Submenu
  },
  computed: {
    ...mapGetters(['currentRole']),
    // 菜单列表
    menuList() {
      let menuKey = ''
      switch (this.currentRole) {
        case roleName.finance.role_core.roleId:
          menuKey = 'coreBusiness'
          break
        case roleName.finance.role_factoring_company.roleId:
          menuKey = 'factoring'
          break
        case roleName.finance.role_cmb_checker.roleId:
          menuKey = 'funder'
          break
        default:
          menuKey = 'supplier'
          break
      }
      return menuList[menuKey]
    },
    // 当前菜单name
    currentActiveName() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.supply-layout {
  &-header {
    height: 60px;
    line-height: 60px;
    display: flex;
    background-color: #eee;
    h2 {
      font-size: 18px;
      padding: 0 0 0 20px;
    }
    .rg {
      text-align: right;
      padding-right: 50px;
      font-size: 16px;
    }
  }
  .lf {
    width: 240px;
  }
  .rg {
    flex: 1;
  }
  .menu {
    width: 240px;
    .ivu-menu {
      height: 100%;
    }
  }
  &-content {
    display: flex;
    height: calc(100% - 60px);
  }
  &-con {
    flex: 1;
    padding: 20px;
  }
}
</style>
