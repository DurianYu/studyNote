<template>
  <div class="layout all-height">
    <div class="util">
      <div class="user">
        <img :src="cur_role_info.avatar" alt="" />
        <Poptip title="我的岗位" placement="right" trigger="hover">
          <p class="user-name">
            {{ currentRoleName }}
            <span class="role-msg" v-if="roleMsg"></span>
          </p>
          <div slot="content" class="util-menu">
            <p v-for="(item, index) in role_list" :key="index" @click="switchRole(item.roleid)">
              {{ item.roleName }}
              <span class="role-msg" v-if="item.unread_msg_num > 0"></span>
            </p>
          </div>
        </Poptip>
      </div>
      <ul class="util-content">
        <li @click="goPage('scene')">
          <img src="@/assets/images/map.png" alt="" />
          <p>场景地图</p>
        </li>
        <li @click="goPage('flow')">
          <img src="@/assets/images/proc.png" alt="" />
          <p>业务流程</p>
        </li>
        <li @click="browserVisible = true">
          <img src="@/assets/images/view.png" alt="" />
          <p>区块链浏览</p>
        </li>
        <li>
          <Poptip title="选 项" placement="right" trigger="click">
            <img src="@/assets/images/util.png" alt="" />
            <p>工具箱</p>
            <div slot="content" class="util-menu">
              <p @click="emailVisible = true">
                <Badge dot :count="emailUnReadNumber ? emailUnReadNumber : 0">邮 件</Badge>
              </p>
              <p @click="show_short_msg = true">
                <Badge dot :count="smsUnReadNumber ? smsUnReadNumber : 0">
                  短 信
                </Badge>
              </p>
              <div @click="folder.show = true">文 件 夹</div>
            </div>
          </Poptip>
          <span class="red-dot" v-if="emailUnReadNumber > 0 || smsUnReadNumber > 0"></span>
        </li>
      </ul>
    </div>
    <div class="layout-content">
      <div class="gohome font1" @click="goHome">
        <Icon :size="20" type="ios-home" />
        回首页
      </div>
      <router-view style="padding: 0 70px 0 0; height: calc(100% - 40px)" />
    </div>
    <EmailList :visible.sync="emailVisible" :footerHide="true" />
    <Browser :visible.sync="browserVisible" />
    <ShortMsg :show.sync="show_short_msg" />
    <div class="prompt" @click="taskVisible = true">
      <img src="@/assets/images/tip.png" alt="" />
      <p>任务提示</p>
    </div>
    <Drawer class-name="task-tip" title="任务提示" :closable="true" v-model="taskVisible" :mask-closable="false" :mask="false">
      <p>
        {{ taskStr }}
      </p>
    </Drawer>
    <Folder :show.sync="folder.show" />
  </div>
</template>

<script>
import { Poptip, Drawer, Badge, Icon } from 'view-design'
import EmailList from '@/components/EmailList'
import { mapGetters, mapState } from 'vuex'
import Folder from '@/components/Folder'
import ShortMsg from '@/components/ShortMsg'
import socket from '@/config/socket'
import taskList from '@/config/taskList'
import Browser from './browser/Index'

