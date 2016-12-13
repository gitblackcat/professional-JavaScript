`navigator`对象用来识别客户端浏览器的事实标准.通过自身拥有的属性和方法来检测所需要的信息

![navigator](img/navigator1.png)

![navigator](img/navigator2.png)

![navigator](img/navigator3.png)

####检测插件
可以通过`navigator.plugins`来检测浏览器是否安装了特定插件.navigator.plugins是一个对象数组,每个对象都是一个对插件的描述,拥有以下4个属性:

- name: 插件名
- description: 插件的描述
- filename: 插件的文件名
- length: 插件所处理的MIME类型数量

MIME: 在把输出结果传送到浏览器上的时候,浏览器必须启用适当应用程序来处理输出的文档,而这需要多种类型的MIME来完成

```javascript
//在非IE中检测插件
function hasPlugin(name){
    var name = name.toLowerCase()

    for( var i=0; i<navigator.plugins.length; i++ ){
        if( navigator.plugins[i].name.toLowerCase().indexOf(name) > -1 ){
            return true
        }
    }

    return false
}

//传入参数: 要检测的插件名称
alert( hasPlugin("Flash") )

alert( hasPlugin("QuickTime") )
```

每个插件对象本身也是一个MimeType对象的数组,这些对象可以通过方括号语法来访问.每个MimeType对象有4个属性: 包含MIME类型描述的description,回指插件对象的enablePlugin,表示与MIME类型对应的文件扩展名的字符串suffixes(以逗号分隔)和表示完整MIME类型字符串的type

```javascript
//在IE中检测插件
function hasIEPlugin(name){
    try{
        new ActiveObject(name)
        return true
    }catch(ex){
        return false
    }
}

//detect flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));

//detect quicktime
alert(hasIEPlugin("QuickTime.QuickTime"));
```

上述代码,函数hasIEPlugin()只接收一个COM标识符作为参数.在函数内部,首先会尝试创建一个COM对象的实例.之所以要在try-catch语句中进行实例化,是因为创建未知COM对象块,结果会返回false

```javascript
//plugin detection - doesn't work in IE
function hasPlugin(name){
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++){
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }

    return false;
}        

//plugin detection for IE
function hasIEPlugin(name){
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex){
        return false;
    }
}

//detect flash for all browsers
function hasFlash(){
    var result = hasPlugin("Flash");
    if (!result){
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}

//detect quicktime for all browsers
function hasQuickTime(){
    var result = hasPlugin("QuickTime");
    if (!result){
        result = hasIEPlugin("QuickTime.QuickTime");
    }
    return result;
}

//detect flash
alert(hasFlash());

//detect quicktime
alert(hasQuickTime());
```

鉴于检测这两种插件的方法差别太大,因此典型的做法是针对每个插件分别创建检测函数,而不是使用前面介绍的通用检测方法.如上述代码

plugins集合有一个名叫`refresh()`的方法,用于刷新plugins以反映最新安装的插件.这个方法接收一个参数: 表示是否应该重新加载页面的一个布尔值.如果将这个值设置为true,则会重新加载包含插件的所有页面.否则,只更新plugins集合,不重新加载页面




