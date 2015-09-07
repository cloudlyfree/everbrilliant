//这里是jquery1.9以上版本兼容早期版本插件的处理
//因为jquery1.9没有browser对象
    $.browser={};
    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());