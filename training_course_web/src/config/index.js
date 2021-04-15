// 请求域名
export const HOST = ''

const _domain = document.domain
// export const SOCKETHOST = process.env.NODE_ENV === 'production' ? `ws://${_domain}` : 'ws://192.168.1.123:80'
export const SOCKETHOST = process.env.NODE_ENV === 'production' ? `ws://${_domain}` : 'ws://ccsi1.svinsight.com'

const avatar_path = {
  invoice: '/images/invoice',
  lc: '/images/lc',
  pay: '/images/pay',
  insurance: '/images/insurance',
  finance: '/images/sc'
}

// 角色
export const roleName = {
  // 发票
  invoice: {
    manager: {
      roleId: 'role_manager',
      roleName: '财务总经理',
      company: '北京通宇集团',
      taskLoad: 30,
      avatar: require(`@/assets${avatar_path.invoice}/role_manager.png`),
      des: '代表企业进行区块链电子发票的申请。'
    },
    accounting: {
      roleId: 'role_accounting',
      company: '北京通宇集团',
      roleName: '会计',
      taskLoad: 40,
      avatar: require(`@/assets${avatar_path.invoice}/role_accounting.png`),
      des: '进行区块链电子发票的开具。'
    },
    buyer: {
      roleId: 'role_buyer',
      company: '北京海淀汽车租赁有限公司',
      roleName: '采购员',
      taskLoad: 30,
      avatar: require(`@/assets${avatar_path.invoice}/role_buyer.png`),
      des: '采购公司所需要的货物。'
    }
  },
  // 信用证
  lc: {
    role_tongyu: {
      roleId: 'role_tongyu',
      roleName: '通宇集团单证员',
      taskLoad: 35,
      avatar: require(`@/assets${avatar_path.lc}/role_tongyu.png`),
      des: '进行合同的制作、整理和审核各种单证并能及时准确与货代公司联系装箱发货。'
    },
    role_weizhen: {
      roleId: 'role_weizhen',
      roleName: '维珍集团单证员',
      taskLoad: 5,
      avatar: require(`@/assets${avatar_path.lc}/role_weizhen.png`),
      des: '进行合同的签订和信用证的申请，能整理和审核各种单证。'
    },
    role_bakelai_bank: {
      roleId: 'role_bakelai_bank',
      roleName: '巴克莱银行国际业务员',
      taskLoad: 25,
      avatar: require(`@/assets${avatar_path.lc}/role_bakelai_bank.png`),
      des: '进行信用证申请的审核和开立'
    },
    role_jianshe_bank: {
      roleId: 'role_jianshe_bank',
      roleName: '建设银行国际业务员',
      taskLoad: 35,
      avatar: require(`@/assets${avatar_path.lc}/role_jianshe_bank.png`),
      des: '进行信用证的审核和垫付'
    }
  },
  // 跨境支付
  pay: {
    role_remitter: {
      roleId: 'role_remitter',
      roleName: '汇款人',
      taskLoad: 25,
      avatar: require(`@/assets${avatar_path.pay}/role_remitter.png`),
      des: `进行购汇；向智谷银行申请跨境汇款，并且填写相应的汇款信息。`
    },
    role_zhigu_bank: {
      roleId: 'role_zhigu_bank',
      roleName: '智谷银行',
      taskLoad: 25,
      avatar: require(`@/assets${avatar_path.pay}/role_zhigu_bank.png`),
      des: `对跨境汇款申请信息进行审核，审核通过后完成转账操作。`
    },
    role_mid_bank: {
      roleId: 'role_mid_bank',
      roleName: '中间行/区块链跨境支付平台操作员',
      taskLoad: 25,
      avatar: require(`@/assets${avatar_path.pay}/role_mid_bank.png`),
      des: `中间行柜员：对跨境汇款信息进行审核，进行汇入行和汇出行之间的结算操作。
区块链跨境支付平台操作员：模拟区块链跨境支付平台完成信息验证及智能合约下的结算操作。`
    },
    role_bakelai_bank: {
      roleId: 'role_usa_bank',
      roleName: '美国银行	',
      taskLoad: 25,
      avatar: require(`@/assets${avatar_path.pay}/role_usa_bank.png`),
      des: `完成汇款信息的审核及转账操作。 `
    }
  },
  // 保险
  insurance: {
    role_buy_manager: {
      roleId: 'role_buy_manager',
      roleName: '商务经理',
      taskLoad: 80,
      avatar: require(`@/assets${avatar_path.insurance}/role_buy_manager.png`),
      des: `出差洽谈业务。`
    },
    role_checker: {
      roleId: 'role_checker',
      roleName: '审核员',
      taskLoad: 20,
      avatar: require(`@/assets${avatar_path.insurance}/role_checker.png`),
      des: `区块链合约监控。`
    }
  },
  // 供应链
  finance: {
    role_core: {
      roleId: 'role_core',
      roleName: '核心企业',
      taskLoad: 23,
      avatar: require(`@/assets${avatar_path.finance}/role_core.png`),
      des: `核心企业是链条中至关重要的一环，也是金融机构向整个供应链条提供金融服务的关键因素。核心企业在区块链供应链金融系统中，为上下游企业提供信用支持。在本实训中，核心企业管理员负责授信合同的完成、应付账款创建以及最终应付账款的清偿操作。 `
    },
    role_first_supplier: {
      roleId: 'role_first_supplier',
      roleName: '一级供应商',
      taskLoad: 21,
      avatar: require(`@/assets${avatar_path.finance}/role_first_supplier.png`),
      des: `一级供应商作为核心企业的直接供应商，为核心企业提供货物，在供应链金融系统中，一级供应商直接接收核心企业的账款。在本实训中，一级供应商在加入平台后，接收核心企业的账款，进行拆分转让给二级供应商，并使用应收账款申请融资。 `
    },
    role_second_supplier: {
      roleId: 'role_second_supplier',
      roleName: '二级供应商',
      taskLoad: 21,
      avatar: require(`@/assets${avatar_path.finance}/role_second_supplier.png`),
      des: `二级供应商作为一级供应商的直接供应商，为一级供应商提供货物，在供应链金融系统中，二级供应商接收一级供应商拆分转让的账款。在本实训中，二级供应商在加入平台后，接收一级供应商的账款，进行拆分转让给三级功能供应商，并使用应收账款申请融资。 `
    },
    role_third_supplier: {
      roleId: 'role_third_supplier',
      roleName: '三级供应商',
      taskLoad: 9,
      avatar: require(`@/assets${avatar_path.finance}/role_third_supplier.png`),
      des: `三级供应商作为二级供应商的直接供应商，为二级供应商提供货物，在供应链金融系统中，三级供应商接收二级供应商拆分转让的账款。在本实训中，三级供应商在加入平台后，接收二级供应商的账款，并使用应收账款申请融资。 `
    },
    role_factoring_company: {
      roleId: 'role_factoring_company',
      roleName: '保理公司',
      taskLoad: 33,
      avatar: require(`@/assets${avatar_path.finance}/role_factoring_company.png`),
      des: `商业保理主要的工作是面对债权人转让应收账款的业务，集应收账款管理；坏账催收；担保与融资为一体的业务。 在本实训中保理商管理员操作供应链金融平台保理商账户，对入驻各方进行审核；在各企业融资时，提供融资初审核的操作。 `
    },
    role_cmb_checker: {
      roleId: 'role_cmb_checker',
      roleName: '招商银行审核员',
      taskLoad: 9,
      avatar: require(`@/assets${avatar_path.finance}/role_cmb_checker.png`),
      des: `资金方在供应链金融系统中为各企业提供资金服务。在本实训中，资金方对各企业融资需求进行复核并提供融资资金，在核心企业清偿账款后，资金方需要进行账款核对操作。 `
    }
  }
}
// 状态 status-状态对应的id; linkName-当前状态下通过用户应该进入那个路由
export const roleStatus = {
  // 发票
  invoice: {
    // 管理员
    manager: {
      s_manager_init: {
        status: 's_manager_init',
        linkName: 'invoices-tax-bureau'
      },
      s_manager_invoice_requested: {
        status: 's_manager_invoice_requested',
        linkName: 'invoices-invoice'
      },
      s_manager_registered: {
        status: 's_manager_registered',
        linkName: 'invoices-platform-login'
      },
      s_manager_accounting_created: {
        status: 's_manager_accounting_created',
        linkName: 'invoices-platform-login'
      }
    },
    // 会计
    accounting: {
      s_accounting_init: {
        status: 's_accounting_init',
        linkName: ''
      },
      s_accounting_can_login: {
        status: 's_accounting_can_login',
        linkName: 'invoices-accounting-platform-login'
      },
      s_accounting_has_login: {
        status: 's_accounting_has_login',
        linkName: 'invoices-platform-invoicing'
      },
      s_accounting_can_make_wrong_ticket: {
        status: 's_accounting_can_make_wrong_ticket',
        linkName: 'invoices-platform-invoicing'
      },
      s_accounting_has_wrong_ticket: {
        status: 's_accounting_has_wrong_ticket',
        linkName: 'invoices-platform-list'
      },
      s_accounting_has_apply_red_ink: {
        status: 's_accounting_has_apply_red_ink',
        linkName: 'invoices-platform-list'
      },
      s_accounting_has_red_ink: {
        status: 's_accounting_has_red_ink',
        linkName: 'invoices-platform-list'
      },
      s_accounting_has_remake_ticket: {
        status: 's_accounting_has_remake_ticket',
        linkName: 'invoices-platform-list'
      }
    },
    // 采购员
    buyer: {
      s_buyer_init: {
        status: 's_buyer_init',
        linkName: ''
      },
      s_buyer_can_buy: {
        status: 's_buyer_can_buy',
        linkName: 'invoices-product-list'
      },
      s_buyer_has_apply_wrong_ticket: {
        status: 's_buyer_has_apply_wrong_ticket',
        linkName: ''
      },
      s_buyer_has_wrong_ticket: {
        status: 's_buyer_has_wrong_ticket',
        linkName: ''
      },
      s_buyer_has_check_wrong_ticket: {
        status: 's_buyer_has_check_wrong_ticket',
        linkName: 'invoices-product-list'
      },
      s_buyer_has_call_customer_services: {
        status: 's_buyer_has_call_customer_services',
        linkName: 'invoices-product-list'
      },
      s_buyer_has_apply_red_ink: {
        status: 's_buyer_has_apply_red_ink',
        linkName: ''
      },
      s_buyer_has_remake_ticket: {
        status: 's_buyer_has_remake_ticket',
        linkName: 'invoices-check-invoice'
      },
      s_buyer_checked_right_ticket: {
        status: 's_buyer_checked_right_ticket',
        linkName: ''
      }
    }
  },
  // 信用证
  lc: {
    contract: {
      s_lc_contract_init: {
        status: 's_lc_contract_init'
      },
      s_lc_contract_seller_signed: {
        status: 's_lc_contract_seller_signed'
      },
      s_lc_contract_signed_success: {
        status: 's_lc_contract_signed_success'
      }
    },
    bill: {
      s_lc_bill_init: {
        status: 's_lc_bill_init'
      },
      s_lc_bill_can_open: {
        status: 's_lc_bill_can_open'
      },
      s_lc_bill_belong_tongyu: {
        status: 's_lc_bill_belong_tongyu'
      },
      s_lc_bill_belong_jianshe: {
        status: 's_lc_bill_belong_jianshe'
      },
      s_lc_bill_belong_bakelai: {
        status: 's_lc_bill_belong_bakelai'
      },
      s_lc_bill_belong_weizhen: {
        status: 's_lc_bill_belong_weizhen'
      },
      s_lc_bill_surrender_pick_up: {
        status: 's_lc_bill_surrender_pick_up'
      }
    },
    credit: {
      s_lc_credit_init: {
        status: 's_lc_credit_init'
      },
      s_lc_credit_has_apply: {
        status: 's_lc_credit_has_apply'
      },
      s_lc_credit_has_verify: {
        status: 's_lc_credit_has_verify'
      },
      s_lc_credit_has_open: {
        status: 's_lc_credit_has_open'
      },
      s_lc_credit_has_landing: {
        status: 's_lc_credit_has_landing'
      },
      s_lc_credit_has_send_goods: {
        status: 's_lc_credit_has_send_goods'
      },
      s_lc_credit_beneficiary_received: {
        status: 's_lc_credit_beneficiary_received'
      },
      s_lc_credit_negotiating_received: {
        status: 's_lc_credit_negotiating_received'
      },
      s_lc_credit_has_pay_back_money: {
        status: 's_lc_credit_has_pay_back_money'
      }
    }
  },
  // 跨境支付
  pay: {
    new: {
      s_pay_new_init: {
        status: 's_pay_new_init'
      },
      s_pay_new_remitter_buy_success: {
        status: 's_pay_new_remitter_buy_success'
      },
      s_pay_new_has_write_form: {
        status: 's_pay_new_has_write_form'
      },
      s_pay_new_zhigu_has_review: {
        status: 's_pay_new_zhigu_has_review'
      },
      s_pay_new_zhigu_has_out_money: {
        status: 's_pay_new_zhigu_has_out_money'
      },
      s_pay_new_zhigu_has_online: {
        status: 's_pay_new_zhigu_has_online'
      },
      s_pay_new_mid_has_frozen: {
        status: 's_pay_new_mid_has_frozen'
      },
      s_pay_new_usa_has_sent_receipt: {
        status: 's_pay_new_usa_has_sent_receipt'
      },
      s_pay_new_mid_can_out_money: {
        status: 's_pay_new_mid_can_out_money'
      },
      s_pay_new_mid_has_out_money: {
        status: 's_pay_new_mid_has_out_money'
      },
      s_pay_new_usa_has_out_money: {
        status: 's_pay_new_usa_has_out_money'
      }
    },
    old: {
      s_pay_old_init: {
        status: 's_pay_old_init'
      },
      s_pay_old_remitter_buy_success: {
        status: 's_pay_old_remitter_buy_success'
      },
      s_pay_old_has_write_form: {
        status: 's_pay_old_has_write_form'
      },
      s_pay_old_zhigu_has_review: {
        status: 's_pay_old_zhigu_has_review'
      },
      s_pay_old_zhigu_has_out_money: {
        status: 's_pay_old_zhigu_has_out_money'
      },
      s_pay_old_zhigu_has_send_msg: {
        status: 's_pay_old_zhigu_has_send_msg'
      },
      s_pay_old_mid_has_frozen: {
        status: 's_pay_old_mid_has_frozen'
      },
      s_pay_old_usa_has_review: {
        status: 's_pay_old_usa_has_review'
      },
      s_pay_old_mid_can_out_money: {
        status: 's_pay_old_mid_can_out_money'
      },
      s_pay_old_mid_has_out_money: {
        status: 's_pay_old_mid_has_out_money'
      },
      s_pay_old_usa_has_out_money: {
        status: 's_pay_old_usa_has_out_money'
      }
    }
  },
  // 保险
  insurance: {
    s_insurance_old_init: {
      status: 's_insurance_old_init'
    },
    s_insurance_old_has_insure: {
      status: 's_insurance_old_has_insure'
    },
    s_insurance_old_plane_has_delay: {
      status: 's_insurance_old_plane_has_delay'
    },
    s_insurance_old_customer_has_call: {
      status: 's_insurance_old_customer_has_call'
    },
    s_insurance_old_got_delay_prove: {
      status: 's_insurance_old_got_delay_prove'
    },
    s_insurance_old_has_report: {
      status: 's_insurance_old_has_report'
    },
    s_insurance_old_has_review: {
      status: 's_insurance_old_has_review'
    },
    s_insurance_old_has_pay: {
      status: 's_insurance_old_has_pay'
    },
    s_insurance_new_init: {
      status: 's_insurance_new_init'
    },
    s_insurance_new_has_effect: {
      status: 's_insurance_new_has_effect'
    },
    s_insurance_new_has_pay: {
      status: 's_insurance_new_has_pay'
    }
  },
  // 供应链
  finance: {
    // 平台通用
    entity_finance_general: {
      s_finance_general_init: {
        status: 's_finance_general_init'
      },
      s_finance_general_auth_contract: {
        status: 's_finance_general_auth_contract'
      }
    },
    // 核心加入平台申请单
    entity_finance_p_form_0: {
      s_finance_p_form_0_init: {
        status: 's_finance_p_form_0_init'
      },
      s_finance_p_form_0_can_apply: {
        status: 's_finance_p_form_0_can_apply'
      },
      s_finance_p_form_0_has_apply: {
        status: 's_finance_p_form_0_has_apply'
      },
      s_finance_p_form_0_review_pass: {
        status: 's_finance_p_form_0_review_pass'
      },
      s_finance_p_form_0_open_elevisa: {
        status: 's_finance_p_form_0_open_elevisa'
      }
    },
    // 一级加入平台申请单
    entity_finance_p_form_1: {
      s_finance_p_form_1_init: {
        status: 's_finance_p_form_1_init'
      },
      s_finance_p_form_1_can_apply: {
        status: 's_finance_p_form_1_can_apply'
      },
      s_finance_p_form_1_has_apply: {
        status: 's_finance_p_form_1_has_apply'
      },
      s_finance_p_form_1_review_pass: {
        status: 's_finance_p_form_1_review_pass'
      },
      s_finance_p_form_1_open_elevisa: {
        status: 's_finance_p_form_1_open_elevisa'
      }
    },
    // 二级加入平台申请单
    entity_finance_p_form_2: {
      s_finance_p_form_2_init: {
        status: 's_finance_p_form_2_init'
      },
      s_finance_p_form_2_can_apply: {
        status: 's_finance_p_form_2_can_apply'
      },
      s_finance_p_form_2_has_apply: {
        status: 's_finance_p_form_2_has_apply'
      },
      s_finance_p_form_2_review_pass: {
        status: 's_finance_p_form_2_review_pass'
      },
      s_finance_p_form_2_open_elevisa: {
        status: 's_finance_p_form_2_open_elevisa'
      }
    },
    // 三级加入平台申请单
    entity_finance_p_form_3: {
      s_finance_p_form_3_init: {
        status: 's_finance_p_form_3_init'
      },
      s_finance_p_form_3_can_apply: {
        status: 's_finance_p_form_3_can_apply'
      },
      s_finance_p_form_3_has_apply: {
        status: 's_finance_p_form_3_has_apply'
      },
      s_finance_p_form_3_review_pass: {
        status: 's_finance_p_form_3_review_pass'
      },
      s_finance_p_form_3_open_elevisa: {
        status: 's_finance_p_form_3_open_elevisa'
      }
    },
    // 合同-账款
    entity_finance_contract_account: {
      s_finance_0_1_contract_init: {
        status: 's_finance_0_1_contract_init'
      },
      s_finance_0_1_contract_can_sign: {
        status: 's_finance_0_1_contract_can_sign'
      },
      s_finance_0_1_contract_0_signed: {
        status: 's_finance_0_1_contract_0_signed'
      },
      s_finance_0_1_account_can_create: {
        status: 's_finance_0_1_account_can_create'
      },
      s_finance_0_1_account_0_signed: {
        status: 's_finance_0_1_account_0_signed'
      },
      s_finance_1_2_contract_can_sign: {
        status: 's_finance_1_2_contract_can_sign'
      },
      s_finance_1_2_contract_1_signed: {
        status: 's_finance_1_2_contract_1_signed'
      },
      s_finance_1_2_account_can_create: {
        status: 's_finance_1_2_account_can_create'
      },
      s_finance_1_2_account_1_signed: {
        status: 's_finance_1_2_account_1_signed'
      },
      s_finance_2_3_contract_can_sign: {
        status: 's_finance_2_3_contract_can_sign'
      },
      s_finance_2_3_contract_2_signed: {
        status: 's_finance_2_3_contract_2_signed'
      },
      s_finance_2_3_account_can_create: {
        status: 's_finance_2_3_account_can_create'
      },
      s_finance_2_3_account_2_signed: {
        status: 's_finance_2_3_account_2_signed'
      },
      s_finance_core_can_pay_account: {
        status: 's_finance_core_can_pay_account'
      },
      s_finance_checker_can_verify: {
        status: 's_finance_checker_can_verify'
      },
      s_finance_checker_has_verify: {
        status: 's_finance_checker_has_verify'
      }
    },
    // 一级融资单
    entity_finance_order_1: {
      s_finance_order_1_init: {
        status: 's_finance_order_1_init'
      },
      s_finance_order_1_can_write: {
        status: 's_finance_order_1_can_write'
      },
      s_finance_order_1_can_review: {
        status: 's_finance_order_1_can_review'
      },
      s_finance_order_1_has_review: {
        status: 's_finance_order_1_has_review'
      },
      s_finance_order_1_second_review: {
        status: 's_finance_order_1_second_review'
      },
      s_finance_order_1_has_loan: {
        status: 's_finance_order_1_has_loan'
      }
    },
    // 二级融资单
    entity_finance_order_2: {
      s_finance_order_2_init: {
        status: 's_finance_order_2_init'
      },
      s_finance_order_2_can_write: {
        status: 's_finance_order_2_can_write'
      },
      s_finance_order_2_can_review: {
        status: 's_finance_order_2_can_review'
      },
      s_finance_order_2_has_review: {
        status: 's_finance_order_2_has_review'
      },
      s_finance_order_2_second_review: {
        status: 's_finance_order_2_second_review'
      },
      s_finance_order_2_has_loan: {
        status: 's_finance_order_2_has_loan'
      }
    },
    // 三级融资单
    entity_finance_order_3: {
      s_finance_order_3_init: {
        status: 's_finance_order_3_init'
      },
      s_finance_order_3_can_write: {
        status: 's_finance_order_3_can_write'
      },
      s_finance_order_3_can_review: {
        status: 's_finance_order_3_can_review'
      },
      s_finance_order_3_has_review: {
        status: 's_finance_order_3_has_review'
      },
      s_finance_order_3_second_review: {
        status: 's_finance_order_3_second_review'
      },
      s_finance_order_3_has_loan: {
        status: 's_finance_order_3_has_loan'
      }
    }
  }
}

