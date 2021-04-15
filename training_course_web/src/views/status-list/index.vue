<template lang="html">
  <div class="status">
    <Row :gutter="16" class="status-box" type="flex" justify="space-around" align="top">
      <Col :spna="24 / role_name_list.length" v-for="(name, i) of role_name_list" :key="i">
        <span style="line-height: 2rem; margin-left: 1rem;">{{ name }}</span>
        <div v-for="(v, i) of list_data[name]" :key="i">
          <List border :class="{ 'red-show': v.is_new ? true : false }">
            <!-- <ListItem> {{ map_status['id'] }} : {{ v.id }} </ListItem>
            <ListItem> {{ map_status['fk_user_id'] }} : {{ v.fk_user_id }} </ListItem>
            <ListItem> {{ map_status['fk_team_id'] }} : {{ v.fk_team_id }} </ListItem>
            <ListItem> {{ map_status['fk_role_id'] }} : {{ v.fk_role_id }} </ListItem> -->
            <ListItem> {{ map_status_detail[v.status_id] }} </ListItem>
            <!-- <ListItem> {{ map_status['cause_action_id'] }} : {{ v.cause_action_id }} </ListItem>
            <ListItem> {{ map_status['flag'] }} : {{ v.flag }} </ListItem>
            <ListItem> {{ map_status['data'] }} : {{ v.data }} </ListItem>
            <ListItem> {{ map_status['is_new'] }} : {{ v.is_new }} </ListItem> -->
          </List>
          <!-- <Divider /> -->
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { List, Row, Col } from 'view-design'
import { mapState } from 'vuex'

export default {
  components: {
    List,
    ListItem: List.Item,
    Row,
    Col
  },
  data() {
    return {
      is_polling: true,
      role_name_list: ['role_accounting', 'role_buyer', 'role_manager'],
      list_data: {},
      map_status_detail: {
        s_accounting_can_login: '可登陆',
        s_accounting_can_make_wrong_ticket: '可开错票',
        s_accounting_has_apply_red_ink: '已申请红冲',
        s_accounting_has_login: '会计已登陆',
        s_accounting_has_red_ink: '已红冲',
        s_accounting_has_remake_ticket: '已重开',
        s_accounting_has_wrong_ticket: '已开错票',
        s_accounting_init: 'init',
        s_buyer_can_buy: '可采购',
        s_buyer_has_apply_red_ink: '已申请红冲',
        s_buyer_has_apply_wrong_ticket: '已申请开错票',
        s_buyer_has_call_customer_services: '已和客服沟通',
        s_buyer_has_check_wrong_ticket: '已查看错票',
        s_buyer_has_remake_ticket: '已重开',
        s_buyer_has_wrong_ticket: '已开错票',
        s_buyer_init: 'init',
        s_manager_accounting_created: '已创建开票员',
        s_manager_init: 'init',
        s_manager_invoice_requested: '电子发票已申请',
        s_manager_registered: '已注册'
      },
      map_status: {
        id: 'id',
        fk_user_id: 'userid', //userid
        fk_team_id: '团队id',
        fk_role_id: '角色',
        status_id: '状态',
        cause_action_id: '产生该状态的行为',
        flag: 'flag',
        data: 'data',
        is_new: '是否最新状态'
      }
    }
  },
  computed: {
    ...mapState(['platformUserInfo'])
  },
  methods: {
    getStatus() {
      this.$fetch({
        uriCode: 'API1003',
        bindVars: [
          {
            key: 'teamid',
            value: this.$route.query.p_teamid
          }
        ]
      })
        .then(res => {
          this.list_data = this.filterRole(res.statuslist)
        })
        .catch(() => {})
    },
    filterRole(arr) {
      let result = {}
      this.role_name_list.forEach(name => {
        result[name] = arr.filter(v => v.fk_role_id == name)
      })
      return result
    },
    polling(delay) {
      setTimeout(() => {
        this.getStatus()
        if (this.is_polling) this.polling(2.5e3)
      }, delay)
    }
  },
  created() {
    this.polling(0)
  }
}
</script>

<style lang="scss" scoped>
.status {
  margin: 2.5rem 0 0 0;
  ::v-deep {
    .status-box {
      .ivu-list {
        margin: 0 0 1rem 0;
      }
      .ivu-col {
        display: block;
        width: 33.33333333%;
      }
    }
  }
  .red-show {
    background: rgba(255, 0, 0, 0.12);
    color: red;
  }
}
</style>
