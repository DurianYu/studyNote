export function replaceKey (value) {
  // let reg = /.+大学?|.招生.*章程.*?|^\d+$/;
  let keyWord = ['分数优先', '专业优先', '极差'];
  // 替换关键字
  for (let str of keyWord) {
    let  replaceStr = '<span style=\'color: #FF0033; font-weight: 600;\'>'
    + str
    + '</span>' ;
    value = value.replace(new RegExp(str, 'g'), replaceStr);
  }
  return value;
}


