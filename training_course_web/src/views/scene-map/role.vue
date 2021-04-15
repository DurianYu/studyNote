<template>
  <div class="role">
    <p class="role-des font1">本实训角色有：</p>
    <p class="font3" v-if="teamInfo.leader_id == userId && !currentRole">
      您成为本团队临时队长，请组织团队成员商讨角色分配，讨论完成后执行团队分。
    </p>
    <p class="font3" v-else-if="teamInfo.leader_id != userId && !currentRole">
      本团队临时队长是：{{ teamInfo.leader_name }}，请全体团队成员与组长商讨角色分配，讨论完成后由队长执行分配。
    </p>
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
          <!-- <div class="status-box flex-x-y-center">
            <span class="status">待分配</span>
          </div> -->
        </div>
        <!-- <div class="bottom-box">
          <Button ghost size="large" type="primary" class="translate-x-y-center">
            开始分配
          </Button>
        </div> -->
      </li>
    </ul>
    <br />
    <Button v-if="teamInfo.leader_id == userId && !currentRole" size="large" type="primary" class="btn-next-f" :to="{ name: 'scene-role-distribution' }">
      开始分配
    </Button>
    <p v-else-if="currentRole === 'role_norole'" class="center">岗位已分配完成，您没有被分配岗位</p>
    <Button v-else-if="teamInfo.leader_id != userId && !currentRole" size="large" type="primary" class="btn-next-f" @click="init">
      刷新状态
    </Button>
    <Button v-else-if="currentRole" size="large" type="primary" class="btn-next-f" :to="{ name: 'pre-job-training' }">进入实训</Button>
  </div>
</template>

<script>
import { Button, Message } from 'view-design'
import { mapState, mapGetters } from 'vuex'
import { roleName } from '@/config/index'
export default {
  components: {
    Button
  },
  data() {
    return {
      teamInfo: {}
    }
  },
  computed: {
    ...mapState(['platformUserInfo', 'userInfo']),
    ...mapGetters(['currentRole']),
    userId() {
      return this.userInfo.user?.id
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
      return Object.values(roleObj)
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.$store.dispatch('getUserInfo')
      if (!this.currentRole) {
        this.getTeamInfo()
      }
    },
    // 获取团队信息
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
    },
    enterTraining() {
      if (!this.teamInfo.has_init_role) {
        Message.warning('请等待队长分配角色')
      }
      this.$router.push({ name: 'pre-job-training' })
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  width: 1121px;
  margin: 50px auto;
  position: relative;

  &-des {
    line-height: 30px;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 0 8rem 0;
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
        height: calc(100% - 339px);
      }
      .content-box {
        padding: 3rem 3rem 0 3rem;
        height: 100%;
        border-radius: 6px;
        background: linear-gradient(225deg, #78a9fd 0%, #015fff 100%);
      }

      .box {
        padding: 4rem 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
      }
      img {
        // width: 84px;
        // height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }
      p {
        flex: 1;
        text-align: center;
        color: #fff;
        padding: 1rem 0 0 0;
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
        .status {
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
  .center {
    margin-top: 100px;
    font-size: 18px;
  }
}
</style>
