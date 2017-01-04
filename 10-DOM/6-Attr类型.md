###Attr类型
元素的特性在DOM中以Attr类型来表示

####特征
- nodeType值为2
- nodeName值为特性名称
- nodeValue值为特性值
- parentNode值为null
- 在HTML中不支持(没有)子节点

尽管特性是节点,但特性却不被认为是DOM文档树的一部分

Attr对象有3个属性: 
- name: 特性名称
- value: 特性值
- specified: 是一个布尔值,用于区别特性是代码中指定的还是默认的

####创建特性节点

```javascript
var element = document.getElementById("myDiv");
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);

alert(element.attributes["align"].value);       //"left"
alert(element.getAttributeNode("align").value); //"left"
alert(element.getAttribute("align"));           //"left"
```
