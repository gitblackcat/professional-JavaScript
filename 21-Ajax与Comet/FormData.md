###FormData详解
转自[https://segmentfault.com/a/1190000006716454](https://segmentfault.com/a/1190000006716454)

####概述
FormData类型其实是在`XMLHttpRequest2`级定义的，它是为序列化表单以及创建与表单格式相同的数据（当然是用于XHR传输）提供便利。

####创建实例
创建一个formData对象实例有几种方式:

- 创建一个空对象实例

`var formData = new FormData()`

此时可以调用`append()`方法来添加数据

- 使用已有的表单来初始化一个对象实例

假如现在页面已经有一个表单

```html
<form id="myForm" action="" method="post">
    <input type="text" name="name">名字
    <input type="password" name="psw">密码
    <input type="submit" value="提交">
</form>
```

我们可以使用这个表单元素作为初始化参数，来实例化一个formData对象

```javascript
// 获取页面已有的一个form表单
var form = document.getElementById("myForm")
// 用表单来初始化
var formData = new FormData(form)
// 我们可以根据name来访问表单中的字段
var name = formData.get("name") // 获取名字
var psw = formData.get("psw") // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append("token","kshdfiwi3rh")
```

