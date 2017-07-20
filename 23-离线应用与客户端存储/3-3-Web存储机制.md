###Web存储机制
`Web Storage`的目的是克服有cookie带来的一些限制,当数据需要被严格控制在客户端上时,无须持续将数据发送回服务器.`Web Storage`的两个主要目标是:

- 提供一种在cookie之外存储会话数据的途径
- 提供一种存储大量可以跨会话存在的数据的机制

####Storage类型
Storage类型提供最大的存储空间(因浏览器而异)来存储名值对.Storage的实例与其他对象类似,有如下方法:

- clear(): 删除所有值;Firefox中没有实现
- key(index): 获得index位置处的值的名字(key有问题,当我第一次进行name1的存储,第二次进行name2的存储,那么我的key(0)未必是name1,因浏览器而异)
- getItem(name): 根据指定的名称name获取对应的值.也可以`xxStorage['name']`
- removeItem(name): 删除由name指定的名值对.也可以`delete xxStorage['name']`
- setItem(name,value): 为指定的name设置一个对应的值.也可以`xxStorage['name'] = 'xxx'`

**_Storage类型只能存储字符串.非字符串的数据在存储之前会被转换成字符串_**

####sessionStorage对象
sessionStorage 是个全局对象,它维护着在页面会话(page session)期间有效的存储空间.只要浏览器开着,页面会话周期就会一直持续.当页面重新载入(reload)或者被恢复(restores)时,页面会话也是一直存在的.每在新标签或者新窗口中打开一个新页面,都会初始化一个新的会话

####globalStorage已废弃

####localStorage
`localStorage`对象在修订过的HTML5规范中作为持久保存客户端数据的方案取代了golbalStorage.与globalStroage不同,不能给localStorage指定任何访问规则;规则事先就设定好了.要访问同一个localStorage对象,页面必须**_来自同一个域名(子域名无效),使用同一种协议,在同一个端口上_**

删除存储在localStorage中的数据的方法:

- 通过JS删除
- 用户清除浏览器缓存

####storage事件
理论上对storage进行任何操作(增删改),都会在文档上触发storage事件

该事件的event对象有以下属性:

- domain: 发生变化的存储空间的域名
- key: 设置或者删除的键名
- newValue: 如果是设置值,则是新值;如果是删除键,则为null
- oldValue: 键被更改之前的值

理论上很美好,不过在各大浏览器基本没被实现

