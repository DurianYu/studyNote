import { roleStatus, roleName } from '@/config/index'
// status-所属状态
export const transactionList = [
  {
    hash: '0xa9da6b',
    entry: 'N/A',
    output: '订单（卖方签署）',
    signer: '通宇集团',
    status: [roleStatus.lc.contract.s_lc_contract_seller_signed.status]
  },
  {
    hash: '0x482585',
    entry: '合同（卖方签署）',
    output: '合同（签约成功）',
    signer: '维珍集团',
    status: [roleStatus.lc.contract.s_lc_contract_signed_success.status]
  },
  {
    hash: '0x67f134',
    entry: '合同（签约成功）',
    output: '信用证申请',
    signer: '维珍集团',
    status: [roleStatus.lc.credit.s_lc_credit_has_apply.status, roleStatus.lc.credit.s_lc_credit_has_verify.status]
  },
  {
    hash: '0xf7ab09',
    entry: `合同（签约成功）\n信用证申请`,
    output: '信用证（已开立）',
    signer: '巴克莱银行',
    status: [roleStatus.lc.credit.s_lc_credit_has_open.status]
  },
  {
    hash: '0x857e8c',
    entry: '信用证（已开立）',
    output: `提单（通宇集团）\n信用证（已到岸）`,
    signer: '通宇集团',
    status: [roleStatus.lc.credit.s_lc_credit_has_landing.status]
  },
  {
    hash: '0x804382',
    entry: '信用证（已到岸）',
    output: '信用证（已发货）',
    signer: '通宇集团',
    status: [roleStatus.lc.credit.s_lc_credit_has_send_goods.status]
  },
  {
    hash: '0xf07ff3',
    entry: `提单 （通宇集团）\n信用证（已发货）`,
    output: `提单 （建设银行）\n信用证（受益人已收款）\n转账`,
    signer: '建设银行',
    status: [roleStatus.lc.credit.s_lc_credit_beneficiary_received.status]
  },
  {
    hash: '0xc58a75',
    entry: `提单（建设银行）\n信用证（受益人已收款）`,
    output: `提单 （巴克莱银行）\n信用证（议付行已收款）\n转账`,
    signer: '巴克莱银行',
    status: [roleStatus.lc.credit.s_lc_credit_negotiating_received.status]
  },
  {
    hash: '0x27c0b0',
    entry: `提单（巴克莱银行）\n信用证（议付行已收款）`,
    output: `提单 （维珍集团）\n信用证（已还款）\n转账`,
    signer: '维珍集团',
    status: [roleStatus.lc.credit.s_lc_credit_has_pay_back_money.status]
  }
]

// 按钮控制
/**
 * role-能看见的roleID
 * status - 能看见的状态列表
 * andStatus - 并且满足这个状态列表
 */
export const btnList = [
  {
    id: 'getbill',
    role: [roleName.lc.role_tongyu.roleId],
    status: [roleStatus.lc.bill.s_lc_bill_can_open.status],
    meta: [
      {
        entity: 'entity_bill',
        role: [roleName.lc.role_tongyu.roleId],
        status: [roleStatus.lc.bill.s_lc_bill_can_open.status]
      }
    ]
  },
  {
    id: 'pay',
    meta: [
      {
        entity: 'entity_bill',
        role: [roleName.lc.role_jianshe_bank.roleId],
        status: [roleStatus.lc.bill.s_lc_bill_belong_tongyu.status]
      },
      {
        entity: 'entity_bill',
        role: [roleName.lc.role_bakelai_bank.roleId],
        status: [roleStatus.lc.bill.s_lc_bill_belong_jianshe.status]
      },
      {
        entity: 'entity_bill',
        role: [roleName.lc.role_weizhen.roleId],
        status: [roleStatus.lc.bill.s_lc_bill_belong_bakelai.status]
      }
    ]
  },
  {
    id: 'ship',
    meta: [
      {
        entity: 'entity_credit',
        role: [roleName.lc.role_tongyu.roleId],
        status: [roleStatus.lc.credit.s_lc_credit_has_landing.status]
      }
    ]
  },
  {
    id: 'applyLc',
    meta: [
      {
        entity: 'entity_contract',
        andEntity: 'entity_credit',
        role: [roleName.lc.role_weizhen.roleId],
        status: [roleStatus.lc.contract.s_lc_contract_signed_success.status],
        andStatus: [roleStatus.lc.credit.s_lc_credit_init.status]
      }
    ]
  },
  {
    id: 'reviewLc',
    meta: [
      {
        entity: 'entity_credit',
        role: [roleName.lc.role_bakelai_bank.roleId],
        status: [roleStatus.lc.credit.s_lc_credit_has_apply.status]
      }
    ]
  },
  {
    id: 'openLc',
    meta: [
      {
        entity: 'entity_credit',
        role: [roleName.lc.role_bakelai_bank.roleId],
        status: [roleStatus.lc.credit.s_lc_credit_has_verify.status]
      }
    ]
  }
]
