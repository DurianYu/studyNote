<template>
  <div class="training-detail">
    <Table :columns="columns" :data="teamlist">
      <template slot="action" slot-scope="{ row }">
        <Button v-if="row.has_init_role" size="small" type="primary" ghost @click="init(row.id)">初始化</Button>
      </template>
    </Table>
    <Modal title="提示" :visible.sync="visible" okText="确认初始化" @ok="handleInit">
      <p>初始化数据后，该团队实训数据清零，需重新进行实训。</p>
    </Modal>
  </div>
</template>

<script>
import { Table, Button, Message } from 'view-design'
import Modal from '@/components/Modal'
import { mapState } from 'vuex'
export default {
  components: {
    Table,
    Button,
    Modal
  },
  data() {
    return {
      visible: false,
      columns: [
        {
          title: '团队名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '团队成员数',
          key: 'member',
          align: 'center'
        },
        {
          title: '完成情况',
          key: 'completion',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200
        }
      ],
      teamlist: [],
      initTeamId: ''
    }
  },
  computed: {
    ...mapState(['platformUserInfo', 'userInfo'])
  },
  created() {
    this.getClassInfo()
  },
  methods: {
    init(initTeamId) {
      this.initTeamId = ''
      this.initTeamId = initTeamId
      this.visible = true
    },
    async getClassInfo() {
      const params = {
        uriCode: 'API007',
        bindVars: [
          {
            key: 'p_classid',
            value: this.platformUserInfo.p_classid
          },
          {
            key: 'courseid',
            value: this.platformUserInfo.training_courseid
          }
        ]
      }
      const res = await this.$fetch(params)
      this.teamlist = res.teamlist.map(item => {
        return {
          ...item,
          member: item.userlist.length,
          completion: item.has_init_role ? '进行中' : '未开始'
        }
      })
    },
    async handleInit() {
      const params = {
        uriCode: 'API008',
        bindVars: [
          {
            key: 'p_classid',
            value: this.platformUserInfo.p_classid
          },
          {
            key: 'teamid',
            value: this.initTeamId
          }
        ]
      }
      await this.$fetch(params)
      Message.success('初始化成功')
      this.visible = false
      this.getClassInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.training-detail {
  padding: 50px;
}
</style>
