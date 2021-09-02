/*
validate.js 多用于表单验证
*/
export function isEmail(text) {
    var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(text);
}

export function isPassword(text) {
    var reg = /^[a-zA-Z0-9]{6,20}$/;
    return reg.test(text);
}

function isString(text) {
    return typeof text === "string";
}

// 默认导出,加中括号，导入方则显示为对象
export default {
    isPassword,
    isEmail,
    isString,
};

// 不加中括号,导入方则指向该函数
/*export default isPassword;*/

// 平滑滚动
function smoothScrollTo(boxEl, scrollEl, duration) {
    const totalScrollDistance = scrollEl.offsetTop;
    const scrollRange = totalScrollDistance - boxEl.scrollTop;

    // cancel if already on distance position
    if (boxEl.scrollTop === totalScrollDistance) return;

    let scrollY = boxEl.scrollTop,
        oldTimestamp = null;

    function step(newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollY will be -Infinity
            scrollY += (scrollRange * (newTimestamp - oldTimestamp)) / duration;
            // add or reduce
            if (scrollRange > 0 && scrollY >= totalScrollDistance)
                return (boxEl.scrollTop = totalScrollDistance);
            if (scrollRange < 0 && scrollY <= totalScrollDistance)
                return (boxEl.scrollTop = totalScrollDistance);
            boxEl.scrollTop = scrollY;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

// 数字过万转换
		function toGreatNum(num) {
			num = num || '';
			return String(num).length > 4 ? String(num).slice(0, -4) + '.' + String(num).slice(-4, -3) + 'w' : num;
		}

		// ios键盘留白处理
		function handleBlank() {
			setTimeout(function() {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				window.pageXOffset = 0;
			}, 300);
		}

		// 获取url上的参数
		function getUrlVal(variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) {
					return pair[1];
				}
			}
			return (false);
		}

		// 查找数据的位置
		function getIndex(target_ary, condition_name, condition_val) {
			var index = 'notfind';
			for (var i = 0, len = target_ary.length; i < len; i++) {
				if (target_ary[i][condition_name] == condition_val) {
					index = i;
					break;
				}
			}
			return index;
		}

		// 关闭其它，除了当前
		function closeOther(target_ary, condition_name, condition_val, close_attr) {
			for (var i = 0, len = target_ary.length; i < len; i++) {
				if (target_ary[i][condition_name] != condition_val) {
					target_ary[i][close_attr] = false;
				}
			}
		}

		// 强制刷新页面
		function forceRefresh() {
			window.onpageshow = function(e) {
				if (e.persisted) {
					window.location.reload();
				}
			}
		}

		// 响应式设计
		resLayout(dsgn_f, dsgn_w) {
			// 320 - 480 px
			// 设计 - 字体宽、图宽
			var dsgn_f = dsgn_f || 20, dsgn_w = dsgn_w || 375;
			// 当前设备的宽 - 超出主流范围 则居中内容.box{width: 100%; max-width: 480px;margin: 0 auto;}
			var client_w = document.documentElement.clientWidth < 480 ? document.documentElement.clientWidth : 480;
			// 当前设备的字体
			document.documentElement.style.fontSize = client_w * dsgn_f / dsgn_w + 'px';
		}
		resLayout();
		window.addEventListener('resize', function() {
			setTimeout(function() {
				resLayout();
			}, 200);
		});

		// 数组排序
		 sortTree(treeData) {
                let reg = /^\d*/;
                return treeData.sort((a, b) => {
                    if(a.orderNum || b.orderNum) return 1;
                    let num1 = reg.exec(a.name)[0];
                    let num2 = reg.exec(b.name)[0];
                    if(num1 && num2) return num1 - num2;
                    return a.name.localeCompare(b.name, 'zh');
                });
            }