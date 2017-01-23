---
layout: post
title: "前端面试知识点归纳 -- Others"
date: 2016-03-15 03:15:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: 中文 Techs Front-End
excerpt: 作为前端面试知识点归纳系列的最后一篇，这里主要列举了一些零散的知识点。这部分的知识虽然零散，但是前端体系全面性的重要组成部分，也是前端岗位面试中非常常见的问题。主要包括：浏览器知识、网络知识与网络安全、性能优化与前端模块化/工程化、常见前端框架知识等
---

> 作为前端面试知识点归纳系列的最后一篇，这里主要列举了一些零散的知识点。这部分的知识虽然零散，但是前端体系全面性的重要组成部分，也是前端岗位面试中非常常见的问题。主要包括：浏览器知识、网络知识与网络安全、性能优化与前端模块化/工程化、常见前端框架知识等。

## 浏览器

1. 比较`cookie`/`sessionStorage`/`localStorage`
    - cookie 不超过4k，storage可以大于5M
    - 有效时间：
        - cookie: 有失效时间，和浏览器是否关闭没有关系
        - sessionStorage: 关闭浏览器就没了
        - localStorage: 永久保存
    - cookie是标记用户身份的，会在http请求中携带，storage仅本地保存
<br><br>
1. 标准模式（严格模式）& 兼容模式（怪异模式，混杂模式）
    - 标准模式：浏览器根据规范呈现
    - 兼容模式：页面以宽松向后兼容方式显示
    - 根据DOCTYPE来决定触发哪种，DOCTYPE不存在或者DOCTYPE有过渡DTD但没有URI，则以兼容模式呈现
<br><br>
1. 浏览器内核：
    - 内核组成：
        - 渲染引擎(Layout/Rendering Engine)：获取网页内容（HTML，XML，图像等），整理讯息（加入CSS等），计算网页显示方式，输出到显示器
        - JS引擎（Javascript Engine)：解析和执行JS来实现网页动态效果
    - 常见内核：
        - Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
        - Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
        - Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]
        - Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]
<br><br>
1. 浏览器多个标签之间的通信
     - 调用localstorge、cookies等本地存储方式
<br><br>
1. 检测浏览器版本的方法
    - 检测是否是IE，用`navigator.appName === 'Microsoft Internet Explorer'`
    - 检测具体浏览器版本用`navigator.userAgent`
<br><br>
1. 浏览器渲染页面过程
    - 基本过程
        - 根据HTML构建`DOM树`
        - 根据CSS构建`渲染树`
        - 根据`渲染树`绘制页面到浏览器
    - 具体过程
        - 根据**HTML**自上而下构建`DOM树`
        - 遇到**script**标签，阻塞`DOM树`构建
        - 遇到**CSS文件**，阻塞`渲染树`，但`DOM树`继续构建（除非遇到**script**标签且**CSS文件**没有加载完）
        - 现代浏览器会在渲染阻塞时预加载（下载）后续页面中**url**属性的文件

    > 详见 [了解HTML页面的渲染过程](http://www.cnblogs.com/yuezk/archive/2013/01/11/2855698.html)

1. 谈谈你知道的各浏览器存在的兼容性问题
    - CSS兼容性（部分）
        - 不同浏览器，同样的标签在不加样式的情况下，各自的`margin`和`padding`差异较大。【解决方案】```*{margin:0;padding:0;}```
        - Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示。【解决方案】```-webkit-text-size-adjust: none; ```
        - FF不识别background-position-y 或background-position-x;
    - JS兼容性（部分）
        - XMLHttpRequest API，主流浏览器`xmlhttp = new XMLHttpRequest();`，IE6以下`xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");`
        - DOM操作里`parentNode`和`parentElement`功能一样，`childNodes`和`children`功能一样。IE支持两种，FF就只支持`parentNode`,`childNodes`
    - 其他（比如事件机制）
        - 触发事件的元素被认为是目标（target）。而在 IE 中，目标包含在 event 对象的 srcElement 属性
        - IE只有冒泡，而其他可以冒泡可以捕获

## 网络与安全

1. 网页验证码作用，为了解决的安全问题
    - 区分用户是计算机还是人的公共全自动程序。可以防止：恶意破解密码、刷票、论坛灌水；
<br><br>
1. CDN（数据分发网络
    - 最关键的部分是`智能调配DNS`：
        - 用户在访问网站时`智能调配DNS`会帮助localDNS，通过一些算法（静态拓扑等）计算出最合适的CDN节点的IP返回给用户
        - 还需要与各地CDN节点通信，跟踪各节点健康状态与容量
    - 缓存功能：负载均衡，内容Cache服务器，共享存储等。

    > 详见 **运维之道**：[web网站加速之CDN技术原理](http://www.51know.info/system_performance/cdn/cdn.html)

1. 常见的Web攻击手段与防护
    - XSS(Cross Site Scripting)跨站脚本攻击
        - 被动的攻击方式
        - 注入JS代码，在其他用户访问时运行
        - 可能的危害
            - 盗取cookie信息，冒充用户
            - 更改页面DOM信息
            - 利用HTML5特性，有可能获取用户位置信等
        - 防御：后端过滤特殊字符（不同的后端有不同的API来过滤）

    ![XSS Mechanism](http://www.acunetix.com/wp-content/uploads/2012/10/how-xss-works-1024x454.png)

    > 详见：[Cross Site Scripting (XSS) Attack](http://www.acunetix.com/websitesecurity/cross-site-scripting/)

    - CSRF(Cross Site Request Forgery)跨站请求伪造攻击
        - 常与XSS配合，获得用户cookie等信息后，模仿用户行为修改用户数据等
        - 防御
            - 使用POST请求发送信息
            - 用验证码，令牌等方式二次确认用户身份
    - 上传文件攻击
        - **文件名攻击**，文件名包含脚本，从而造成攻击
        - **文件后缀攻击**，上传的文件的后缀可能是exe可执行程序，js脚本等文件，这些程序可能被执行于受害者的客户端，甚至可能执行于服务器上。因此我们必须过滤文件名后缀,排除那些不被许可的文件名后缀
<br><br>
1. 常见HTTP状态码
    - 100 Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
    - 200  OK         正常返回信息
    - 201  Created    请求成功并且服务器创建了新的资源
    - 202  Accepted   服务器已接受请求，但尚未处理
    - 301  Moved Permanently  请求的网页已永久移动到新位置
    - 302 Found       临时性重定向
    - 303 See Other   临时性重定向，且总是使用 GET 请求新的 URI
    - **304  Not Modified 自从上次请求后，请求的网页未修改过**
    - 400 Bad Request 客户端请求有语法错误，不能被服务器所理解
    - 401 Unauthorized 请求未授权
    - 403 Forbidden   禁止访问
    - 404 Not Found   找不到如何与 URI 相匹配的资源
    - 500 Internal Server Error  最常见的服务器端错误
    - 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）
<br><br>
1. HTTP状态码完整版
    - 1**(信息类)：表示接收到请求并且继续处理
        - 100——客户必须继续发出请求
        - 101——客户要求服务器根据请求转换HTTP协议版本
    - 2**(响应成功)：表示动作被成功接收、理解和接受
        - 200——表明该请求被成功地完成，所请求的资源发送回客户端
        - 201——提示知道新文件的URL
        - 202——接受和处理、但处理未完成
        - 203——返回信息不确定或不完整
        - 204——请求收到，但返回信息为空
        - 205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
        - 206——服务器已经完成了部分用户的GET请求
    - 3**(重定向类)：为了完成指定的动作，必须接受进一步处理
        - 300——请求的资源可在多处得到
        - 301——本网页被永久性转移到另一个URL
        - 302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
        - 303——建议客户访问其他URL或访问方式
        - 304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
        - 305——请求的资源必须从服务器指定的地址得到
        - 306——前一版本HTTP中使用的代码，现行版本中不再使用
        - 307——申明请求的资源临时性删除
    - 4**(客户端错误类)：请求包含错误语法或不能正确执行
        - 400——客户端请求有语法错误，不能被服务器所理解
        - 401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
        - 402——保留有效ChargeTo头响应
        - 403——禁止访问，服务器收到请求，但是拒绝提供服务
        - 404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
        - 405——用户在Request-Line字段定义的方法不允许
        - 406——根据用户发送的Accept拖，请求资源不可访问
        - 407——类似401，用户必须首先在代理服务器上得到授权
        - 408——客户端没有在用户指定的饿时间内完成请求
        - 409——对当前资源状态，请求不能完成
        - 410——服务器上不再有此资源且无进一步的参考地址
        - 411——服务器拒绝用户定义的Content-Length属性请求
        - 412——一个或多个请求头字段在当前请求中错误
        - 413——请求的资源大于服务器允许的大小
        - 414——请求的资源URL长于服务器允许的长度
        - 415——请求资源不支持请求项目格式
        - 416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
        - 417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。
    - 5**(服务端错误类)：服务器不能正确执行一个正确的请求
        - 500——服务器遇到错误，无法完成请求
        - 502——网关错误
        - 503——由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常

## 工程化与性能优化

1. **前端优化**
    - 加载优化
        - DIV+CSS布局，不使用Table布局（代码臃肿，全部内容加载完才渲染）
        - Gzip技术网页压缩
        - CDN加速
        - CSS/JS文件合并（减少HTTP request次数，即减少三次握手）及压缩
        - 图片压缩，**CSS Image Sprites**
        - 用`link`放Stylesheets在HTML页面头部，先加载完样式表才会渲染，放在后面会页面长时间空白
        - CSS缩写，比如`color`写成三位，`margin`/`border`等，提取重复等减少代码量
        - 延迟/异步加载JS
        - 延迟请求首屏外内容，滚动页面再load下面的，lazyload
    - 性能优化
        - CSS性能优化
            - 合理使用选择器，如后代选择器非常耗时
            - 避免使用CSS Expression，触发会很频繁，很耗时
        - JS性能优化
            - 管理作用域，使用局部变量
              - 局部变量访问更快
              - 防止全局变量污染
            - 数据操作
              - 缓存频繁使用的对象/数组/属性：比如循环时`array.length`
              - 不直接操作NodeList，将其转换成静态数组后再使用
            - DOM操作
              - 使用`DocumentFragment`
            - 流控制
              - `if`语句中，将经常发生的放在靠上的位置，提前返回
            - 小心使用闭包：使用完后需要及时释放空间，否则可能内存泄露
            - 数值转字符串用`''+`比`.toString()`快
            - 避免使用`with`语句

    > 参考 [前端工程优化：javascript的优化小结](http://www.cnblogs.com/coco1s/p/3946435.html) 与 [Web前端优化最佳实践及工具集锦](http://www.csdn.net/article/2013-09-23/2817020-web-performance-optimization)

1. 前端模块化
    - 实现特定功能相互独立的方法。【由来】随着网站的发展，JS文件越来越大，模块化利于分工协作、管理与测试等
    - `CommonJS`：主要用于服务器端模块化规范，同步，`require`加载模块，`exports`返回对象
    - `AMD`：非同步加载，允许指定回调函数。【核心思想】Early Executing
    - `RequireJS` - AMD 和`SeaJS` - CMD

    > 详见 **imWeb前端社区**：[浅谈前端模块化](http://imweb.io/topic/55994b358555272639cb031b)

## 前端框架

1. **React.js**
    - `virtual DOM`：轻量、无状态、不可改变的DOM虚拟表示，使用`JSX`时会自动创建
    - **组件驱动开发(Component-driven Dev)**：`React`的一大特点，网页由组件构成，JS和HTML混写（与MVC开发模式的视图控制分离思想不同），但易于获得**单一责任**层面的灵活与可重用性
    - `JSX`*(JavaScript eXtension)*：为组件驱动开发提供的JS中书写的HTML代码

    > 详见 [React 入门知识汇总](http://www.cocoachina.com/webapp/20150810/12967.html)

    - 单向数据流`flux`*(unidirectional data flow)*
        - `view`发生改变或者服务器端发生改变，`action creater`产生一个**action**给`dispatcher`
        - `dispatcher`有各种`store`注册的回调函数**callback**，`dispatcher`将`action`的**payload**发给所有注册回调函数的`store`
        - `store`根据自己感兴趣的**payload**做出相应的反应，产生**change**事件
        - `controller-views`监听这些事件，并从`store`获取数据，调用组件*render()*函数，更新自身及其孩子们

      ![flux architecture](https://github.com/facebook/flux/blob/master/docs/img/flux-diagram-white-background.png?raw=true)

      > 详见 [Facebook Flux Example](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) 与 **CSDN:** [详解React Flux架构工作方式](http://www.csdn.net/article/2015-08-31/2825587-react-flux)

    - 生命周期`lifecyle methods`
        - `componentWillMount`：执行一次，服务器端客户端都执行，在原始渲染前
        - `componentDidMount`：执行一次，客户端执行，在原始渲染刚完成后
        - `componentWillReceiveProps`
        - `shouldComponentUpdate`
        - `componentWillUpdate`
        - `componentDidUpdate`
        - `componentWillUnmount`：组件从DOM卸载前执行

    - `props`和`state`
        - `props`是组件的初始化数据，外部传入，不能改变
        - `state`是组件会变化（并导致渲染改变）的状态
<br><br>
1. **Angular.js**
    - 数据双向绑定
        - 通过`scope`实现
        - 过程
            - 浏览器UI产生事件（如按下按钮）
            - 浏览器收到一个事件，若调用`$apply()`，则进入`angular context`执行环境
            - `$digest`循环开始执行，查询每个`$watch`是否变化（UI上每绑定一些东西，`$watch队列`里就会插入一个`$watch`）
            - 若有变化，强制再执行一次`$digest`循环
            - 新的`$digest`循环没有检测到变化
            - 浏览器拿回控制权，更新相应的DOM

    > 详见 [Angular数据双向绑定](http://www.cnblogs.com/jingwhale/p/5117419.html) 与 [AngularJs 双向绑定机制解析](http://www.2cto.com/kf/201408/327594.html)
