# https://v1.v2ai.top/link/Kba8mtghHxRsh0kD?sub=3
### 哪个`对象`调用函数，函数里面的`this`指向哪个`对象`。

> 面向对象就是对面向过程的封装
> 面向过程就是一步一步的去做事情执行每个环节需要做的代码
> 而面向对象只用去告诉 做这些一步一步事情的那个对象 然后等着结果就可以了 不用亲自去做

- SYNTAX : 语法
- TOKEN : 记号
- UNEXPECTED : 意外的
- 社区 博客 书籍 

- relative没有脱离文档流，因为是相对其本身而移动的，相对其原来的位置而变化，原来的位置还占着空间，所以不脱离文档流	 

## 从服务器下载文件
scp 服务器名字@ip地址:文件路径 客户端保存路径	  

##jQuery解决插件冲突
一.使用$.noConflict()  该方法的作用就是让jQuery放弃对$的所有权	,conflict：冲突
   $.noConflict();

二.自定义jQuery的别名 , 更改之后全部jS文件都得用新别名
   var jj = $.noCflict();

三.将$作为变量传递到ready方法里面，这样在函数里面还是$，外面则用jQuery
   $.noConflict();
   jQuery( document ).ready( function( $ ){ 

   })

*jQuery事件，事件：页面对不同访问者的响应叫事件
鼠标事件：click 、dblclick 、mouseenter 、mouseleave 、focus：获取焦点时触发focus事件
键盘事件：keypress 、keydown 、keyup
表单事件：submit 、change 、focus 、blur(当元素失去焦点时会触发blur（）事件)
ID="flip" 对应的选择器用 $("#flip")

*迭代
循坏内 参与运算和保存结果的都是同一个变量 ，例子 1-100的合
*递归
重复调用自身函数实现循坏 自己调用自己

###absolute 绝对定位
相当于给元素加了 display：block，例子：内联元素span默认宽度是自适应，手动改变不了width ，但只要添加了absolute 元素就变成block， 就可以对其宽度指定了。
absolute脱离文档流了 ,层级最高
**absolute**生成的绝对定位的元素，位置相对于值不为static的第一个父级元素进行定位。！！！

*jQuery
 'p'标签选择器  ， '#one'ID选择器  ， '.one' 类选择器

*行内元素
a , span , img ,input , select , strong
*块级元素
div  , ul , h1-h6 , p , dl , dt ,dd  

*ie盒模型和 w3c盒模型 的区别
content 、padding 、border 、margin
ie盒模型的content把paddig和border算进去

*filex 先对于浏览器窗口定位

浏览器默认的margin和paddign不同 ，通过添加
*{
	margin: 0;
	padding: 0;
}
来统一 ，实际中不太重用 ，可借鉴淘宝样式初始代码

*alt:图片无法加载时显示的内容

* ul字体设置成 font-size：0；其下面的li设置字体font-size：12px； 便可以去除设置li元素为display：inlin-block；带来的空白间隙

* transition: width 5s linear 2s;
	规定的类型 ，变化过程总共5s完成 ，linear以相同的速率完成 ，延迟2s后开始动画

* animation-direction  direction:说明
取值 animation-direction: reverse 动画反向播放  revers：反转
    			  alternate 1、 3、 5正向播放 2、 4、 6反向
			  alternate-reverse 2、 4、 6正 ，1、 3、 5反

* infinite 无限的
animation-infinite-count:infinite;

* let
let x = 1； let声明的变量只在其声明的块或字块中起作用

*NaN
NaN代表不是数字的值

*renderer:渲染器  preload：页面加载完后加载视频  pregetch：提前取出，用于预加载网页

*解决360等浏览器字体大小问题
font-family: "Microsoft YaHei";  

*parseint(string, radix)  !!!
可选, 用什么机制来解析，radix为0或没设置参数，则根据字符串来判定基数
解析 第一个 字符串，并返回一个整数
string以0开头解析为 10进制 
string以0x开头解析为 16进制
parseint("10", 8)  输出64  = 1 * 8的一次方 + 0 * 8的0次方

*array.sort(sortfunction)  sort: 将。。。进行排序  !!!
用于对原来数组排序，默认是按字母升序  字母降序的话用reverse（）一下
array.sort(function(a, b){return a-b}) 数字排序 升序
array.sort(function(a, b){return b-a}) 数字排序 降序

##### map() 创建一个新数组，结果是该数组中的每一个元素都调用提供的函数后返回的结果
* ES6
let numbers = [1, 5, 10, 15];
let doubles = numbers.map( x => x ** 2);

* doubles is now [1, 25, 100, 225]
* numbers is still [1, 5, 10, 15]


const numbers = [2, 4, 8, 10];
let halves = numbers.map(x => x / 2);

let numbers = [1, 4, 9];
let roots = numbers.map(Math.sqrt);
* roots is now [1, 2, 3]
* numbers is still [1, 4, 9]


*setTimeout(code,ms) 隔一段ms后 运行code
* setInterval(code,ms) 每隔ms后循环执行code


*正则表达式 /g表示可以全局匹配

*split:分裂 splice:切片 join:加入

*panel 面板

