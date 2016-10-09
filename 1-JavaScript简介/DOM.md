- 文档对象模型(DOM,Document Object Model)是针对XML，但经过扩展用于HTML的应用程序编程接口(API,Application Programming Interface)

- 原理：DOM把整个页面映射为一个多层节点结构

![节点树](DOMTree.png "节点树图")

HTML或XML页面中的每个组成部分都是某种类型节点(比如：元素节点、属性节点、文本节点).通过树形图，开发人员获得了控制页面内容和结构的主动权。通过DOM提供的API(比如：removeChild/appendChild/createElement),来删除、添加、创建节点

- 注意：DOM不仅在javascript中得到实现，在其他很多语言中也被应用

- DOM级别：
    1. DOM1
    
        - DOM核心(DOM Core 映射基于XML的文档结构，简化文档中任意部分的访问和操作)
        
        - DOM HTML(在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法)

    2. DOM2
    
        - DOM视图(DOM Views):定义了跟踪不同文档(例如，应用CSS之前和之后的文档)视图的接口
        
        - DOM事件(DOM Events):定义了事件和事件处理的接口
        
        - DOM样式(DOM Style):定义了基于CSS为元素应用样式的接口
        
        - DOM遍历和范围(DOM Traversal and Range):定义了遍历和操作文档书的接口
        扩展了DOM核心

    3. DOM3
        
        - 引入了统一方式加载和保存文档的方式————在DOM加载和保存模块中定义

        - 新增了验证文档的方法————在DOM验证模块中定义

        - 扩展了DOM核心，开始支持XML1.0,涉及XML infoset、XPath、XML Base


