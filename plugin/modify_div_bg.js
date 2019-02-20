;(function(global) {
    "use strict";
    // 定义一个类
    var M = function(el) {
        this.el = typeof el === "string" ? document.querySelector(el) : el;
    };
    //覆写原型链，给继承者提供方法
    M.prototype = {
        // 把函数添加到原型对象的属性里面
        setColor: function(bg) {
            this.el.style.background = bg;  //this 就是.setColor的对象
        }
    };


    // 注册全局变量，兼容直接使用script标签引入该插件
    global.myPlugins = M;

})(window);//将this传入函数里，使全局变量变成局部变量，缩短函数访问全局变量的时间