*每个页面的pageAfterIn等等 只限定在当前页面影响 

*template7 script不能留空格

*.pop()删除数组里最后一个元素， .shift()删除数组里第一个元素

* trim() 方法用于删除字符串的头尾空白符

###JSON文件格式必须严格，末尾有逗号都会导致请求失败

## 3-5.箭头函数调用 ##
首先不得不说，ES6 提供了箭头函数，增加了我们的开发效率，但是在箭头函数里面，没有 this ，箭头函数里面的 this 是继承外面的环境。

一个例子

    let obj={
    a:222,
    fn:function(){
    setTimeout(function(){console.log(this.a)})
    }
    };
    obj.fn();//underfind
    
    let obj={
    a:222,
    fn:function(){
    setTimeout(function(){console.log(this.a)})
    }
    };
    obj.fn();//underfind
不难发现，虽然 fn() 里面的 this 是指向 obj ，但是，传给 setTimeout 的是普通函数， this 指向是 window ， window 下面没有 a ，所以这里输出 underfind 。

换成箭头函数


    let obj={
    a:222,
    fn:function(){
    setTimeout(()=>{console.log(this.a)});
    }
    };
    obj.fn();//222

    let obj={
    a:222,
    fn:function(){
    setTimeout(()=>{console.log(this.a)});
    }
    };
    obj.fn();//222

这次输出 222 是因为，传给 setTimeout 的是箭头函数，然后箭头函数里面没有 this ，所以要向上层作用域查找，在这个例子上， setTimeout 的上层作用域是 fn。而 fn 里面的 this 指向 obj ，所以 setTimeout 里面的箭头函数的 this ，指向 obj 。所以输出 222 。

# box-sizing的作用 #

box-sizing，顾名思义，其作用与设置CSS box的尺寸大小有关，而CSS box又可细分为:

    content-box(即content area)
    padding-box(=content area + padding area)
    border-box(=content area + padding area + border area)
    margin-box(=content area + padding area + border area + margin area)
 

> 简单来说，box-sizing的作用就是告诉浏览器：CSS属性width和height是用于设置哪一种box的尺寸，在W3C标准中,box-sizing的值仅有content-box和border-box（firefox则额外支持padding-box）。

当box-sizing的值为border-box时，有：

    width = content-width + padding-left + padding-right + border-left-width + border-right-width;
> height也同上

#####Event Loop
    console.log('script start');
    
    setTimeout(function() {
    console.log('setTimeout');
    }, 0);
    
    Promise.resolve().then(function() {
    console.log('promise1');
    }).then(function() {
    console.log('promise2');
    });
    
    console.log('script end');

    : script start
    : script end
    : promise1
    : promise2
    : setTimeout
> 宏任务->微任务->下一轮的宏任务
> 
> 执行setTimeout后检查微任务是没有的，所以默认4ms延迟挂起,浏览器开辟线程计时
>
>顺序执行到promise微任务，暂不执行，向下执行宏任务log（end），执行完发现有微任务，所以接着输出promise1&2(promise属于log（end）这个宏任务）
>
>计时到最后输出setTimeout

##常见状态码

- 200——表明该请求被成功地完成，所请求的资源发送回客户端
- 304——自从上次请求后，请求的网页未修改过，请客户端使用本地缓存
- 400——客户端请求有错（譬如可以是安全模块拦截）
- 401——请求未经授权
- 403——禁止访问（譬如可以是未登录时禁止）
- 404——资源未找到
- 500——服务器内部错误
- 503——服务不可用
...


##再列举下大致不同范围状态的意义

- 1xx——指示信息，表示请求已接收，继续处理
- 2xx——成功，表示请求已被成功接收、理解、接受
- 3xx——重定向，要完成请求必须进行更进一步的操作
- 4xx——客户端错误，请求有语法错误或请求无法实现
- 5xx——服务器端错误，服务器未能实现合法的请求


`no-cache`代表不缓存过期的资源

`no-store`才是真正的不进行缓存


##单独修改placeholder字体颜色

	#schoolSearchForm .sub-button-box input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #fff;
		opacity: 1;
	}

	#schoolSearchForm .sub-button-box input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #fff;
		opacity: 1;
	}

	#schoolSearchForm .sub-button-box input:-ms-input-placeholder {
		color: #fff;
		opacity: 1;
	}

	#schoolSearchForm .sub-button-box input::-webkit-input-placeholder {
		color: #fff;
		opacity: 1;
	}

###js，forEach（）未填的参数前不能有,号 例如:(a,b,) 这种情况在安卓手机端上会报错，导致整个页面无法执行

### if条件判断时，
> 0会被当作undefined， 效果和''一样， 为了区别，用String（），此时''还是''，0则是'0'

##template7渲染时
> 只要有`{{#格式  变量}}`，`{{#if xx}`}等等.. 既算作为一层语境context，访问上级变量时便需要用 `../` 跳出到上级语境

##自增
	let i = 0;
    console.log(i++) // 0

>

	let i = 0;
	console.log(++i) // 1

### float和position：absolute的区别

>- position:absolute和float都是使元素脱离文档流。

