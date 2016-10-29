###Date类型
- 创建日期对象

```javascript
var now = new Date();
console.log( now ); //Sat Oct 29 2016 13:43:04 GMT+0800 (中国标准时间)
```

- 创建特定日期对象

- `Date.parse()`: 接收一个表示日期的字符串参数 格式如下
    - "月/日/年": 6/13/2016
    - "英文月名 日,年": january 12,2016(英文不区分大小写)
    - "英文星期几 英文月名 日 年 时:分:秒 时区": Tue May 25 2016 13:13:13 GMT-0700
    - 'YYYY-MM-DDTHH:mm:ss.sssZ': 2016-05-29T13:55:55(注意这里都要写成双个 如果5 就要写成05)

```javascript
//如果直接把表示日期的字符串传递给Date构造函数,也会在后台调用Date.parse()

var aTime = new Date( Date.parse('2016-05-05T15:15:15') );
console.log( aTime );

var bTime = new Date( '2016-05-05T15:15:15' );
console.log( bTime );

//以上两个返回相同的日期内容,只是内容相同,并不相等,因为是对象
```

- `Date.UTC()`

`Date.UTC()`的参数分别是年份/基于0的月份(0-11)/月中的那一天(1-31)/小时数(0-23)/分钟/秒/毫秒数,这些参数中只有前连个参数(年/月)是必须的,如果没有提供月中的天数,则假设天数为1,如果省略其他参数,则都假设为0;

`var utcTime = new Date( Date.UTC(2016,0) );`

```javascript
//如同模仿Date.parse()一样,Date构造函数也会模仿Date.UTC(),他们格式相同,但有一点不同,不用Date.UTC的日期和时间都基于本地时区而非GMT来创建

var utcA = new Date( Date.UTC(2016,9,29,14,13) );
console.log( utcA );//Sat Oct 29 2016 22:13:00 GMT+0800 (中国标准时间)

var utcB = new Date( 2016,9,29,14,13 );
console.log( utcB );//Sat Oct 29 2016 14:13:00 GMT+0800 (中国标准时间)
```

**_注意`Date.parse()`,`Date.UTC()`都返回的是当前地区的时间,而你设置的时间确实子午线时间,如果要调整,GMT就是调整时区的方式_**

- 返回当前时刻的毫秒数

`Date.now()`: 次方法返回表示调用这个方式时的时期和时间的毫秒数的数字类型

```javascript
//可以用来计时

var start = Date.now();
console.log( start );

fnRun();

var end = Date.now();
console.log( end );
console.log( end - start );

function fnRun(){
    var arr = [1,2,5,3,7];
    arr.splice(1,0,55,44,33,22,11);
    console.log(arr);
}
```

支持浏览器: IE9+ Firfox 3+ Safari 3+ Opera 10.5 Chrome,在不支持它的浏览器中,使用+操作符获取Date对象的时间戳,也可以达到同样目的

```javascript
//可以用来计时

var start = +Date.now();
console.log( start );

fnRun();

var end = +Date.now();
console.log( end );
console.log( end - start );

function fnRun(){
    var arr = [1,2,5,3,7];
    arr.splice(1,0,55,44,33,22,11);
    console.log(arr);
}
```

###继承
Date类型的valueOf()方法,不会返回字符串,而是返回日期的毫秒表示,number类型,因此可以使用比较操作符来比较日期值

```javascript
var a = new Date('2016,8,8');
console.log( a.valueOf() );
var b = new Date('2016,9,8');
console.log( b.valueOf() );
console.log( b > a );
```
