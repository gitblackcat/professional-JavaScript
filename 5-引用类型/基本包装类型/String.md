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

- slice()/substr()/substring(): 返回一个基本类型的子字符串,对原始字符串没有任何影响

这三个方法都接受一或两个参数,第一个参数指定子字符串的开始位置(包括开始位置).在slice()/substring()的第二个参数表示结束位置(不包括结束位置);在substr()的第二个参数表示返回字符串的个数(长度)

```javascript
var stringValue = "hello world";
alert(stringValue.slice(3));        //"lo world"
alert(stringValue.substring(3));    //"lo world"
alert(stringValue.substr(3));       //"lo world"
alert(stringValue.slice(3, 7));     //"lo w"
alert(stringValue.substring(3,7));  //"lo w"
alert(stringValue.substr(3, 7));    //"lo worl"
```

在参数为负的情况下:

- slice()方法会将传入的负值与字符串长度相加
- substr()方法将负的第一个参数加上字符串长度,将负的第二个参数转为0
- substring()方法把所有负值参数变为0

```javascript
alert(stringValue.slice(-3));         //"rld"
alert(stringValue.substring(-3));     //"hello world"
alert(stringValue.substr(-3));        //"rld"
alert(stringValue.slice(3, -4));      //"lo w"
alert(stringValue.substring(3, -4));  //"hel"
alert(stringValue.substr(3, -4));     //"" (empty string)
```

####字符串位置方法
indexOf()/lastIndexOf(): 给定子字符串,返回子字符串的位置(没有找到,返回-1)

- indexOf(): 从字符串开头向后搜索子字符串
- lastIndexOf(): 从字符串末尾向前搜索子字符串

```javascript
var stringValue = "hello world";
alert(stringValue.indexOf("o"));         //4
alert(stringValue.lastIndexOf("o"));     //7
```

这两个方法都可以接收可选的第二个参数,表示从字符串中的哪个位置开始搜索

```javascript
var stringValue = "hello world";
alert(stringValue.indexOf("o", 6));         //7
alert(stringValue.lastIndexOf("o", 6));     //4
```

```javascript
var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    arr = [];
var posNum = str.indexOf('e');

while( posNum > -1 ){
    arr.push( posNum );
    posNum = str.indexOf('e',posNum + 1);
}

console.log( arr );
```

####trim()方法
ES5中为字符串定义的方法,创建一个字符串副本,删除前置以及后缀的所有空格

```javascript
var strValue = '  hello world!  ';
var strTrim = strValue.trim();
console.log( strValue );//'  hello world!  ' 
console.log( strTrim );//'hello wrold'
```

Firefox3.5+/Safari 5+/Chrome 8+还支持非标准的trimLeft()/trimRight()方法,分别用于删除字符串开头和末尾的空格

####字符串大小写转换方法
- toUpperCase()/toLowerCase(): 经典方法
- toLocaleUpperCase()/toLocaleLowerCase(): 某些语言需要特殊处理(如土耳其语)

```javascript
var stringValue = "hello world";
alert(stringValue.toLocaleUpperCase());  //"HELLO WORLD"
alert(stringValue.toUpperCase());        //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase());  //"hello world"
alert(stringValue.toLowerCase());        //"hello world"
```

####字符串的模式匹配方法
详见RegExp/字符串对象方法.md

####localeCompare()方法
就是比较字符串与参数字符串,哪个在前,哪个在后

```javascript
var stringValue = "yellow";       
alert(stringValue.localeCompare("brick"));  //1
alert(stringValue.localeCompare("yellow")); //0
alert(stringValue.localeCompare("zoo"));    //-1
//这里返回的值,只能确定是正负和0,但具体值要看实现而定

//preferred technique for using localeCompare()
function determineOrder(value) {
    var result = stringValue.localeCompare(value);
    if (result < 0){
        alert("The string 'yellow' comes before the string '" + value + "'.");
    } else if (result > 0) {
        alert("The string 'yellow' comes after the string '" + value + "'.");
    } else {
        alert("The string 'yellow' is equal to the string '" + value + "'.");
    }
}

determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo");
```

####fromCharCode()
接收一个或多个字符串编码,然后将它们转换成一个字符串

```javascript
console.log( String.fromCharCode(104, 101, 108, 108, 111) ); //hello
```