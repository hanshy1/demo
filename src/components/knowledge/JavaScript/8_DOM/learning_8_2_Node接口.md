# 属性
## Node.prototype.nodeType
nodeType属性返回一个整数值，表示节点的类型。

不同节点的nodeType属性值和对应的常量如下。
* 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
* 元素节点（element）：1，对应常量Node.ELEMENT_NODE
* 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
* 文本节点（text）：3，对应常量Node.TEXT_NODE
* 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
* 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
* 注释节点（Comment）：8，对应常量Node.COMMENT_NODE

## Node.prototype.nodeName
nodeName属性返回节点的名称。

不同节点的nodeName属性值如下。
* 文档节点（document）：#document
* 元素节点（element）：大写的标签名
* 属性节点（attr）：属性的名称
* 文本节点（text）：#text
* 文档片断节点（DocumentFragment）：#document-fragment
* 文档类型节点（DocumentType）：文档的类型
* 注释节点（Comment）：#comment

## Node.prototype.nodeValue
nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。
同样的，也只有这三类节点可以设置nodeValue属性的值，其他类型的节点设置无效。

## Node.prototype.textContent
textContent属性返回当前节点和它的所有后代节点的文本内容。

## Node.prototype.baseURI
baseURI属性返回一个字符串，表示当前网页的绝对路径。

## Node.prototype.ownerDocument
Node.ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。

## Node.prototype.nextSibling
Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null。

## Node.prototype.previousSibling
previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。

## Node.prototype.parentNode
parentNode属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

## Node.prototype.parentElement
parentElement属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null。

## Node.prototype.firstChild，Node.prototype.lastChild
firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。

## Node.prototype.childNodes
childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。

## Node.prototype.isConnected
isConnected属性返回一个布尔值，表示当前节点是否在文档之中。

# 方法
## Node.prototype.appendChild()
appendChild()方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

## Node.prototype.hasChildNodes()
hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点。

## Node.prototype.cloneNode()
cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

## Node.prototype.insertBefore()
insertBefore方法用于将某个节点插入父节点内部的指定位置。
insertBefore方法接受两个参数，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode。

## Node.prototype.removeChild()
removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

## Node.prototype.replaceChild()
replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。

## Node.prototype.contains()
contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。
* 参数节点为当前节点。
* 参数节点为当前节点的子节点。
* 参数节点为当前节点的后代节点。

## Node.prototype.compareDocumentPosition()
compareDocumentPosition方法的用法，与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系。

## Node.prototype.isEqualNode()，Node.prototype.isSameNode()
isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

## Node.prototype.normalize()
normalize方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。

## Node.prototype.getRootNode()
getRootNode()方法返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同。