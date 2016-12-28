###DOM
DOM(�ĵ�����ģ��)�����HTML��XML�ĵ���һ��API(Ӧ�ó����̽ӿ�).�����֮,DOM�������Ϊһ�����ʻ����HTML���ֱ�ǩ��ʵ�ֱ�׼

**_IE�е�����DOM��������COM�������ʽʵ�ֵ�.����ζ��IE�е�DOM ������ԭ��JavaScript�������Ϊ���ص㲢��һ��_**

####�ڵ���
���Խ�һ���򵥵�HTML�ĵ���ʾΪһ����νṹ

```html
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <p>Hello World!</p>
    </body>
</html>
```

�ĵ��ڵ���ÿ���ĵ��ĸ��ڵ�.������������,�ĵ��ڵ�ֻ��һ��`�ӽڵ�`,��`<html>`Ԫ��,���ǳ�֮Ϊ`�ĵ�Ԫ��`.�ĵ�Ԫ�����ĵ��������Ԫ��,�ĵ��е���������Ԫ�ض��������ĵ�Ԫ����.ÿ���ĵ�ֻ�ܰ���һ���ĵ�Ԫ��.��HTMLҳ��,�ĵ�Ԫ��ʼ�ն���<html>Ԫ��.��XML��,û��Ԥ�����Ԫ��,����κ�Ԫ�ض����ܳ�Ϊ�ĵ�Ԫ��

����һ��HTML��˵,�ĵ��ڵ��ǿ�������.���ӲҪ����,��ֻ���뵽����ͼ��ʾ

![document-node](img/document-node.png)

####Node����

�ĵ����е�ÿ���ڵ㶼��12�ֽڵ������е�һ��,��Ԫ�ؼ�Ԫ�ؽڵ�,Ԫ���Ϲ��ص����Ծ������Խڵ�,������������:

![node-type1](img/node-type1.png)

![node-type2](img/node-type2.png)

![node-type3](img/node-type3.png)

�������Ͷ��̳���һ��������: DOM1��������һ��Node�ӿ�,�ýӿڽ���DOM�е����нڵ�����ʵ��.���Node�ӿ���JS������ΪNode����ʵ�ֵ�.**_����IE��,����������������ж����Է��ʵ��������_**.JS�����нڵ����Ͷ��̳���Node����(��ν�Ļ�����).������нڵ㶼������ͬ�Ļ������Ժͷ���

`obj.nodeType`�᷵��һ������,����ͼ���еĳ���,���������ڵ�����

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        var btn = document.querySelector('button')
        console.log( btn.nodeType ) //1
    </script>
</body>
</html>
```

���������������ͨ���Ƚϳ������жϽڵ�����,��ͨ���������жϽڵ�����ֻ�з�IE������ʹ���IE8�汾��IE�����

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        // IE8�����²�֧��

        var btn = document.querySelector('button')
        btn.nodeType === Node.ELEMENT_NODE ? alert('yes') : alert('no')

    </script>
</body>
</html>
```

#####nodeName/nodeValue
- nodeName

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        var btn = document.querySelector('button')
        if( btn.nodeType === 1 ){
            console.log( btn.nodeName.toLowerCase() ) //button
        }
    </script>
</body>
</html>
```

- nodeValue

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        var btn = document.querySelector('button')
        if( btn.nodeType === 1 ){
            console.log( btn.nodeValue ) //null
        }
    </script>
</body>
</html>
```

����Ԫ�ؽڵ���˵,nodeNameʼ�ձ���Ԫ�صı�ǩ��,nodeValue��ֵʼ����null

#####�ڵ��ϵ
ÿ���ڵ㶼��һ��`childNodes`����,������һ��`NodeList`����(������`{childNodes: NodeList}`).NodeList��һ�����������,���ڱ���һ������Ľڵ�

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        console.log(document.querySelector('body').childNodes)
    </script>
</body>
</html>
```

![childNodes](img/childNodes.png)

childNodes���������ڵ����ͨ��`������`����`item()`�ķ�ʽ������

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        var oBody = document.querySelector('body').childNodes
        console.log(oBody[3])
        console.log(oBody.item(3))
        console.log(oBody.length) //5
    </script>
</body>
</html>
```

��ӡЧ��ͼ:

![visit](img/visit.png)

��Ȼ����ͨ��������������NodeList��ֵ,�����������Ҳ��`length`����,����**_NodeList������Array��ʵ��_**

NodeList����Ķ���֮��������ʵ�����ǻ���DOM�ṹ��ִ̬�в�ѯ�Ľ��,���DOM�ṹ�ı仯�ܹ��Զ���ӳ��NodeList������.Ҳ����˵NodeList��ʱ�̷�ӳĳ���ڵ������µ��ӽڵ�ṹ���,���������ǵ�һ�η������ǵ�ĳ��˲������������һ�ſ���

ע��,��ȻNodeList�Ƕ�̬��ӳ�ڵ��,������length����ֻ��һ��˲��Ŀ��ն���

����Ҳ���԰�NodeList����ת��Ϊ����

`var arrNodes = Array.prototype.slice.call(someNode.childNodes,0)`

ÿ���ڵ㶼��һ��`parentNode`����,������ָ��ǰ�ڵ�ĸ��ڵ�.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>456</button>
    <script>
        var oBody = document.querySelector('body').childNodes
    </script>
</body>
</html>
```

![parentNode](img/parentNode.png)

������childNodes�б��е�ÿ���ڵ��໥֮�䶼��ͬ���ڵ�.ͨ��ʹ���б���ÿ���ڵ��`previousSibling`��`nextSibling`����,���Է���ͬһ���б��е������ڵ�.�б��е�һ���ڵ��previousSibling����ֵΪnull,�б������һ���ڵ��nextSibling����ֵΪnull.

![brotherNode](img/brotherNode.png)

![relationship](img/relationship.jpg)

- hasChildNodes()

�÷����ڽڵ��������һ���ӽڵ������·���true,�Ƽ�ʹ�ø÷���������ض��ڵ��Ƿ�����ӽڵ�,��������length����

- ownerDocument()

������ϵ��ĵ��ڵ�

####�����ڵ�
- appendChild()

appendChild()������childNodes�б��ĩβ���һ���ڵ�.��ӽڵ��,childNodes�������ڵ�,���ڵ��Լ���ǰ�����һ���ӽڵ�Ĺ�ϵָ�붼����Ӧ�õ�����.�������,appendChild()���������ڵ�

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script>
        window.onload = function(){
            var oDiv1 = document.createElement('div')
            oDiv1.innerHTML = '123'
            var oDiv2 = document.querySelector('body').appendChild(oDiv1)
            console.log(oDiv2 === oDiv1) //true
        }
    </script>
</head>
<body>

</body>
</html>
```

�������appendChild()�еĽڵ����ĵ����Ѿ��еĽڵ�,��ô������ǽ��ýڵ��ԭ����λ��ת�Ƶ���λ��.�κ�DOM�ڵ㲻��ͬʱ�������ĵ��еĶ��λ��.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script>
        window.onload = function(){
            var oDiv2 = document.querySelector('.div2'),
                oBox1 = document.querySelector('.box1')

            oBox1.appendChild(oDiv2)
        }
    </script>
</head>
<body>
    <div class="box1">
        <div class="box2">box2</div>
    </div>
    <div class="div1">
        <div class="div2">div2</div>
    </div>
</body>
</html>
```

![appendChild](img/appendChild.png)

��ͼ��ʾ,ԭ��Ӧ����div1�е�div2��ת�Ƶ���box1����





