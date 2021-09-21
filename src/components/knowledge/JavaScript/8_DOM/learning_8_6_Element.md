# 简介
Element节点对象对应网页的 HTML 元素。

# 实例属性
## 元素特性的相关属性
### Element.id
Element.id属性返回指定元素的id属性，该属性可读写。

### Element.tagName
Element.tagName属性返回指定元素的大写标签名，与nodeName属性的值相等。

### Element.dir
Element.dir属性用于读写当前元素的文字方向，可能是从左到右（"ltr"），也可能是从右到左（"rtl"）。

### Element.accessKey
Element.accessKey属性用于读写分配给当前元素的快捷键。

### Element.draggable
Element.draggable属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。

### Element.lang
Element.lang属性返回当前元素的语言设置。该属性可读写。

### Element.tabIndex
Element.tabIndex属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
tabIndex属性值如果是负值（通常是-1），则 Tab 键不会遍历到该元素。

### Element.title
Element.title属性用来读写当前元素的 HTML 属性title。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。

## 元素状态的相关属性
### Element.hidden
Element.hidden属性返回一个布尔值，表示当前元素的hidden属性，用来控制当前元素是否可见。该属性可读写。

### Element.contentEditable，Element.isContentEditable
HTML 元素可以设置contentEditable属性，使得元素的内容可以编辑。

### Element.attributes
Element.attributes属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点。

### Element.className，Element.classList
className属性用来读写当前元素节点的class属性。它的值是一个字符串，每个class之间用空格分割。

classList属性返回一个类似数组的对象，当前元素节点的每个class就是这个对象的一个成员。
classList对象有下列方法。
* add()：增加一个 class。
* remove()：移除一个 class。
* contains()：检查当前元素是否包含某个 class。
* toggle()：将某个 class 移入或移出当前元素。
* item()：返回指定索引位置的 class。
* toString()：将 class 的列表转为字符串。

### Element.dataset
网页元素可以自定义data-属性，用来添加数据。
```js
<div data-timestamp="1522907809292"></div>
```

