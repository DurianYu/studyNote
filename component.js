/*
validate.js 多用于表单验证
*/
export function isEmail(text) {
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(text);
}

export function isPassword(text) {
	var reg = /^[a-zA-Z0-9]{6,20}$/;
	return reg.test(text);
}

function isString(text) {
	return typeof text === 'string';
}

// 默认导出,加中括号，导入方则显示为对象
export default {
	isPassword,
	isEmail,
	isString
};

// 不加中括号,导入方则指向该函数
/*export default isPassword;*/

console.log('我是组件里的语句');