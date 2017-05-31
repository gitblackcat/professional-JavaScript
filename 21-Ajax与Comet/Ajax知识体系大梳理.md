###Ajax知识体系大梳理
转自[http://louiszhai.github.io/2016/11/02/ajax/](http://louiszhai.github.io/2016/11/02/ajax/)

`Ajax` 全称 `Asynchronous JavaScript and XML`, 即异步JS与XML. 它最早在IE5中被使用, 然后由Mozilla, Apple, Google推广开来. 典型的代表应用有 Outlook Web Access, 以及 GMail. 现代网页中几乎无ajax不欢. 前后端分离也正是建立在ajax异步通信的基础之上

####浏览器实现ajax的两种技术方式:

- 标准浏览器通过 `XMLHttpRequest` 对象实现了ajax的功能. 只需要通过一行语句便可创建一个用于发送ajax请求的对象

`var xhr = new XMLHttpRequest()`

-  IE浏览器通过 `XMLHttpRequest` 或者 `ActiveXObject` 对象同样实现了ajax的功能.

`IE7`及更高版本浏览器可以直接使用BOM的 `XMLHttpRequest` 对象.复辟历史,终会被历史的车轮所碾压,所以,这里将抛弃`IE6`及以下`ajax`技术`ActiveXObject`的讨论

####ajax有没有破坏js单线程机制
对于这个问题, 我们先看下浏览器线程机制. 一般情况下, 浏览器有如下四种线程:

- GUI渲染线程

- javascript引擎线程

- 浏览器事件触发线程

- HTTP请求线程

那么这么多线程, 它们究竟是怎么同`js引擎`线程交互的呢?

通常, 它们的线程间交互以事件的方式发生, 通过事件回调的方式予以通知. 而事件回调, 又是以先进先出的方式添加到`任务队列` 的末尾 , 等到`js引擎`空闲时, `任务队列` 中排队的任务将会依次被执行. 这些事件回调包括 setTimeout, setInterval, click, ajax异步请求等回调

**_浏览器中, js引擎线程会循环从 `任务队列 `中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环)._**

对于一个ajax请求, `js引擎`首先生成`XMLHttpRequest`实例对象, open过后再调用send方法. 至此, 所有的语句都是同步执行. 但从send方法内部开始, 浏览器为将要发生的网络请求创建了新的`http请求线程`, 这个线程独立于`js引擎`线程, 于是网络请求异步被发送出去了. 另一方面, `js引擎`并不会等待 ajax 发起的http请求收到结果, 而是直接顺序往下执行.

当ajax请求被服务器响应并且收到response后, `浏览器事件触发线程`捕获到了ajax的回调事件 onreadystatechange (当然也可能触发onload, 或者 onerror等等) . 该回调事件并没有被立即执行, 而是被添加到 任务队列 的末尾. 直到js引擎空闲了, 任务队列 的任务才被捞出来, 按照添加顺序, 挨个执行, 当然也包括刚刚append到队列末尾的 onreadystatechange 事件.

在 onreadystatechange 事件内部, 有可能对dom进行操作. 此时浏览器便会挂起js引擎线程, 转而执行`GUI渲染线程`, 进行UI重绘(repaint)或者回流(reflow). 当js引擎重新执行时, GUI渲染线程又会被挂起, GUI更新将被保存起来, 等到js引擎空闲时立即被执行.

###什么是重绘和回流请看隔壁篇[repaint-reflow.md](repaint-reflow.md)

以上整个ajax请求过程中, 有涉及到浏览器的4种线程. 其中除了 `GUI渲染线程` 和 `js引擎线程` 是互斥的. 其他线程相互之间, 都是可以并行执行的. 通过这样的一种方式, ajax并没有破坏js的单线程机制

####ajax与setTimeout排队问题
通常, ajax 和 setTimeout 的事件回调都被同等的对待, 按照顺序自动的被添加到 任务队列 的末尾, 等待js引擎空闲时执行. 但请注意, 并非xhr的所有回调执行都滞后于setTImeout的回调

```javascript
function ajax(url, method) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            console.log('xhr.readyState:' + this.readyState)
        }
        xhr.onloadstart = function() {
            console.log('onloadStart')
        }
        xhr.onload = function() {
            console.log('onload')
        }
        xhr.open(method, url, true) //这里的true表示请求异步发送
        xhr.setRequestHeader('Cache-Control', 3600)
        xhr.send(null) 
        //如果请求不需要传数据/参数,有些浏览器必须有参数,所以写null
    }
    var timer = setTimeout(function() {
        console.log('setTimeout')
    }, 0)
    ajax('http://www.easy-mock.com/mock/590089cf875d7232a38b20d9/example/num', 'GET')
    console.warn('这里的log并不是最先打印出来的.')
```

控制台打印效果如下:

```javascript
xhr.readyState:1
onloadStart
这里的log并不是最先打印出来的.
setTimeout
xhr.readyState:2
xhr.readyState:3
xhr.readyState:4
onload
```

由于ajax异步, setTimeout回调本应该最先被执行, 然而实际上, 一次ajax请求, 并非所有的部分都是异步的, 至少”readyState==1”的 onreadystatechange 回调以及 onloadstart 回调就是同步执行的. 因此它们的输出排在最前面.