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
        console.log(oHtml === document.lastChild) //true
    </script>

</body>
</html>
```



