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
