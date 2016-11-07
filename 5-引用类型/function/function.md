###创建函数
1. function f1(n1,n2){ return n1 + n2; }
2. var f2 = function(n1,n2){ return n1 + n2; };
3. var f3 = new Function('n1','n2','return n1 + n2');

虽然不推荐第三种写法,但是从第三种方式中可以看出**_函数是对象,函数名实际上也是一个指向函数对象的指针,不会与某个函数绑定_**

```javascript
var sum(n1,n1){
    return n1 + n2;
}

alert( sum(10,10) );// 20

var anotherSum = sum;

alert( anotherSum(10,20) );//30

sum = null;
alert( anotherSum(20,20) );//40
```

使用不带圆括号的函数名是访问函数指针,而非调用函数

###函数无重载
```javascript
var foo = function(num){
    return num + 100;
}

foo = function(num){
    return num + 200;
}

console.log( foo(200) );//400
```

这里第二个函数覆盖了第一个函数,其本质就是函数名foo函数对象指针的替换,函数名只能保存一个对象指针,所有没有重载

###函数声明和函数表达式
- 解析器会率先读取函数声明,并使其在执行任何代码之前可用(可用访问);

```javascript

alert( sum(10,10) );//20

function sum(n1,n2){
    return n1 + n2;
}

//以上代码完全可用正常运行,因为在代码开始执行之前,解析器就已经通过一个名为函数声明提升(function declaration hoisting)的过程,读取并将函数声明添加到执行环境中.

//对代码求值时,javascript引擎在第一遍会声明函数并将它们放到源代码树的顶部.

//所以即使声明函数的代码在调用它的代码后面,javascript引擎也能把函数声明提升到顶部

```

- 对于函数表达式,必须是解析器执行到它所在的代码,才能真正被解释执行

```javascript

alert( sum(10,10) );

var sum = function(n1,n2){
    return n1 + n2;
}

//以上代码会报错

//函数位于一个初始化语句中,而不是一个函数声明.换句话说,在执行到函数所在的语句之前,变量sum不会保存函数的引用指针

```

###作为值的函数
```javascript

//对对象数组进行某种要求的排序

function createComparisonFunction(propertyName) {//这个函数只是为了传参

    return function(object1, object2){  //这里相当于sort(function(v1,v2){})
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}

var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];

data.sort(createComparisonFunction("name"));
alert(data[0].name);  //Nicholas

data.sort(createComparisonFunction("age"));
alert(data[0].name);  //Zachary  

```

