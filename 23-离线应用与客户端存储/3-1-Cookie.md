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
- 在js中获取cookie

当用`document.cookie`来获取cookie的时候,`document.cookie`返回当前页面可用的(根据cookie的域,路径,失效时间和安全设置)所有cookie的字符串,一系列的由分号隔开的名值对,如下

`name1=value1;name2=value2;name3=value3`

**注意,最后一个没有分号***

所有名字和值都是经过URL编码的,所以必须使用`decodeURIComponent()`来解码

当用于设置值的时候,`document.cookie`属性可以设置为一个新的cookie字符串.该cookie字符串会被解释并添加到现有的cookie集合中.设置`document.cookie`并不会覆盖cookie,除非设置cookie的名称已经存在.

设置cookie的格式如下,和`Set-Cookie`头中使用的格式一样:

`name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure`

以上设置的参数,只有名和值是必需的

e.g.

`document.cookie = "name1=yzd"`

以上代码创建了一个叫name的cookie,值为yzd.当客户端每次向服务器发送请求的时候,都会发送该cookie.当浏览器关闭的时候,它就会被删除.虽然这段代码设置的cookie没有逗号,分号,空格所以无需经过url编码,不过为了用了更好的通用性,建议通过url编码

```javascript
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
```

封装cookie:

```javascript
var CookieUtil = {

    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;
            
        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        } 

        return cookieValue;
    },
    
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
    
        if (path) {
            cookieText += "; path=" + path;
        }
    
        if (domain) {
            cookieText += "; domain=" + domain;
        }
    
        if (secure) {
            cookieText += "; secure";
        }
    
        document.cookie = cookieText;
    },
    
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }

};
```

####子cookie
为了绕开浏览器的单域名下的cookie数限制,一些开发人员使用了一种称为`子cookie(subcookie)`的方式.子cookie是存放在单个cookie中的更小段的数据.也就是使用cookie值来存储多个名值对.

e.g.

`name=name1=value1&name2=value2&name3=value3&name4=value4`

操作封装

```javascript
var SubCookieUtil = {

    get: function (name, subName){
        var subCookies = this.getAll(name);
        if (subCookies){
            return subCookies[subName];
        } else {
            return null;
        }
    },
    
    getAll: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result = {};
            
        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart)
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            
            if (cookieValue.length > 0){
                subCookies = cookieValue.split("&");
                
                for (i=0, len=subCookies.length; i < len; i++){
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
    
                return result;
            }  
        } 

        return null;
    },
    
    set: function (name, subName, value, expires, path, domain, secure) {
    
        var subcookies = this.getAll(name) || {};
        subcookies[subName] = value;
        this.setAll(name, subcookies, expires, path, domain, secure);

    },
    
    setAll: function(name, subcookies, expires, path, domain, secure){
    
        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;
        
        for (subName in subcookies){
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
                subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
            }
        }
        
        if (subcookieParts.length > 0){
            cookieText += subcookieParts.join("&");
                
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
        
            if (path) {
                cookieText += "; path=" + path;
            }
        
            if (domain) {
                cookieText += "; domain=" + domain;
            }
        
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }
    
        document.cookie = cookieText;        
    
    },
    
    unset: function (name, subName, path, domain, secure){
        var subcookies = this.getAll(name);
        if (subcookies){
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
    },
    
    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
    }

};
```

####关于cookie的思考
还有一类cookie被称为`HTTP专有cookie`.HTTP专有cookie可以从浏览器或者服务器设置,但是只能从服务器端读取,因为JS无法获取HTTP专有cookie的值

由于所有的cookie都会由浏览器作为请求头发送(每次请求一个新的页面的时候Cookie都会被发送过去,不管你是否愿意),所以在cookie中存储大量信息会影响到特定域的请求性能.cookie信息越大,完成对服务器请求的时间也越长.

**_一定不要在cookie中存储重要和敏感的数据.cookie数据并非存储在一个安全环境中,其中包含的任何数据都可以被他人访问_**