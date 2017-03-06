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



