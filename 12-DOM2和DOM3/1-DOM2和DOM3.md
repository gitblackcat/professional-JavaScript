###DOM2和DOM3
DOM1级主要定义的是HTML和XML文档的底层结构.DOM2和DOM3级则在这个结构的基础上引入更多的交互能力,也支持了更高级的XML特性

```javascript
//以下用来测试浏览器是否支持DOM的一些模块

var suppotrsDOM2Core = document.implementation.hasFeature("Core","2.0")
var suppotrsDOM3Core = document.implementation.hasFeature("Core","3.0")
var suppotrsDOM2HTML = document.implementation.hasFeature("HTML","2.0")
var suppotrsDOM2Views = document.implementation.hasFeature("Views","2.0")

var suppotrsDOM2CSS = document.implementation.hasFeature("CSS","2.0")
var suppotrsDOM2CSS2 = document.implementation.hasFeature("CSS2","2.0")
```

- isSameNode()/isEqualNode()

这两个方法都接收一个节点参数,并在传入节点与引用的节点相同或相等时返回true.`所谓相同,指的是两个节点引用的是同一个对象`.`所谓相等,指的是两个节点是相同的类型`,具有相等的属性(nodeName,nodeValue等等),`而且它们的attributes和childNodes属性也相等`(相同位置包含相同的值)

```javascript
var div1 = document.createElement("div"),
    div2 = document.createElement('div')

div1.className = "box"
div2.className = "box"

console.log( div1.isSameNode(div1) ) //true
console.log( div1.isEqualNode(div2) ) //true
console.log( div1.isSameNode(div2) ) //false
```

####框架的变化
框架的内嵌框架分别用HTMLFrameElement和HTMLIFrameElement表示,它们在DOM2级中都有了一个新属性,名叫`contentDocuemnt`.这个属性包含一个指针,指向表示框架内容的文档对象.在此之前,无法直接通过元素取得这个文档对象(只能使用frame集合)

```javascript
var iframe = document.getElementById('myIframe'),
    iframeDoc = iframe.contentDocument //IE8及以下无效

    //所有浏览器都支持contentWindow
    //兼容
var iframe = document.getElementById('myIframe'),
    iframeDoc = iframe.contentDocument || iframe.contentWindow.document
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <iframe src="iframe.html" frameborder="0" id="iframetest"></iframe>
    <script>
            var iframe = document.getElementById('iframetest').contentDocument,
                iframeDiv = iframe.getElementsByTagName('div')[0]

            console.log(iframeDiv.innerText) //123123

    </script>
</body>
</html>
```

注意以上代码本地测试操作不了

访问框架或内嵌框架的文档对象要受到跨域安全策略的限制.如果某个框架中的页面来自其他域或不同子域,那么要访问这个框架的文档对象就会导致错误

