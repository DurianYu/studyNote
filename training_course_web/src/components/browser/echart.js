let geoCoordMap = {
  '1': [119.2070396626, 26.0471838188],
  '5': [119.2132263691, 26.0498767809],
  '9': [119.225689, 26.044945]
}
let oneData = [
  [
    {
      name: '1'
    },
    {
      name: '5',
      value: 20
    }
  ],
  [
    {
      name: '1'
    },
    {
      name: '9',
      value: 20
    }
  ]
]
let twoData = [
  [
    {
      name: '5'
    },
    {
      name: '1',
      value: 20
    }
  ],
  [
    {
      name: '5'
    },
    {
      name: '9',
      value: 20
    }
  ]
]
let threeData = [
  [
    {
      name: '9'
    },
    {
      name: '1',
      value: 20
    }
  ],
  [
    {
      name: '9'
    },
    {
      name: '5',
      value: 20
    }
  ]
]

let planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

let convertData = function(data) {
  let res = []
  for (let i = 0; i < data.length; i++) {
    let dataItem = data[i]
    let fromCoord = geoCoordMap[dataItem[1].name]
    let toCoord = geoCoordMap[dataItem[0].name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[1].name,
        toName: dataItem[0].name,
        coords: [fromCoord, toCoord]
      })
    }
  }
  return res
}

let color = ['#a6c84c', '#ffa022', '#46bee9']
let series = []
;[
  ['1', oneData, '财务总经理'],
  ['5', twoData, '会计'],
  ['9', threeData, '采购员']
].forEach(function(item, i) {
  series.push(
    {
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function(val) {
        return val[2] / 4
      },
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      data: [
        {
          name: item[2],
          value: geoCoordMap[item[0]].concat([100])
        }
      ]
    },
    {
      type: 'lines',
      coordinateSystem: 'bmap',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 0,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    },
    {
      type: 'lines',
      coordinateSystem: 'bmap',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 1,
          opacity: 0.4,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function(val) {
        return val[2] / 4
      },
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      data: item[1].map(function(dataItem) {
        return {
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        }
      })
    }
  )
})

// 飞机的效果
export const echartFlyOption = {
  bmap: {
    // 百度地图中心经纬度 坐标拾取器http://api.map.baidu.com/lbsapi/getpoint/index.html
    center: [119.2166696096, 26.0446365813],
    // 百度地图缩放等级，数字越大，放大越大，地图比例尺越小
    zoom: 16,
    // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
    roam: 'move',
    // mapStyle是百度地图的自定义样式，见 http://developer.baidu.com/map/custom/
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#021019'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.stroke',
          stylers: {
            color: '#147a92'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.stroke',
          stylers: {
            color: '#0b3d51'
          }
        },
        {
          featureType: 'local',
          elementType: 'geometry',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#08304b'
          }
        },
        {
          featureType: 'railway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'railway',
          elementType: 'geometry.stroke',
          stylers: {
            color: '#08304b'
          }
        },
        {
          featureType: 'subway',
          elementType: 'geometry',
          stylers: {
            lightness: -70
          }
        },
        {
          featureType: 'building',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#857f7f'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'building',
          elementType: 'geometry',
          stylers: {
            color: '#022338'
          }
        },
        {
          featureType: 'green',
          elementType: 'geometry',
          stylers: {
            color: '#062032'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'all',
          stylers: {
            color: '#1e1c1c'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'geometry',
          stylers: {
            color: '#022338'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#2da0c6',
            visibility: 'on'
          }
        },
        {
          featureType: 'background',
          elementType: 'all',
          stylers: {
            color: '#0e1054ff'
          }
        }
      ]
    }
  },
  //series是在地图上的线条等效果的配置文件，具体可以查阅文档。
  series
}

