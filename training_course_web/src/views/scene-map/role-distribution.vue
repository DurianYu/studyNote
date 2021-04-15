<template>
  <div class="role distribution">
    <h2 class="role-des font1">岗位分配</h2>
    <p class="font3">{{ cur_course_info.title }}实训</p>
    <div class="border-none">
      <ul>
        <li v-for="(item, index) in roleList" :key="index">
          <div class="content-box">
            <div class="top-box">
              <span> </span>
              <span class="task">任务量：{{ item.taskLoad }}%</span>
            </div>
            <div class="box">
              <img :src="item.avatar" alt="" />
              <p class="font2-b">{{ item.roleName }}</p>
            </div>
            <div class="status-box flex-x-y-center">
              <span class="status">{{ item.userName || '待分配' }}</span>
            </div>
          </div>
          <div class="bottom-box">
            <Button
              ghost
              size="large"
              type="primary"
              class="translate-x-y-center"
              @click="
                clk_role = item
                visible = true
                toBeRoleId = item.roleId
                selectUserId = ''
              "
            >
              开始分配
            </Button>
          </div>
        </li>
      </ul>
    </div>
    <Button size="large" type="primary" class="btn-next-f" @click="done">完成分配</Button>
    <Modal :title="'对应岗位：' + (clk_role.company ? clk_role.company + '-' : '') + '财务总经理'" :visible.sync="visible" @ok="distribution">
      <p class="distribution-title">选择人员</p>
      <ul class="distribution-user">
        <li :class="{ active: item.id === selectUserId }" v-for="(item, index) in allUser" :key="index" @click="selectUserId = item.id">
          {{ item.name }}
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import { Button, Message } from 'view-design'
import Modal from '@/components/Modal'
import { mapState } from 'vuex'
import { roleName } from '@/config/index'
import sceneList from './sceneList'

export default {
  components: {
    Button,
    Modal
  },
  data() {
    return {
      clk_role: {},
      visible: false,
      selectUserId: '',
      teamInfo: {},
      allUser: [], // 小组所有用户
      toBeRoleId: '' // 刚刚分配的角色id
    }
  },
  computed: {
    ...mapState(['platformUserInfo', 'userInfo']),
    cur_course_info() {
      return sceneList.find(v => v.id == this.platformUserInfo.training_courseid)
    },
    roleList() {
      let roleObj = {}
      switch (this.platformUserInfo.training_courseid) {
        case 'bc_invoice':
          roleObj = roleName.invoice
          break
        case 'bc_lc':
          roleObj = roleName.lc
          break
        case 'bc_cross_border_payments':
          roleObj = roleName.pay
          break
        case 'bc_insurance':
          roleObj = roleName.insurance
          break
        case 'bc_supply_chain_finance':
          roleObj = roleName.finance
          break
        default:
          roleObj = {}
          break
      }
      return Object.values(roleObj).map(item => {
        const obj = {
          ...item
        }
        const filterObj = this.allUser.find(cls => {
          return cls.role_list.includes(item.roleId)
        })
        obj.userName = filterObj?.name
        obj.userId = filterObj?.id
        return obj
      })
    }
  },
  created() {
    this.getTeamInfo()
  },
  methods: {
    async getTeamInfo() {
      const params = {
        uriCode: 'API005',
        bindVars: [
          {
            key: 'courseid',
            value: this.userInfo.user.fk_course_id
          },
          {
            key: 'classid',
            value: this.userInfo.user.fk_class_id
          },
          {
            key: 'teamid',
            value: this.userInfo.user.fk_team_id
          }
        ]
      }
      const res = await this.$fetch(params)
      this.teamInfo = res.team_info
      // 设置团队长名称
      const obj = res.userlist.find(item => item.id === res.team_info.leader_id)
      this.teamInfo.leader_name = obj.name
      this.allUser = res.userlist.map(item => {
        return {
          ...item,
          role_list: item.role_list ? JSON.parse(item.role_list) : []
        }
      })
    },
    // 单个选择
    distribution() {
      if (!this.selectUserId) {
        Message.warning('请先选择用户')
        return
      }
      this.allUser = this.allUser.map(item => {
        // 先清除掉之前已有的这个角色
        const role_list = item.role_list.filter(cls => cls !== this.toBeRoleId)
        const obj = {
          ...item,
          role_list
        }
        if (item.id === this.selectUserId) {
          obj.role_list.push(this.toBeRoleId)
        }
        return obj
      })
      this.visible = false
      this.selectUserId = ''
    },
    async done() {
      let userlist = this.allUser.map(item => {
        return {
          userid: item.id,
          role_list: item.role_list.length ? item.role_list : ['role_norole']
        }
      })
      // 获取是否还有角色未分配
      const undistr = this.roleList.some(item => !item.userId)
      if (undistr) {
        Message.warning('还有岗位未分配')
        return
      }
      userlist = userlist.filter(item => item.role_list.length > 0)
      const params = {
        uriCode: 'API006',
        bindVars: [
          {
            key: 'courseid',
            value: this.userInfo.user.fk_course_id
          },
          {
            key: 'classid',
            value: this.userInfo.user.fk_class_id
          },
          {
            key: 'teamid',
            value: this.userInfo.user.fk_team_id
          }
        ],
        userlist
      }
      await this.$fetch(params)
      this.$router.push({ name: 'flow-process' })
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  width: 1121px;
  margin: 50px auto;
  position: relative;
  h2 {
  }
  h3 {
    font-size: 18px;
  }
  &-des {
    line-height: 30px;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    li {
      width: 299px;
      position: relative;
      height: 416px;
      border: 1px solid #eee;
      margin: 56px 0 0 56px;
      border-radius: 6px;
      box-shadow: 5px 10px 30px 0px rgba(41, 26, 204, 0.12);

      .bottom-box {
        position: relative;
        height: calc(100% - 299px);
      }
      .content-box {
        padding: 3rem 3rem 0 3rem;
        height: 299px;
        border-radius: 6px 6px 0 0;
        background: linear-gradient(225deg, #78a9fd 0%, #015fff 100%);
      }

      .box {
        padding: 1.5rem 0 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      img {
        width: 84px;
        // height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }
      p {
        flex: 1;
        text-align: left;
        color: #fff;
        padding: 0px 0 0px 1rem;
      }
      .task {
        position: relative;
        font-size: 12px;
        background: rgba(0, 173, 16, 1);
        border-radius: 2px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        padding: 0.25rem;
      }
      .top-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .status-box {
        padding: 1rem 0 0 0;
        .status {
          text-align: center;
          border: dashed 1px #fff;
          padding: 0.25rem 1rem;
          color: #fff;
        }
      }
    }
  }
  .btn-center {
    margin-top: 100px;
  }
  .border {
    border: 1px solid #eee;
    padding: 20px;
    margin-top: 30px;
  }
}
.distribution {
  position: relative;
  padding: 0 0 8rem 0;
  &-title {
    font-size: 17px;
    font-weight: bold;
    color: #333;
  }
  &-user {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    li {
      width: 142px;
      height: 40px;
      border: 1px solid #eee;
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      margin: 10px;
      cursor: pointer;
      &.active {
        background-color: royalblue;
        color: #fff;
      }
    }
  }
}
</style>
