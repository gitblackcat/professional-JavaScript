###选择符API

- document.querySelector()/element.querySelector()

如上,通过Document类型或特定元素节点都可以使用querySelector()方法

querySelector()方法接收一个`CSS选择符`,返回与该模式匹配的`第一个元素`,如果没有找到匹配元素,`返回null`

如果传入不被支持的选择符,querySelector()会抛出错误

```html
<!DOCTYPE html>
<html>
<head>
    <title>Selectors API Example</title>
</head>
<body>
    <ul>
        <li>First item</li>
        <li class="selected">Second item</li>
        <li>Third item</li>
    </ul>
    <input type="text">
    <script type="text/javascript">
    
        if (document.querySelector){
        
            //get the body element
            var body = document.querySelector("body")
            console.log(body.tagName) //BODY
                               
            //get the element with the ID "myDiv"
            var myDiv = document.querySelector("#myDiv");
            console.log(myDiv) //null
                               
            //get first element with a class of "selected"
            var selected = document.querySelector(".selected");
            console.log(selected.innerHTML) //Second item
                               
            //get first image with class of "button"
            var img = document.body.querySelector("img.button");
            console.log(img) //null
        
            var input = document.querySelector('input[type="text"]')
            console.log(input) //null

            var oOl = docuemnt.querySelector('body ol')
            console.log(oOl) //null
        
        } else {
            alert("Selectors API not supported in this browser");
        }

    </script>
</body>
</html>
```

- document.querySelectorAll()/element.querySelectorAll()

如上,通过Document类型或特定元素节点都可以使用querySelectorAll()方法

querySelectorAll()方法接收一个`CSS选择符`,返回与该模式匹配的`第一个元素`,如果没有找到匹配元素,`返回null`

如果传入不被支持的选择符,querySelectorAll()会抛出错误

**_querySelectorAll()返回的值实际上是带有所有属性和方法的NodeList,而其底层实现则类似于一组元素快照,而非不断对文档进行搜索的动态查询_**

验证如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <script>
        var aDiv1 = document.querySelectorAll('div'),
            aDiv2 = document.getElementsByTagName('div')

        console.log(aDiv1.length) //4
        console.log(aDiv2.length) //4

        var oDiv = document.createElement('div')

        document.body.appendChild(oDiv)

        console.log(aDiv1.length) //4
        console.log(aDiv2.length) //5
    </script>
</body>
</html>
```

- matchesSelector()

该方法接收一个参数,即CSS选择符,如果调用元素与该选择符匹配,返回true,否则返回false.

该方法到目前为止(2017/1/5)有严重的兼容性问题,所以需要编写兼容方式

```javascript
function matchesSelector(element,selector){
    if( element.matchesSelector ){
        return element.matchesSelector(selector)
    }else if( element.msMatchesSelector ){
        return element.msMatchesSelector(selector)
    }else if( element.mozMatchesSelector ){
        return element.mozMatchesSelector(selector)
    }else if( element.webkitMatchesSelector(selector) ){
        return element.webkitMatchesSelector(selector)
    }else{
        throw new Error( "Not supported." )
    }
}

console.log( matchesSelector(document.body,".classBody") ) 
```


