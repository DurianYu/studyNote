export function calcData(columns, line1, line2, enroll_year) {
  let maxLen;
  let lineData = modifyMinValue(line1, line2);
  // console.log(lineData)
  let chartData = {
    columns: ['日期', columns[0], columns[1]],
    rows: []
  };
  if (line1 && line2) {
    maxLen = Math.max(lineData.line1.data.length, lineData.line2.data.length)
  } else {
    maxLen = lineData.line1.data.length;
  }

  for (let i = 0; i < maxLen; i++) {
    let year = (enroll_year - 2 + i) + '';
    let line_1 = lineData.line1.data[i] == 0 ? isFinite(lineData.line1.minVal) ? (parseInt(lineData.line1.minVal) - 4) + '' : 0 : parseInt(lineData.line1.data[i]);
    if (line2) {
      let line_2 = lineData.line2.data[i] == 0 ? isFinite(lineData.line2.minVal) ? (parseInt(lineData.line2.minVal) - 4) + '' : 0 + '' : parseInt(lineData.line2.data[i]);
      chartData.rows.push({
        '日期': year,
        [columns[0]]: line_1,
        [columns[1]]: line_2
      })
    } else {
      chartData.rows.push({
        '日期': year,
        [columns[0]]: line_1
      })
    }
  }

  return chartData;
}

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


/**
 * [OverTime 超时提示]
 * @param       {[String]} msg [提示的消息]
 */
export function OverTime($this, msg) {
  if (msg) {
    $this.$alert(msg, '注意', {
      confirmButtonText: '确定',
      callback: () => {
        $this.$router.push({
          path: '/'
        })
      }
    })
  } else {
    $this.$router.push({
      path: '/'
    })
  }
}

/**
 * [readImgSrc 读取图片文件的地址]
 * @param  {[file]} file [本地上传的图片文件]
 * @return {[Object]}      [返回: {local_src: 图片地址, local_file: 图片文件}]
 */
export function readImgSrc(file) {
  return new Promise((resolve, reject) => {
    if (!file) return;
    // 本地转换后的img地址
    let local_src = '';
    // 文件
    let local_file = '';
    let v_this = this;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //判断浏览器是否支持FileReader
    if (!window.FileReader) {
      return v_this.$alert(`not supported by your browser!`, '');
    } else {
      fileReader.onload = function() {
        //正则控制上传文件的类型
        if (/^image\/jpeg$/.test(file.type) && file.size < 1048576) {
          //输出图片预览 FileReader.result结果保存了文件base64的路径
          local_src = this.result;
          local_file = file;
          resolve(local_src);
        } else {
          v_this.$alert(`请选择小于1Mb的jpg格式的图片`, '');
        }
      }
    }
  });
}
