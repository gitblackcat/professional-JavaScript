###Object类型
Object实例不具备多少功能,但对于应用程序中存储和传输数据而言,是非常理想的选择

- 创建Object实例方法一: 使用new操作符后跟Object构造函数

```javascript
var person = new Object();
person.name = 'Nicholas';
person.age = 29;
```

- 创建Object实例方法二: 使用对象字面量表示法

```javascript
var person = {
    name: "Nicholas",
    age: 29
};
```

也可以这样写

```javascript
var person = {};
person.name = "Nicholas";
person.age = 29;
```

在使用对象字面量语法时候,属性名也可以是字符串

```javascript
var person = {
    "name": "Nicholas",
    "age": 29,
    5: true //这里的数值属性会自动转化为字符串
}
```

对象字面量语法推荐只在考虑对象属性名的可读性时使用,在通过对象字面量定义对象的时候,实际上不会调用Object构造函数,但这并不代表不能使用相关Object的内置方法

在创建对象时,调用构造函数,并不是必需的过程(如上的对象字面量创建法)

在`var person = new Object();`时,JS引擎首先帮你造出个对象来,然后再把this指向这个刚刚造出来的对象,调用Person这个构造函数来做一些初始化操作.也就是说,**_在调用构造函数前,这个对象已经有了.所以用对象字面量创建对象时,只不过省去了调用构造函数那一步,而是改用了JSON的方式进行初始化_**

对象字面量是向函数传递大量可选参数的首选方式

```javascript
function displayInfo(args){
    var output = '';

    if( typeof args.name == 'string' ){
        output += 'name: ' + args.name + '\n';
    }

    if( typeof args.age == 'number' ){
        output += 'age: ' + args.age + '\n';
    }

    alert(output);
}

displayInfo({
    name: "Nicholas",
    age: 29
})

displayInfo({
    name: "Mike"
})
```

以上这种传递参数的模式最适合需要向函数传入大量可选参数的情形.

所以传递参数最好的做法是对那些必需值使用命名参数,而使用对象字面量来封装多个可选参数

