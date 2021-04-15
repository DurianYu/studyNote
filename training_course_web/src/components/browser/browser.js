import { echartSupplyOption, echartInvoiceOption } from './echart'
export const nodeConfig = {
  bc_cross_border_payments: {
    nodeNumber: 0,
    echartOption: echartSupplyOption
  },
  bc_insurance: {
    nodeNumber: 0,
    echartOption: echartSupplyOption
  },
  bc_invoice: {
    nodeNumber: 6,
    echartOption: echartInvoiceOption
  },
  bc_lc: {
    nodeNumber: 0,
    echartOption: echartSupplyOption
  },
  bc_supply_chain_finance: {
    nodeNumber: 6,
    echartOption: echartSupplyOption
  }
}