export default {
  mixins: [socket],
  components: {
    Poptip,
    EmailList,
    Drawer,
    Folder,
    ShortMsg,
    Badge,
    Icon,
    Browser
  },
  data() {
    return {
      show_short_msg: false,
      emailVisible: false,
      browserVisible: false,
      taskVisible: false,
      folder: {
        show: false
      },
      taskStr: '暂无提示' // 任务提示
    }
  },
  computed: {
    ...mapGetters(['role_list', 'currentRole', 'currentRoleName', 'emailUnReadNumber', 'smsUnReadNumber', 'currentCourse', 'cur_role_info']),
    ...mapState(['userInfo', 'platformUserInfo']),
    roleMsg() {
      return this.role_list.some(item => item.unread_msg_num > 0)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    goHome() {
      let homeName = ''
      switch (this.currentCourse) {
        case 'bc_invoice':
          homeName = 'invoices-home'
          break
        case 'bc_lc':
          homeName = 'lc-map'
          break
        case 'bc_cross_border_payments':
          homeName = 'pay-task'
          break
        case 'bc_insurance':
          homeName = 'insurance-home'
          break
        case 'bc_supply_chain_finance':
          homeName = 'supply-chain-home'
          break
        default:
          homeName = 'invoices-home'
          break
      }
      if (this.$route.name !== homeName) {
        this.$router.push({ name: homeName })
      }
    },
    goPage(id) {
      if (id === 'scene') {
        // eslint-disable-next-line no-unused-vars
        const { training_courseid, ...query } = this.platformUserInfo
        this.$router.push({
          name: 'scene',
          query: {
            ...query
          }
        })
      }
      if (id == 'flow') {
        this.$router.push({ name: 'flow-process' })
      }
    },
    // 初始化
    init() {
      this.$store.dispatch('getTeamStatus')
      this.$store.dispatch('getMsg')
      this.updateTask()
    },
    // 切换角色id
    async switchRole(roleid) {
      if (roleid === this.currentRole) return
      const params = {
        uriCode: 'API003',
        bindVars: [
          {
            key: 'courseid',
            value: this.currentCourse
          },
          {
            key: 'roleid',
            value: roleid
          }
        ]
      }
      await this.$fetch(params)
      await this.$store.dispatch('getTeamStatus')
      await this.$store.dispatch('getMsg')
      this.goHome()
      this.updateTask()
    },
    // 任务提示
    updateTask() {
      // 供应链金融的配置方式不一样，需要单独处理
      if (this.currentCourse === 'bc_supply_chain_finance') {
        let isMod = false
        const taskItemList = taskList.bc_supply_chain_finance.filter(item => item.routerName === this.$route.name || item.routerName.includes(this.$route.name))
        for (let i = 0; i < taskItemList.length; i++) {
          const item = taskItemList[i]
          if (item.meta) {
            const taskItemListRole = item.meta.find(cls => cls.role === this.currentRole || cls.role.includes(this.currentRole))
            if (!taskItemListRole) break
            const entityStatus = this.$getEntityNewStatus(taskItemListRole.entity)
            if (taskItemListRole.status === entityStatus.status_id || taskItemListRole.status.includes(entityStatus.status_id)) {
              this.taskStr = item.text
              isMod = true
            }
          } else {
            if (item.role === this.currentRole || item.role.includes(this.currentRole)) {
              if (item.status === true) {
                this.taskStr = item.text
                isMod = true
              } else {
                const entityStatus = this.$getEntityNewStatus(item.entity)
                if (item.status === entityStatus.status_id || item.status.includes(entityStatus.status_id)) {
                  this.taskStr = item.text
                  isMod = true
                }
              }
            }
          }
        }
        if (!isMod) {
          this.taskStr = '暂无提示'
        }
      } else {
        //  其他课程
        const taskItem = taskList[this.currentCourse].find(item => item.routerName === this.$route.name)
        if (!taskItem) return
        // 判断是否无限制条件
        if (taskItem.pass) {
          this.taskStr = taskItem.text
          return
        }
        // 有条件
        // 当前角色的
        const taskItemRole = taskItem.meta.find(item => item.role === true || item.role === this.currentRole)
        if (taskItemRole.status === true) {
          this.taskStr = taskItemRole?.text || '暂无提示'
        } else {
          const taskItemRoleStatus = taskItemRole.status.find(item => {
            const entityStatus = this.$getEntityNewStatus(item.entity)
            if (item.status_id === entityStatus.status_id || item.status_id.includes(entityStatus.status_id)) {
              return item
            }
          })
          this.taskStr = taskItemRoleStatus?.text || '暂无提示'
        }
      }
    }
  },
  watch: {
    $route() {
      this.updateTask()
    }
  }
}
</script>

<style lang="scss" scoped>
.util {
  width: 190px;
  height: 100%;
  background-color: #015fff;
  padding: 60px 0;
  .role-msg {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #ff0000;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 1px;
  }
  &-menu {
    > div,
    p {
      height: 30px;
      line-height: 30px;
      &:hover {
        background-color: #f3f3f3;
      }
      .ivu-badge {
        width: 100%;
      }
      ::v-deep .ivu-badge-dot {
        top: 0;
        right: 0;
      }
    }
  }
  .user {
    width: 100px;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
    p {
      cursor: pointer;
      position: relative;
    }
    &-name {
      color: #fff;
      width: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }
  }
  &-content {
    width: 80px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 0px 34px 0px rgba(47, 145, 255, 0.1);
    margin: 28px auto 0;
    li {
      width: 100%;
      height: 120px;
      font-size: 14px;
      color: #606571;
      text-align: center;
      padding-top: 17px;
      cursor: pointer;
      position: relative;
      span.red-dot {
        display: block;
        width: 11px;
        height: 11px;
        background-color: #ff0000;
        position: absolute;
        right: 10px;
        top: 20px;
        border-radius: 50%;
      }
      &:hover {
        background: rgba(211, 229, 255, 1);
        border-left: 3px solid #54ac40;
      }
      img {
        margin: 8px;
      }
    }
  }
}
::v-deep .task-tip {
  .ivu-drawer-content {
    box-shadow: -17px 0px 52px 0px rgba(47, 145, 255, 0.1);
  }
}
.layout {
  display: flex;
  &-content {
    width: calc(100% - 190px);
    overflow: auto;
    position: relative;
    .gohome {
      position: relative;
      cursor: pointer;
      height: 40px;
      padding: 0 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: #f6f6f6;
    }
  }
}
.prompt {
  width: 60px;
  height: 40px;
  border-radius: 10px;
  position: absolute;
  right: 10px;
  top: 94px;
  text-align: center;
  padding-top: 13px;
  cursor: pointer;
  p {
    color: #666;
    font-size: 14px;
  }
  img {
    margin-bottom: 7px;
  }
}
</style>
