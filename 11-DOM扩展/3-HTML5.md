HTML5规范围绕如何使用新增标记定义了大量JavaScript API(如`<canvas>`),所以HTML5已经不仅仅是指新的元素标签,还包括围绕新的元素标签产生的一系列JavaScript API

- document.getElementsByClassName()/element.getElementsByClassName()

该方法接收一个参数,即一个包含一或多个类名的字符串,返回带有指定类的所有元素的NodeList.传入多个类名时,类名的先后顺序不重要

```javascript
var element = document.getElementsByClassName("username current") 
                                        //类名先后顺序无所谓
var selects = document.getElementById("myDiv").getElementsByClassName("select")
```

**_因为返回的对象是NodeList,所以使用这个方法与使用getElementsByTagName()以及其他返回NodeList的DOM方法都具有同样的性能问题_**

支持IE9+,Firefox3+,Safari3.1+,Chrome,Opera9.5+

- classList属性

HTML5新增了一个操作类名的方式,那就是为所有元素添加`classList`属性.该属性是新集合类型`DOMTokenList`的实例.与其他DOM集合类似,DOMTokenList有一个表示自己包含多少元素的length属性,而要取得每个元素可以用item(),也可以用方括号.

此外,该新类型定义了如下方法

- add(value) 将给定字符串添加到列表中,若值已存在,不再添加
- contains(value) 判断列表中是否存在该值,存在返回true,否则返回fasle
- remove(value) 从列表中删除给定字符串
- toggle(value) 若列表中存在给定的值,则删除它;若列表中不存在给定的值,则添加它

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border: 1px solid #000;
        }
        .bg{
            background-color: red;
        }
    </style>
</head>
<body id="bodyId" class="classBody">
    <div class="box1 box2 box3"></div>

    <script>
        var oDiv = document.querySelector('div')
        oDiv.onclick = function(){
            this.classList.toggle('bg')
        }
    </script>
</body>
</html>
```

支持IE10+,Firefox3.6+,Chrome

####焦点管理
HTML5添加了辅助管理DOM焦点的功能.

- document.activeElement 

该属性始终引用DOM中当前获得焦点的元素.

默认情况下,文档加载期间,document.activeElement的值为null.文档刚加载完成后,docuemnt.activeElement中引用的是`document.body`元素

元素获得焦点的方式有页面加载,用户输入(通常是按Tab键),在代码中调用focus()方法

- document.hasFocus()

**_注意这里能是document当前缀_**

该方法用于确定文档是否获得了焦点,返回Boolean

查询文档获知哪个元素获得了焦点,以及确定文档是否获得了焦点,这两个功能最重要的用途是提供Web应用的`无障碍性`

无障碍性: 要让所创建的网站对所有用户都可用/可访问,不管用户的生理身体如何,不管用户以何种方式访问

```javascript
var oBtn = document.querySelector('button')
oBtn.focus()
console.log( document.activeElement === oBtn ) //true
console.log( document.hasFocus() ) //true
```

####HTMLDocument的变化
HTML5扩展了HTMLDocument,增加了新的功能

- readyState

该方法有两个可能的值,`loading`即正在加载文档;`complete`即加载完文档

```javascript
console.log(document.readyState) //loading

window.onload = function(){

    console.log(document.readyState) //complete
}
```

- document.compatMode

用来检测页面的渲染模式为标准模式还是混杂模式

```javascript
document.compatMode === 'CSS1Compat' ? alert('Standards mode') : alert('Quirks mode')
```

- document.head

引用head元素

支持IE9+

####字符集属性
- document.charset

可以查看当前文档的字符集属性,亲测不能修改

```javascript
console.log( document.charset )
```

支持document.charset属性的浏览器有IE,Safari,Opera,Chrome

Firefox支持document.characterset

支持document.defaultCharset属性的浏览器IE,Safari,Chrome












