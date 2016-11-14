####Global对象
不属于其他任何对象的属性和方法,最终都是它的属性和方法.所有在全局作用域中定义的属性和函数,都是Global对象的属性

####URI编码方法
Global对象的encodeURI()和encodeURIComponent()方法可以对URI(Uniform Resource Identifiers,通用资源标识符)进行编码

- encodeURI(): 主要用于整个URI
- encodeURIComponent(): 主要用于对URI中的某一段进行编码

```javascript
var uri = "http://www.wrox.com/illegal value.htm#start";

//"http://www.wrox.com/illegal%20value.htm#start"
alert(encodeURI(uri));

//"http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"
alert(encodeURIComponent(uri));
```

使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动,只有空格被替换成了%20.而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符.这也正是可以对整个URI使用encodeURI(),而只能对附加在现有URI后面的字符串使用encodeURIComponent()的原因

与encodeURI()和encodeURIComponent()方法对应的两个方法分别是decodeURI()和decodeURIComponent().其中decodeURI()只能对encodeURI()进行解码

```javascript
var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";

//http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
alert(decodeURI(uri));

//http://www.wrox.com/illegal value.htm#start
alert(decodeURIComponent(uri));
```

####eval()方法
eval()方法就像是一个完整的ES解析器,只接收一个参数,即要执行的ES字符串

`eval("alert('hi')");`

等价于

`alert('hi');`

当解析器发现代码中调用eval()方法时,它会将传入的参数当做实际的ES语句来解析,然后把执行结果插入到原位置.通过eval()执行的代码被认为是包含该次调用的执行环境的一部分,因此被执行的代码具有与该执行环境相同的作用域链

```javascript
var msg = 'hello world!';
eval( "alert(msg)" );//hello world!

//上面第二行代码最终被替换成一行真正的代码 ---> alert(msg)
//相同原理,可以在eval外部调用定义在eval内部声明的函数

eval("function sayHi(){ alert('hi'); }");
sayHi();
```

在eval()中创建的任何变量或函数都不会被提升,因为在解析代码的时候,它们都包含在一个字符串中;它们只在eval()执行的时候创建

严格模式下,外部访问不到eval()中创建的任何变量或函数,eval赋值也会导致错误

####window对象
ES虽然没有指出Global对象,但Web浏览器都是将这个全局对象作为window对象的一部分加以实现的.因此,在全局作用域中声明的所有变量和函数,就都成为了window对象的属性

```javascript
var color = "red";

function sayColor(){
    alert(window.color);
}

window.sayColor();  //"red"
```