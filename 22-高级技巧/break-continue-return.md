###break,continue,return
- break

`break`的意思是终止整套循环(`for`,`while`,`switch`)

```javascript
for(var i=0;i<10;i++){
    if(i === 8){
        break
    }
    console.log(i)
}
//打印结果1,2,3,4,5,6,7
```

如下`break`只能终止一套循环

```javascript
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        var num = i*10 + j
        if(num === 80){
            break
        }
        console.log(num)
    }
}
//打印结果1,2...79,90,91,...
```

如下方式,能终止所有循环

```javascript
outer: for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        var num = i*10 + j
        if(num === 80){
            break outer
        }
        console.log(num)
    }
}
//打印结果1,2...79
```

- continue

`continue`的意思是跳过整套循环的当前一次循环,开始下一次

`continue`语句只能用在`while`语句,do/while语句,`for`语句,或者`for/in`语句的循环体内,在其它地方使用都会引起错误

```javascript
for(var i=0;i<10;i++){
    if(i === 7){
        continue
    }
    console.log(i)
}
//打印结果1,2,3,4,5,6,8,9
```

- return

**_`return`语句就是用于指定函数返回的值.`return`语句只能出现在函数体内,出现在代码中的其他任何地方都会造成语法错误_**

```javascript
for(var i=1;i<=10;i++) { 
    if(i==8) { 
        return
    } 
    document.write(i)
} 
//报错: test2.html:13 Uncaught SyntaxError: Illegal return statement
```

