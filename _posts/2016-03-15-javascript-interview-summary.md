---
layout: post
title: "前端面试知识点归纳 -- JavaScript"
date: 2016-03-15 02:20:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: 中文 Techs Front-End
---

> 名词: `原型`(prototype), `事件`(event),`作用域`, `闭包`(closure), `JSON`, `AJAX`, `异步`, `ES6`, `DOM`

1. JS基本数据类型
    - `Undefined`, `Null`, `Boolean`, `Number`, `String`, `Object`
<br><br>
1. JS内置对象：
    - Object 是 JavaScript 中所有对象的父对象
        - 数据封装类对象：Object、Array、Boolean、Number 和 String
        - 其他对象：Function、Arguments、Math、Date、RegExp、Error
<br><br>
1. JS基本规范（部分）：
    - 变量申明必须加上`var`关键字，避免全局变量污染作用域
    - 总是使用分号，仅仅靠语句间的隐式分隔很可能出问题
    - 规范常量（e.g. `GLOBAL_VARIABLE`）、一般变量(e.g. `generalVariable`)、循环中变量(e.g. i, j, k)等的使用
    - 不要在块内声明函数，违背ECMAScript规范
    - 字符串单引号优于双引号，特别是有包含HTML的字符串时

    > 详见 [Google JavaScript 规范指南](http://docs.kissyui.com/1.4/docs/html/tutorials/style-guide/google-js-style.html)

1. JS原型(prototype)与继承
    - 每个对象都会在其内部初始化一个属性，就是`原型`，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的`原型链`的概念。
    - 创建对象方式：
        - 构造器创建
        - `Object.creat()`创建
    - `hasOwnProperty()`检测对象的属性是定义在自身上还是原型链上，**唯一一个只涉及对象自身属性而不会遍历原型链的方法**
<br><br>
1. JS作用域链
    - 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。
    - 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局函数，这种组织形式就是`作用域链`。
<br><br>
1. 事件(event)
    - `冒泡型事件`：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发
    - `捕获型事件`(event capturing)：事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)
    - DOM事件流：同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。**文本节点也触发事件**
    ```
    捕获->目标->冒泡，addEventListener第三个参数确定在捕获还是冒泡阶段触发
    ```
    - IE的事件机制：只支持冒泡型，且**文本节点不能触发事件**
    ```
    冒泡事件的应用：
    对于内容动态增加，并且子节点都需要相同处理的情况，可以把事件注册到父节点上
    ```

1. 闭包(closure)
    - 有权访问另一个函数作用域中变量的函数
    - 特征
        - 函数内再嵌套函数
        - 内部函数可以引用外层的参数和变量
        - 参数和变量不会被垃圾回收机制回收
    - 闭包允许将函数与其所操作的某些数据（环境）关连起来。**类似于面向对象编程**
    - 闭包的回收：在不再使用时，手动标记相应的对象或变量为null
<br><br>
1. JS延迟加载的方法
    - 直接将script节点放置在</body>之前，这样js脚本就会在页面显示出来之后再加载
    - 使用script标签的`defer`和`async`属性，`defer`属性为延迟加载，是在页面渲染完成之后再进行加载的，而`async`属性则是和文档并行加载，这两种解决方案都不完美，原因在于不是所有浏览器都支持
    - 通过监听onload事件，动态添加script节点
    - 异步加载，通过ajax下载js脚本，动态添加script节点

    > 详见 [JavaScript延迟加载方式](http://blog.csdn.net/newborn2012/article/details/17057759)

1. 哪些操作可能造成内存泄露
    - `setTimeout`的第一个参数使用字符串而非函数的话，会引发内存泄漏
    - 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）
<br><br>
1. `document`与`window`
    - `document`指的是页面，`window`是窗体，`document`是`window`的一个子对象，可通过`window.document`属性对其进行访问
<br><br>
1. 对`this`关键字的理解
    - 全局对象`window`（普通函数中使用`this`）
    - DOM树中的节点(添加事件处理函数时)
    - 新创建的对象(使用一个构造器)
    - 其他对象(如果函数被`call()`或`apply()`)

    > 详见 [深入理解JavaScript中的this关键字](http://www.cnblogs.com/rainman/archive/2009/05/03/1448392.html#1523756)

1. `apply()`/`call()`/`bind()`
    - 都是用来改变函数的this对象的指向的
    - 第一个参数都是this要指向的对象，也就是想指定的上下文
    - 三者都可以利用后续参数传参，但`apply()`传参用数组
    - `bind()`是返回对应函数，便于稍后调用；`apply()`/`call()`则是立即调用

    > 详见 [深入浅出：妙用Javascript中apply、call、bind](http://www.cnblogs.com/coco1s/p/4833199.html)

1. `'use strict'`
    - `use strict`是一种ES5添加的（严格）运行模式,使得JS在更严格的条件下运行
    - 限制的例子
        - 不能用with，不能在意外的情况下给全局变量赋值
        - 全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用
        - 限制函数中的arguments修改
    - 好处
        - 使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为，保证代码安全运行
        - 提高编译器效率，增加运行速度
        - 为未来新版本的Javascript标准化做铺垫。
<br><br>
1. `new`操作符具体干了什么
    - 创建一个空对象，并且`this`变量引用该对象，同时还继承了该函数的原型
    - 属性和方法被加入到`this`引用的对象中
    - 新创建的对象由`this`所引用，并且最后隐式的返回`this`
<br><br>
1. `null`与`undefined`
    - `null`: 表示一个对象被定义了，且有 **值**，**值** 为“空值/空对象”
    - `undefined`: 表示不存在这个值，对象被定义了但没有赋值，也是undefined
<br><br>

    ```javascript
    typeof undefined; //"undefined"
    typeof null; //"object"
    ```

1. 关于`eval()`函数
    - 把对应的字符串解析成JS代码并运行
    - 性能消耗：先解析，然后运行。属于不可预测代码，浏览器会用slow path编译
    - 可能不安全：可能被XSS代码注入攻击
    - 不容易调试：ChromeDev不能断点调试等

    > 详见 [JavaScript为什么不推荐使用eval](https://www.zhihu.com/question/20591877)

1. `with`语句
    - 暂时改变代码块的作用域
    - JavaScript的解释器需要检查`with`块中的变量是否属于`with`包含的对象，执行速度大大下降
    - 可以用一个变量代替
<br><br>
1. 短路原理
    - `0`、`""`、`null`、`false`、`undefined`、`NaN`都会判为false，其他都为true
    - `&&`：从左到右选取表达式的第一个为`false`的表达式的值，如果一直未找到则返回最后一个表达式的值
    - `||`：从左到右选取表达式的第一个为`true`的表达式的值，如果一直未找到则返回最后一个表达式的值
<br><br>
1. JS中tricky的问题
    - ["1", "2", "3"].map(parseInt) 答案是多少？
      ```
      [1, NaN, NaN] 因为 parseInt 需要两个参数 (val, radix)，
       其中 radix 表示解析时用的基数。
       map 传了 3 个 (element, index, array)，对应的 radix 不合法导致解析失败。
      ```

    - 在浏览器console里输入this返回什么？
      ```javascript
      > this
      < Window {
          external: Object,
          chrome: Object,
          document: document,
          csdn: Object,
          protocol: ""…}
      ```

    - 下面这段代码干了什么？
      ```javascript
      [].forEach.call(
          $$("*"),function(a){
              a.style.outline="1px solid #" +
              (~~(Math.random()*(1<<24))).toString(16)
          }
      )
      ```
      ```
      给页面中所有的html tag加上了1px的随机颜色的边框
      $$("*")获取了所有的DOM
      ```

    - 实现千位分隔符

      ```javascript
      function formatNumber(num) {
        if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {  
            return num;  
         }  
         var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;  
         var re = /(\d)(\d{3})(,|$)/;  
         while(re.test(b)) {  
            b = b.replace(re, "$1,$2$3");
         };
         return a + "" + b + "" + c;  
      }  
      var num=1234567/3;  
      formatNumber(num);
      ```
    > 参考 [**孤狼博客**：js为数字添加千位分隔符“,”](http://332374363.blog.51cto.com/5262696/930830)

    - 全局变量定义有没有`var`的区别
        - 有`var`的不能用`delete`关键字删除，而没有用`var`的可以
<br><br>
1. 关于`JSON`(JavaScript Object Notation)
    - JSON是一种轻量级的数据交换格式
    - 基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小
<br><br>
1. 同步与异步
    - 同步：浏览器访问服务器请求，等请求完，**页面刷新**，新内容出现
    - 异步：浏览器访问服务器请求，用户正常操作，等请求完，**页面不刷新**，新内容出现
<br><br>
1. 关于`AJAX`(Asynchronous Javascript And XML)
    - 实现步骤
        - 创建XMLHttpRequest对象,也就是创建一个异步调用对象
        - 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
        - 设置响应HTTP请求状态变化的函数
        - 发送HTTP请求
        - 获取异步调用返回的数据
        - 使用JavaScript和DOM实现局部刷新
<br><br>
1. JS跨域问题
    - 指JS不能在不同域 **（域名/协议/端口）** 之间通信。如不能在不同域间用AJAX或者获取iframe信息
    - 解决方法
        - `jsonp`：页面`<script>`引入其他域的js脚本，`src`的URL尾部加上`?callback=balabala`，然后写callback函数操作返回的数据；这些`<script>`标签也可以动态生成，如果用`jQuery`，可以用**$.getJSON**来操作，会自动判断是否是跨域，不跨域则用AJAX方法，否则用jsonp
        - 修改`document.domain`来跨子域：`iframe`中和原页面中的`document.domain`设置成相同，就可以通过js获取`iframe`元素的`window`进行操作了。因为只能修改为当前域名的子域，**该方法只适用于跨子域**
        - `window.name`：一个窗口生命周期内载入的所有页面共享一个`window.name`，且都有读写的权利。包含数据的页面设置把数据设置在`window.name`里，然后用iframe动态的载入，设置iframe的src，然后获取其`window.name`值
        - HTML5的`postMessage`方法：一个通过iframe来postMessage，另一个监听message事件来获取数据

    > 详见 [JS中几种实用的跨域方法原理详解](http://www.cnblogs.com/2050/p/3191744.html)

1. DOM操作
    - 创建新节点
        - `createElement()`   //创建一个具体的元素
        - `createTextNode()`   //创建一个文本节点
    - 添加、移除、替换、插入
        - `appendChild()`
        - `removeChild()`
        - `replaceChild()`
        - `insertBefore()`
    - 查找
        - `getElementsByTagName()`    //通过标签名称
        - `getElementsByName()`    //通过元素的Name属性的值
        - `getElementById()`    //通过元素Id，唯一性
<br><br>
1. ES6/ECMAScript2015（部分新特性）
    - 箭头函数
        - 单参数直接写，多参数用`()`包裹
        - 函数只有一句直接写，多语句块用`{}`包裹

      ```javascript
      // ES5
      var total = values.reduce(function(a, b) {
          return a + b;
      }, 0);
      // ES6
      var total = values.reduce((a, b) => a + b, 0);

      // ES5
      $("#confetti-btn").click(function (event) {
          playTrumpet();
          fireConfettiCannon();
      });
      // ES6
      $("#confetti-btn").click(event => {
          playTrumpet();
          fireConfettiCannon();
      });
      ```

        - 创建普通对象，需要用`()`包裹

      ```javascript
      // 为与你玩耍的每一个小狗创建一个新的空对象
      var chewToys = puppies.map(puppy => {});   // 这样写会报Bug！
      var chewToys = puppies.map(puppy => ({})); // 正确
      ```

        - 箭头函数`this`继承自外部作用域

      ```javascript
      // ES5
      {
        ...
        addAll: function addAll(pieces) {
          var self = this;
         _.each(pieces, function(piece) {
            self.add(piece);
          });      //需要用变量传入外部this，或者内层函数.bind(this)
        },
        ...
      }
      // ES6
      {
        ...
        addAll: function addAll(pieces) {
          _.each(pieces, piece => this.add(piece));
        },
        ...
      }
      ```

      > 详见 [深入浅出ES6（七）：箭头函数 Arrow Functions](http://www.infoq.com/cn/articles/es6-in-depth-arrow-functions)

    - 类的支持
    - 字符串模板
    - 解构赋值
    - Promise

    > 详见 [ECMAScript6新特性简介](http://gejiawen.github.io/2015/07/28/es6-new-feature/)

1. ES7(2016)
    - 只有2个新特性
        - 指数操作符`**`
        - `Array.prototype.includes`

    > 详见 [ES7新特性及ECMAScript标准的制定流程](http://wwsun.github.io/posts/new-in-es2016.html?utm_source=tuicool&utm_medium=referral)
