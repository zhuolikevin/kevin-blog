---
layout: post
title:  "前端面试知识点归纳 -- CSS"
date:   2016-03-14 21:56:00 -0600
categories: tech zn fe
---

> 名词: `盒子模型`(Box Model), `选择器`(Selector), `CSS3`, `CSS Hack`

1. 样式导入的`link`与`@import`
    - `link`属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而`@import`是CSS提供的，只能用于加载CSS
    - 页面被加载的时，`link`会同时被加载，而`@import`引用的CSS会等到页面被加载完再加载
    - `import`是CSS2.1 提出的，只在IE5以上才能被识别，而`link`是XHTML标签，无兼容问题
<br><br>
1. CSS的盒子模型
    - 一个元素盒模型的层次从内到外分别为：`content`, `padding`, `border`, `margin`
    - IE8以下浏览器的盒模型中定义的元素的宽高包括`padding`和`border`，其他浏览器定义的宽高仅仅是`content`的宽高
<br><br>
1. CSS选择器
    - id选择器（ # myid）
    - 类选择器（.myclassname）
    - 标签选择器（div, h1, p）
    - 相邻选择器（h1 + p）
    - 子选择器（ul > li）：选择ul的所有孩子
    - 后代选择器（li a）：选择li的后代里的所有a，不一定是直接孩子
    - 通配符选择器（ * ）：选择所有元素
    - 属性选择器（a[rel = "external"]）
    - 伪类选择器（a: hover, li: nth - child）
<br><br>
1. CSS优先级与权重
    - `inline` > `id`(100) > `class`(10) > `tag`(1)
    - 同权重以最后载入为准
    - `!important`与优先级权重无关，会覆盖CSS中任何其他声明

    > 详见 **IBM DeveloperWorks**：[提高Web应用性能之CSS调优](https://www.ibm.com/developerworks/cn/web/1109_zhouxiang_optcss/)

1. CSS3新特性（部分）
    - 边框圆角`border-radius`
    - 阴影`box-shadow`
    - 文字阴影`text-shadow`
    - 线性渐变`gradient`
    - `transform:rotate scale translate skew`
    - 更多的CSS选择器`p:nth-child(2)`/`p:first-of-type`等
    - rgba
    - **Flexbox**
        - 更好的操控子元素布局
            - 如果元素容器没有足够的空间，我们无需计算每个元素的宽度，就可以设置他们在同一行
            - 可以快速让他们布局在一列
            - 可以方便让他们对齐容器的左、右、中间等
            - 无需修改结构就可以改变他们的显示顺序
            - 如果元素容器设置百分比和视窗大小改变，不用提心未指定元素的确切宽度而破坏布局，因为容器中的每个子元素都可以自动分配容器的宽度或高度的比例。
<br><br>
1. CSS Hack
    - 针对不同的浏览器写不同的CSS代码，解决局部CSS兼容问题
    - 常见方法
        - 属性加`*`,`_`,`+`等，区别不同IE版本和其他浏览器
        - 选择器hack
        - IE条件注释
        - 利用IE6不支持`!important`

    > 详见 **前端客**[CSS Hack技术介绍及常用的Hack技巧](http://www.qdker.com/archives/138.html)

1. CSS样式初始化
    - 消除因不同浏览器对不同标签默认值的不同而引起的兼容性问题
<br><br>
1. CSS属性知识点
    - `display`值有哪些（部分）
        - **block** 像块类型元素一样显示
        - **none** 默认值。像行内元素类型一样显示
        - **inline-block** 像行内元素一样显示，但其内容像块类型元素一样显示
        - **list-item** 像块类型元素一样显示，并添加样式列表标记

    - `postition`的定位原点
        - **absolute**: 相对于 static 定位以外的第一个父元素进行定位
        - **fixed**: 相对于浏览器窗口进行定位（老IE不支持）
        - **relative**: 相对于其正常位置进行定位
        - **static**: 默认值。没有定位，元素出现在正常的流中

    - `float`相关
        - 浮动的框可以向左/右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止
        - 浮动框不在文档的普通流中，文档的普通流中的块框表现得就像浮动框不存在一样
        - **可以用来让文字环绕图片**，`clear`来表示那些边不能贴着浮动框
        - 可能出现的问题
            - 父元素的高度无法被撑开，影响与父元素同级的元素。【解决方法】：父元素里再加一个空div并`clear`
<br><br>
1. CSS中的tricky问题
    - 元素竖向的百分比设定是相对于容器的高度吗？
      ```
      不是，包括padding-top/bottom, margin-top/bottom，都是相对于父容器的宽度
      ```
    - 用纯CSS创建一个三角形
      ```css
      /* 把上、左、右三条边隐藏掉（颜色设为 transparent）*/
      #demo {
        width: 0;
        height: 0;
        border-width: 20px;
        border-style: solid;
        border-color: transparent transparent red transparent;
      }
      ```
    - 子元素`float`后防止父元素塌陷的方法
        - 设置父元素浮动
        - 设置父元素`overflow: hidden`
        - 在浮动元素后加个空`div`设置
          ```css
          {clear: both; height:0; overflow:hidden; }
          ```
        - 父元素使用`clearfix`
          ```css
          .clearfix {zoom: 1; display: table; width: 100%;}
          ```
