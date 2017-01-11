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

####自定义数据属性
HTML5规定可以为元素添加非标准的属性,弹药添加前缀`data-`,目的是为元素提供与渲染无关的信息,或者提供语义信息.

添加了自定义属性之后,可以通过元素的`dataset属性`来访问自定义属性的值.dataset属性的值是DOMStringMap的一个实例,也就是一个名值对的映射.在这个映射里,每个自定义属性都会有一个对应的属性,只不过属性名没有了data-前缀

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div data-id="9527" data-name="yzd">data</div>

    <script>
        var oDiv = document.querySelector('div')
        console.log(oDiv.dataset) //DOMStringMap {id: "9527", name: "yzd"}
        console.log(oDiv.dataset.id) //9527
        console.log(oDiv.dataset.name) //yzd
    </script>
</body>
</html>
```

支持Firefox 6+,Chrome,IE11+

####插入标记
- innerHTML属性

在读模式下,innerHTML属性返回与调用元素的所有子节点(包括元素,注释,文本节点)对应的HTML标记.在写模式下,innerHTML会根据指定的值创建新的DOM树,然后用这个DOM树完全替换调用元素原先的所有子节点

但是,不同浏览器返回的文本格式会有所不同.IE8及以下和Opera会将所有标签转换为大写形式,而Safari,Chrome和Firefox则会原原本本按照原先文档(或指定这些标签时)的格式返回HTML,包括空格和缩进.

为innerHTML设置的包含HTML的字符串值与解析后innerHTML的值大不相同

```javascript
var oDiv = document.querySelector('div')

oDiv.innerHTML = "Hello & welcome,<b>\"reader\"!</b>"

console.log(oDiv.innerHTML) //Hello &amp; welcome,<b>"reader"!</b>
```

为innerHTML设置HTML字符串后,浏览器会将这个字符串解析为相应的DOM树.因此设置了innerHTML之后,再从中读取HTML字符串,会得到与设置时不一样的结果.原因在于返回的字符串是根据原始HTML字符串创建的DOM树经过序列化之后的结果

- outerHTML

在读模式下,outerHTML返回调用它的元素以及所有子节点的HTML标签.在写模式下,outerHTML会根据指定的HTML字符串创建新的DOM子树,然后用这个DOM子树完全替换调用元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="outer-html">
        <div>123</div>
    </div>

    <script>
        var oDiv = document.querySelector('div')
        oDiv.outerHTML = '<p>ppp</p>'
    </script>
</body>
</html>
```

相当于

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="outer-html">
        <div>123</div>
    </div>

    <script>
        var oDiv = document.querySelector('div'),
            oP = document.createElement('p')

        oP.appendChild(document.createTextNode('ppp'))

        oDiv.parentNode.replaceChild(oP,oDiv)
    </script>
</body>
</html>
```

- insertAdjacentHTML

该方法接收两个参数: 插入位置和要插入的HTML文本.第一个参数必须是下列值之一

- beforebegin,在当前元素之前插入一个紧邻的同辈元素

- afterend,在当前元素之后插入一个紧邻的同辈元素

- afterbegin,在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素

- beforeend,在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素

```javascript
//作为前一个同辈元素插入
element.insertAdjacentHTML("beforebegin",'<p>beforebegin</p>')

//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend",'<p>afterend</p>')

//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin",'<p>afterbegin</p>')


//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend",'<p>beforeend</p>')
```

- 内存和性能问题

使用innerHTML,outerHTML,insertAdjacentHTML的方法来替换节点可能会导致浏览器的内存占用问题.在删除带有事件处理程序或引用了其他JS对象子树时,就有可能导致内存占用问题.假设某个元素有一个事件处理程序(或引用了一个JS对象作为属性),在使用前述某个属性将该元素从文档树中删除后,元素与事件处理程序(或JS对象)之间的绑定关系在内存中并没有一并删除.如果这种情况频繁出现,页面占用的内存数量就会明显增加.因此,在使用以上方法时,最好先手工删除要替换的元素的所有事件处理程序和JS对象属性

一般来说,在插入大量新HTML标记时,使用innerHTML属性与通过多次DOM操作先创建节点再指定它们之间的关系相比,效率要高的多.这是因为在设置innerHTML或outerHTML时,就会创建一个HTML解析器.这个解析器是在浏览器级别的代码(通常是C++编写的)基础上运行的,因此比执行JS快的多.

不可避免,创建和销毁HTML解析器也会带来性能损失,所以最好能够将设置innerHTML或outerHTML的次数控制在合理范围内

```javascript
for(var i=0; i<len; i++){
    element.innerHTML += '<p>123</p>'
}
```

上述代码改成如下

```javascript
var str = ''
for(var i=0; i<len; i++){
    str += '<p>123</p>'
}

element.innerHTML = str
```

####scrollIntoView(boolean)方法

该方法可以在所有HTML元素上调用,通过滚动浏览器窗口或某个容器元素,调用元素就可以出现在视口.如果给这个方法传入true作为参数,或者不传参数,那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐.如果传入false作为参数,调用元素会尽可能全部出现在视口中(可能的话,调用元素的底部会与视口底部平齐)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        a{
            margin-bottom: 2000px;
            display: block;
        }
        div{
            width: 100px;
            height: 100px;
            background: red;
            margin-bottom: 2000px;
        }
    </style>
</head>
<body>
    <a>按钮2</a>
    <div id="showscroll"></div>

    <script>
        var oA = document.querySelector('a'),
            oDiv = document.querySelector('div')

        oA.onclick = function(){
            oDiv.scrollIntoView(false)
        }
    </script>
</body>
</html>
```













