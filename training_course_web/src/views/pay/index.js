import store from '@/store/index'
import {
  // actionCode,
  roleStatus
} from '@/config/index'

export const form_name_zhigu_remit = [
  '转出一卡通账号',
  '汇款人姓名',
  '汇款人手机号',
  '汇款人地址',
  '收款人姓名',
  '收款人账户',
  '收款人国家',
  '收款人地址',
  '汇款币种',
  '现钞',
  '可用余额',
  '汇款金额',
  '收款人开户行SWIFT',
  '收款人开户行国家',
  '收款人开户行名称',
  '收款人开户行所在城市'
]

export function getFormData() {
  let mode = store.getters.isCochain ? 'new' : 'old'
  const result_form = store.state.teamStatus['entity_payment']?.find(item => item.status_id === roleStatus.pay[mode][`s_pay_${mode}_has_write_form`].status)
  return Object.assign(result_form?.data ? JSON.parse(result_form.data) : {})
}