// 发作动作
export const actionCode = {
  // 发票
  invoice: {
    manager: {
      a_manager_apply_invoice: 'a_manager_apply_invoice',
      a_manager_register: 'a_manager_register',
      a_manager_add_accounting: 'a_manager_add_accounting'
    },
    accounting: {
      a_accounting_login: 'a_accounting_login',
      a_accounting_make_wrong_ticket: 'a_accounting_make_wrong_ticket',
      a_accounting_red_ink: 'a_accounting_red_ink',
      a_accounting_remake_ticket: 'a_accounting_remake_ticket'
    },
    buyer: {
      a_buyer_apply_wrong_ticket: 'a_buyer_apply_wrong_ticket',
      a_buyer_check_wrong_ticket: 'a_buyer_check_wrong_ticket',
      a_buyer_call_customer_services: 'a_buyer_call_customer_services',
      a_buyer_apply_red_ink: 'a_buyer_apply_red_ink',
      a_buyer_check_right_ticket: 'a_buyer_check_right_ticket'
    }
  },
  // 信用证
  lc: {
    a_lc_tongyu_created_contract: 'a_lc_tongyu_created_contract',
    a_lc_weizhen_signed_contract: 'a_lc_weizhen_signed_contract',
    a_lc_weizhen_apply_credit: 'a_lc_weizhen_apply_credit',
    a_lc_bakelai_review_credit: 'a_lc_bakelai_review_credit',
    a_lc_bakelai_open_credit: 'a_lc_bakelai_open_credit',
    a_lc_tongyu_write_bill: 'a_lc_tongyu_write_bill',
    a_lc_tongyu_confirm_send_goods: 'a_lc_tongyu_confirm_send_goods',
    a_lc_jianshe_pay_money_tongyu: 'a_lc_jianshe_pay_money_tongyu',
    a_lc_bakelai_pay_money_jianshe: 'a_lc_bakelai_pay_money_jianshe',
    a_lc_weizhen_pay_money_bakelai: 'a_lc_weizhen_pay_money_bakelai',
    a_lc_weizhen_pick_up_goods: 'a_lc_weizhen_pick_up_goods'
  },
  // 跨境支付
  pay: {
    new: {
      a_pay_new_buy_money: 'a_pay_new_buy_money',
      a_pay_new_write_apply_form: 'a_pay_new_write_apply_form',
      a_pay_new_zhigu_review_form: 'a_pay_new_zhigu_review_form',
      a_pay_new_zhigu_out_money: 'a_pay_new_zhigu_out_money',
      a_pay_new_zhigu_online: 'a_pay_new_zhigu_online',
      a_pay_new_mid_bank_frozen: 'a_pay_new_mid_bank_frozen',
      a_pay_new_usa_sent_receipt: 'a_pay_new_usa_sent_receipt',
      a_pay_new_mid_bank_out_money: 'a_pay_new_mid_bank_out_money',
      a_pay_new_usa_bank_out_money: 'a_pay_new_usa_bank_out_money'
    },
    old: {
      a_pay_old_buy_money: 'a_pay_old_buy_money',
      a_pay_old_write_apply_form: 'a_pay_old_write_apply_form',
      a_pay_old_zhigu_review_form: 'a_pay_old_zhigu_review_form',
      a_pay_old_zhigu_out_money: 'a_pay_old_zhigu_out_money',
      a_pay_old_zhigu_send_msg: 'a_pay_old_zhigu_send_msg',
      a_pay_old_mid_bank_frozen: 'a_pay_old_mid_bank_frozen',
      a_pay_old_usa_bank_review: 'a_pay_old_usa_bank_review',
      a_pay_old_mid_bank_out_money: 'a_pay_old_mid_bank_out_money',
      a_pay_old_usa_bank_out_money: 'a_pay_old_usa_bank_out_money'
    }
  },
  // 保险
  insurance: {
    a_insurance_old_insure: 'a_insurance_old_insure',
    a_insurance_old_click_airport: 'a_insurance_old_click_airport',
    a_insurance_old_customer_call: 'a_insurance_old_customer_call',
    a_insurance_old_apply_delay_prove: 'a_insurance_old_apply_delay_prove',
    a_insurance_old_apply_report: 'a_insurance_old_apply_report',
    a_insurance_old_checker_review: 'a_insurance_old_checker_review',
    a_insurance_old_checker_pay: 'a_insurance_old_checker_pay',
    a_insurance_new_insure: 'a_insurance_new_insure',
    a_insurance_new_click_airport: 'a_insurance_new_click_airport'
  },
  // 供应链金融
  finance: {
    a_finance_sign_auth_contract: 'a_finance_sign_auth_contract',
    a_finance_p_form_0_apply: 'a_finance_p_form_0_apply',
    a_finance_p_form_0_review: 'a_finance_p_form_0_review',
    a_finance_p_form_0_open_elevisa: 'a_finance_p_form_0_open_elevisa',
    a_finance_p_form_1_apply: 'a_finance_p_form_1_apply',
    a_finance_p_form_1_review: 'a_finance_p_form_1_review',
    a_finance_p_form_1_open_elevisa: 'a_finance_p_form_1_open_elevisa',
    a_finance_p_form_2_apply: 'a_finance_p_form_2_apply',
    a_finance_p_form_2_review: 'a_finance_p_form_2_review',
    a_finance_p_form_2_open_elevisa: 'a_finance_p_form_2_open_elevisa',
    a_finance_p_form_3_apply: 'a_finance_p_form_3_apply',
    a_finance_p_form_3_review: 'a_finance_p_form_3_review',
    a_finance_p_form_3_open_elevisa: 'a_finance_p_form_3_open_elevisa',
    a_finance_0_1_contract_0_sign: 'a_finance_0_1_contract_0_sign',
    a_finance_0_1_contract_1_sign: 'a_finance_0_1_contract_1_sign',
    a_finance_0_1_account_0_create: 'a_finance_0_1_account_0_create',
    a_finance_0_1_account_1_sign: 'a_finance_0_1_account_1_sign',
    a_finance_1_2_contract_1_sign: 'a_finance_1_2_contract_1_sign',
    a_finance_1_2_contract_2_sign: 'a_finance_1_2_contract_2_sign',
    a_finance_1_2_account_1_create: 'a_finance_1_2_account_1_create',
    a_finance_1_2_account_2_sign: 'a_finance_1_2_account_2_sign',
    a_finance_2_3_contract_2_sign: 'a_finance_2_3_contract_2_sign',
    a_finance_2_3_contract_3_sign: 'a_finance_2_3_contract_3_sign',
    a_finance_2_3_account_2_create: 'a_finance_2_3_account_2_create',
    a_finance_2_3_account_3_sign: 'a_finance_2_3_account_3_sign',
    a_finance_order_1_apply: 'a_finance_order_1_apply',
    a_finance_order_1_review: 'a_finance_order_1_review',
    a_finance_order_1_second_review: 'a_finance_order_1_second_review',
    a_finance_order_1_loan: 'a_finance_order_1_loan',
    a_finance_order_2_apply: 'a_finance_order_2_apply',
    a_finance_order_2_review: 'a_finance_order_2_review',
    a_finance_order_2_second_review: 'a_finance_order_2_second_review',
    a_finance_order_2_loan: 'a_finance_order_2_loan',
    a_finance_order_3_apply: 'a_finance_order_3_apply',
    a_finance_order_3_review: 'a_finance_order_3_review',
    a_finance_order_3_second_review: 'a_finance_order_3_second_review',
    a_finance_order_3_loan: 'a_finance_order_3_loan',
    a_finance_core_pay_money: 'a_finance_core_pay_money',
    a_finance_checker_verify_account: 'a_finance_checker_verify_account'
  }
}
