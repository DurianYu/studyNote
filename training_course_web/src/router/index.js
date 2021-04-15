/**
 * meta: {
 * role:Array - 能访问当前页面的角色
 * accessStatus: Array - 能访问当前页面的状态
 * }
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import { roleName, roleStatus } from '../config/index'

Vue.use(VueRouter)

const _import_ = file => () => import('../views/' + file + '.vue')

const routes = [
  {
    path: '/flow-process',
    name: 'flow-process',
    component: _import_('flow-process/index')
  },
  {
    path: '/status-list',
    name: 'status-list',
    component: _import_('status-list/index')
  },
  {
    path: '/platform-home',
    name: 'platform-home',
    component: _import_('platform-home/index')
  },
  {
    path: '/',
    name: 'scene',
    component: _import_('scene-map/index')
  },
  {
    path: '/scene-teacher',
    name: 'scene-teacher',
    component: _import_('scene-map/index')
  },
  {
    path: '/scene-introduction/:id',
    name: 'scene-introduction',
    component: _import_('scene-map/introduction')
  },
  {
    path: '/training-detail',
    name: 'training-detail',
    component: _import_('scene-map/training-detail')
  },
  {
    path: '/scene-role',
    name: 'scene-role',
    component: _import_('scene-map/role')
  },
  {
    path: '/scene-role-distribution',
    name: 'scene-role-distribution',
    component: _import_('scene-map/role-distribution')
  },
  {
    path: '/pre-job-training',
    name: 'pre-job-training',
    component: _import_('scene-map/pre-job-training')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/invoices/home',
        name: 'invoices-home',
        component: _import_('invoices/home/index')
      },
      {
        path: '/invoices/tax-bureau',
        name: 'invoices-tax-bureau',
        component: _import_('invoices/tax-bureau/index'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/tax-bureau/register',
        name: 'invoices-tax-bureau-register',
        component: _import_('invoices/tax-bureau/register'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/ticket-office',
        name: 'invoices-ticket-office',
        component: _import_('invoices/ticket-office/index'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/ticket-office2',
        name: 'invoices-ticket-office2',
        component: _import_('invoices/ticket-office/index2'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/invoice',
        name: 'invoices-invoice',
        component: _import_('invoices/invoice/index'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status, roleStatus.invoice.manager.s_manager_invoice_requested.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/invoice-application',
        name: 'invoices-invoice-application',
        component: _import_('invoices/invoice/application'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_init.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/invoice-mode',
        name: 'invoices-invoice-mode',
        component: _import_('invoices/invoice/mode'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_invoice_requested.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/invoice-check',
        name: 'invoices-invoice-check',
        component: _import_('invoices/invoice/check'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_invoice_requested.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/invoice-key',
        name: 'invoices-invoice-key',
        component: _import_('invoices/invoice/key'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_invoice_requested.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/platform-login',
        name: 'invoices-platform-login',
        component: _import_('invoices/platform/login'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_registered.status, roleStatus.invoice.manager.s_manager_accounting_created.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/platform-user',
        name: 'invoices-platform-user',
        component: _import_('invoices/platform/userlist'),
        meta: {
          accessStatus: [roleStatus.invoice.manager.s_manager_registered.status, roleStatus.invoice.manager.s_manager_accounting_created.status],
          role: [roleName.invoice.manager.roleId]
        }
      },
      {
        path: '/invoices/accounting-platform-login',
        name: 'invoices-accounting-platform-login',
        component: _import_('invoices/platform/login'),
        meta: {
          accessStatus: [
            roleStatus.invoice.accounting.s_accounting_can_login.status,
            roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status,
            roleStatus.invoice.accounting.s_accounting_has_apply_red_ink.status,
            roleStatus.invoice.accounting.s_accounting_has_red_ink.status,
            roleStatus.invoice.accounting.s_accounting_has_remake_ticket.status,
            roleStatus.invoice.accounting.s_accounting_has_wrong_ticket.status
          ],
          role: [roleName.invoice.accounting.roleId]
        }
      },
      {
        path: '/invoices/platform-invoicing',
        name: 'invoices-platform-invoicing',
        component: _import_('invoices/platform/invoicing'),
        meta: {
          accessStatus: [
            roleStatus.invoice.accounting.s_accounting_can_login.status,
            roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status,
            roleStatus.invoice.accounting.s_accounting_has_red_ink.status
          ],
          role: [roleName.invoice.accounting.roleId]
        }
      },
      {
        path: '/invoices/platform-list',
        name: 'invoices-platform-list',
        component: _import_('invoices/platform/list'),
        meta: {
          accessStatus: [
            roleStatus.invoice.accounting.s_accounting_has_wrong_ticket.status,
            roleStatus.invoice.accounting.s_accounting_has_apply_red_ink.status,
            roleStatus.invoice.accounting.s_accounting_has_red_ink.status,
            roleStatus.invoice.accounting.s_accounting_has_remake_ticket.status
          ],
          role: [roleName.invoice.accounting.roleId]
        }
      },
      {
        path: '/invoices/product-list',
        name: 'invoices-product-list',
        component: _import_('invoices/product/product-list'),
        meta: {
          accessStatus: [
            roleStatus.invoice.buyer.s_buyer_can_buy.status,
            roleStatus.invoice.buyer.s_buyer_has_check_wrong_ticket.status,
            roleStatus.invoice.buyer.s_buyer_has_call_customer_services.status
          ],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      {
        path: '/invoices/product-detail',
        name: 'invoices-product-detail',
        component: _import_('invoices/product/product-detail'),
        meta: {
          accessStatus: [roleStatus.invoice.buyer.s_buyer_can_buy.status, roleStatus.invoice.buyer.s_buyer_has_apply_wrong_ticket.status],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      {
        path: '/invoices/product-success',
        name: 'invoices-product-success',
        component: _import_('invoices/product/product-success'),
        meta: {
          accessStatus: [roleStatus.invoice.buyer.s_buyer_can_buy.status, roleStatus.invoice.buyer.s_buyer_has_apply_wrong_ticket.status],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      {
        path: '/invoices/invoice-apply',
        name: 'invoices-invoice-apply',
        component: _import_('invoices/invoice/apply'),
        meta: {
          accessStatus: [roleStatus.invoice.buyer.s_buyer_can_buy.status, roleStatus.invoice.buyer.s_buyer_has_apply_wrong_ticket.status],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      {
        path: '/invoices/platform-red-punch',
        name: 'invoices-platform-red-punch',
        component: _import_('invoices/platform/red-punch'),
        meta: {
          accessStatus: [roleStatus.invoice.accounting.s_accounting_has_apply_red_ink.status],
          role: [roleName.invoice.accounting.roleId]
        }
      },
      {
        path: '/invoices/check-invoice',
        name: 'invoices-check-invoice',
        component: _import_('invoices/check-invoice/index'),
        meta: {
          accessStatus: [roleStatus.invoice.buyer.s_buyer_has_remake_ticket.status],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      {
        path: '/invoices/check-result',
        name: 'invoices-check-result',
        component: _import_('invoices/check-invoice/check-result'),
        meta: {
          accessStatus: [roleStatus.invoice.buyer.s_buyer_has_remake_ticket.status],
          role: [roleName.invoice.buyer.roleId]
        }
      },
      // 供应链金融路由
      {
        path: '/supply-chain/home',
        name: 'supply-chain-home',
        component: _import_('supply-chain/home/index'),
        meta: {
          title: '应用列表'
        }
      },
      {
        path: '/supply-chain/credit',
        name: 'supply-chain-credit',
        component: _import_('supply-chain/credit/index'),
        meta: {
          title: '签署授信合同',
          role: [roleName.finance.role_core.roleId]
        }
      },
      {
        path: '/supply-chain/join-register',
        name: 'supply-chain-join-register',
        component: _import_('supply-chain/join/register'),
        meta: {
          title: '申请加入'
        }
      },
      {
        path: '/supply-chain/join-type',
        name: 'supply-chain-join-type',
        component: _import_('supply-chain/join/type'),
        meta: {
          title: '选择类型'
        }
      },
      {
        path: '/supply-chain/join-certification',
        name: 'supply-chain-join-certification',
        component: _import_('supply-chain/join/certification'),
        meta: {
          title: '企业认证'
        }
      },
      {
        path: '/supply-chain/sign',
        name: 'supply-chain-sign',
        component: _import_('supply-chain/sign/index'),
        meta: {
          title: '供应商签署合同'
        }
      },
      {
        path: '/supply-chain/lauout',
        name: 'supply-chain-layout',
        component: _import_('supply-chain/layout/index'),
        children: [
          {
            path: '/supply-chain/sys-core-business',
            name: 'supply-chain-sys-core-business',
            component: _import_('supply-chain/system/core-business/index'),
            meta: {
              title: '核心企业管理'
            }
          },
          {
            path: '/supply-chain/sys-supply',
            name: 'supply-chain-sys-supply',
            component: _import_('supply-chain/system/supplylist/index'),
            meta: {
              title: '供应商管理'
            }
          },
          {
            path: '/supply-chain/sys-review',
            name: 'supply-chain-sys-review',
            component: _import_('supply-chain/system/core-business/review'),
            meta: {
              title: '企业审核'
            }
          },
          {
            path: '/supply-chain/sys-review-admin',
            name: 'supply-chain-sys-review-admin',
            component: _import_('supply-chain/system/core-business/review-admin'),
            meta: {
              title: '管理员审核'
            }
          },
          {
            path: '/supply-chain/sys-accounts-payable',
            name: 'supply-chain-sys-accounts-payable',
            component: _import_('supply-chain/system/accounts-payable/index'),
            meta: {
              title: '应付账款管理'
            }
          },
          {
            path: '/supply-chain/sys-accounts-payable-add',
            name: 'supply-chain-sys-accounts-payable-add',
            component: _import_('supply-chain/system/accounts-payable/add'),
            meta: {
              title: '新建应付账款管理'
            }
          },
          {
            path: '/supply-chain/sys-transfer-in',
            name: 'supply-chain-sys-transfer-in',
            component: _import_('supply-chain/system/accounts-receivable/transfer-in'),
            meta: {
              title: '应收账款-转入账款'
            }
          },
          {
            path: '/supply-chain/sys-transfer-in-detail',
            name: 'supply-chain-sys-transfer-in-detail',
            component: _import_('supply-chain/system/accounts-receivable/transfer-in-detail'),
            meta: {
              title: '应收账款-转入账款-详情'
            }
          },
          {
            path: '/supply-chain/sys-transfer-out',
            name: 'supply-chain-sys-transfer-out',
            component: _import_('supply-chain/system/accounts-receivable/transfer-out'),
            meta: {
              title: '应收账款-转出账款'
            }
          },
          {
            path: '/supply-chain/sys-transfer-out-add',
            name: 'supply-chain-sys-transfer-out-add',
            component: _import_('supply-chain/system/accounts-receivable/transfer-out-add'),
            meta: {
              title: '应收账款-转出账款-拆分转出'
            }
          },
          {
            path: '/supply-chain/sys-financing',
            name: 'supply-chain-sys-financing',
            component: _import_('supply-chain/system/financing/index'),
            meta: {
              title: '融资管理'
            }
          },
          {
            path: '/supply-chain/financing-add',
            name: 'supply-chain-financing-add',
            component: _import_('supply-chain/system/financing/add'),
            meta: {
              title: '融资管理-创建'
            }
          },
          {
            path: '/supply-chain/sys-review-financing',
            name: 'supply-chain-sys-review-financing',
            component: _import_('supply-chain/system/review-financing/index'),
            meta: {
              title: '保理商融资管理-审核'
            }
          },
          {
            path: '/supply-chain/sys-review-financing-detail',
            name: 'supply-chain-sys-review-financing-detail',
            component: _import_('supply-chain/system/review-financing/detail'),
            meta: {
              title: '保理商融资管理-详情'
            }
          },
          {
            path: '/supply-chain/sys-funder-review-financing',
            name: 'supply-chain-sys-funder-review-financing',
            component: _import_('supply-chain/system/review-financing/funder-review'),
            meta: {
              title: '资金方融资管理-复核'
            }
          },
          {
            path: '/supply-chain/sys-payment',
            name: 'supply-chain-sys-payment',
            component: _import_('supply-chain/system/payment/index'),
            meta: {
              title: '核心企业支付管理'
            }
          },
          {
            path: '/supply-chain/sys-checker-payment',
            name: 'supply-chain-sys-checker-payment',
            component: _import_('supply-chain/system/payment/checker-payment'),
            meta: {
              title: '资金方支付管理'
            }
          }
        ]
      },
      // 信用证
      {
        path: '/lc/map',
        name: 'lc-map',
        component: _import_('lc/map'),
        meta: {
          title: '地图上选择公司'
        }
      },
      {
        path: '/lc/overview',
        name: 'lc-overview',
        component: _import_('lc/overview'),
        meta: {
          title: '公司操作首页'
        }
      },
      {
        path: '/lc/cre-contract',
        name: 'lc-cre-contract',
        component: _import_('lc/cre-contract'),
        meta: {
          title: '创建合同',
          role: [roleName.lc.role_tongyu.roleId]
        }
      },
      {
        path: '/lc/view-contract',
        name: 'lc-view-contract',
        component: _import_('lc/view-contract'),
        meta: {
          title: '查看合同、签署合同',
          role: [roleName.lc.role_weizhen.roleId]
        }
      },
      {
        path: '/lc/cre-lc',
        name: 'lc-cre-lc',
        component: _import_('lc/cre-lc'),
        meta: {
          title: '申请信用证',
          role: [roleName.lc.role_weizhen.roleId]
        }
      },
      {
        path: '/lc/view-lc',
        name: 'lc-view-lc',
        component: _import_('lc/view-lc'),
        meta: {
          title: '查看信用证、审核信用证'
        }
      },
      {
        path: '/lc/register-lc',
        name: 'lc-register-lc',
        component: _import_('lc/register-lc'),
        meta: {
          title: '信用证开立申请',
          role: [roleName.lc.role_bakelai_bank.roleId]
        }
      },
      {
        path: '/lc/cre-bill',
        name: 'lc-cre-bill',
        component: _import_('lc/cre-bill'),
        meta: {
          title: '获取提单',
          role: [roleName.lc.role_tongyu.roleId]
        }
      },
      // 跨境支付
      {
        path: '/pay/task',
        name: 'pay-task',
        component: _import_('pay/task'),
        meta: {
          title: '任务列表'
        }
      },
      {
        path: '/pay/buy-remit',
        name: 'pay-buy-remit',
        component: _import_('pay/remitter/buy-remit'),
        meta: {
          title: '购汇'
        }
      },
      {
        path: '/pay/buy-remit-clause',
        name: 'pay-buy-remit-clause',
        component: _import_('pay/remitter/buy-remit-clause'),
        meta: {
          title: '购汇条款'
        }
      },
      {
        path: '/pay/buy-remit-apply',
        name: 'pay-buy-remit-apply',
        component: _import_('pay/remitter/buy-remit-apply'),
        meta: {
          title: '购汇申请'
        }
      },
      {
        path: '/pay/remit-mode',
        name: 'pay-remit-mode',
        component: _import_('pay/remitter/remit-mode'),
        meta: {
          title: '购汇模式'
        }
      },
      {
        path: '/pay/cre-remit',
        name: 'pay-cre-remit',
        component: _import_('pay/remitter/cre-remit'),
        meta: {
          title: '申请汇款'
        }
      },
      {
        path: '/pay/zhigu-remit-inspect-list',
        name: 'pay-zhigu-remit-inspect-list',
        component: _import_('pay/zhigu/remit-inspect-list'),
        meta: {
          title: '汇款申请审核'
        }
      },
      {
        path: '/pay/zhigu-remit-inspect',
        name: 'pay-zhigu-remit-inspect',
        component: _import_('pay/zhigu/remit-inspect'),
        meta: {
          title: '汇款申请审核详情'
        }
      },
      {
        path: '/pay/zhigu-tradition-list',
        name: 'pay-zhigu-tradition-list',
        component: _import_('pay/zhigu/tradition-list'),
        meta: {
          title: '跨境支付业务处理列表'
        }
      },
      {
        path: '/pay/zhigu-tradition-inspect',
        name: 'pay-zhigu-tradition-inspect',
        component: _import_('pay/zhigu/tradition-inspect'),
        meta: {
          title: '跨境支付业务处理列表审核'
        }
      },
      {
        path: '/pay/zhigu-cochain-list',
        name: 'pay-zhigu-cochain-list',
        component: _import_('pay/zhigu/cochain-list'),
        meta: {
          title: '区块链上链列表'
        }
      },
      {
        path: '/pay/zhigu-cochain-inspect',
        name: 'pay-zhigu-cochain-inspect',
        component: _import_('pay/zhigu/cochain-inspect'),
        meta: {
          title: '区块链上链列表信息审核'
        }
      },
      {
        path: '/pay/zhigu-cochain-hash-list',
        name: 'pay-zhigu-cochain-hash-list',
        component: _import_('pay/zhigu/cochain-hash-list'),
        meta: {
          title: '账本信息列表'
        }
      },
      {
        path: '/pay/zhigu-cochain-hash-detail',
        name: 'pay-zhigu-cochain-hash-detail',
        component: _import_('pay/zhigu/cochain-hash-detail'),
        meta: {
          title: '账本信息列表详情'
        }
      },
      {
        path: '/pay/zhigu-transfer',
        name: 'pay-zhigu-transfer',
        component: _import_('pay/zhigu/transfer'),
        meta: {
          title: '划转账户'
        }
      },
      {
        path: '/pay/middle-tradition-list',
        name: 'pay-middle-tradition-list',
        component: _import_('pay/middle/tradition-list'),
        meta: {
          title: '业务审核列表'
        }
      },
      {
        path: '/pay/middle-tradition-inspect',
        name: 'pay-middle-tradition-inspect',
        component: _import_('pay/middle/tradition-inspect'),
        meta: {
          title: '业务审核列表详情, 资金、账户划转'
        }
      },
      {
        path: '/pay/middle-tradition-transfer',
        name: 'pay-middle-tradition-transfer',
        component: _import_('pay/middle/tradition-transfer'),
        meta: {
          title: '没有使用'
        }
      },
      {
        path: '/pay/middle-cochain-hash-list',
        name: 'pay-middle-cochain-hash-list',
        component: _import_('pay/middle/cochain-hash-list'),
        meta: {
          title: '账本信息'
        }
      },
      {
        path: '/pay/middle-cochain-hash-node',
        name: 'pay-middle-cochain-hash-node',
        component: _import_('pay/middle/cochain-hash-node'),
        meta: {
          title: '账本信息节点'
        }
      },
      {
        path: '/pay/middle-cochain-transfer',
        name: 'pay-middle-cochain-transfer',
        component: _import_('pay/middle/cochain-transfer'),
        meta: {
          title: '区块链冻结、划转'
        }
      },
      {
        path: '/pay/middle-cochain-hash-detail',
        name: 'pay-middle-cochain-hash-detail',
        component: _import_('pay/middle/cochain-hash-detail'),
        meta: {
          title: '账本信息节点详情'
        }
      },
      {
        path: '/pay/goal-tradition-list',
        name: 'pay-goal-tradition-list',
        component: _import_('pay/goal/tradition-list'),
        meta: {
          title: '跨境支付业务列表'
        }
      },
      {
        path: '/pay/goal-tradition-inspect',
        name: 'pay-goal-tradition-inspect',
        component: _import_('pay/goal/tradition-inspect'),
        meta: {
          title: '跨境支付业务列表审核'
        }
      },
      {
        path: '/pay/goal-tradition-transfer',
        name: 'pay-goal-tradition-transfer',
        component: _import_('pay/goal/tradition-transfer'),
        meta: {
          title: '传统划转资金'
        }
      },
      {
        path: '/pay/goal-cochain-hash-list',
        name: 'pay-goal-cochain-hash-list',
        component: _import_('pay/goal/cochain-hash-list'),
        meta: {
          title: '区块链跨境支付业务列表'
        }
      },
      {
        path: '/pay/goal-cochain-hash-detail',
        name: 'pay-goal-cochain-hash-detail',
        component: _import_('pay/goal/cochain-hash-detail'),
        meta: {
          title: '区块链跨境支付业务列表审核'
        }
      },
      {
        path: '/pay/goal-cochain-transfer',
        name: 'pay-goal-cochain-transfer',
        component: _import_('pay/goal/cochain-transfer'),
        meta: {
          title: '区块链划转'
        }
      },
      // 保险
      {
        path: '/insurance/buy-ticket',
        name: 'insurance-buy-ticket',
        component: _import_('insurance/buy-ticket/index'),
        meta: {
          title: '购买机票',
          role: [roleName.insurance.role_buy_manager.roleId]
        }
      },
      {
        path: '/insurance/home',
        name: 'insurance-home',
        component: _import_('insurance/home/index'),
        meta: {
          title: '保险首页'
        }
      },
      {
        path: '/insurance/type',
        name: 'insurance-type',
        component: _import_('insurance/type/index'),
        meta: {
          title: '保险类型',
          role: [roleName.insurance.role_buy_manager.roleId]
        }
      },
      {
        path: '/insurance/menu',
        name: 'insurance-menu',
        component: _import_('insurance/menu/index'),
        meta: {
          title: '保险菜单',
          role: [roleName.insurance.role_buy_manager.roleId]
        }
      },
      {
        path: '/insurance/traditional-buy-insurance',
        name: 'insurance-traditional-buy-insurance',
        component: _import_('insurance/traditional/buy-insurance'),
        meta: {
          title: '购买传统保险',
          role: [roleName.insurance.role_buy_manager.roleId],
          accessStatus: [roleStatus.insurance.s_insurance_old_init.status]
        }
      },
      {
        path: '/insurance/delay',
        name: 'insurance-delay',
        component: _import_('insurance/delay/index'),
        meta: {
          title: '飞机延误'
        }
      },
      {
        path: '/insurance/traditional-customer-service',
        name: 'insurance-traditional-customer-service',
        component: _import_('insurance/traditional/customer-service'),
        meta: {
          title: '和客服沟通'
        }
      },
      {
        path: '/insurance/traditional-proof-application',
        name: 'insurance-traditional-proof-application',
        component: _import_('insurance/traditional/proof-application'),
        meta: {
          title: '查询延误证明'
        }
      },
      {
        path: '/insurance/traditional-proof-application2',
        name: 'insurance-traditional-proof-application2',
        component: _import_('insurance/traditional/proof-application2'),
        meta: {
          title: '申请延误证明'
        }
      },
      {
        path: '/insurance/traditional-apply-claim',
        name: 'insurance-traditional-apply-claim',
        component: _import_('insurance/traditional/apply-claim'),
        meta: {
          title: '申请理赔'
        }
      },
      {
        path: '/insurance/traditional-search-insurance',
        name: 'insurance-traditional-search-insurance',
        component: _import_('insurance/traditional/search-insurance'),
        meta: {
          title: '保单查询'
        }
      },
      {
        path: '/insurance/traditional-insurance-inspect',
        name: 'insurance-traditional-insurance-inspect',
        component: _import_('insurance/traditional/insurance-inspect'),
        meta: {
          title: '保单审核'
        }
      },
      {
        path: '/insurance/traditional-insurance-payfor',
        name: 'insurance-traditional-insurance-payfor',
        component: _import_('insurance/traditional/insurance-payfor'),
        meta: {
          title: '保单赔付'
        }
      },
      {
        path: '/insurance/cochain-buy-delay-insurance',
        name: 'insurance-cochain-buy-delay-insurance',
        component: _import_('insurance/cochain/buy-delay-insurance'),
        meta: {
          title: '购买延误险'
        }
      },
      {
        path: '/insurance/cochain-buy-delay-insurance2',
        name: 'insurance-cochain-buy-delay-insurance2',
        component: _import_('insurance/cochain/buy-insurance'),
        meta: {
          title: '购买延误险2'
        }
      },
      {
        path: '/insurance/cochain-info',
        name: 'insurance-cochain-info',
        component: _import_('insurance/cochain/info'),
        meta: {
          title: '区块链信息'
        }
      },
      {
        path: '/insurance/cochain-contract-monitor',
        name: 'insurance-cochain-contract-monitor',
        component: _import_('insurance/cochain/contract-monitor'),
        meta: {
          title: '区块链信息'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
