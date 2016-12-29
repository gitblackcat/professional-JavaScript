###Document类型
JS通过Document类型(Document类型不单单指html,也包含xml,而HTMLDocument指的才是html)表示文档.在浏览器中,document对象是HMTLDocument(继承自Document类型)的一个实例,表示整个html页面.document对象是window对象的一个属性,因此可以将其作为全局对象访问

Document节点具有下列特性

- nodeType值为9
- nodeName值为null
- nodeValue值为null
- parentNode值为null
- ownerDocument值为null
- 其子节点可能是一个DocumentType(最多一个),Element(最多一个),ProcessingInstruction或Comment

####文档的子节点
访问子节点方法

- document.documentElement: 始终指向`<html>`

- document.childNodes

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    
    <script>
        var oHtml = document.documentElement

        console.log(oHtml === document.childNodes[1]) //true
        // 这里的document.childNodes[0]表示<!DOCTYPE html>
        console.log(oHtml === document.lastChild) //true
    </script>

</body>
</html>
```

- document.body: 始终指向`<body>`

所有浏览器都支持document.documentElement,document.body

- document.doctype: 表示<!DOCTYPE html> 但好像并没多少用

####文档信息
- document.title: 标签页内容

- document.URL: 页面完整URL(即地址栏中显示的URL)

- document.domain: 只包含页面域名

- document.referrer: 上一个页面的URL,当没有上一个页面时为空字符串

注意document.domain和document.referrer都需要在页面打开,不是本地打开,也可以是本地模拟服务器

####查找元素
- document.getElementById()

该方法接收要取得的元素ID.如果找到相应的元素则返回该元素,否则返回null.

- document.getElementsByTagName()

该方法接收要取得的元素标签名,返回包含至少0个元素的NodeList.在HTML文档中,这个方法会返回HTMLCollection对象,作为一个"动态"集合,该对象与NodeList非常类似

- document.getElementsByName()



**_注意getElementById(),getElementsByName()前面必须是document,而getElementsByTagName()前面是要是元素节点就好了,所以我觉得应该是Node.getElementsByTagName()_**

