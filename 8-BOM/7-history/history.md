history对象保存着用户上网的历史记录,从窗口被打开的那一刻算起.因为history是window对象的属性,因此每个浏览器窗口,每个标签页乃至每个框架,都有自己的history对象与特定的window对象关联.

使用`go()`方法可以在用户的历史记录中任意跳转,可以向后也可以向前.这个方法接收一个参数,表示向后或者向前跳转的页面数的一个整数值.负数表示向后,正数表示向前

```javascript
//后退一页
history.go(-1)

//前进一页
history.go(1)

//前进两页
history.go(2)
```

也可以给go方法传递一个字符串参数,此时浏览器会跳转到历史记录中包含该字符串的第一个位置---可能后退,也可能前进,具体要看哪个位置最近.如果历史记录中不包含该字符串,那么这个方法什么也不做

```javascript
//跳转到最近的wrox.com页面
history.go("wrox.com")
```

还可以使用两个简写方法`back()`和`forward()`来代替go().这两个方法不能传递参数

具体实践看[1.html](1.html)

history对象还有一个length属性,保存着历史记录的数量.这个数量包括所有历史记录,即所有向后和向前的记录.对于加载到窗口,标签页或者框架中的第一个页面而言,history.length等于1(书上是0,可是我在多个浏览器上尝试是1)

```javascript
if( history.length === 1 ){
    //这是用户打开窗口后第一个页面
}
```