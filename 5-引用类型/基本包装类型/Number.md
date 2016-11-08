###Number类型
不建议直接使用实例化Number类型

- toFixed(): 按照指定的小数位返回数值的字符串表示

```javascript
var num = 10;
console.log( num.toFixed(2) );//10.00
console.log( typeof num.toFixed(2) );//string
```

toFixed()会自动四舍五入

```javascript
var num = 10.005;
console.log( num.toFixed(2) );//10.01
```

toFixed()方法可以表示带有0到20个小数位的数值

- toExponential(): 返回以指数表示法(e表示法)表示的数值的字符串形式

```javascript
var num = 10;
console.log( num.toExponential(1) );//1.0e+1
console.log( num.toExponential(2) );//1.00e+1
```

- toPrecision(): 处理的数值决定到底是调用toFixed(),还是toExponential()

```javascript
numberObject = new Number(99);
alert(numberObject.toPrecision(1));    //"1e+2"
alert(numberObject.toPrecision(2));    //"99"
alert(numberObject.toPrecision(3));    //"99.0"
```

####继承
- valueOf(): 返回对象表示的基本类型数值
- toString()/toLocaleString(): 返回字符串形式数值

```javascript
// var n = new Number(10);
//这里两者都可以
var n = 10;

console.log(typeof n.valueOf());
console.log(typeof n.toString());
console.log(typeof n.toLocaleString());
```

