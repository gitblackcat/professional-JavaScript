###Cookie
####限制
`cookie`在性质上是绑定在特定的域名下的.当设定了一个cookie后,再给创建它的域名发送请求时,都会包含该`cookie`.该限制确保了储存在`cookie`中的信息只能让批准的接受者访问,而无法被其他域访问

`cookie`是存储在客户端计算机上的,还加入了一些限制确保`cookie`不会被恶意使用,同时不会占据太多磁盘空间.每个域的`cookie`总数是有限的,不过浏览器之间各有不同

- IE7及以上每个域名最多50个
- Firefox限制最多50个
- Opera最多30个
- Safari和Chrome对于每个域的`cookie`数量限制没有硬性规定

当超过单个域名限制之后还要再设置`cookie`,浏览器就会清除以前设置的`cookie`.至于怎么删除,各个浏览器表现不同

浏览器中对于`cookie`的尺寸也有限制.大多数浏览器都有大约`4096B(加减1)`的长度限制.为了最佳的浏览器兼容性,最好将整个`cookie`限制在`4095B(含4095)`以内.**_尺寸限制影响到一个域下所有的cookie,而并非每个cookie单独限制_**

####cookie的构成
`cookie`由浏览器保存的以下几块信息构成

- **名称:** 一个`唯一`确定cookie的名称.cookie名称`不区分大小写`,比如`myCookie`和`MyCookie`被认为是同一个cookie.然而,实践中最好将cookie名称看做是区分大小写的,因为某些服务器会对cookie名称进行`URL`编码,编码对于名称就区分大小写了

- **值:** 储存在`cookie`中的字符串值.如果cookie的值为`分号`,`逗号`或者`空格`.那么必须被`URL`编码

- **域:** cookie对于哪个域是有效的.所有向该域发送的请求中都会包含这个cookie信息.这个值可以包含子域(subdomain,如www.wrox.com),也可以不包含它(如.wrox.com,则对于wrox.com的所有子域都有效).如果没有明确设定,那么这个域会被认作来自设置cookie的那个域

- **路径:** 对于指定域中的那个路径,应该向服务器发送cookie.例如,你可以指定cookie只有从`http://www.wrox.com/books`中才能访问,那么`http://www.wrox.com`的页面就不会发送cookie信息,即使请求都是来自同一个域

- **失效时间:** 表示cookie何时应该被删除的时间戳(也就是,何时应该停止向服务器发送该cookie).默认情况下,浏览器会话结束时就将所有cookie删除;不过也可以自己设置删除时间.这个值是个GMT格式的日期(Wdy,DD-Mon-YYYY HH:MM:SS GMT),用于指定应该删除cookie的准确时间.因此,cookie可在浏览器关闭后依然保存在用户的机器上.如果你设置的失效日期是个以前的日期,则cookie会被立即删除

- **安全标志:** 指定后,cookie只有在使用`SSL`连接的时候才能发送到服务器.例如,cookie信息只能发送给`https://www.wrox.com`,而`http://www.wrox.com`的请求则不能发送cookie. 

看两个例子

每一段信息都作为`Set-Cookie`头一部分,使用分号加空格分隔每一段

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; expire=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
Other-header: other-header-value
```

该头信息指定了一个叫做name的cookie,它会在格林威治时间2007年1月22日 7:10:24失效,同时对于www.wrox.com和wrox.com的任何子域(如m.wrox.com)都有效

`secure`标志是cookie中唯一一个非名值对的部分,直接包含一个secure单词

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value
```

这里创建了一个对于所有wrox.com的子域和域名下(有path参数指定的)所有页面都有效的cookie.因为设置了secure标志,该cookie只能通过`SSL`连接才能传输

尤其要注意,**_域,路径,失效时间和secure标志都是服务器给浏览器的指示,以指定何时应该发送cookie.这些参数并不会作为发送到服务器的cookie信息的一部分,只有名值对才会被发送_**

####JS中的cookie

