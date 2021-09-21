# 概述
document节点代表整个文档，每张网页都有自己的document对象。
window.document属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

document对象有不同的办法可以获取。
* 正常的网页，直接使用document或window.document。
* iframe框架里面的网页，使用iframe节点的contentDocument属性。
* Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
* 内部节点的ownerDocument属性。

document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。这意味着，这些接口的方法都可以在document对象上调用。除此之外，document对象还有很多自己的属性和方法。

# 属性
## 快捷方式属性
### document.defaultView
document.defaultView属性返回document对象所属的window对象。如果当前文档不属于window对象，该属性返回null。
```js
document.defaultView === window // true
```

### document.doctype
对于 HTML 文档来说，document对象一般有两个子节点。第一个子节点是document.doctype，指向<DOCTYPE>节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成<!DOCTYPE html>。如果网页没有声明 DTD，该属性返回null。
```js
var doctype = document.doctype;
doctype // "<!DOCTYPE html>"
doctype.name // "html"
```

### document.documentElement
document.documentElement属性返回当前文档的根元素节点（root）。它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。HTML网页的该属性，一般是<html>节点。

### document.body，document.head
document.body属性指向<body>节点，document.head属性指向<head>节点。

这两个属性总是存在的，如果网页源码里面省略了<head>或<body>，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

### document.scrollingElement
document.scrollingElement属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。

标准模式下，这个属性返回的文档的根元素document.documentElement（即<html>）。兼容（quirk）模式下，返回的是<body>元素，如果该元素不存在，返回null。
```js
// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;
```

### document.activeElement
document.activeElement属性返回获得当前焦点（focus）的 DOM 元素。通常，这个属性返回的是<input>、<textarea>、<select>等表单元素，如果当前没有焦点元素，返回<body>元素或null。

### document.fullscreenElement
document.fullscreenElement属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null。

## 节点集合属性
以下属性返回一个HTMLCollection实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

### document.links
document.links属性返回当前文档所有设定了href属性的<a>及<area>节点。
```js
// 打印文档所有的链接
var links = document.links;
for(var i = 0; i < links.length; i++) {
  console.log(links[i]);
}
```

### document.forms
document.forms属性返回所有<form>表单节点。
```js
var selectForm = document.forms[0];
```

除了使用位置序号，id属性和name属性也可以用来引用表单。
```js
/* HTML 代码如下
  <form name="foo" id="bar"></form>
*/
document.forms[0] === document.forms.foo // true
document.forms.bar === document.forms.foo // true
```

### document.images
document.images属性返回页面所有<img>图片节点。
```js
var imglist = document.images;
```

### document.embeds，document.plugins
document.embeds属性和document.plugins属性，都返回所有<embed>节点。

### document.scripts
document.scripts属性返回所有<script>节点。
```js
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
```

### document.styleSheets
document.styleSheets属性返回网页内嵌或引入的 CSS 样式表集合。

## 文档静态信息属性
### document.documentURI，document.URL
document.documentURI属性和document.URL属性都返回一个字符串，表示当前文档的网址。
不同之处是它们继承自不同的接口，documentURI继承自Document接口，可用于所有文档；URL继承自HTMLDocument接口，只能用于 HTML 文档。
```js
document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
```

### document.domain
document.domain属性返回当前文档的域名，不包含协议和端口。
网页的网址是http://www.example.com:80/hello.html，那么document.domain属性就等于www.example.com。如果无法获取域名，该属性返回null。

### document.location
Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。
通过window.location和document.location属性，可以拿到这个对象。

### document.lastModified
document.lastModified属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的。

### document.title
document.title属性返回当前文档的标题。默认情况下，返回<title>节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。

### document.characterSet
document.characterSet属性返回当前文档的编码，比如UTF-8、ISO-8859-1等等。

### document.referrer
document.referrer属性返回一个字符串，表示当前文档的访问者来自哪里。
```js
document.referrer
// "https://example.com/path"
```

### document.dir
document.dir返回一个字符串，表示文字方向。它只有两个可能的值：rtl表示文字从右到左，阿拉伯文是这种方式；ltr表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。

