---
layout: post
title: "前端面试知识点归纳 -- HTML"
date: 2016-03-14 02:26:00 -0600
tags: 中文 Techs FrontEnd
---

> 名词：`DOCTYPE`, `DTD`(Document Type Definition), `SGML`(Standard General Markup Language), `XML`(Extensible Markup Language), `HTML`/`XHTML`, `inline`/`block`, `HTML5`

1. HTML语义化
    - 用正确的标签做正确的事情
    - 页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
    - 在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的;
    - 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
    - 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
<br><br>
2. HTML5
    - HTML5不是SGML子集
    - 新特征：
        - 画布 tag：`canvas`
        - 视频与音频 tag：`video`, `audio`
        - input 表单控件：`calendar`, `date`, `time`, `email`, `url`, `search`等
        - 语义化更好的 tag：`article`, `footer`, `header`, `nav`, `section`
        - Storage，缓存大于5MB数据
            - `window.localStorage` - 一直保存不丢失
            - `window.sessionStorage` - 浏览器关闭后丢失
        - 新技术（部分）
            - `WebWorker`：后台单独运行的JS程序
            - `WebSocket`：双向通信技术，单socket，通过JS接口
            - `Geolocation`：获取用户位置
        - 移除的元素
            - 纯表现元素：basefont，big，center，font, s，strike，tt，u
            - 对可用性产生负面影响的元素：frame，frameset，noframes        
    - 支持HTML5新标签
        - 可以document.createElement产生新标签，然后定义默认样式
        - 最好用成熟框架比如`html5shim`,条件注释引入IE9以下版本
    - 区分HTML5和HTML4.01：**DOCTYPE / 新增tag / 新技术功能元素**
    - 离线存储
        - 在线情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
        - 离线情况下，浏览器就直接使用离线存储的资源。
<br><br>
3. `inline`行内元素/`block`块级元素/`void`空元素
    - 行内元素：a b span img input select strong
        - **用CSS中的display:block;属性则变为块级元素**
    - 块级元素：div ul ol li dl dt dd p h1 h2 h3 h4 ...
        - **用CSS中的display:inline;属性则变为行内元素**
    - 常见空元素：br hr img input link meta
<br><br>
4. `<iframe>`的缺点
    - iframe会阻塞主页面的onload事件
    - 搜索引擎的检索程序无法解读这种页面，不利于SEO
    - iframe和主页面共享`连接池`(connection pool)，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
<br><br>
5. `<label>`的作用
    - 定义表单控件间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上
<br><br>
6. XHTML
    - XHTML 元素必须被正确地嵌套
    - XHTML 元素必须被关闭，空标签也必须被关闭，如 <br> 必须写成 <br />
    - XHTML 标签名必须用小写字母
    - XHTML 文档必须拥有根元素
    - XHTML 文档要求给所有属性赋一个值
    - XHTML 要求所有的属性必须用引号""括起来
    - XHTML 文档需要把所有 < 、>、& 等特殊符号用编码表示
    - XHTML 文档不要在注释内容中使“--”
    - XHTML 图片必须有说明文字
    - XHTML 文档中用id属性代替name属性
