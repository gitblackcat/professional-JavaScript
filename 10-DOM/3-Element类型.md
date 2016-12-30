###Element类型
####特征
- nodeType值为1
- nodeName值为元素标签名
- nodeValue值为null
- parentNode可能是Document或element
- 其子节点可能是Element,Text,Comment,ProcessingInstruction,CDATASection或EntityReference

访问元素的标签名,可使用`nodeName`,也可以使用`tagName`.这两个属性会返回相同的值

```javascript
var oDiv = document.getElementById('myDiv')
console.log( oDiv.nodeName ) //DIV
console.log( oDiv.tagName ) //DIV
console.log( oDiv.nodeName === oDiv.tagName ) //true
```

注意一点,两个属性返回的值都是大写

####HTML元素
所有HTML元素都由HTMLElement类型或其子类型表示,而HTMLElement类型直接继承自Element并添加一些属性,分别对应每个HTML元素中存在的标志特性

- id 元素在文档中的唯一标识符
- title 有关元素的附加说明信息,一般通过工具提示条显示出来
- lang 元素内容的语言代码,很少使用
- dir 语言的方向,值为`ltr`(left-to-right)或`rtl`(right-to-left)
- className 与元素的class特性对应,即为元素指定的CSS类.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="myDiv" title="I'm a div" lang="en" class="classDiv" dir="rtl">
        This is a div
    </div>

    <script>
        var oDiv = document.getElementById('myDiv')
        console.log( oDiv.id ) //myDiv
        console.log( oDiv.title ) //I'm a div
        console.log( oDiv.lang ) //en
        console.log( oDiv.className ) //classDiv
        console.log( oDiv.dir ) //rtl

        // 这里既可以通过这种方法获得这些属性值,也可以通过这些方法添加或修改属性值

        //注意className这是元素对象的属性,只有跟在元素对象后面才能用

        //如果是自定义特性,那么返回undefined

        //如果是style特性,则返回一个对象

        //如果是在元素中写的onclick,则返回一个JS函数,如果没该特性,返回null
    </script>
</body>
</html>
```

####操作特性
- getAttribute()

获取特性值,包括自定义的特性.注意写在方法里特性的名称是不区分大小写的,而且根据HTML5规范,自定义特性应该加上`data-`前缀以便验证.不管是style特性,还是onclick特性,都返回原样的字符串

由于使用对象属性和getAttribute()方法存在差别,一般能使用对象属性就使用对象属性,在需要获取自定义对象的时候,再使用getAttribute()方法

- setAttribute()

该方法接收两个参数,要设置的特性名和值.如果该特性已经存在,则替换现有值,如果不存在,则创建该特性.

也可以设置自定义的特性.不过通过该方法设置的特性名不管大小写都自动转为小写

- removeAttribute()

该方法会彻底删除指定的特性和特性的值
