const path = {
  bc_invoice: '/pdf/invoice',
  bc_lc: '/pdf/lc',
  bc_cross_border_payments: '/pdf/pay',
  bc_insurance: '/pdf/insurance',
  bc_supply_chain_finance: '/pdf/sc'
}

export const folder_list = {
  bc_invoice: [
    {
      path: `${path.bc_invoice}/北京通宇集团有限公司信息.pdf`,
      title: '北京通宇集团有限公司信息 '
    },
    {
      path: `${path.bc_invoice}/采购商公司信息.pdf`,
      title: '采购商公司信息 '
    },
    {
      path: `${path.bc_invoice}/采购商品信息.pdf`,
      title: '采购商品信息 '
    }
  ],
  bc_lc: [
    {
      path: `${path.bc_lc}/贸易信息.pdf`,
      title: '贸易信息'
    }
    // {
    //   path: `${path.bc_lc}/贸易合同.pdf`,
    //   title: '贸易合同 '
    // },
    // {
    //   path: `${path.bc_lc}/提单.pdf `,
    //   title: '提单 '
    // },
    // {
    //   path: `${path.bc_lc}/信用证开立申请书.pdf `,
    //   title: '信用证开立申请书 '
    // },
    // {
    //   path: `${path.bc_lc}/信用证.pdf`,
    //   title: '信用证 '
    // }
  ],
  bc_cross_border_payments: [
    {
      path: `${path.bc_cross_border_payments}/填写表单所需信息.pdf`,
      title: '填写表单所需信息 '
    }
  ],
  bc_insurance: [
    // {
    //   path: `${path.bc_insurance}/机票信息.pdf`,
    //   title: '机票信息 '
    // },
    // {
    //   path: `${path.bc_insurance}/投保人信息.pdf`,
    //   title: '投保人信息 '
    // },
    // {
    //   path: `${path.bc_insurance}/航空延误证明.pdf`,
    //   title: '航空延误证明 '
    // },
    // {
    //   path: `${path.bc_insurance}/互联网保单信息.pdf`,
    //   title: '互联网保单信息 '
    // },
    // {
    //   path: `${path.bc_insurance}/区块链保单信息.pdf`,
    //   title: '区块链保单信息 '
    // }
  ],
  bc_supply_chain_finance: [
    { path: `${path.bc_supply_chain_finance}/conpany1.pdf`, title: '北京神盾汽车集团有限公司企业信息' },
    { path: `${path.bc_supply_chain_finance}/conpany2.pdf`, title: '浙江百维科技有限公司企业信息' },
    { path: `${path.bc_supply_chain_finance}/conpany3.pdf`, title: '四川海洋科技有限公司企业信息' },
    { path: `${path.bc_supply_chain_finance}/conpany4.pdf`, title: '深圳瑞光科技有限公司企业信息' },
    { path: `${path.bc_supply_chain_finance}/contract1.pdf`, title: '北京神盾汽车集团有限公司授信合同' },
    { path: `${path.bc_supply_chain_finance}/contract2.pdf`, title: '车载物联网集成系统采购合同' },
    { path: `${path.bc_supply_chain_finance}/contract3.pdf`, title: '车载智能终端采购合同' },
    { path: `${path.bc_supply_chain_finance}/contract4.pdf`, title: '屏幕面板采购合同' }
  ]
}
