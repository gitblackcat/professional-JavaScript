###String类型
- toString()/valueOf()/toLocaleString(): 都返回对象所表示的基本字符串值

- length: 每个String类型的实例都有一个length属性,表示字符串中包含多个字符

```javascript
var str = 'jaehkc';
console.log( str.length );//6

//注意: 字符串中包含双字节字符(不是占一个字节的ASCII字符),每个字符也仍算一个字符
```

####字符方法
- charAt(): 以单字符字符串的形式返回给定位置的那个字符

```javascript
var str = 'hello world!';
console.log( str.charAt(1) );//e

//在实现ES5的浏览器中,也可以这样写
console.log( str[1] );//e
```

- charCodeAt(): 返回给定位置的那个字符的字符编码

```javascript
var str = 'hello world!';
console.log( str.charCodeAt(1) );//101
```

####字符串操作方法
- concat(): 用于将一个或多个字符串拼接起来,返回拼接得到的新字符串

```javascript

var strValue = 'hello ';
var result = strValue.concat('world');
console.log( strValue );//hello
console.log( result );//hello world

//跟数组拼接类似,concat()字符串拼接,也是先复制一份字符串副本进行操作,原来字符串不受影响
```

