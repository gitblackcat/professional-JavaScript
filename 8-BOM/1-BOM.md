###BOM(browser object model)
BOM提供了很多对象,用于访问浏览器的功能(就是通过BOM提供的对象方法来操作浏览器),这些功能与任何网页内容无关

BOM的核心对象是window,它表示浏览器的一个实例.在浏览器中,window对象有双重角色,它既是通过JS访问浏览器窗口的一个接口,又是ECMAScript规定的Global对象.因此所有在全局作用域中声明的变量/函数都会变成window对象的属性和方法

```javascript
var age = 99;
function sayAge(){
    alert( this.age );
}

alert( age );//99
sayAge();//99
alert( window.age );//99
window.sayAge();//99
```

上述变量`age`和函数`sayAge`在全局作用域声明,它们被自动归于window对象下

抛开全局变量会成为window对象的属性不谈,定义全局变量与在window对象上直接定义属性还是有些区别的: 全局变量不能通过delete操作符删除,而直接在window对象上定义的属性可以

```javascript
var age = 29;
window.color = "red";

//throws an error in IE < 9, returns false in all other browsers
delete window.age;

//throws an error in IE < 9, returns true in all other browsers
delete window.color;    //returns true

alert(window.age);      //29
alert(window.color);    //undefined
```


尝试访问未声明的变量会抛出错误,但是通过查询window对象,可以知道某个可能未声明的变量是否存在

```javascript
var newValue = oldValue;
//报错oldValue is not defined
```

```javascript
var newValue = window.oldValue;
console.log(newValue);//undefined
```

Windows Mobile平台的IE浏览器不允许通过window.property = value之类的方式直接在window对象上创建新的属性或方法.可是,在全局作用域中声明的所有变量和函数,照样会变成window对象的成员