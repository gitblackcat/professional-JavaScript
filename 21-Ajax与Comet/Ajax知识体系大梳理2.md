####XMLHttpRequest属性/方法解读
转自[http://louiszhai.github.io/2016/11/02/ajax/](http://louiszhai.github.io/2016/11/02/ajax/)

通常, 一个xhr实例对象拥有10个普通属性+9个方法

#####readyState
只读属性, readyState属性记录了ajax调用过程中所有可能的状态. 它的取值简单明了, 如下:

![readyState.png](img/readyState.jpg)

注意, `readyState` 是一个只读属性, 想要改变它的值是不可行的

#####onreadystatechange
`onreadystatechange`事件回调方法在`readystate`状态改变时触发, 在一个收到响应的ajax请求周期中, `onreadystatechange` 方法会被触发4次(1,2,3,4). 因此可以在 onreadystatechange 方法中绑定一些事件回调.

**_必须在`open()`之前指定`onreadystatechange`事件处理程序才能确保跨浏览器兼容性_**

```javascript
xhr.onreadystatechange = function(e){
    if(xhr.readystate==4){
        var s = xhr.status
        if((s >= 200 && s < 300) || s == 304){ 
        //状态代码304表示请求的资源并没有被修改,可以直接使用浏览器缓存的版本;当然,也意味着响应是有效的
        //建议使用status来决定下一步的操作,不要依赖statusText,因为后者在跨浏览器使用时不太可靠
            var resp = xhr.responseText
            //TODO ...
        }
    }
}
```

**_onreadystatechange回调中默认会传入Event实例_**

#####status
只读属性, status表示http请求的状态, 初始值为0. 如果服务器没有显式地指定状态码, 那么status将被设置为默认值, 即200

#####statusText
只读属性, statusText表示服务器的响应状态信息, 它是一个 UTF-16 的字符串, 请求成功且status==20X时, 返回大写的 OK. 请求失败时返回空字符串. 其他情况下返回相应的状态描述. 比如: 301的 Moved Permanently , 302的 Found , 303的 See Other , 307 的 Temporary Redirect , 400的 Bad Request , 401的 Unauthorized 等等

#####onloadstart
在接收到响应数据的第一个字节时触发

`onloadstart`方法中默认将传入一个`ProgressEvent`事件进度对象. 如下:

![loadstart.png](img/loadstart.png)

`ProgressEvent`对象具有三个重要的只读属性.已在上图红箭头标出

- `lengthComputable`: 表示长度是否可计算, 它是一个布尔值, 初始值为false
- `loaded`: 表示已加载资源的大小, 如果使用http下载资源, 它仅仅表示已下载内容的大小, 而不包括http headers等. 它是一个无符号长整型, 初始值为0.
- `total`: 表示资源总大小, 如果使用http下载资源, 它仅仅表示内容的总大小, 而不包括http headers等, 它同样是一个无符号长整型, 初始值为0

#####onprogress
`onprogress`事件回调方法在 `readyState==3` 状态时开始触发, 默认传入 `ProgressEvent` 对象, 可通过 `e.loaded/e.total` 来计算`加载资源`的进度, 该方法用于获取资源的`下载进度`

该事件在接收响应期间是持续触发的

**_注意: 该方法适用于 IE10+ 及其他现代浏览器_**

```javascript
xhr.onprogress = function(e){
  console.log('progress:', e.loaded/e.total);
}
```

####onload
onload事件回调方法在ajax请求成功后触发, 触发时机在 `readyState==4` 状态之后

即在接收到完整的响应数据时触发

想要捕捉到一个ajax异步请求的成功状态, 并且执行回调, 一般下面的语句就足够了:

```javascript
xhr.onload = function(){
    var status = xhr.status
    if(status >= 200 && status <= 300){
        console.log(xhr.responseText)
    }
}
```

#####onloadend
onloadend事件回调方法在ajax请求完成后触发, 触发时机在 `readyState==4` 状态之后(收到响应时) 或者 `readyState==2` 状态之后(未收到响应时)

在通信完成或者触发`error`,`abort`或`load`事件后触发

loadend方法中默认将传入一个ProgressEvent事件进度对象

#####timeout
timeout属性用于指定ajax的超时时长. 通过它可以灵活地控制ajax请求时间的上限. timeout的值满足如下规则:

- 通常设置为0时不生效.
- 设置为字符串时, 如果字符串中全部为数字, 它会自动将字符串转化为数字, 反之该设置不生效.
- 设置为对象时, 如果该对象能够转化为数字, 那么将设置为转化后的数字.

```javascript
xhr.timeout = 0; //不生效
xhr.timeout = '123'; //生效, 值为123
xhr.timeout = '123s'; //不生效
xhr.timeout = ['123']; //生效, 值为123
xhr.timeout = {a:123}; //不生效
```

#####ontimeout
ontimeout方法在ajax请求超时时触发, 通过它可以在ajax请求超时时做一些后续处理

```javascript
xhr.ontimeout = function(e) {
    console.error("请求超时!!!")
}
```

```javascript
xhr.onreadystatechange = function(event){
        try {
            if (xhr.readyState == 4){
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    alert(xhr.responseText);
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
            }
        } catch (ex){
            //assume handled by ontimeout
        }
    };
    
    xhr.open("get", "timeout.php", true);
    xhr.timeout = 1000;
    xhr.ontimeout = function(){ 
        alert("Request did not return in a second.");
    };        
    xhr.send(null);
```

以上例子把`timeout`设置为1000毫秒,意味着如果请求在1秒钟内还没有返回,就会自动终止.请求终止时,会调用`ontimeout`事件处理程序.但此时`readyState`可能已经改变成4了,这意味着会调用`onreadystatechange`事件处理程序.可是,如果在超时终止请求之后再访问`status`属性,就会导致错误.为避免浏览器报告错误,可以将检查`status`属性的语句封装在一个`try-catch`语句中

#####response responseText
均为只读属性, `response`表示服务器的响应内容, 相应的, `responseText`表示服务器响应内容的文本形式

#####responseXML
只读属性, `responseXML`表示`xml`形式的响应数据, 缺省为`null`, 若数据不是有效的`xml`, 则会报错

#####responseType
`responseType`表示响应的类型, 缺省为空字符串, 可取 "arraybuffer" , "blob" , "document" , "json" , and "text" 共五种类型

#####responseURL
`responseURL`返回ajax请求最终的URL, 如果请求中存在重定向, 那么`responseURL`表示重定向之后的URL.

#####withCredentials
withCredentials是一个布尔值, 默认为false, 表示跨域请求中不发送cookies等信息. 当它设置为true时, cookies , authorization headers 或者TLS客户端证书 都可以正常发送和接收. 显然它的值对同域请求没有影响.

**_注意: 该属性适用于 IE10+, opera12+及其他现代浏览器_**

#####abort
abort方法用于取消ajax请求, 取消后, `readyState` 状态将被设置为 0 (UNSENT). 必须在接收到响应之前取消异步请求.调用该方法后,`XHR`对象会停止触发事件,而且也不再允许访问任何与响应有关的对象属性.在终止请求后,还应该对`XHR`对象进行解引操作(xhr = null).由于内存原因,不建议重用`XHR`对象

#####HTTP头部信息
每个HTTP请求和响应都会带有相应的头部信息.XHR对象也提供了操作这两种头部(即请求头部和响应头部)信息的方法

默认情况下,在发送XHR请求的同时,还会发送下列头部信息:

- `Accept:`浏览器能够处理的内容类型

- `Accept-Charset:`浏览器能够显示的字符集

- `Accept-Encoding:`浏览器能够处理的压缩编码

- `Accept-Language:`浏览器当前设置的语言

- `Connection:`浏览器与服务器之间连接的类型

- `Cookie:`当前页面设置的任何Cookie

- `Host:`发出请求的页面所在的域

- `Referer:`发出请求的URI.注意,HTTP规范将这个头部字段拼写错了,而为保证与规范一致,也只能将错就错

- `User-Agent:`浏览器的用户代理字符串

#####getResponseHeader
`getResponseHeader`方法用于获取ajax响应头中指定name的值. 如果response headers中存在相同的name, 那么它们的值将自动以字符串的形式连接在一起

`console.log(xhr.getResponseHeader('Content-Type'))`

#####getAllResponseHeaders
`getAllResponseHeaders`方法用于获取所有安全的ajax响应头, 响应头以字符串形式返回. 每个HTTP报头名称和值用冒号分隔, 如key:value, 并以\r\n结束.

```javascript
xhr.onreadystatechange = function() {
    if(this.readyState == this.HEADERS_RECEIVED) {
        console.log(this.getAllResponseHeaders());
    }
}
```

以上, `readyState === 2` 状态时, 就意味着响应头已接受完整. 此时便可以打印出完整的 response headers.

#####setRequestHeader
既然可以获取响应头, 那么自然也可以设置请求头, setRequestHeader就是干这个的. 设置请求头必须在调用`open()`方法之后,在调用`send()`方法之前

如下:

```javascript
//指定请求的type为json格式
xhr.setRequestHeader("Content-type", "application/json")
//除此之外, 还可以设置其他的请求头
xhr.setRequestHeader('x-requested-with', '123456')
```

#####GET请求
`GET`是最常见的请求类型,最常用于向服务器查询某些信息.必要时,可以将查询字符串参数添加到`URL`的末尾,以便将信息发送到服务器.对`XHR`而言,位于传入`open()`方法的`URL`末尾的查询字符串必须经过正确编码

`xhr.open("get","example.php?name1=value1&name2=value2",true)`

```javascript
function addURLParam(url,name,value){
    url += (url.indexOf("?") === -1 ? "?" : "&")
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    return url
}
```

#####onerror
onerror方法用于在ajax请求出错后执行. 通常只在网络出现问题时或者ERR_CONNECTION_RESET时触发(如果请求返回的是407状态码, chrome下也会触发onerror).

#####upload
`upload`属性默认返回一个 `XMLHttpRequestUpload` 对象, 用于`上传资源`. 该对象具有如下方法:

- onloadstart
- onprogress
- onabort
- onerror
- onload
- ontimeout
- onloadend

上述方法功能同 xhr 对象中同名方法一致. 其中, onprogress 事件回调方法可用于跟踪资源上传的进度.

```javascript
xhr.upload.onprogress = function(e){
    var percent = 100 * e.loaded / e.total
    console.log('upload: ' + precent + '%')
}
```

#####overrideMimeType
overrideMimeType方法用于强制指定response 的 MIME 类型, 即强制修改response的 Content-Type. 

比如,服务器返回的`MIME`类型是`text/plain`,但数据中实际包含的是`XML`.根据`MIME`类型,即使数据时`XML`,`responseXML`属性仍然是`null`.通过`overrideMimeType()`方法,可以保证响应当做`XML`而非纯文本处理

```javascript
var xhr = new XMLHttpRequest()
xhr.open(method,url,async)
xhr.overrideMimeType('text/xml')
xhr.send()
```

该例子强迫`XHR`对象将响应当做`XML`而非纯文本来处理.调用`overrideMimeType()`必须在`send()`之前,才能保证重写响应的`MIME`类型

如下, 服务器返回的response的 MIME 类型为 text/plain.

![overrideMimeType](img/overrideMimeType.png)

```javascript
xhr.getResponseHeader('Content-Type');//"text/plain"
xhr.responseXML;//null
```

通过overrideMimeType方法将response的MIME类型设置为 text/xml;charset=utf-8 , 如下所示:

```javascript
xhr.overrideMimeType("text/xml; charset = utf-8")
xhr.send()
```

此时虽然 response headers 如上图, 没有变化, 但 Content-Type 已替换为新值.

```javascript
xhr.getResponseHeader('Content-Type')//"text/xml; charset = utf-8"
```