Element.dataset属性返回一个对象，可以从这个对象读写data-属性。
```js
//   id="foo"
//   data-columns="3"
//   data-index-number="12314"
//   data-parent="cars">
//   ...
// </article>
var article = document.getElementById('foo');
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

### Element.innerHTML
Element.innerHTML属性返回一个字符串，等同于该元素包含的所有 HTML 代码。
该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括<HTML>和<body>元素。

### Element.outerHTML
Element.outerHTML属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。
outerHTML属性是可读写的，对它进行赋值，等于替换掉当前元素。

### Element.clientHeight，Element.clientWidth
Element.clientHeight属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。如果块级元素没有设置 CSS 高度，则返回实际高度。

除了元素本身的高度，它还包括padding部分，但是不包括border、margin。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

Element.clientWidth属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和padding，如果有垂直滚动条，还要减去垂直滚动条的宽度。

document.documentElement的clientHeight属性，返回当前视口的高度（即浏览器窗口的高度），等同于window.innerHeight属性减去水平滚动条的高度（如果有的话）。document.body的高度则是网页的实际高度。一般来说，document.body.clientHeight大于document.documentElement.clientHeight。

### Element.clientLeft，Element.clientTop
Element.clientLeft属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的padding和margin。如果没有设置左边框，或者是行内元素（display: inline），该属性返回0。该属性总是返回整数值，如果是小数，会四舍五入。

Element.clientTop属性等于网页元素顶部边框的宽度（单位像素），其他特点都与clientLeft相同。

### Element.scrollHeight，Element.scrollWidth
Element.scrollHeight属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before或::after）的高度。

Element.scrollWidth属性表示当前元素的总宽度（单位像素），其他地方都与scrollHeight属性类似。这两个属性只读。

整张网页的总高度可以从document.documentElement或document.body上读取。
```js
// 返回网页的总高度
document.documentElement.scrollHeight
document.body.scrollHeight
```

注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，scrollHeight属性仍然返回元素的总高度。
```js
// HTML 代码如下
// <div id="myDiv" style="height: 200px; overflow: hidden;">...<div>
document.getElementById('myDiv').scrollHeight // 356
```

### Element.scrollLeft，Element.scrollTop
Element.scrollLeft属性表示当前元素的水平滚动条向右侧滚动的像素数量，Element.scrollTop属性表示当前元素的垂直滚动条向下滚动的像素数量。
对于那些没有滚动条的网页元素，这两个属性总是等于0。

### Element.offsetParent
Element.offsetParent属性返回最靠近当前元素的、并且 CSS 的position属性不等于static的上层元素。

该属性主要用于确定子元素位置偏移的计算基准，Element.offsetTop和Element.offsetLeft就是offsetParent元素计算的。
如果该元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回null。

### Element.offsetHeight，Element.offsetWidth
Element.offsetHeight属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。

Element.offsetWidth属性表示元素的 CSS 水平宽度（单位像素），其他都与Element.offsetHeight一致。

这两个属性都是只读属性，只比Element.clientHeight和Element.clientWidth多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如display: none;），则返回0。

### Element.offsetLeft，Element.offsetTop
Element.offsetLeft返回当前元素左上角相对于Element.offsetParent节点的水平位移，Element.offsetTop返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

### Element.style
每个元素节点都有style用来读写该元素的行内样式信息。

### Element.children，Element.childElementCount
Element.children属性返回一个类似数组的对象（HTMLCollection实例），包括当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员。

Element.childElementCount属性返回当前元素节点包含的子元素节点的个数，与Element.children.length的值相同。

### Element.firstElementChild，Element.lastElementChild
Element.firstElementChild属性返回当前元素的第一个元素子节点，Element.lastElementChild返回最后一个元素子节点。

如果没有元素子节点，这两个属性返回null。

### Element.nextElementSibling，Element.previousElementSibling
Element.nextElementSibling属性返回当前元素节点的后一个同级元素节点，如果没有则返回null。

Element.previousElementSibling属性返回当前元素节点的前一个同级元素节点，如果没有则返回null。

# 实例方法
## 属性相关方法
元素节点提供六个方法，用来操作属性。
* getAttribute()：读取某个属性的值
* getAttributeNames()：返回当前元素的所有属性名
* setAttribute()：写入属性值
* hasAttribute()：某个属性是否存在
* hasAttributes()：当前元素是否有属性
* removeAttribute()：删除属性

## Element.querySelector()
Element.querySelector方法接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回null。

## Element.querySelectorAll()
Element.querySelectorAll方法接受 CSS 选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素。

## Element.getElementsByClassName()
Element.getElementsByClassName方法返回一个HTMLCollection实例，成员是当前元素节点的所有具有指定 class 的子元素节点。

## Element.getElementsByTagName()
Element.getElementsByTagName()方法返回一个HTMLCollection实例，成员是当前节点的所有匹配指定标签名的子元素节点。

## Element.closest()
Element.closest方法接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。

## Element.matches()
Element.matches方法返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器。

## Element.scrollIntoView()
Element.scrollIntoView方法滚动当前元素，进入浏览器的可见区域，类似于设置window.location.hash的效果。
```js
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
```
该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

## Element.getBoundingClientRect()
Element.getBoundingClientRect方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。

方法返回对象，具有以下属性（全部为只读）。
* x：元素左上角相对于视口的横坐标
* y：元素左上角相对于视口的纵坐标
* height：元素高度
* width：元素宽度
* left：元素左上角相对于视口的横坐标，与x属性相等
* right：元素右边界相对于视口的横坐标（等于x + width）
* top：元素顶部相对于视口的纵坐标，与y属性相等
* bottom：元素底部相对于视口的纵坐标（等于y + height）

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window.scrollX，top属性加上window.scrollY。

注意，getBoundingClientRect方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 + padding + border。

上面的这些属性，都是继承自原型的属性，Object.keys会返回一个空数组，这一点也需要注意。

## Element.getClientRects()
Element.getClientRects方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的Rect用的是复数）。每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

对于盒状元素（比如<div>和<p>），该方法返回的对象中只有该元素一个成员。对于行内元素（比如<span>、<a>、<em>），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和Element.getBoundingClientRect()方法的主要区别，后者对于行内元素总是返回一个矩形。

## Element.insertAdjacentElement()
Element.insertAdjacentElement方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回null。
```js
element.insertAdjacentElement(position, element);
```

Element.insertAdjacentElement方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。
* beforebegin：当前元素之前
* afterbegin：当前元素内部的第一个子节点前面
* beforeend：当前元素内部的最后一个子节点后面
* afterend：当前元素之后

beforebegin和afterend这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。

## Element.insertAdjacentHTML()，Element.insertAdjacentText() 
Element.insertAdjacentHTML方法用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置。
```js
element.insertAdjacentHTML(position, text);
```
position的取值和Element.insertAdjacentElement()方法相同。

该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比innerHTML方法快得多。

该方法不会转义 HTML 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。

## Element.remove()
Element.remove方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。

## Element.focus()，Element.blur()
Element.focus方法用于将当前页面的焦点，转移到指定元素上。
该方法可以接受一个对象作为参数。参数对象的preventScroll属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。
```js
function getFocus() {
  document.getElementById('btn').focus({preventScroll:false});
}
```

Element.blur方法用于将焦点从当前元素移除。

## Element.click()
Element.click方法用于在当前元素上模拟一次鼠标点击，相当于触发了click事件。


