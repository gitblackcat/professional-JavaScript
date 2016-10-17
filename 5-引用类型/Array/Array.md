###创建数组
- 方法一: 使用Array构造函数

```javascript
var colors = new Array();

var colors = new Array(20);//声明数组长度为20

var colors = new Array("red","yellow","blue");//['red','yellow','blue']

var colors = Array(20);//声明数组长度为20

var names = Array("Nicholas");//['Nicholas']
```

- 方法二: 数组字面量表示法

```javascript
var colors = ['red','blue','green'];

var names = [];

var values = [1,2,];//IE8及以下values数组为1,2,undefined 其他浏览器为1,2

var options = [,,,,,];//IE8及以下数组长度为6 其他浏览器为5
```


与对象一样,在使用数组字面量表示法的时候,也不会调用Array构造函数

###数组length属性
数组的length属性很有特点---它不是只读.可以通过设置这个属性,来从数组的末尾移除项或向数组中添加新项

```javascript
var colors = ['red','green','blue'];
colors.length = 2;
alert( colors[2] );//undefined
```

```javascript
var colors = ['red','green','blue'];
colors[colors.length] = 'yellow';
alert( colors );//red,green,blue,yellow
```

```javascript
var colors = ['red'];
colors[99] = 'black';
alert( colors.length );//100 
//第一位是red 最后一位是black 中间都是undefined
```


数组最多包含4 294 967 295个项

###检测数组
- 使用`instanceof`操作符检测数组

```javascript
var arr = [];
console.log( arr instanceof Array );//true
```

instanceof操作符的问题在于它假定只有一个全局执行环境,如果网页中包含多个框架,那实际上就存在两个以上不同的全局环境,从而存在两个以上不同版本的Array构造函数。如果从一个框架向另一个框架传入一个数组,那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数

```javascript
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
var value = new window.frames[0].Array;
console.log(value instanceof Array);//false
console.log(value.constructor == Array);//false
```

- 使用`Array.isArray()`来检测数组

```javascript
var arr = [];
console.log( Array.isArray( arr ) );//true
```

这个方法的目的是最终确定某个值到底是不是数组,而不管它在哪个全局执行环境中创建

```javascript
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
var value = new window.frames[0].Array;
console.log( Array.isArray( value ) );//true
```

兼容性:IE9+ / Firefox 4+ / Safari 5+ / Chorme / Opera 10.5+