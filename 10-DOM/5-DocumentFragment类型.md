###DocumentFragment
在所有节点类型中,只有DocumentFragment在文档中没有对应的标记.DOM规定文档片段(document fragment)是一种"轻量级"的文档,可以包含和控制节点,但不会像完整的文档那也占用额外的资源

####特征
- nodeType值为11
- nodeName值为#document-fragment
- nodeValue值为null
- parentNode值为null
- 子节点可以是Element,ProcessingInstruction,Comment,Text,CDATASection或EntityReference

虽然不能把文档片段直接添加到文档中,但可以将其作"仓库"使用

####创建文档片段及实例

```javascript
var oUl = document.getElementById('lists'),
    li = null,
    fragment = document.createDocumentFragment()

for(var i = 0; i < 3; i++){
    li = document.createElement('li')
    li.appendChild( document.createTextNode("item " + i) )
    fragment.appendChild( li )
}

oUl.appendChild( fragment )
```

####注意

- 文档片段本身永远不会成为文档树的一部分
- 当把文档片段中的所有子节点添加到文档树中的时候,文档片段中就不再有子节点
