import { roleName, roleStatus } from '@/config/index'
export default {
  // 供应链
  bc_supply_chain_finance: [
    {
      routerName: 'supply-chain-home',
      text: `经过磋商，招商银行已对您的企业进行授信评审，现需要签署授信合同，请进入合同应用查看并签署授信合同。`,
      role: [roleName.finance.role_core.roleId],
      status: [roleStatus.finance.entity_finance_general.s_finance_general_init.status],
      entity: 'entity_finance_general'
    },
    {
      routerName: 'supply-chain-credit',
      text: `请检查合同内容，并在对应的盖章位加盖企业公章，完成合同签署后，该合同会保存至工具箱的文件夹中。`,
      role: [roleName.finance.role_core.roleId],
      status: [roleStatus.finance.entity_finance_general.s_finance_general_init.status],
      entity: 'entity_finance_general'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-join-register', 'supply-chain-join-type', 'supply-chain-join-certification'],
      text: `此区块链供应链金融平台是北京招商保理公司发起的基于区块链技术的供应链金融平台，请以核心企业的身份进行注册，注册信息在工具箱-文件夹-企业信息中可以查看。填写完信息后，等待平台管理员审核，审核后方可开通电子签章，用于后续的签章任务。`,
      role: [roleName.finance.role_core.roleId],
      status: [
        roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_can_apply.status,
        roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_has_apply.status,
        roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_review_pass.status,
        roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_open_elevisa.status
      ],
      entity: 'entity_finance_p_form_0'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-join-register', 'supply-chain-join-type', 'supply-chain-join-certification'],
      text: `此区块链供应链金融平台是北京招商保理公司发起的基于区块链技术的供应链金融平台，请以供应商企业的身份进行注册，注册信息在工具箱-文件夹-企业信息中可以查看。填写完信息后，等待平台管理员审核，审核后方可开通电子签章，用于后续的签章任务。`,
      meta: [
        {
          role: roleName.finance.role_first_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_can_apply.status,
            roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_has_apply.status,
            roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_review_pass.status,
            roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_open_elevisa.status
          ],
          entity: 'entity_finance_p_form_1'
        },
        {
          role: roleName.finance.role_second_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_can_apply.status,
            roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_has_apply.status,
            roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_review_pass.status,
            roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_open_elevisa.status
          ],
          entity: 'entity_finance_p_form_2'
        },
        {
          role: roleName.finance.role_third_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_can_apply.status,
            roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_has_apply.status,
            roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_review_pass.status,
            roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_open_elevisa.status
          ],
          entity: 'entity_finance_p_form_3'
        }
      ]
    },
    {
      routerName: [
        'supply-chain-home',
        'supply-chain-sys-core-business',
        'supply-chain-sys-supply',
        'supply-chain-sys-review',
        'supply-chain-sys-review-admin'
      ],
      text: `核心企业或供应商申请加入平台后，你会收到审核申请邮件，按照邮件提示，进入供应链金融平台对核心企业的资料进行审核，准确的企业信息请见工具箱-文件夹-核心企业信息，核对信息无误后，对其进行审核通过操作。`,
      role: [roleName.finance.role_factoring_company.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_init.status],
      entity: 'entity_finance_contract_account'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sign'],
      text: `根据邮件内容，与供应商签署采购合同，注意核实合同内容是否与邮件内容相符。签署的合同会保存在工具箱-文件夹-采购合同中。`,
      meta: [
        {
          role: [roleName.finance.role_core.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_can_sign.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_can_sign.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_second_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_can_sign.status],
          entity: 'entity_finance_contract_account'
        }
      ]
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sign'],
      text: `根据邮件内容，与采购方签署采购合同，注意核实合同内容是否与邮件内容相符。签署的合同会保存在工具箱-文件夹-采购合同中。`,
      meta: [
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_0_signed.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_1_signed.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_2_signed.status],
          entity: 'entity_finance_contract_account'
        }
      ]
    },
    {
      routerName: 'supply-chain-home',
      text: `接收并查看邮件，根据邮件背景，针对此次采购，在区块链供应链金融平台中创建应付账款。合同信息可在工具箱-文件夹-采购合同中查看。`,
      role: [roleName.finance.role_core.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_can_create],
      entity: 'entity_finance_contract_account'
    },
    {
      routerName: ['supply-chain-sys-accounts-payable', 'supply-chain-sys-accounts-payable-add'],
      text: `接收并查看邮件，根据邮件背景，针对此次采购，在区块链供应链金融平台中创建应付账款，账款期限为300天。合同信息可在工具箱-文件夹-采购合同中查看。`,
      role: [roleName.finance.role_core.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_can_create],
      entity: 'entity_finance_contract_account'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sys-transfer-in'],
      text: `在采购方创建完应付账款后会有邮件提示，接收邮件后，登陆供应链金融平台，查看应收账款，对应收账款进行签收操作，签收时，请认真检查账款金额等信息。也可通过“详情”查看账款对应的链上数据信息。签收完成后，返回主页等待新的任务邮件。`,
      role: [roleName.finance.role_first_supplier.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_0_signed.status],
      entity: 'entity_finance_contract_account'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sys-transfer-out', 'supply-chain-sys-transfer-out-add'],
      text: `接收并查看邮件，根据邮件背景，针对此次采购，在区块链供应链金融平台中拆分应付账款。合同信息可在工具箱-文件夹-采购合同中查看。`,
      meta: [
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_can_create.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_second_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_can_create.status],
          entity: 'entity_finance_contract_account'
        }
      ]
    },
    {
      routerName: ['supply-chain-home', ''],
      text: `采购方以转让应收账款的形式进行支付，在采购方转让应付账款后会有邮件提示，接收邮件后，登陆供应链金融平台，查看应收账款，对应收账款进行签收操作，签收时，请认真检查账款金额等信息。也可通过“详情”查看账款对应的链上数据信息。签收完成后，返回主页等待新的任务邮件。`,
      meta: [
        {
          role: [roleName.finance.role_second_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_1_signed.status],
          entity: 'entity_finance_contract_account'
        },
        {
          role: [roleName.finance.role_third_supplier.roleId],
          status: [roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_2_signed.status],
          entity: 'entity_finance_contract_account'
        }
      ]
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sys-financing', 'supply-chain-financing-add'],
      text: `阅读邮件内容，根据融资需求，在供应链金融平台-融资管理中创建正确的融资单发起融资申请，申请后等待保理商和资金方进行融资审核，审核完成后进行签章操作。`,
      meta: [
        {
          role: roleName.finance.role_first_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_order_1.s_finance_order_1_can_write.status,
            roleStatus.finance.entity_finance_order_1.s_finance_order_1_can_review.status,
            roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_review.status,
            roleStatus.finance.entity_finance_order_1.s_finance_order_1_second_review.status,
            roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_loan.status
          ],
          entity: 'entity_finance_order_1'
        },
        {
          role: roleName.finance.role_second_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_order_2.s_finance_order_2_can_write.status,
            roleStatus.finance.entity_finance_order_2.s_finance_order_2_can_review.status,
            roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_review.status,
            roleStatus.finance.entity_finance_order_2.s_finance_order_2_second_review.status,
            roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_loan.status
          ],
          entity: 'entity_finance_order_2'
        },
        {
          role: roleName.finance.role_third_supplier.roleId,
          status: [
            roleStatus.finance.entity_finance_order_3.s_finance_order_3_can_write.status,
            roleStatus.finance.entity_finance_order_3.s_finance_order_3_can_review.status,
            roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_review.status,
            roleStatus.finance.entity_finance_order_3.s_finance_order_3_second_review.status,
            roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_loan.status
          ],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: 'supply-chain-home',
      text: `针对融资信息进行审核，需要确保应收账款的真实性，可通过链上数据进行追溯。审核通过后，将由资金部门进行复核。`,
      meta: [
        {
          role: [roleName.finance.role_factoring_company.roleId],
          status: [roleStatus.finance.entity_finance_order_1.s_finance_order_1_can_review],
          entity: 'entity_finance_order_1'
        },
        {
          role: [roleName.finance.role_factoring_company.roleId],
          status: [roleStatus.finance.entity_finance_order_2.s_finance_order_2_can_review],
          entity: 'entity_finance_order_2'
        },
        {
          role: [roleName.finance.role_factoring_company.roleId],
          status: [roleStatus.finance.entity_finance_order_3.s_finance_order_3_can_review],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: 'supply-chain-sys-review-financing',
      text: `针对融资信息进行审核，需要确保应收账款的真实性，可通过链上数据进行追溯。审核通过后，将由资金部门进行复核。`,
      role: [roleName.finance.role_factoring_company.roleId],
      status: true
    },
    {
      routerName: 'supply-chain-home',
      text: `针对融资信息进行复核，需要确保应收账款的真实性，可通过链上数据进行追溯。复核通过后将由资金方进行放款操作。`,
      meta: [
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_review.status],
          entity: 'entity_finance_order_1'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_review.status],
          entity: 'entity_finance_order_2'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_review.status],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: 'supply-chain-sys-funder-review-financing',
      text: `针对融资信息进行复核，需要确保应收账款的真实性，可通过链上数据进行追溯。复核通过后将由资金方进行放款操作。`,
      meta: [
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_review.status],
          entity: 'entity_finance_order_1'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_review.status],
          entity: 'entity_finance_order_2'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_review.status],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: 'supply-chain-sys-funder-review-financing',
      text: `复核通过后将由资金方进行放款操作。确定放款后，融资申请方将会接收到融资款。`,
      meta: [
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_1.s_finance_order_1_second_review.status],
          entity: 'entity_finance_order_1'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_2.s_finance_order_2_second_review.status],
          entity: 'entity_finance_order_2'
        },
        {
          role: [roleName.finance.role_cmb_checker.roleId],
          status: [roleStatus.finance.entity_finance_order_3.s_finance_order_3_second_review.status],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: 'supply-chain-home',
      text: `资金方放款后，将以邮件的方式通知给您，为转让或融资的应收账款，请等待核心企业最后的清偿账款。`,
      meta: [
        {
          role: [roleName.finance.role_first_supplier.roleId],
          status: [roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_loan.status],
          entity: 'entity_finance_order_1'
        },
        {
          role: [roleName.finance.role_second_supplier.roleId],
          status: [roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_loan.status],
          entity: 'entity_finance_order_2'
        },
        {
          role: [roleName.finance.role_third_supplier.roleId],
          status: [roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_loan.status],
          entity: 'entity_finance_order_3'
        }
      ]
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sys-payment'],
      text: `应收账款已接近到期日，请尽快清偿账款，完成清偿后，请在系统中进行对账操作，以完成最终清偿支付。`,
      role: [roleName.finance.role_core.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_core_can_pay_account.status],
      entity: 'entity_finance_contract_account'
    },
    {
      routerName: ['supply-chain-home', 'supply-chain-sys-checker-payment'],
      text: `核心企业北京神盾汽车集团有限公司已经清偿账款，请在供应链金融平台-支付管理中认真核对清偿信息，完成对账。`,
      role: [roleName.finance.role_cmb_checker.roleId],
      status: [roleStatus.finance.entity_finance_contract_account.s_finance_checker_can_verify.status],
      entity: 'entity_finance_contract_account'
    }
  ],
  // 发票
  bc_invoice: [
    {
      routerName: 'invoices-home',
      meta: [
        {
          role: roleName.invoice.manager.roleId,
          status: [
            {
              status_id: 's_manager_init',
              text:
                '请打开北京市税务局网页，并完成实名注册。注册信息可虚拟，但格式要符合填写项的正确格式，注册后信息不可更改。填写完注册信息后，绑定相关企业，注册完成。',
              entity: 'role_manager'
            },
            {
              status_id: 's_manager_registered',
              text:
                '集团已经上线了自主研发的票链平台，并与区块链电子发票系统完成对接，但想要进行发票开具，还需在系统中增加开票人账户，请进入票链平台，为公司会计新增开票人账户。',
              entity: 'role_manager'
            }
          ]
        },
        {
          role: roleName.invoice.accounting.roleId,
          status: [
            {
              status_id: 's_accounting_can_login',
              text: '请等待财务总经理为你开通开票员账号，开通后会以短信的形式通知你，在接到短信后，请登陆票链平台。',
              entity: 'role_accounting'
            },
            {
              status_id: 's_accounting_can_make_wrong_ticket',
              text: '请等待开票请求，接收到开票请求时会在“待开查询”出现提示，请通过代开查询进行发票填写并开票。',
              entity: 'role_accounting'
            },
            {
              status_id: 's_accounting_has_apply_red_ink',
              text: '请等待新的开票请求，如有红冲发票请求会议邮件的形式通知到你，请根据邮件内容进行红冲操作并重新开具新的发票。',
              entity: 'role_accounting'
            }
          ]
        },
        {
          role: roleName.invoice.buyer.roleId,
          status: [
            {
              status_id: ['s_accounting_init', 's_buyer_can_buy'],
              text: '请等待开票员准备就绪，之后会受到采购请求，请按照采购请求进行商品采购并申请开具发票。',
              entity: 'role_buyer'
            },
            {
              status_id: 's_buyer_has_apply_wrong_ticket',
              text: '申请的发票会以邮件的形式发给您，收到发票后请仔细检查发票信息并与公司信息核对，发现错误后请在商城通过客服反馈错误。',
              entity: 'role_buyer'
            },
            {
              status_id: ['s_buyer_has_apply_red_ink', 's_buyer_has_remake_ticket'],
              text:
                '反馈错误后，请等待新的发票，新发票会以邮件的形式发送给您，收到后请仔细检查发票信息并与公司信息核对，无误后请通过“发票查询”应用进行发票查验。',
              entity: 'role_buyer'
            }
          ]
        }
      ]
    },
    {
      routerName: 'invoices-tax-bureau',
      text:
        '请打开北京市税务局网页，并完成实名注册。注册信息可虚拟，但格式要符合填写项的正确格式，注册后信息不可更改。填写完注册信息后，绑定相关企业，注册完成。',
      pass: true
    },
    {
      routerName: 'invoices-tax-bureau-register',
      text:
        '请打开北京市税务局网页，并完成实名注册。注册信息可虚拟，但格式要符合填写项的正确格式，注册后信息不可更改。填写完注册信息后，绑定相关企业，注册完成。',
      pass: true
    },
    {
      routerName: 'invoices-ticket-office2',
      text: '在税务局网站中，点击“区块链电子发票申请”，进入申请开通的流程，企业信息可在工具箱中的“企业信息”文件中查询。',
      pass: true
    },
    {
      routerName: 'invoices-invoice',
      meta: [
        {
          role: true,
          status: [
            {
              status_id: 's_manager_init',
              text: '在税务局网站中，点击“区块链电子发票申请”，进入申请开通的流程，企业信息可在工具箱中的“企业信息”文件中查询。',
              entity: 'role_manager'
            },
            {
              status_id: 's_manager_invoice_requested',
              text:
                '点击开票模式，进入开票模式的选择，“代理开票”模式适合中小商户，“自主开票”模式适合有自主开发能力的大型企业，在本案例中，宇通集团自主开发了开票系统。',
              entity: 'role_manager'
            }
          ]
        }
      ]
    },
    {
      routerName: 'invoices-invoice-application',
      text: '在税务局网站中，点击“区块链电子发票申请”，进入申请开通的流程，企业信息可在工具箱中的“企业信息”文件中查询。',
      pass: true
    },
    {
      routerName: 'invoices-invoice-mode',
      text:
        '点击开票模式，进入开票模式的选择，“代理开票”模式适合中小商户，“自主开票”模式适合有自主开发能力的大型企业，在本案例中，宇通集团自主开发了开票系统。开票模式选择完成后，点击“秘钥管理”查看秘钥。',
      pass: true
    },
    {
      routerName: 'invoices-invoice-check',
      text:
        '点击开票模式，进入开票模式的选择，“代理开票”模式适合中小商户，“自主开票”模式适合有自主开发能力的大型企业，在本案例中，宇通集团自主开发了开票系统。',
      pass: true
    },
    {
      routerName: 'invoices-invoice-key',
      text: '点击“复制全部”复制秘钥，复制后的秘钥会存储在工具箱中的”秘钥信息“文件中。',
      pass: true
    },
    {
      routerName: 'invoices-platform-login',
      text:
        '集团已经上线了自主研发的票链平台，并与区块链电子发票系统完成对接，但想要进行发票开具，还需在系统中增加开票人账户，请进入票链平台，为公司会计新增开票人账户。',
      pass: true
    },
    {
      routerName: 'invoices-platform-user',
      meta: [
        {
          role: true,
          status: [
            {
              status_id: 's_manager_registered',
              text:
                '集团已经上线了自主研发的票链平台，并与区块链电子发票系统完成对接，但想要进行发票开具，还需在系统中增加开票人账户，请进入票链平台，为公司会计新增开票人账户。',
              entity: 'role_manager'
            },
            {
              status_id: 's_manager_accounting_created',
              text: '开票员账户已成功添加，你在本实训中的任务已经完成，请与同学们一起了解其他角色的任务内容吧！',
              entity: 'role_manager'
            }
          ]
        }
      ]
    },
    {
      routerName: 'invoices-accounting-platform-login',
      text: '请等待财务总经理为你开通开票员账号，开通后会以短信的形式通知你，在接到短信后，请登陆票链平台。',
      pass: true
    },
    {
      routerName: 'invoices-platform-invoicing',
      text: '请等待开票请求，接收到开票请求时会在“待开查询”出现提示，请通过代开查询进行发票填写并开票。',
      pass: true
    },
    {
      routerName: 'invoices-product-list',
      meta: [
        {
          role: true,
          status: [
            {
              status_id: 's_buyer_can_buy',
              text: '请等待开票员准备就绪，之后会受到采购请求，请按照采购请求进行商品采购并申请开具发票。',
              entity: 'role_buyer'
            },
            {
              status_id: 's_buyer_has_check_wrong_ticket',
              text: '申请的发票会以邮件的形式发给您，收到发票后请仔细检查发票信息并与公司信息核对，发现错误后请在商城通过客服反馈错误。',
              entity: 'role_buyer'
            }
          ]
        }
      ]
    },
    {
      routerName: 'invoices-product-detail',
      text: '请等待开票员准备就绪，之后会受到采购请求，请按照采购请求进行商品采购并申请开具发票。',
      pass: true
    },
    {
      routerName: 'invoices-product-success',
      text: '请等待开票员准备就绪，之后会受到采购请求，请按照采购请求进行商品采购并申请开具发票。',
      pass: true
    },
    {
      routerName: 'invoices-invoice-apply',
      text: '请等待开票员准备就绪，之后会受到采购请求，请按照采购请求进行商品采购并申请开具发票。',
      pass: true
    },
    {
      routerName: 'invoices-platform-list',
      text: '请等待新的开票请求，如有红冲发票请求会议邮件的形式通知到你，请根据邮件内容进行红冲操作并重新开具新的发票。',
      pass: true
    },
    {
      routerName: 'invoices-platform-red-punch',
      text: '请等待新的开票请求，如有红冲发票请求会议邮件的形式通知到你，请根据邮件内容进行红冲操作并重新开具新的发票。',
      pass: true
    },
    {
      routerName: 'invoices-check-invoice',
      text: '反馈错误后，请等待新的发票，新发票会以邮件的形式发送给您，收到后请仔细检查发票信息并与公司信息核对，无误后请通过“发票查询”应用进行发票查验。',
      pass: true
    },
    {
      routerName: 'invoices-check-result',
      text: '反馈错误后，请等待新的发票，新发票会以邮件的形式发送给您，收到后请仔细检查发票信息并与公司信息核对，无误后请通过“发票查询”应用进行发票查验。',
      pass: true
    }
  ],
  // 信用证
  bc_lc: [
    {
      routerName: 'lc-map',
      meta: [
        {
          role: roleName.lc.role_tongyu.roleId,
          text: '找到地图上的通宇集团，进入信用证操作页面',
          status: true
        },
        {
          role: roleName.lc.role_weizhen.roleId,
          text: '收到合同签署信息，点击地图上的维珍集团，进入操作页面',
          status: true
        },
        {
          role: roleName.lc.role_bakelai_bank.roleId,
          text: '收到信用证申请信息，点击地图上的巴克莱银行，进入操作页面',
          status: true
        },
        {
          role: roleName.lc.role_jianshe_bank.roleId,
          text: '收到出口商已发货的通知后，点击地图上的建设银行，进入操作页面',
          status: true
        }
      ]
    },
    {
      routerName: 'lc-overview',
      meta: [
        {
          role: roleName.lc.role_tongyu.roleId,
          status: [
            {
              status_id: 's_lc_contract_init',
              text: '通宇集团已经收到了来自英国维珍集团的货物订单，请进行出口合同的签订。',
              entity: 'entity_contract'
            },
            {
              status_id: 's_lc_contract_seller_signed',
              text: '签署后，等待英国维珍集团的签署。',
              entity: 'entity_contract'
            },
            {
              status_id: 's_lc_credit_has_open',
              text: '收到信用证开立的信息后，到港装货获取提单。',
              entity: 'entity_credit'
            },
            {
              status_id: 's_lc_bill_belong_tongyu',
              text: '信用证状态改变为已到岸，提单已经由通宇集团获取，请进行下一步操作',
              entity: 'entity_bill'
            }
          ]
        },
        {
          role: roleName.lc.role_weizhen.roleId,
          status: [
            {
              status_id: 's_lc_contract_seller_signed',
              text: '维珍集团收到通宇集团的单方签署合同，请进行合同的签署。',
              entity: 'entity_contract'
            },
            {
              status_id: 's_lc_contract_signed_success',
              text: '合同成功签约后，可进行信用证的申请。',
              entity: 'entity_contract'
            }
          ]
        },
        {
          role: roleName.lc.role_bakelai_bank.roleId,
          status: [
            {
              status_id: ['s_lc_credit_init', 's_lc_credit_has_apply'],
              text: '请等待维珍集团信用证的申请',
              entity: 'entity_credit'
            }
          ]
        },
        {
          role: roleName.lc.role_jianshe_bank.roleId,
          status: [
            {
              status_id: 's_lc_credit_has_send_goods',
              text: '收到出口商已发货的通知后，进行垫付',
              entity: 'entity_credit'
            }
          ]
        }
      ]
    },
    {
      routerName: 'lc-cre-contract',
      text: `通宇集团已经收到了来自英国维珍集团的货物订单，请进行出口合同的签订。`,
      pass: true
    },
    {
      routerName: 'lc-cre-contract',
      text: `查看无误后，进行签署。`,
      pass: true
    },
    {
      routerName: 'lc-cre-lc',
      text: `所填信息可以从工具箱中获取`,
      pass: true
    },
    {
      routerName: 'lc-view-lc',
      text: `审核信用证申请书是否有误`,
      pass: true
    },
    {
      routerName: 'lc-register-lc',
      text: `可以从工具箱中获取信息`,
      pass: true
    },
    {
      routerName: 'lc-cre-bill',
      text: `从工具箱中获取提单所需填的信息，并获取此提单。`,
      pass: true
    }
  ],
  // 保险
  bc_insurance: [
    {
      routerName: 'insurance-buy-ticket',
      text: '机票已经存入工具箱，阅读完后请进入下一步',
      pass: true
    },
    {
      routerName: 'insurance-home',
      text: '先进行互联网延误险，再进行区块链延误险',
      pass: true
    },
    {
      routerName: 'insurance-type',
      text: '先进行互联网延误险，再进行区块链延误险',
      pass: true
    },
    {
      routerName: 'insurance-traditional-buy-insurance',
      text: '请根据机票提供的信息进行填写，《投保须知》《保险条款》《平台服务协议》可在工具箱中查看',
      pass: true
    },
    {
      routerName: 'insurance-traditional-proof-application',
      text: '填写相关信息',
      pass: true
    },
    {
      routerName: 'insurance-traditional-proof-application2',
      text: '延误证明将存入工具箱中',
      pass: true
    },
    {
      routerName: 'insurance-traditional-search-insurance',
      text: '进行保单查询',
      pass: true
    },
    {
      routerName: 'insurance-traditional-insurance-inspect',
      text: '请对张晓明的理赔申请进行审核和赔付',
      pass: true
    },
    {
      routerName: 'insurance-cochain-buy-delay-insurance',
      text: '请根据机票提供的信息进行填写，《投保须知》《保险条款》《平台服务协议》可在工具箱中查看',
      pass: true
    },
    {
      routerName: 'insurance-cochain-contract-monitor',
      text: '请结合区块链浏览器的信息来理解',
      pass: true
    },
    {
      routerName: 'insurance-menu',
      meta: [
        {
          role: true,
          status: [
            {
              status_id: 's_insurance_old_init',
              text: '请立即投保',
              entity: 'entity_insurance'
            },
            {
              status_id: 's_insurance_old_plane_has_delay',
              text: '进行客服咨询，询问理赔流程',
              entity: 'entity_insurance'
            },
            {
              status_id: 's_insurance_old_got_delay_prove',
              text: '进行理赔申请',
              entity: 'entity_insurance'
            },
            {
              status_id: 's_insurance_old_has_report',
              text: '进行保单查询',
              entity: 'entity_insurance'
            },
            {
              status_id: 's_insurance_new_init',
              text: '请立即投保',
              entity: 'entity_insurance'
            },
            {
              status_id: 's_insurance_new_has_effect',
              text: '进行保单查询',
              entity: 'entity_insurance'
            }
          ]
        }
      ]
    }
  ],
  // 跨境支付
  bc_cross_border_payments: [
    {
      routerName: 'pay-task',
      meta: [
        {
          role: 'role_remitter',
          status: [
            {
              status_id: ['s_pay_old_init', 's_pay_new_init'],
              text: ` 首先汇款人应该先自行购汇，将账户中的人民币换为美元后，再进行汇款。
                （智谷银行提供外汇购汇功能）`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_old_remitter_buy_success', 's_pay_new_remitter_buy_success'],
              text: ` 购汇成功后，可在工具箱手机短信中收到美元到账短信。
                收到到账短信后可进行申请汇款，填写跨境汇款申请单。`,
              entity: 'entity_payment'
            }
          ]
        },
        {
          role: 'role_zhigu_bank',
          status: [
            {
              status_id: ['s_pay_old_has_write_form'],
              text: ` 传统：
                智谷银行柜员进行日常汇款申请的信息审核及账户资金划转。
                并且在每天下午 5：00 进行跨境支付业务处理。`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_has_write_form'],
              text: ` 区块链：
                  智谷银行柜员进行日常汇款申请的信息审核及账户资金划转。
                  跨境支付业务审核通过后，既进行交易上链。`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_old_zhigu_has_out_money'],
              text: `请进行跨境支付业务处理`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_zhigu_has_out_money'],
              text: `请进行跨境支付交易上链`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_zhigu_has_online'],
              text: `请进行查看上链账本`,
              entity: 'entity_payment'
            }
          ]
        },
        {
          role: 'role_mid_bank',
          status: [
            {
              status_id: ['s_pay_old_zhigu_has_send_msg', 's_pay_old_mid_has_frozen', 's_pay_old_usa_has_review'],
              text: ` 传统：中国工商银行纽约分行柜员收到智谷银行发送的报文后，进行汇款信息审核，审核通过后冻结智谷银行在该行的账户上的相应资金。 `,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_old_mid_can_out_money'],
              text: `请进行资金划转`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_zhigu_has_online', 's_pay_new_mid_has_frozen', 's_pay_new_usa_has_sent_receipt'],
              text: `区块链：注意这里区块链跨境支付平台操作在实际中时系统自动通过智能合约执行的，但是为了让同学们体验到这一步重要流程，我们模拟了区块链系统操作员这一角色。
                区块链跨境支付平台上的各节点会对新建立的交易进行验证，交易验证通过后，通过智能合约对智谷银行链上账户中相应的资金进行冻结，收到收款行给的回执后再通过智能合约对资金进行划转。`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_mid_can_out_money'],
              text: `请进行账户划转`,
              entity: 'entity_payment'
            }
          ]
        },
        {
          role: 'role_usa_bank',
          status: [
            {
              status_id: ['s_pay_old_zhigu_has_send_msg', 's_pay_old_mid_has_frozen', 's_pay_old_usa_has_review', 's_pay_old_mid_has_out_money'],
              text: ` 传统：美国银行柜员收到智谷银行发送的报文后，进行汇款信息审核。`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_zhigu_has_online', 's_pay_new_mid_has_frozen', 's_pay_new_usa_has_sent_receipt'],
              text: ` 区块链：、交易上链后，美国银行进行链上交易审核，发送回执。收到转账后，将汇款转入收款人账户。`,
              entity: 'entity_payment'
            },
            {
              status_id: ['s_pay_new_mid_has_out_money'],
              text: `请进行账户划转`,
              entity: 'entity_payment'
            }
          ]
        }
      ]
    },
    {
      routerName: 'pay-buy-remit',
      text: ' 首先汇款人应该先自行购汇，将账户中的人民币换为美元后，再进行汇款。（智谷银行提供外汇购汇功能） ',
      pass: true
    },
    {
      routerName: 'pay-buy-remit-clause',
      text: '首先汇款人应该先自行购汇，将账户中的人民币换为美元后，再进行汇款。',
      pass: true
    },
    {
      routerName: 'pay-buy-remit-apply',
      text: '首先汇款人应该先自行购汇，将账户中的人民币换为美元后，再进行汇款。购汇账户为王小凯私人卡号。 ',
      pass: true
    },
    {
      routerName: 'pay-remit-mode',
      text: `购汇成功后，可在工具箱手机短信中收到美元到账短信。
        收到到账短信后可进行申请汇款， 填写跨境汇款申请单。`,
      pass: true
    },
    {
      routerName: 'pay-cre-remit',
      text: `购汇成功后，可在工具箱手机短信中收到美元到账短信。
  收到到账短信后可进行申请汇款，填写跨境汇款申请单。
  （申请汇款所需信息可在工具箱中下载相关PDF 文档查看）`,
      pass: true
    },
    {
      routerName: 'pay-zhigu-remit-inspect-list',
      text: `传统：
  智谷银行柜员进行日常汇款申请的信息审核及账户资金划转。
  并且在每天下午 5：00 进行跨境支付业务处理。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-remit-inspect`,
      text: ` 传统：
  智谷银行柜员进行日常汇款申请的信息审核，相关信息填写，及账户资金划转`,
      pass: true
    },
    {
      routerName: `pay-middle-tradition-transfer`,
      text: `传统：
  智谷银行柜员进行日常汇款申请的信息审核，相关信息填写，及账户资金划转。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-tradition-list`,
      text: `传统：
  智谷银行柜员每天下午 5：00 进行跨境支付业务处理，进行跨境汇款信息审核，通过SWIFT，向中间行中国工商银行纽约分行及收款行美国银行发送报文，收取电报费。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-tradition-inspect`,
      text: ` 传统：
  智谷银行柜员每天下午 5：00 进行跨境支付业务处理，进行跨境汇款信息审核，通过SWIFT发送报文，收取电报费。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-cochain-list`,
      text: ` 区块链：
  智谷银行柜员在交易上链时，首先需要对上链信息进行审核，签名，然后提交。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-cochain-inspect`,
      text: ` 区块链：
  智谷银行柜员在交易上链时，首先需要对上链信息进行审核，签名，然后提交。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-cochain-hash-list`,
      text: ` 区块链：
  智谷银行柜员在交易上链时，首先需要对上链信息进行审核，签名，然后提交。
  可根据交易哈希值查看链上交易信息。`,
      pass: true
    },
    {
      routerName: `pay-zhigu-cochain-hash-detail`,
      text: ` 区块链：
  智谷银行柜员在交易上链时，首先需要对上链信息进行审核，签名，然后提交。
  可根据交易哈希值查看链上交易信息。`,
      pass: true
    },
    {
      routerName: `pay-middle-tradition-list`,
      text: ` 传统：
  中国工商银行纽约分行柜员收到智谷银行发送的报文后，进行汇款信息审核，审核通过后冻结智谷银行在该行的账户上的相应资金。`,
      pass: true
    },
    {
      routerName: `pay-middle-tradition-inspect`,
      meta: [
        {
          role: true,
          status: [
            {
              status_id: 's_pay_new_zhigu_has_online',
              text: ` 传统：中国工商银行纽约分行柜员收到智谷银行发送的报文后，进行汇款信息审核，审核通过后冻结智谷银行在该行的账户上的相应资金。`,
              entity: 'entity_payment'
            },
            {
              status_id: 's_pay_new_mid_can_out_money',
              text: `王小凯今年正在美国的斯坦福大学读大二，马上要开学了，王小凯的父亲王大大需要通过跨境汇款将下个月的生活费 2000 美金汇给王小凯。
                父亲王大大在中国智谷银行开通了银行卡，王小凯在美国银行（Bank of America）开有银行账户。
                请你模拟两种不同的汇款方式（传统跨境支付和区块链跨境支付）将钱汇给王小凯。

                下面是你可能会用到的信息：
                汇出银行：中国智谷银行，成都万象南路分行（智谷银行为区块链跨境支付平台会员）
                王大大智谷银行卡号为：6215 0099 0000 5555 （父亲王大大购汇账户和汇款账户为同一账户）
                跨境收款银行：美国银行（Bank of America）
                王小凯美国银行卡号为：4367 9999 0000 6666

                智谷银行跨境支付手续费：0.1%
                美国银行跨境支付手续费：0.1%
                传统跨境支付 SWIFT 电报费：30美元/笔`,
              entity: 'entity_payment'
            }
          ]
        }
      ]
    },
    {
      routerName: `pay-middle-cochain-hash-list`,
      text: ` 区块链：
  注意这里区块链跨境支付平台操作在实际中时系统自动通过智能合约执行的，但是为了让同学们体验到这一步重要流程，我们模拟了区块链系统操作员这一角色。
  区块链跨境支付平台上的各节点会对新建立的交易进行验证，交易验证通过后，通过智能合约对智谷银行链上账户中相应的资金进行冻结，收到收款行给的回执后再通过智能合约对资金进行划转。`,
      pass: true
    },
    {
      routerName: `pay-middle-cochain-hash-node`,
      text: ` 区块链：
  注意这里区块链跨境支付平台操作在实际中时系统自动通过智能合约执行的，但是为了让同学们体验到这一步重要流程，我们模拟了区块链系统操作员这一角色。
  区块链跨境支付平台上的各节点会对新建立的交易进行验证，交易验证通过后，通过智能合约对智谷银行链上账户中相应的资金进行冻结，收到收款行给的回执后再通过智能合约对资金进行划转。`,
      pass: true
    },
    {
      routerName: `pay-middle-cochain-transfer`,
      text: ` 区块链：
  注意这里区块链跨境支付平台操作在实际中时系统自动通过智能合约执行的，但是为了让同学们体验到这一步重要流程，我们模拟了区块链系统操作员这一角色。
  区块链跨境支付平台上的各节点会对新建立的交易进行验证，交易验证通过后，通过智能合约对智谷银行链上账户中相应的资金进行冻结，收到收款行给的回执后再通过智能合约对资金进行划转。`,
      pass: true
    },
    {
      routerName: `pay-middle-cochain-hash-detail`,
      text: ` 区块链：
        注意这里区块链跨境支付平台操作在实际中时系统自动通过智能合约执行的，但是为了让同学们体验到这一步重要流程，我们模拟了区块链系统操作员这一角色。
        区块链跨境支付平台上的各节点会对新建立的交易进行验证，交易验证通过后，通过智能合约对智谷银行链上账户中相应的资金进行冻结，收到收款行给的回执后再通过智能合约对资金进行划转。`,
      pass: true
    },
    {
      routerName: `pay-goal-tradition-list`,
      text: ` 传统：
  美国银行柜员收到智谷银行发送的报文后，进行汇款信息审核。
  美国银行收到中间行划转的资金后，再将资金划转到个人账户。`,
      pass: true
    },
    {
      routerName: `pay-goal-tradition-inspect`,
      text: ` 传统：
  美国银行柜员收到智谷银行发送的报文后，进行汇款信息审核。`,
      pass: true
    },
    {
      routerName: `pay-goal-tradition-transfer`,
      text: `传统： 美国银行收到中间行划转的资金后，再将资金划转到个人账户，并收取手续费。
  提交成功后，汇款人工具箱（页面 1）邮件通知-汇款已到账`,
      pass: true
    },
    {
      routerName: `pay-goal-cochain-hash-list`,
      text: `区块链：
  交易上链后，美国银行进行链上交易审核，发送回执。
  收到转账后，将汇款转入收款人账户。`,
      pass: true
    },
    {
      routerName: `pay-goal-cochain-hash-detail`,
      text: ` 区块链：
  交易上链后，美国银行进行链上交易审核，发送回执。
  收到转账后，将汇款转入收款人账户。`,
      pass: true
    },
    {
      routerName: `pay-goal-cochain-transfer`,
      text: `区块链：
  交易上链后，美国银行进行链上交易审核，发送回执。
  收到转账后，将汇款转入收款人账户并收取手续费。`,
      pass: true
    }
  ]
}
