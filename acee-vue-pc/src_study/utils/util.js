/**
 * [prvnCodeToStr 将省份的code转换成str： sc、gs等等]
 * @param  {[Numner]} prvn_code [当前省份code]
 * @return {[String]}           [返回当前省份转换后的的str]
 */
export  function prvnCodeToStr(prvn_code) {
  prvn_code = parseInt(prvn_code);
  switch (prvn_code) {
    case 510000:
      return 'sc';
    case 620000:
      return 'gs';
    case 530000:
      return 'yn';
    case 520000:
      return 'gz';
    case 500000:
      return 'cq';
    default:
      return 'sc';
   }
}
/**
 * @method
 * @param {Object} $this 指定的this值
 * @param {Object, Array} $nodeData 包含要清空数据项的数据
 */
export function emptyData ($this, nodeData) {
  if({}.toString.call(nodeData) === '[object Object]') {
    if(nodeData.type ? nodeData.type == 'input' : true) {
      if (nodeData.hasOwnProperty('value')) {
        nodeData["value"] =  null;
      } else {
        $this.$set(nodeData, 'value', null);
      } 
    } else if(nodeData.type != 'button') {
      if (nodeData.hasOwnProperty('checked')) {
        nodeData['checked'] = false;
      } else {
        $this.$set(nodeData, 'checked', false);
      }
    }
    if (nodeData.hasOwnProperty('children')) {
      emptyData($this, nodeData.children);
    } else {
      return;
    }
  }
  if({}.toString.call(nodeData) === '[object Array]') {
    nodeData.forEach(function (currentValue) { 
      emptyData($this, currentValue);
    })
  }
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {Array} index 包含要移动数据的id，注:如果要移动的数据在深层，
 * 如： {a: 'cc',
 *       id: 1,
 *       children: [
 *         {c: 'c',
 *         id: 3},
 *         {d: 'd',
 *         id: 4},
 *       ]
 *     }
 * 当把这个数据传递给函数时，想要移动的数据为{c: 'c', id: 3}，传递的id 要为[1, 3]，
 * 当把children传递给函数时，想要移动的数据为{c: 'c', id: 3}，传递的id 要为[3]，
 *
 * @param {number} direction 移动方向：上（1），下（default or any value）
 */

export function volunMove (data, index, direction) {
  let parent;
  let dataChild = data;
  let position;
  index.forEach( function (currentValue) { 
    for (let i = 0, len = dataChild.length; i < len; i++) {
      if (dataChild[i].id == currentValue) {
        parent = dataChild;
        dataChild = dataChild[i].children;
        position = i;
        break;
      }
    }
  })
  if (direction == 1) {
    exchangeValue(parent, position, position == 0 ? dataChild ? parent.length -1 : parent.length - 2 : position - 1);
    if (dataChild) {
      exchangeChild(parent, position, position == 0 ? parent.length -1 : position - 1)
    }
  } else {
    exchangeValue(parent, position, position == 5 ? 0 : position + 1);
    dataChild ? exchangeChild(parent, position, position == 5 ? 0 : position + 1) : false;
  }
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {number} pos_1 移动位置索引
 * @param {number} pos_2 移动位置索引
 */
function exchangeValue (parent, pos_1, pos_2) {
  let exchange = parent[pos_1].value;
  parent[pos_1].value = parent[pos_2].value;
  parent[pos_2].value = exchange;
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {number} pos_1 移动位置索引
 * @param {number} pos_2 移动位置索引
 */
function exchangeChild (parent, pos_1, pos_2) {
  let exchange = parent[pos_1].children;
  parent[pos_1].children = parent[pos_2].children;
  parent[pos_2].children = exchange;
}
/**
 * [lineHandle 处理折线图Y轴刻度的最小值]
 * @param  {[array]} line  [折线数据]
 * @return {[object]}      [包含折线图需要的相关数据,最大值，最小值等]
 */
export function modifyMinValue(line1, line2) {
  function getZero(line) {
    let lineData = {
      mixArr: line ? line.filter((v, i) => {
        return v > 0;
      }) : [],
      zero: '', // 填 无 的那个刻度值
      minVal: '', // 除零外的最小值
      maxVal: '', // 除零外的最大值
      data: '' // 处理后的直线数据
    };
    // 隐式将值转成了number
    lineData.minVal = Math.min.apply(this, lineData.mixArr);
    lineData.maxVal = Math.max.apply(this, lineData.mixArr);

    // 包含两个值且互不相等
    if (lineData.mixArr.length === 2 && lineData.mixArr[0] !== lineData.mixArr[1]) {
      // 计算 （无） 值
      let temp_zero = lineData.minVal - (lineData.maxVal - lineData.minVal);
      // 若计算后的 (无) 值小于0,则设置为0
      lineData.zero = temp_zero > 0 ? temp_zero : 0;
    }

    // 包含两个值且相等
    if (lineData.mixArr.length === 2 && lineData.mixArr[0] === lineData.mixArr[1]) {
      // 计算 （无） 值
      let temp_zero = Math.abs(lineData.minVal - 1);
      // 若计算后的 (无) 值小于0,则设置为0
      lineData.zero = temp_zero > 0 ? temp_zero : 0;
    }

    return lineData;
  }


  let temp_line1 = line1 ? getZero(line1) : '';
  let temp_line2 = line2 ? getZero(line2) : '';

  // 获取最小zero值
  let all_min_zero = '';
  if (temp_line1 && temp_line2) {
    all_min_zero = Math.min(temp_line1.zero, temp_line2.zero);
    temp_line1.zero = all_min_zero;
    temp_line2.zero = all_min_zero;
    // 替换0值
    temp_line1.data = line1.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
    temp_line2.data = line2.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  } else if (temp_line1) {
    all_min_zero = temp_line1.zero;
    // 替换0值
    temp_line1.data = line1.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  } else if (temp_line2) {
    all_min_zero = temp_line2.zero;
    // 替换0值
    temp_line2.data = line2.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  }

  return {
    line1: temp_line1,
    line2: temp_line2,
  };
}

//数字转换成对应办学层次: 本科、专科
export function toCollegeLevel(int_val) {

  if (int_val == 1) {
    return '本科';
  }

  if (int_val == 2) {
    return '专科';
  }

  return ''; //默认空
}

//数字转换成对应批次
export function toCollegeBatch(int_val) {

  if (int_val == 101) {
    return "本一";
  }

  if (int_val == 102) {
    return "本二";
  }

  if (int_val == 130) {
    return "专科";
  }

  let str = '11,21,31,41,51,61';
  if (str.indexOf('' + int_val) >= 0) {
    return "提前本一";
  }

  str = '12,22,32,62';
  if (str.indexOf('' + int_val) >= 0) {
    return "提前本二";
  }

  str = '70,80,90';
  if (str.indexOf('' + int_val) >= 0) {
    return "提前专科";
  }

  return ''; //默认空
}

export function toPublicCollege(int_val) {

  if (int_val == 1) {
    return '公办';
  }

  if (int_val == 2) {
    return '民办';
  }

  if (int_val == 3) {
    return '中外合办';
  }

  if (int_val == 4) {
    return '内地港澳台';
  }

  return ''; //默认空
}

export function toCollegeType(int_val) {
  switch (int_val) {
    case 1:
      return '综合';
    case 2:
      return '财经';
    case 3:
      return '政法';
    case 4:
      return '师范';
    case 5:
      return '语言';
    case 6:
      return '民族';
    case 7:
      return '理工';
    case 8:
      return '农林';
    case 9:
      return '医药';
    case 10:
      return '军事';
    case 11:
      return '公安';
    case 12:
      return '艺术';
    case 13:
      return '体育';
    default:
      return "";
  }
}