// 连线的配置
const baseNode = ({ name, tooltip, value, type }) => {
  return {
    name,
    tooltip: {
      formatter: tooltip ? `{b}: ${tooltip}<br />` : '{b}'
    },
    value,
    symbol:
      type === 1
        ? 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAyCAYAAAAA9rgCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QkMzRkE4QUEwQUYxMUVBOUZEREI0QzdBNDdFMjJDQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QkMzRkE4QkEwQUYxMUVBOUZEREI0QzdBNDdFMjJDQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCQzNGQTg4QTBBRjExRUE5RkREQjRDN0E0N0UyMkNBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdCQzNGQTg5QTBBRjExRUE5RkREQjRDN0E0N0UyMkNBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ya4ogQAACBpJREFUeNrsWdtvFFUY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'
        : 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAgCAYAAABO6BuSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMzhFMDM4REEwQUYxMUVBQkY1NEIzNTg4MTM4RjIxOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMzhFMDM4RUEwQUYxMUVBQkY1NEIzNTg4MTM4RjIxOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzOEUwMzhCQTBBRjExRUFCRjU0QjM1ODgxMzhGMjE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzOEUwMzhDQTBBRjExRUFCRjU0QjM1ODgxMzhGMjE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZMccrwAACbZJREFUeNrkWUtvJFcV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',
    symbolSize: type === 1 ? [60, 40] : [60, 30],
    label: {
      color: '#FFF',
      position: 'bottom'
    }
  }
}
// 供应链节点
const nodeSupplyConfig = {
  core: {
    name: '核心企业',
    tooltip: '北京神盾汽车集团',
    value: [50, 300],
    type: 2
  },
  supply1: {
    name: '一级供应商',
    tooltip: '浙江百维电子科技有限公司',
    value: [150, 450],
    type: 2
  },
  supply2: {
    name: '二级供应商',
    tooltip: '四川海洋科技有限公司',
    value: [250, 480],
    type: 2
  },
  supply3: {
    name: '三级供应商',
    tooltip: '深圳锐光科技有限公司',
    value: [370, 300],
    type: 2
  },
  funder: {
    name: '资金方',
    tooltip: '北京招商银行',
    value: [250, 50],
    type: 1
  },
  factoring: {
    name: '保理商',
    tooltip: '北京招商保理公司',
    value: [80, 100],
    type: 1
  }
}
// 发票节点
const nodeInvoiceConfig = {
  technology: {
    name: '区块链技术服务商',
    tooltip: '基础环境搭建',
    value: [160, 300],
    type: 2
  },
  invoiceService: {
    name: '第三方电子发票服务商',
    tooltip: '协助开票企业开票/发票数据上链',
    value: [130, 150],
    type: 2
  },
  invoiceQuery: {
    name: '公众电子发票查询',
    tooltip: false,
    value: [90, 100],
    type: 2
  },
  tongyu: {
    name: '北京通宇集团',
    tooltip: '发票数据上链',
    value: [20, 250],
    type: 2
  },
  taxDepartment: {
    name: '北京税务部门',
    tooltip: '节点授权/发票上链管控',
    value: [90, 460],
    type: 1
  },
  buyer: {
    name: '采购员',
    tooltip: '发票查验',
    value: [90, 0],
    type: 2
  }
}

const coordsList = {
  supply: [
    {
      coords: [nodeSupplyConfig.core.value, nodeSupplyConfig.supply1.value]
    },
    {
      coords: [nodeSupplyConfig.core.value, nodeSupplyConfig.funder.value]
    },
    {
      coords: [nodeSupplyConfig.core.value, nodeSupplyConfig.factoring.value]
    },
    {
      coords: [nodeSupplyConfig.supply1.value, nodeSupplyConfig.factoring.value]
    },
    {
      coords: [nodeSupplyConfig.supply1.value, nodeSupplyConfig.supply2.value]
    },
    {
      coords: [nodeSupplyConfig.supply2.value, nodeSupplyConfig.supply3.value]
    },
    {
      coords: [nodeSupplyConfig.supply2.value, nodeSupplyConfig.factoring.value]
    },
    {
      coords: [nodeSupplyConfig.supply3.value, nodeSupplyConfig.factoring.value]
    },
    {
      coords: [nodeSupplyConfig.funder.value, nodeSupplyConfig.supply1.value]
    },
    {
      coords: [nodeSupplyConfig.funder.value, nodeSupplyConfig.supply2.value]
    },
    {
      coords: [nodeSupplyConfig.funder.value, nodeSupplyConfig.supply3.value]
    },
    {
      coords: [nodeSupplyConfig.factoring.value, nodeSupplyConfig.funder.value]
    }
  ],
  invoice: [
    {
      coords: [nodeInvoiceConfig.buyer.value, nodeInvoiceConfig.invoiceQuery.value]
    },
    {
      coords: [nodeInvoiceConfig.invoiceQuery.value, nodeInvoiceConfig.invoiceService.value]
    },
    {
      coords: [nodeInvoiceConfig.invoiceService.value, nodeInvoiceConfig.technology.value]
    },
    {
      coords: [nodeInvoiceConfig.technology.value, nodeInvoiceConfig.taxDepartment.value]
    },
    {
      coords: [nodeInvoiceConfig.invoiceQuery.value, nodeInvoiceConfig.tongyu.value]
    },
    {
      coords: [nodeInvoiceConfig.tongyu.value, nodeInvoiceConfig.taxDepartment.value]
    }
  ]
}

