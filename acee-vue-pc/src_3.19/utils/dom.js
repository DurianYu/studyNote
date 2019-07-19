/*
 * 导出函数 获取拥有指定class的父节点
 * @function getParents
 * @param {Object} el DOM节点
 * @param {String} className className
 * @returns {Boolean|Object} 返回一个拥有该className的父节点 或 返回false说明没有该父节点
 *
 */

export function getParents(parent, className) {
  let cycle = true;
  while(cycle) {
  	parent = parent.parentElement;
  	parent.classList.forEach(function(value) {
      if (value == className) {
        cycle = false;
      }
    })
    if (parent.tagName === 'BODY') {
      return false;
    }
    
  }
  return parent;
}