>- position:absolute的元素是根据最近的非static的父元素定位,完全脱离文档流,即使在容器内也不占据任何空间

>- 关于float，也会脱离文档流，会被放置在其容器的左边或右边。在容器内 本身占据空间 !!!

>- The float CSS property specifies that an element should be taken from the normal flow and placed along the left or right side of its container, where text and inline elements will wrap around it. (float CSS属性指定一个元素应该从正常流中取出并放置在其容器的左侧或右侧，其中文本和内联元素将围绕它。)

### get与post的区别
1. get能请求缓存，post不行
2. post相对安全，因为get的请求都包含在URL上面，且会被浏览器历史记录
3. get不能传输数据，而post可以
4. URL有长度限制，会影响get请求，长度因浏览器决定
5. post支持更多的编码类型，且不对数据类型限制


#Vue
###通过数组索引改变数据时，不会触发getter
#### 原因
- 因为数组本身不包含getter和setter方法

----------
#### 解决方法

- 使用Vue.set()、vm.$set()或者数组的splice方法。 

#### Vue.set()方法会在数据改变的最后位置跟新数据！

#### 报错$attr是redonly： 原因import Vue的版本和cdn引入的版本冲突




##scrollbar上面是不允许用transition的



> 由于aside::-webkit-scrollbar的color是继承aside的color，
所以我们对aside进行trasition，这样scrollbar也就跟着有了过度效果

>这里用box-shadow模拟滚动条，box-shadow也继承了color的颜色 

    aside {
      color: rgba(0, 0, 0, 0);
      transition: all .3s ease-in-out;
      /* 用文字阴影代替文字 */
      text-shadow: 0 0 0 #252525;
    }
    
    aside:hover {
      color: rgba(0, 0, 0, .2);
    }
    
    aside::-webkit-scrollbar,
    aside::-webkit-scrollbar-thumb {
      width: 6px;
      border-radius: 6px;
    }
    
    aside::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 0 100px;
    }
	aside::-webkit-scrollbar-thumb:hover {
	  color: #959595;
	}

## 对象赋值问题

	let obj = { a:1,b:2 }
	let aa = {}
	aa.a = obj;
	aa.b = obj;
	aa.a.a = 233;
	// 	obj.a === 233
    //  aa.a.a = 233;
    //  aa.b.a = 233;
>对象赋值仅仅是引用，只要其中一个改变数据，其它的都会改变!

## 解构赋值
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
	x // 1
	y // 2
	z // { a: 3, b: 4 }
>1. 解构赋值的拷贝是 浅拷贝!
>- 即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

##箭头函数的this是根据上下文决定的

##事件冒泡
> 由内到外：从最内层的节点开始触发事件，逐级冒泡直到顶层节点

##事件捕获
> 由外到内：从顶层的父节点开始触发事件，逐级捕获直到最内层的节点

##echart设置刻度线
	  xAxis: {
          nameGap: 5, // 轴名距轴的距离
          nameLocation: 'end', // 轴名位置
          axisLine: { // 轴线
            show: true
          },
          axisTick: { // 刻度
            show: true,
            alignWithLabel: true, // 居中对齐
          },
          axisLabel: { // 标签
            color: '#ddd'
          }
        }

##禁止全部点击事件
    $(function() {
		$("*").on("click", function(e) {
			return false;
		});
	})


##safari浏览器兼容性问题
######不支持
- `let`变量
- ``模板拼接符
- 箭头函数
- for of
- 对象简写方法 `a = 1, b = { a }`
- 事件委托的元素不是默认的可点击元素时(div,span etc...)，click事件会失效

## 事件委托
> 事件委托将事件监听绑定在目标元素的父级上，当目标元素响应事件时冒泡到绑定事件的父级上，进行判断该事件的目标元素是否是传入的元素，如果是就执行传入的函数。

##video标签兼容性问题
> 描述：在android手机上的x5内核浏览器上，播放视频会弹出独立的视频播放层，即 **同层播放器**

> 分析： android不支持playsinline属性，TBS 内核（>=036849）支持 同层播放器 

>实现： `添加 x5-video-player-type="h5" 和 x5-video-player-fullscreen="true"属性`

>事件： `document.getElementById('video').addEventListener("x5videoexitfullscreen", function(){
alert("exit fullscreen")
})`
`
document.getElementById('video').addEventListener("x5videoenterfullscreen", function(){
alert("enter fullscreen")
})`

##手机端 - 刷新页面 - 返回页面不刷新
> 描述： 在ios的ukwebview上面，在android的微信上面，使用`window.reload(),window.replace()，window.href`来进行刷新时，**不能刷新页面**的问题
 
> 分析： 微信上面会强缓存页面，当有缓存的时候，不会进行页面的刷新。
> 补充： window.onload会等待页面（css、图片、dom等）加载完成后加载js，且页面被缓存则使用缓存，导致不会刷新页面。

> 解决： 可通过绕过缓存的一切方法来实现

> 实现： `window.location.href = location.href+'?time='+((new Date()).getTime());`
`window.onpageshow = function(e) {
    if (e.persisted) {
      window.location.reload();
    }
  }`

## 微信手机端
- 底部占位40px