### document.compatMode
compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。
一般来说，如果网页代码的第一行设置了明确的DOCTYPE（比如<!doctype html>），document.compatMode的值都为CSS1Compat。

## 文档状态属性
### document.hidden
document.hidden属性返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document.hidden返回true。

### document.visibilityState
document.visibilityState返回文档的可见状态。
它的值有四种可能。
* visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
* hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
* prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。
* unloaded：页面从内存里面卸载了。

### document.readyState
document.readyState属性返回当前文档的状态，共有三种可能的值。
* loading：加载 HTML 代码阶段（尚未完成解析）
* interactive：加载外部资源阶段
* complete：加载完成

这个属性变化的过程如下。
* 浏览器开始解析 HTML 文档，document.readyState属性等于loading。
* 浏览器遇到 HTML 文档中的<script>元素，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是等于loading。
* HTML 文档解析完成，document.readyState属性变成interactive。
* 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document.readyState属性变成complete。* 

### document.cookie
document.cookie属性用来操作浏览器 Cookie

### document.designMode
document.designMode属性控制当前文档是否可编辑。该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容。

### document.currentScript
document.currentScript属性只用在<script>元素的内嵌脚本或加载的外部脚本之中，返回当前脚本所在的那个 DOM 节点，即<script>元素的 DOM 节点。

### document.implementation
document.implementation属性返回一个DOMImplementation对象。
该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。
* DOMImplementation.createDocument()：创建一个 XML 文档。
* DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
* DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。

# 方法
## document.open()，document.close()
document.open方法清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容。

document.close方法用来关闭document.open()打开的文档。
```js
document.open();
document.write('hello world');
document.close();
```

## document.write()，document.writeln()
document.write方法用于向当前文档写入内容。

在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行document.close()），document.write写入的内容就会追加在已有内容的后面。

## document.querySelector()，document.querySelectorAll()
document.querySelector方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null。

document.querySelectorAll方法与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点。

但是，它们不支持 CSS 伪元素的选择器（比如:first-line和:first-letter）和伪类的选择器（比如:link和:visited），即无法选中伪元素和伪类。

## document.getElementsByTagName()
document.getElementsByTagName()方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（HTMLCollection实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。

## document.getElementsByClassName()
document.getElementsByClassName()方法返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中。

## document.getElementsByName()
document.getElementsByName()方法用于选择拥有name属性的 HTML 元素（比如<form>、<radio>、<img>、<frame>、<embed>和<object>等），返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个。

## document.getElementById()
document.getElementById()方法返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回null。

## document.elementFromPoint()，document.elementsFromPoint()
document.elementFromPoint()方法返回位于页面指定位置最上层的元素节点。
```js
var element = document.elementFromPoint(50, 50);
```
elementFromPoint方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回null。

document.elementsFromPoint()返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

## document.createElement()
document.createElement方法用来生成元素节点，并返回该节点。
```js
var newDiv = document.createElement('div');
```
createElement方法的参数为元素的标签名，即元素节点的tagName属性，对于 HTML 网页大小写不敏感，即参数为div或DIV返回的是同一种节点。如果参数里面包含尖括号（即<和>）会报错。

可以创建自定义标签元素。

## document.createTextNode()
document.createTextNode方法用来生成文本节点（Text实例），并返回该节点。它的参数是文本节点的内容。

## document.createAttribute()
document.createAttribute方法生成一个新的属性节点（Attr实例），并返回它。

## document.createComment()
document.createComment方法生成一个新的注释节点，并返回该节点。

## document.createDocumentFragment()
document.createDocumentFragment方法生成一个空的文档片段对象（DocumentFragment实例）。

## document.createEvent()
document.createEvent方法生成一个事件对象（Event实例），该对象可以被element.dispatchEvent方法使用，触发指定事件。

## document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
添加监听，移除监听，发布事件

## document.hasFocus()
document.hasFocus方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

## document.adoptNode()，document.importNode()
document.adoptNode方法将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点。

## document.createNodeIterator()
document.createNodeIterator方法返回一个子节点遍历器。

## document.createTreeWalker()
document.createTreeWalker方法返回一个 DOM 的子树遍历器。

## document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()














