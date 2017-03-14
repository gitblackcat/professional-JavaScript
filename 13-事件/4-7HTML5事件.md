###HTML5
DOM规范没有涵盖所有浏览器支持的所有事件.很多浏览器处于不同目的---满足用户需求或解决特殊问题,还实现了一些自定义事件.这里讨论其中得到浏览器完善支持的HTML5事件

####contextmenu
该事件即鼠标右键调出上下文菜单事件.contextmenu事件是冒泡的,因此可以为document指定一个事件处理程序,用以处理页面中发生的所有此类事件.该事件的目标是发生用户操作的元素.在所有浏览器中都可以取消该事件: 兼容DOM的浏览器,使用event.preventDefault();在IE8中,将event.returnValue的值改为false.因为contextmenu是鼠标事件,所有其事件对象中包含与光标位置有关的所有

```javascript
document.oncontextmenu = function(event){
    var event = event || window.event
    if( event.preventDefault ){
        event.preventDefault()
    }else{
        event.returnValue = false
    }
}
```

####beforeunload事件
之所以有发生在window对象上的beforeunload事件,是为了让开发人员有可能在页面卸载前阻止该操作.该事件会在浏览器卸载页面前触发,可以通过它来取消卸载并继续使用原来页面.但是,不能彻底取消该事件,因为那就相当于让用户无法离开当前页面.为此,该事件的一图是将控制权交给用户.显示的消息会告知用户页面将被卸载,询问用于是否真的要关闭页面,还是继续留下来

```javascript
window.onbeforeunload = function(event){
    var event = event || window.event,
        msg = "123"

    event.returnValue = msg

    return msg
}
```

IE会触发该事件,并显示msg中的字;Chrome(56.0.2924.87)会触发该事件,但不会有msg相关内容;Firefox(51.0.1)不会触发该事件

####DOMContentLoaded事件
DOMContentLoaded事件在形成完成DOM树之后就会触发,不理会图像,JS文件,CSS文件或其他资源是否已经下载完毕.与load事件不同,DOMContentLoaded支持在页面下载的早期添加事件处理程序,就意味着用户能尽早与页面进行交互

该事件始终在load事件之前触发

支持IE9+,Firefox,Chrome,Safari3.1+和Opear9+

在不支持DOMContentLoaded事件的浏览器,可以用setTimeout来模拟

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script>
        setTimeout(function(){
            var oDiv = document.getElementById('divdiv')
            oDiv.style.color = "red"
        },0)
    </script>
</head>
<body>
    <div id="divdiv">
        123123
        <p>ppp</p>
    </div>
</body>
</html>
```

从这里看出setTimeout和setInterval的异步的意思不仅仅局限于先运行其他js代码,而在于所有代码(不只是js)

####readystatechange事件
IE为DOM文档中的某些部分提供了readystatechange事件.该事件的目的是提供与文档或元素的加载状态有关的信息,但该事件的行为有时候也很难预料.支持readystatechange事件的每个对象都有一个readyState属性,可能包含下列5个值中的一个:

- uninitialized(未初始化): 对象存在但尚未初始化

- loading(正在加载): 对象正在加载数据

- loaded(加载完毕): 对象加载数据完成

- interactive(交互): 可以操作对象了,但还没有完全加载

- complete(完成): 对象已经加载完成

以上状态未必完全适用于一个对象.如果某个阶段不适用于某个对象,则该对象那个完全可能跳过该阶段;但也没有规定哪个阶段适用于哪个对象.这意味着readystatechange事件经常少于4次,而readystatechange属性的值也不总是连续的

```javascript
document.onreadystatechange = function(){
    if( this.readyState === "interactive" ){
        alert("Content loaded")
    }
}
```

####pageshow和pagehide事件
`往返缓存`(back-forward cache,或bfcache),可以在用户使用浏览器的"后退"和"前进"按钮时加快页面的转换速度.该缓存不仅保存着页面数据,还保存了DOM和JS的状态;实际上是将整个页面都保存在了内存里.如果页面位于bfcache中,那么再次打开该页面时就不会触发load事件.尽管由于内存中保存了整个页面的状态,不触发load事件也不应该会导致什么问题,但为了更形象说明bfcache的行为,引入`pageshow`和`pagehide`事件

`pageshow`事件在页面显示时触发,无论该页面是否来自bfcache.在重新加载的页面中,pageshow会在load事件触发后触发;而对于bfcache中的页面,pageshow会在页面状态完全恢复的那一刻触发.

**_注意,虽然该事件的目标是document,但必须将其事件处理程序加到window上_**

pageshow事件的event对象还包含一个名为`persisted`的布尔值属性.如果页面被保存在了bfcache中,则该属性的值为true;否则为false

`pagehide`事件会在浏览器卸载页面的时候触发,而且是在unload事件之前触发.*与pageshow事件一样,pagehide在document上面触发,但其事件处理程序必须添加到window对象上*

该事件的event对象也包含`persisted`属性

对于pageshow事件,如果页面是从bfcache中加载的,那么persisted的值就是true;对于pagehide事件,如果页面在卸载之后会保存在bfcache中,那么persisted的值会被设置为true

支持以上两个事件的浏览器: Firefox,Safari5+,Chrome,Opera.IE9不支持

指定了`onunload`事件处理程序的页面会被自动排除在bfcache之外,即使事件处理程序是空的.原因在于,onunload最常用于撤销在onload中所执行的操作,而跳过onload后再次显示页面很可能就会导致页面不正常

####hashchange事件
HTML5新增了`hashchange`事件,以便在URL的参数列表(即URL中`#`号后面的所有字符串)发生变化时通知开发人员.之所以新增该事件,是因为在Ajax应用中,开发人员经常要利用URL参数列表来保存状态或导航信息.

**_必须把hashchange事件处理程序添加到window对象上_**,然后URL参数列表只要变化就会调用它.此时的event对象包含额外两个属性: `oldURL`和`newURL`.这两个属性分别保存着参数列表变化前后的完整URL

支持hashchange事件的浏览器有IE8+,Firefox3.6+,Safari5+,Chrome和Opera10.6+

只有Firefox6+,Chrome和Opera支持oldURL和newURL属性


