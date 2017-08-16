### JS中的this指向

this代表函数运行时,自动生成的一个内部对象,只能在函数内部使用

**_this关键字只与函数的执行环境有关,而与声明环境没有关系_**

每个函数在被调用时都会自动取得两个特殊变量: `this`和`arguments`.内部函数在搜索这两个变量时,只会搜索到其活动对象为止,因此永远不可能直接访问外部函数中的这两个变量.

this关键字虽然会根据环境变化,但是它始终代表的是调用当前函数的那个对象.这就引出了JS中函数调用的问题.在JS中调用函数的模式可以分为4种:

函数直接调用模式,方法调用模式,构造器调用模式,apply调用模式.

#### 函数直接调用模式

函数直接调用,以是否使用严格模式来看

- 在严格模式下

```javascript
var a = 1
function f(){
    "use strict"
    console.log(this.a)
}

f() //Cannot read property 'a' of undefined
```

**_在严格模式下,直接调用函数,this指向undefined_**

- 在非严格模式下

```javascript
var a = 1
function f(){
    console.log(this.a)
}

f() //1
```

在非严格模式下,this先指向undefined,然后被重定向为window

综上结论: **_当函数独立调用的时候,在严格模式下它的this指向undefined,在非严格模式下,当this指向undefined的时候,自动指向全局对象(浏览器中就是window)_**

额外讲两句:

```javascript
let a = 'window',
    o = {
        a: 'o',
        b: this.a
    }

console.log(o.b) //undefined 因为用let全局声明变量 !== window.变量
```

```javascript
var a = 'window',
    o = {
        a: 'o',
        b: this.a
    }

console.log(o.b) //window
```

在全局模式下用`var`声明对象,对象里的`this`指向`window`.这里的`this`无所谓严格模式,因为只对调用中的函数有影响

#### 作为对象方法调用模式

当函数被保存为一个对象的属性时,它就可称为这个对象的方法.当一个方法被调用时,this被绑定到这个对象上.如果调用表达式包含一个提取属性的动作`.`或`[]`,那么它被称为方法调用.

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

```javascript
var name = "window";
var obj = {
    name: "yzd",
    sayName: function() {
        console.log(this.name);
    }
};

var c = obj.sayName

c() //window
```

#### 构造函数模式

如果在一个函数前面加上new关键字来调用,那么就会创建一个连接到该函数的prototype成员的新对象,同时,this会被绑定到这个新对象上.这种情况下,这个函数就可以成为此对象的构造函数

```javascript
 function Obj() {
     this.name = "yzd";
 }
 var person = new Obj();
 console.log(person.name);

 //Obj作为构造函数被调用,函数体内的this被绑定为新创建的对象person

```

#### apply,call调用模式

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

```javascript
var a = 'window'

function f() {
    console.log(this.a)
}

f.call(undefined) //window
//在非严格模式下,当调用f.call(undefined)的时候打印出来的依旧是window,就是证明在非严格模式下this指向undefined会定向为window的最好证据
```

#### 综合例子

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

**_心中时刻提醒自己this是在函数执行时被绑定的(不包括ES6的箭头函数),不要被任何赋值语句打乱阵脚._**

#### 箭头函数的this指向
箭头函数自身是没有`this`的,所以在箭头函数中的`this`只是引用的是该箭头函数`定义`生效时候,其所在的环境中的`this`

```javascript
function f(){
    setTimeout(() => console.log(this),100)
}

f.call({}) //Object {}
```

```javascript
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id)
      }
    }
  }
}

var f = foo.call({id: 1})

var t1 = f.call({id: 2})()() // id: 1
var t2 = f().call({id: 3})() // id: 1
var t3 = f()().call({id: 4}) // id: 1
```

```javascript
var a = 1
var obj = {
  a: 2
}
function fun() {
    var a = 3
    let f = () => console.log(this.a)
    f()
}

fun()//1
fun.call(obj)//2

//这里箭头函数一直引用的是fun这个函数的this
//第一次调用,fun函数的this指向window
//第二次调用,fun函数的this指向obj
```

```javascript
function Fun() {
    this.name = 'Damonare'
}
Fun.prototype.say = () => {
    console.log(this)
}
var f = new Fun()
f.say() //window

//此时的箭头函数所在的上下文是`__proto__`,`__proto__`所在的上下文也就是Object函数的上下文,而Object的this值就是全局对象
```

```javascript
function Fun() {
    this.name = 'Damonare'
      this.say = () => {
        console.log(this)
    }
}
var f = new Fun()
f.say() //Fun的实例对象

//此时箭头函数所在的上下文就变成了Fun的上下文环境,而因为上面说过当函数作为构造函数调用的时候(也就是new的作用)上下文环境的this指向实例对象
```