const lineDots = (arr, coordsList) => {
  let obj = arr.map(item => {
    return {
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      z: 1,
      zlevel: 2,
      animation: false,
      effect: {
        show: true,
        period: item,
        trailLength: 0.01,
        symbolSize: 12,
        symbol: 'pin',
        loop: true,
        color: 'rgba(55,155,255,0.5)'
      },
      lineStyle: {
        normal: {
          color: '#22AC38',
          width: 0,
          curveness: 0.2
        }
      },

      data: coordsList
    }
  })
  return obj
}
// 数据
let nodeData = {
  // 供应链
  supply: [
    baseNode(nodeSupplyConfig.core),
    baseNode(nodeSupplyConfig.supply1),
    baseNode(nodeSupplyConfig.supply2),
    baseNode(nodeSupplyConfig.supply3),
    baseNode(nodeSupplyConfig.funder),
    baseNode(nodeSupplyConfig.factoring)
  ],
  invoice: [
    baseNode(nodeInvoiceConfig.technology),
    baseNode(nodeInvoiceConfig.invoiceService),
    baseNode(nodeInvoiceConfig.invoiceQuery),
    baseNode(nodeInvoiceConfig.tongyu),
    baseNode(nodeInvoiceConfig.taxDepartment),
    baseNode(nodeInvoiceConfig.buyer)
  ]
}

// 基本配置
const echartBaseOpt = ({ links, lineDotsArr, data, coordsList }) => {
  return {
    backgroundColor: 'transparent',
    xAxis: {
      show: false,
      type: 'value'
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    tooltip: {},
    series: [
      {
        type: 'graph',
        zlevel: 5,
        draggable: false,
        coordinateSystem: 'cartesian2d', //使用二维的直角坐标系（也称笛卡尔坐标系）
        symbol: 'rect',
        symbolOffset: ['15%', 0],
        label: {
          normal: {
            show: true
          }
        },
        data,
        links: links,
        lineStyle: {
          normal: {
            opacity: 0.8,
            color: '#53B5EA',
            curveness: 0.2,
            width: 2
          }
        }
      },
      ...lineDots(lineDotsArr, coordsList)
    ]
  }
}

// 供应链金融的配置
export const echartSupplyOption = echartBaseOpt({
  links: [
    {
      source: nodeSupplyConfig.core.name,
      target: nodeSupplyConfig.supply1.name
    },
    {
      source: nodeSupplyConfig.core.name,
      target: nodeSupplyConfig.factoring.name
    },
    {
      source: nodeSupplyConfig.core.name,
      target: nodeSupplyConfig.funder.name
    },
    {
      source: nodeSupplyConfig.factoring.name,
      target: nodeSupplyConfig.funder.name
    },
    {
      source: nodeSupplyConfig.supply1.name,
      target: nodeSupplyConfig.supply2.name
    },
    {
      source: nodeSupplyConfig.supply1.name,
      target: nodeSupplyConfig.factoring.name
    },
    {
      source: nodeSupplyConfig.supply2.name,
      target: nodeSupplyConfig.supply3.name
    },
    {
      source: nodeSupplyConfig.supply2.name,
      target: nodeSupplyConfig.factoring.name
    },
    {
      source: nodeSupplyConfig.supply3.name,
      target: nodeSupplyConfig.factoring.name
    },
    {
      source: nodeSupplyConfig.funder.name,
      target: nodeSupplyConfig.supply1.name
    },
    {
      source: nodeSupplyConfig.funder.name,
      target: nodeSupplyConfig.supply2.name
    },
    {
      source: nodeSupplyConfig.funder.name,
      target: nodeSupplyConfig.supply3.name
    }
  ],
  data: nodeData.supply,
  lineDotsArr: [5, 6, 8],
  coordsList: coordsList.supply
})

// 发票的配置
// 节点
export const echartInvoiceOption = echartBaseOpt({
  links: [
    {
      source: nodeInvoiceConfig.buyer.name,
      target: nodeInvoiceConfig.invoiceQuery.name
    },
    {
      source: nodeInvoiceConfig.invoiceQuery.name,
      target: nodeInvoiceConfig.invoiceService.name
    },
    {
      source: nodeInvoiceConfig.invoiceService.name,
      target: nodeInvoiceConfig.technology.name
    },
    {
      source: nodeInvoiceConfig.invoiceQuery.name,
      target: nodeInvoiceConfig.tongyu.name
    },
    {
      source: nodeInvoiceConfig.tongyu.name,
      target: nodeInvoiceConfig.taxDepartment.name
    },
    {
      source: nodeInvoiceConfig.technology.name,
      target: nodeInvoiceConfig.taxDepartment.name
    }
  ],
  data: nodeData.invoice,
  lineDotsArr: [5, 6, 8],
  coordsList: coordsList.invoice
})
