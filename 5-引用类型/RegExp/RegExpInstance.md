###RegExp实例方法
- `exec()`: 该方法专门为捕获组设计.exec()接收需要应用模式的字符串,然后返回包含第一个匹配项信息的数组;或者在没有匹配项的情况下返回`null`.具体见如下:

```javascript

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;//这里包含两个捕获组,最内部捕获组匹配字符串为" and baby",包含它的捕获组匹配字符串" and dad"或者是" and dad and baby"

var matches = pattern.exec(text);

console.log( matches.input ); //mom and dad and baby 表示应用模式的字符串,这里就是text

console.log( matches.index ); //0 表示匹配项在字符串中的位置

console.log( matches[0] ); //mom and dad and baby 数组第一项是与整个模式匹配的字符串

console.log( matches[1] ); //and dad and baby 第二项为整个第一捕获组匹配的内容(如果捕获组中的内容匹配不到,返回undefined)

console.log( matches[2] ); //and baby 第三项为整个第二捕获组匹配的内容(如果捕获组中的内容匹配不到,返回undefined)

```

对于exec()方法而言,即使在模式中设置了全局表示(g),它每次也只返回第一个匹配项.在不设置全局标志的情况下,在同一个字符串上多次调用exec()将始终返回第一个匹配项的信息.而在设置全局标志的情况下,每次调用exec()则都会在字符串中继续查找新匹配向

```javascript

var text = "cat, bat, sat, fat";

var pattern1 = /.at/;//以at结尾的三个字符串
var matches = pattern1.exec(text);
console.log( matches.index );//0
console.log( matches[0] );//cat
console.log( pattern1.lastIndex );//0

matches = pattern1.exec(text);
console.log( matches.index );//0
console.log( matches[0] );//cat
console.log( pattern1.lastIndex );//0

var pattern2 = /.at/g;
var matches = pattern2.exec(text);
console.log( matches.index );//0
console.log( matches[0] );//cat
console.log( pattern2.lastIndex );//3

matches = pattern2.exec(text);
console.log( matches.index );//5
console.log( matches[0] );//bat
console.log( pattern2.lastIndex );//8
```

- `test()`: 接收一个字符串参数,如果与模式匹配则返回true,否则返回false

```javascript

var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;

if( pattern.test(text) ){
    console.log( "The pattern was matched." );
}

```


###RegExp继承
```javascript

var pattern = new RegExp("\\[bc\\]at", "gi");

console.log(pattern.toString());    // /\[bc\]at/gi 返回正则表达式字面量
console.log(typeof pattern.toString()); //string

console.log(pattern.toLocaleString());    // /\[bc\]at/gi  返回正则表达式字面量
console.log(typeof pattern.toLocaleString()); //string

console.log(pattern.valueOf()); // /\[bc\]at/gi  返回正则表达式本身
console.log(typeof pattern.valueOf()); //object 

```

###RegExp构造函数属性
使用以下属性,可以从exec()/test()中提取出更具体的信息

```javascript
var text = "this has been a short summer";
var pattern = /(.)hort/g;

/*
 * Note: Opera doesn't support input, lastMatch, lastParen, or multiline.
 * Internet Explorer doesn't support multiline.
 */        
if (pattern.test(text)){
    alert(RegExp.input);        //this has been a short summer
    alert(RegExp.leftContext);  //this has been a   匹配项左边的字符串        
    alert(RegExp.rightContext); // summer  匹配项右边的字符串
    alert(RegExp.lastMatch);    //short  最后一次匹配的匹配项
    alert(RegExp.lastParen);    //s 最后一次匹配的捕获组
    alert(RegExp.multiline);    //false 布尔值,表示是否所有表达式都使用多行模式
}
```

以上也可写成如下:

```javascript
var text = "this has been a short summer";
var pattern = /(.)hort/g;

/*
 * Note: Opera doesn't support short property names.
 * Internet Explorer doesn't support multiline.
 */        
if (pattern.test(text)){
    alert(RegExp.$_);               //this has been a short summer
    alert(RegExp["$`"]);            //this has been a            
    alert(RegExp["$'"]);            // summer
    alert(RegExp["$&"]);            //short
    alert(RegExp["$+"]);            //s
    alert(RegExp["$*"]);            //false
}
```

除了以上介绍的几个属性,还有9个用于存储捕获组的构造函数属性,在调用exec()/test()方法时,属性自动被填充

```javascript
var text = "this has been a short summer";
var pattern = /(..)or(.)/g;
      
if (pattern.test(text)){
    alert(RegExp.$1);       //sh
    alert(RegExp.$2);       //t
}
//如果有需要,直到.$9为止
```
