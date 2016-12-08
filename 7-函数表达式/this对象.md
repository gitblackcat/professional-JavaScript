this代表函数运行时,自动生成的一个内部对象,只能在函数内部使用

**_this关键字只与函数的执行环境有关,而与声明环境没有关系_**

每个函数在被调用时都会自动取得两个特殊变量: `this`和`arguments`.内部函数在搜索这两个变量时,只会搜索到其活动对象为止,因此永远不可能直接访问外部函数中的这两个变量.

this关键字虽然会根据环境变化,但是它始终代表的是调用当前函数的那个对象.这就引出了JS中函数调用的问题.在JS中调用函数的模式可以分为4种:

方法调用模式,函数调用模式,构造器调用模式,apply调用模式.

- 方法调用模式

当函数被保存为一个对象的属性时,它就可称为这个对象的方法.当一个方法被调用时,this被绑定到这个对象上.如果调用表达式包含一个提取属性的动作.或[],那么它被称为方法调用.

```javascript
var name = "window";
var obj = {
    name: "yzd",
    sayName: function() {
        console.log(this.name);
    }
};
obj.sayName();  //yzd

//sayName函数作为对象obj的方法调用,所以函数体中的this就代表obj对象
```

- 函数调用模式

当一个函数并非一个对象的属性时,那么它就是被当做函数来调用的.在此种模式下,this被绑定为全局对象,在浏览器环境下就是window对象

```javascript
var name = "window";
function sayName() {
    console.log(this.name);
}
sayName(); //window

//sayName以函数调用模式调用,所以函数体中的this代表window对象
```

- 构造函数模式

 如果在一个函数前面加上new关键字来调用,那么就会创建一个连接到该函数的prototype成员的新对象,同时,this会被绑定到这个新对象上.这种情况下,这个函数就可以成为此对象的构造函数

 ```javascript
 function Obj() {
     this.name = "yzd";
 }
 var person = new Obj();
 console.log(person.name);

 //Obj作为构造函数被调用,函数体内的this被绑定为新创建的对象person
 ```

- apply调用模式

在JS中,函数也是对象,所有函数对象都有两个方法: apply和call,这两个方法可以让我们构建一个参数数组传递给调用函数,也允许我们改变this的值

```javascript
var name = "window";
var person = {
    name: "yzd"
};
function sayName() {
    console.log(this.name);
}
sayName();    //window
sayName.apply(person);   //yzd
sayName.apply();    //window
```

- 综合例子

```javascript
var name = "window";
function showName() {
    console.log(this.name);
}
var person1 = {
    name: "yzd",
    sayName: showName
}
var person2 = {
    name: "Jake",
    sayName: function() {
        var fun = person1.sayName;
        fun();
    }
}
person1.sayName();    //yzd
person2.sayName();    //window
```

首先心中时刻提醒自己this是在函数执行时被绑定的,不要被任何赋值语句打乱阵脚.

先看第一个执行语句: person1.sayName(); 首先确定这是方法调用模式,对象为person1,再看sayName被赋值为全局函数对象showName,在showName执行时,this绑定的是person1,所以结果为yzd.

再看第二个执行语句: person2.sayName(); 这还是方法调用模式,对象为person2,调用的是它的sayName方法.再看sayName函数体,发现函数体最终执行的函数是fun,fun是用函数调用模式调用的.而fun最终也被赋值为showName函数,因为fun是用函数调用模式调用的,所以这里的this绑定为window,结果为window.
