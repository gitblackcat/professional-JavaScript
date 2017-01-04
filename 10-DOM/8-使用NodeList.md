NodeList,NamedNodeMap和HTMLCollection是从整体上透彻理解DOM的关键所在.且这三个集合都是"动态的";换句话说,每当文档结构发生变化,它们都会得到更新.从本质上讲,所有NodeList对象都是在访问DOM文档时实时运行的查询

一下代码因为NodeList是"动态的",所以会是一个死循环

```javascript
var aDiv = document.getElementsByTagName("div")

for(var i=0; i<aDiv.length; i++){
    var oDiv = document.createElement("div")
    oDiv.appendChild( document.createTextNode(i) )
    document.body.appendChild( oDiv )
}
```

每次循环都要对条件`i < aDiv.length`求值,这意味着每次查询后,aDiv.length都是最新的,都是递增的.

如果想要迭代一个NodeList,最好是使用length属性初始化第二个变量,然后将迭代器与该变量进行比较

```javascript
var aDiv = document.getElementsByTagName("div"),
    i,
    len,
    oDiv

for( i = 0,len = aDiv.length; i < len; i++ ){
    oDiv = document.createElement("div")
    document.body.appendChild( oDiv )
}
```

**_理解DOM的关键,就是理解DOM对性能的影响.DOM操作往往是JS程序中开销最大的部分,而因访问NodeList导致的问题为最多.NodeList对象都是"动态的",这就意味着每次访问NodeList对象,都会运行一次查询.所以,最好尽量减少DOM操作_**