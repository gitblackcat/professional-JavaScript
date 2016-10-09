- 由ECMA-262定义的ECMAScript与Web浏览器是没有依赖关系的

- ECMAScript本身并不包含输入和输出定义，它只规定了组成部分：语法、类型、语句、关键字、保留字、操作符、对象

- ECMAScript和JavaScript之间的关系
    
    - Javascript只不过是为了操作Web，而在ECMAScript的基础上进行了符合ECMAScript规定组成部分内容的扩展，比如DOM，利用了ECMAScript的核心类型和语法提供更多更具体的功能

    - 从这样看来，Web浏览器只不过是ECMAScript的宿主环境而已，其他宿主环境包括Node和Adobe Flash