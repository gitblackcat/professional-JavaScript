###正则表达式组成
`var expression = / pattern / flags;`

- 模式(pattern)部分是任何简单或复杂的正则表达式,可以包含字符类/限定符/分组/向前查找/反向引用
- 标志(flags),用以标明正则表达式的行为
    + g: 表示全局(global)模式,即模式将被应用于所有字符串,而非在发现第一个匹配项时立即停止
    + i: 表示不区分大小写(case-insensitive)模式,即在确定匹配项时,忽略模式与字符串的大小写
    + m: 表示多行(multiline)模式,即在到达一行文本末尾时还会继续查找下一行中是否存在在与模式匹配的项

**因此一个正则表达式就是模式和标志的组合**

```javascript

//匹配字符长中所有"at"的实例
var pattern1 = /at/g;

//匹配第一个"bat"或"cat",不区分大小写
var pattern2 = /[bc]at/i;

//匹配所有以"at"结尾的3个字符串的组合,不区分大小写
var pattern3 = /.at/gi;

```

模式中使用的所有**_元字符_**都必须转义,正则表达式中的元字符包括:
`(`,`)`,`[`,`]`,`{`,`}`,`*`,`+`,`\`,`|`,`^`,`$`,`?`,`.`

这些元字符在正则表达式中都有一个或多个特殊用途,因此如果想要匹配字符串中包含的这些字符,就必须对它们进行转义

```javascript

//匹配第一个"bat"或"cat",不区分大小写
var pattern1 = /[bc]at/i;

//匹配第一个"[bc]at",不区分大小写
var pattern2 = /\[bc\]at/i;

//匹配所有以"at"结尾的3个字符的组合,不区分大小写
var pattern3 = /.at/gi;

//匹配所有".at",不区分大小写
var pattern4 = /\.at/gi;

```

以上皆为字面量形式来定义的正则表达式,以下为用RegExp构造函数来创建正则表达式

`var expression = new RegExp("pattern","flags")`;

**_注意这里的模式和标志都是字符串形式_**

```javascript

//匹配第一个"bat"或"cat",不区分大小写
var pattern1 = /[bc]at/i;

//匹配第一个"bat"或"cat",不区分大小写
var pattern2 = new RegExp("[bc]at","i");

```

由于RegExp构造函数的模式参数是字符串,所以在某些情况下要对字符进行双重转义.所有的元字符都必须双重转义,那些已经转义过的字符也是如此.凡是有转义字符的,字符串模式都是字面量模式的转义字符乘以2,如下图:

![](RegExp.png)

###RegExp实例属性: source/lastIndex

- `source`返回的是以字面量形式表示的字符串

```javascript

var pattern1 = /\[bc\]at/i;
console.log( pattern1.source ); //\[bc\]at

var pattern2 = new RegExp("\\[bc\\]at","i");
console.log( pattern2.source ); //\[bc\]at
console.log( typeof pattern2.source ); //string
```
 
- `lastIndex`: 整数,表示开始搜索下一个匹配项的字符位置,从0算起.具体见---RegExpInstance.md