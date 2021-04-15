import Vue from 'vue'
import Vuex from 'vuex'
import Fetch from '../fetch/fly'
import { roleName, roleStatus } from '@/config/index'

Vue.use(Vuex)
const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
const teamStatus = sessionStorage.getItem('teamStatus') ? JSON.parse(sessionStorage.getItem('teamStatus')) : {}
const platformUserInfo = sessionStorage.getItem('platformUserInfo') ? JSON.parse(sessionStorage.getItem('platformUserInfo')) : {}
export default new Vuex.Store({
  state: {
    userInfo, // 用户信息
    platformUserInfo, // 平台用户信息
    emailList: [], // 邮件列表
    smsList: [], // 短信列表
    teamStatus, // 团队的实体对象
    chainList: [] // 区块浏览列表
  },
  getters: {
    // 获取当前课程
    currentCourse: state => {
      return state.userInfo.user.fk_course_id
    },
    // 当前角色的最新状态(目前只用作发票使用)
    currentStatus: state => {
      const currentRoleState = state.teamStatus[state.userInfo?.user?.current_role_id]
      if (!currentRoleState) return ''
      const newStatus = currentRoleState.find(item => item.is_new === 1)
      return newStatus.status_id
    },
    // 当前角色的状态列表（目前只用作发票使用）
    statusList: state => {
      if (state.teamStatus.length) return []
      return state.teamStatus[state.userInfo?.user?.current_role_id]
    },
    // 当前角色
    currentRole: state => {
      return state.userInfo?.user?.current_role_id
    },
    // 当前角色名称
    currentRoleName: state => {
      const roleId = state.userInfo.user.current_role_id
      let role_name = ''
      for (let key in roleName) {
        for (let key2 in roleName[key]) {
          if (roleName[key][key2].roleId === roleId) {
            role_name = roleName[key][key2].roleName
          }
        }
      }
      return role_name
    },
    // 所有角色列表
    role_list: state => {
      const roleList = state.userInfo?.user?.role_list ? JSON.parse(state.userInfo.user.role_list) : []
      const list = roleList.map(item => {
        const filterObj = state.userInfo.role_msglist.find(cls => cls.roleid === item)
        let role_name = ''
        for (let key in roleName) {
          for (let key2 in roleName[key]) {
            if (roleName[key][key2].roleId === item) {
              role_name = roleName[key][key2].roleName
            }
          }
        }
        return {
          roleid: item,
          unread_msg_num: filterObj ? filterObj.unread_msg_num : 0,
          roleName: role_name
        }
      })
      return list
    },
    // 当前角色信息
    cur_role_info: state => {
      let result = {}
      Object.values(roleName).find(v => {
        Object.values(v).find(v2 => {
          if (v2.roleId == state.userInfo?.user?.current_role_id) result = v2
        })
      })
      return result
    },
    // 邮件未读数量
    emailUnReadNumber: state => {
      const unReadList = state.emailList.filter(item => !item.has_read)
      return unReadList.length
    },
    // 短信未读数量
    smsUnReadNumber: state => {
      const unReadList = state.smsList.filter(item => !item.has_read)
      return unReadList.length
    },
    // 区块链开始 (仅限跨境支付)
    isCochain: state => {
      let result_list = state.teamStatus['entity_payment']
        ? state.teamStatus['entity_payment'].filter(v => v.status_id == roleStatus.pay.new.s_pay_new_init.status)
        : []
      return result_list.length
    },
    // 是否是区块链 (只用作保险)
    isChain: state => {
      if (state.userInfo.user.fk_course_id !== 'bc_insurance') return ''
      const currentStatusObj = state.teamStatus['entity_insurance'].find(item => item.is_new === 1)
      if (currentStatusObj.status_id.indexOf('new') >= 0) {
        return 'chain'
      }
      return 'traditional'
    },
    // 申请加入平台申请单（供应链金融）
    platformApply: state => {
      if (state.userInfo.user.fk_course_id !== 'bc_supply_chain_finance') return {}
      const entity_finance_p_form_0 = state.teamStatus.entity_finance_p_form_0 // 核心申请单
      const entity_finance_p_form_1 = state.teamStatus.entity_finance_p_form_1 // 一级申请单
      const entity_finance_p_form_2 = state.teamStatus.entity_finance_p_form_2 // 二级申请单
      const entity_finance_p_form_3 = state.teamStatus.entity_finance_p_form_3 // 三申请单
      let currentEntity = []
      let entityKey = ''
      switch (state.userInfo.user.current_role_id) {
        case roleName.finance.role_core.roleId:
          currentEntity = entity_finance_p_form_0
          entityKey = 'entity_finance_p_form_0'
          break
        case roleName.finance.role_first_supplier.roleId:
          currentEntity = entity_finance_p_form_1
          entityKey = 'entity_finance_p_form_1'
          break
        case roleName.finance.role_second_supplier.roleId:
          currentEntity = entity_finance_p_form_2
          entityKey = 'entity_finance_p_form_2'
          break
        case roleName.finance.role_third_supplier.roleId:
          currentEntity = entity_finance_p_form_3
          entityKey = 'entity_finance_p_form_3'
          break
        default:
          currentEntity = []
          break
      }
      return {
        entity: currentEntity,
        entityStatusList: currentEntity.map(item => item.status_id),
        newStatus: currentEntity.find(item => item.is_new === 1),
        entityKey
      }
    },
    // 融资单（供应链金融）
    financeOrder: state => {
      if (state.userInfo.user.fk_course_id !== 'bc_supply_chain_finance') return {}
      const entity_finance_order_1 = state.teamStatus.entity_finance_order_1 // 一级融资单
      const entity_finance_order_2 = state.teamStatus.entity_finance_order_2 // 二级融资单
      const entity_finance_order_3 = state.teamStatus.entity_finance_order_3 // 三级融资单
      let currentEntity = []
      let entityKey = ''
      switch (state.userInfo.user.current_role_id) {
        case roleName.finance.role_first_supplier.roleId:
          currentEntity = entity_finance_order_1
          entityKey = 'entity_finance_order_1'
          break
        case roleName.finance.role_second_supplier.roleId:
          currentEntity = entity_finance_order_2
          entityKey = 'entity_finance_order_2'
          break
        case roleName.finance.role_third_supplier.roleId:
          currentEntity = entity_finance_order_3
          entityKey = 'entity_finance_order_3'
          break
        default:
          currentEntity = []
          break
      }
      return {
        entity: currentEntity,
        entityStatusList: currentEntity.map(item => item.status_id),
        newStatus: currentEntity.find(item => item.is_new === 1),
        entityKey
      }
    },
    // 合同账款实体（供应链金融）
    accountApply: state => {
      const entity = state.teamStatus.entity_finance_contract_account
      return {
        entity,
        entityStatusList: entity.map(item => item.status_id),
        newStatus: entity.find(item => item.is_new === 1)
      }
    },
    // 核心企业和供应商的key下标
    roleTypeKey: state => {
      let roleTypeKey = ''
      switch (state.userInfo?.user?.current_role_id) {
        case roleName.finance.role_core.roleId:
          roleTypeKey = '0'
          break
        case roleName.finance.role_first_supplier.roleId:
          roleTypeKey = '1'
          break
        case roleName.finance.role_second_supplier.roleId:
          roleTypeKey = '2'
          break
        case roleName.finance.role_third_supplier.roleId:
          roleTypeKey = '3'
          break
      }
      return roleTypeKey
    }
  },
  mutations: {
    // 修改用户信息
    SET_USERINFO(state, res) {
      state.userInfo = res
    },
    // 设置平台用户信息
    SET_PLATFORMUSERINFO(state, res) {
      state.platformUserInfo = res
    },
    // 设置邮件列表
    SETEMAILLIST(state, res) {
      state.emailList = res
    },
    // 设置短信列表
    SETSMSLIST(state, res) {
      state.smsList = res
    },
    // 设置团队下面的所有实体/角色状态列表
    SET_TEAMSTATUS(state, res) {
      state.teamStatus = res
    },
    // 设置区块交易列表
    SETCHAINLIST(state, res) {
      state.chainList = res
    }
  },
  actions: {
    // 获取用户信息
    async getUserInfo({ commit, state }) {
      const params = {
        uriCode: 'API001',
        bindVars: [
          {
            key: 'courseid',
            value: state.platformUserInfo.training_courseid
          }
        ]
      }
      const res = await Fetch(params)
      sessionStorage.setItem('userInfo', JSON.stringify(res))
      commit('SET_USERINFO', res)
    },
    // 发送动作，改变状态
    async changeStatus({ state, getters }, { actionid, data }) {
      console.log(state)
      const params = {
        uriCode: 'API002',
        actionid,
        bindVars: [
          {
            key: 'courseid',
            value: getters.currentCourse
          }
        ],
        data: data || ''
      }
      const res = await Fetch(params)
      return res
    },
    // 获取短信/邮件
    async getMsg({ commit, getters }) {
      const params = {
        uriCode: 'API1001',
        bindVars: [
          {
            key: 'courseid',
            value: getters.currentCourse
          }
        ]
      }
      const res = await Fetch(params)
      const emailList = res.filter(item => item.type == 'email')
      const smsList = res.filter(item => item.type == 'sms')
      commit('SETEMAILLIST', emailList)
      commit('SETSMSLIST', smsList)
    },
    // 获取team下面的实体状态列表
    async getTeamStatus({ commit, getters, state }) {
      const params = {
        uriCode: 'API1003',
        bindVars: [
          {
            key: 'courseid',
            value: getters.currentCourse
          },
          {
            key: 'classid',
            value: state.userInfo.user.fk_class_id
          },
          {
            key: 'teamid',
            value: state.userInfo.user.fk_team_id
          }
        ]
      }
      const res = await Fetch(params)
      sessionStorage.setItem('teamStatus', JSON.stringify(res.statuslist))
      commit('SET_TEAMSTATUS', res.statuslist)
      sessionStorage.setItem('userInfo', JSON.stringify(res.user_info))
      commit('SET_USERINFO', res.user_info)
      this.dispatch('getChainList')
    },
    // 获取team下面的实体状态列表
    async getChainList({ commit, getters, state }) {
      const params = {
        uriCode: 'API010',
        bindVars: [
          {
            key: 'courseid',
            value: getters.currentCourse
          },
          {
            key: 'classid',
            value: state.userInfo.user.fk_class_id
          },
          {
            key: 'teamid',
            value: state.userInfo.user.fk_team_id
          }
        ]
      }
      const res = await Fetch(params)
      commit('SETCHAINLIST', res.list)
    }
  },
  modules: {}
})
