###dataTransfer对象
只有简单的拖放而没有数据变化是没卵用的.为了在拖放操作时实现数据交换,在拖放事件的事件对象中,`dataTransfer`对象因运而生.

`dataTransfer`对象主要有两个方法: `getData()`和`setData()`.

```javascript
event.dataTransfer.setData('text','some text')
var text = event.dataTransfer.getData('text')
```

```javascript
event.dataTransfer.setData('URL','http://www.xxxxx.com')
var url = event.dataTransfer.getData('URL')
```

在经过HTML5草案扩展以后,实际上,`dataTransfer`对象可以为每种`MIME`类型都保存一个值.换句话说,同时在该对象中保存一段文本和一个URL不会有任何问题.**_不过,保存在`dataTransfer`对象中的数据只能在drop事件处理程序中读取_**.如果`ondrop`处理程序中没有得到数据,那就是`dataTransfer`对象已经被销毁,数据丢失了

由于Firefox在低版本不兼容的问题,为了更好的跨浏览器的情况下从`dataTransfer`对象取得数据,最好在取得URL数据时检查两个值,而在取得文本数据时候使用`Text`

```javascript
var dataTransfer = event.dataTransfer

//一定要把短数据类型放在前面,因为IE10及以下不支持扩展的MIME类型名
var url = dataTransfer.getData('url') || dataTransfer.getData('text/uri-list')

var text = dataTransfer.getData('Text')
```

####例子

```html
<!DOCTYPE html>
<html>

<head>
    <title>Data Transfer Example</title>
</head>

<body>
    <p>Try dragging the link over to the red square. This won't work correctly in Opera.</p>
    <a href="http://www.wrox.com">Wrox homepage</a>
    <div style="width: 100px; height: 100px; float: right; background: red" id="droptarget"></div>
    <div id="output">event.type</div>
    <script type="text/javascript">
        var droptarget = document.getElementById("droptarget");

        function handleEvent(event) {
            document.getElementById("output").innerHTML += event.type + "<br>";
            switch (event.type) {
                case "drop":
                case "dragdrop":
                    droptarget.innerHTML = event.dataTransfer.getData("url") || event.dataTransfer.getData("text/uri-list");

                case "dropenter":
                case "dragover":
                    event.preventDefault()
                    break;
            }

        }

        droptarget.ondragenter = handleEvent
        droptarget.ondragover = handleEvent
        droptarget.ondragleave = handleEvent
        droptarget.ondrop = handleEvent
    </script>
</body>

</html>

```