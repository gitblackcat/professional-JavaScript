####XHR一级
转自[http://louiszhai.github.io/2016/11/02/ajax/](http://louiszhai.github.io/2016/11/02/ajax/)

XHR1 即 XMLHttpRequest Level 1. XHR1时, xhr对象具有如下缺点:

- 仅支持文本数据传输, 无法传输二进制数据.
- 传输数据时, 没有进度信息提示, 只能提示是否完成.
- 受浏览器 同源策略 限制, 只能请求同域资源.
- 没有超时机制, 不方便掌控ajax请求节奏.

####XHR二级
XHR2 即 XMLHttpRequest Level 2. XHR2针对XHR1的上述缺点做了如下改进:

- 支持二进制数据, 可以上传文件, 可以使用FormData对象管理表单.
- 提供进度提示, 可通过 xhr.upload.onprogress 事件回调方法获取传输进度.
- 依然受 同源策略 限制, 这个安全机制不会变. XHR2新提供 Access-Control-Allow-Origin 等headers, 设置为 * 时表示允许任何域名请求, 从而实现跨域CORS访问(有关CORS详细介绍请耐心往下读).
- 可以设置timeout 及 ontimeout, 方便设置超时时长和超时后续处理.

这里就H5新增的FormData对象举个例.

```javascript
//可直接创建FormData实例
var data = new FormData()
data.append("name", "yzd")
xhr.send(data)
//还可以通过传入表单DOM对象来创建FormData实例
var form = document.getElementById('form')
var data = new FormData(form)
data.append("password", "123456")
xhr.send(data)
```

目前, 主流浏览器基本上都支持XHR2, 除了IE系列需要IE10及更高版本. 因此IE10以下是不支持XHR2的.

那么问题来了,8,9的用户怎么办? 很遗憾, 这些用户是比较尴尬的. 对于IE8,9而言, 只有一个阉割版的 XDomainRequest 可用

在支持XMLHttpRequest Level 2的浏览器,跨域只要把`open()`里的`url`改成绝对路径.

跨域`XHR`也有限制:

- 不能使用`setRequestHeader()`设置自定义头部
- 不能发送和接收`cookie`
- 调用`getAllResponseHeaders()`返回空字符串

####XDomainRequest
XDomainRequest 对象是IE8,9折腾出来的, 用于支持CORS请求非成熟的解决方案. 以至于IE10中直接移除了它, 并重新回到了 XMLHttpRequest 的怀抱.

XDomainRequest 仅可用于发送 GET和 POST 请求. 如下即创建过程.

`var xdr = new XDomainRequest()`

xdr具有如下属性:

- timeout
- responseText

如下方法:

- open: 只能接收Method,和url两个参数. 只能发送异步请求.
- send
- abort

如下事件回调:

- onprogress
- ontimeout
- onerror
- onload

除了缺少一些方法外, XDomainRequest 基本上就和 XMLHttpRequest 的使用方式保持一致

**_必须要明确的是:_**

- XDomainRequest 不支持跨域传输cookie.
- 只能设置请求头的Content-Type字段, 且不能访问响应头信息.

####ajax跨域请求
#####什么是CORS
CORS是一个W3C(World Wide Web)标准, 全称是跨域资源共享(Cross-origin resource sharing).它允许浏览器向跨域服务器, 发出异步http请求, 从而克服了ajax受同源策略的限制. 

实际上, 浏览器不会拦截不合法的跨域请求, 而是拦截了他们的响应, 因此即使请求不合法, 很多时候, 服务器依然收到了请求.(跨域并不一定是浏览器限制了发起跨站请求,而也可能是跨站请求可以正常发起,但是返回结果被浏览器拦截了.最好的例子是 CSRF 跨站攻击原理,请求是发送到了后端服务器无论是否跨域!注意: 有些浏览器不允许从 HTTPS 的域跨域访问 HTTP,比如  Chrome 和 Firefox,这些浏览器在请求还未发出的时候就会拦截请求,这是一个特例.)

通常, 一次跨域访问拥有如下流程:

![CORS.jpg](img/CORS.jpg)

跨域资源共享标准新增了一组 HTTP 首部字段,允许服务器声明哪些源站有权限访问哪些资源。另外,规范要求,对那些可能对服务器数据产生副作用的 HTTP 请求方法(特别是 GET 以外的 HTTP 请求,或者搭配某些 MIME 类型的 POST 请求),浏览器必须首先使用 OPTIONS 方法发起一个预检请求`preflight request`,从而获知服务端是否允许该跨域请求。服务器确认允许之后,才发起实际的 HTTP 请求。在预检请求的返回中,服务器端也可以通知客户端,是否需要携带身份凭证(包括 Cookies 和 HTTP 认证相关数据)

#####CORS有关的headers
######HTTP Response Header(服务器提供)
- Access-Control-Allow-Origin: 指定允许哪些源的网页发送请求.
- Access-Control-Allow-Credentials: 指定是否允许cookie发送.
- Access-Control-Allow-Methods: 指定允许哪些请求方法.
- Access-Control-Allow-Headers: 指定允许哪些常规的头域字段, 比如说 Content-Type.
- Access-Control-Expose-Headers: 指定允许哪些额外的头域字段, 比如说 X-Custom-Header

该字段可省略. CORS请求时, xhr.getResponseHeader() 方法默认只能获取6个基本字段: Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma . 如果需要获取其他字段, 就需要在Access-Control-Expose-Headers 中指定. 如上, 这样xhr.getResponseHeader(‘X-Custom-Header’) 才能返回X-Custom-Header字段的值.

- Access-Control-Max-Age: 指定preflight OPTIONS请求的有效期, 单位为秒

######HTTP Request Header(浏览器OPTIONS请求默认自带)
- Access-Control-Request-Method: 告知服务器,浏览器将发送哪种请求, 比如说POST.
- Access-Control-Request-Headers: 告知服务器, 浏览器将包含哪些额外的头域字段.

######以下所有的header name 是被拒绝的:
- Accept-Charset
- Accept-Encoding
- Access-Control-Request-Headers
- Access-Control-Request-Method
- Connection
- Content-Length
- Cookie
- Cookie2
- Date
- DNT
- Expect
- Host
- Keep-Alive
- Origin
- Referer
- TE
- Trailer
- Transfer-Encoding
- Upgrade
- Via
- 包含以`Proxy-` 或 `Sec-` 开头的header name

#####CORS请求
- 简单请求(不会触发`CORS`预检的请求)
- 非简单请求(会触发`CORS`预检的请求)

满足如下两个条件便是简单请求, 反之则为非简单请求

######请求是以下三种之一
- HEAD
- GET
- POST

######http头域不超出以下几种字段:
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type字段限三个值 `application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`

对于简单请求, 浏览器将发送一次http请求, 同时在Request头域中增加 Origin 字段, 用来标示请求发起的源, 服务器根据这个源采取不同的响应策略. 若服务器认为该请求合法, 那么需要往返回的 HTTP Response 中添加 `Access-Control-*` 等字段

###`Access-Control-*`请看隔壁篇[http://louiszhai.github.io/2016/01/11/cross-domain/#CORS__u8DE8_u57DF_u8BBF_u95EE](http://louiszhai.github.io/2016/01/11/cross-domain/#CORS__u8DE8_u57DF_u8BBF_u95EE)

对于非简单请求, 比如Method为POST且Content-Type值为 application/json 的请求或者Method为 PUT 或 DELETE 的请求, 浏览器将发送两次http请求. 第一次为preflight预检(Method: OPTIONS),主要验证来源是否合法. 值得注意的是:OPTION请求响应头同样需要包含 Access-Control-* 字段等. 第二次才是真正的HTTP请求. 所以服务器必须处理OPTIONS应答(通常需要返回20X的状态码, 否则xhr.onerror事件将被触发)

以上请求流程图为:

![CROS-FLOW](img/CROS-FLOW.JPG)

#####HTML启用CORS
http-equiv 相当于http的响应头, 它回应给浏览器一些有用的信息,以帮助正确和精确地显示网页内容. 如下html将允许任意域名下的网页跨域访问.

`<meta http-equiv="Access-Control-Allow-Origin" content="*">`