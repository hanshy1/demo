# 一、console对象
console对象是 JavaScript 的原生对象。console的常见用途有两个。
* 调试程序，显示网页代码运行时的错误信息。
* 提供了一个命令行接口，用来与网页代码互动。

# 二、console的静态方法
console对象提供的各种静态方法，用来与控制台窗口互动。

## 1. console.log()，console.info()，console.debug()
console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
```js
console.log('Hello World')
// Hello World
console.log('a', 'b', 'c')
// a b c

console.log(' %s + %s = %s', 1, 1, 2)
//  1 + 1 = 2
```
console.log方法支持以下占位符，不同类型的数据必须使用对应的占位符。
* %s 字符串
* %d 整数
* %i 整数
* %f 浮点数
* %o 对象的链接
* %c CSS 格式字符串

console.info是console.log方法的别名，用法完全一样。只不过console.info方法会在输出信息的前面，加上一个蓝色图标。  
console.debug方法与console.log方法类似，会在控制台输出调试信息。

## 2. console.warn()，console.error()
warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错。

## 3. console.table()
对于某些复合类型的数据，console.table方法可以将其转为表格显示。
```js
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);

var languages = {
  csharp: { name: "C#", paradigm: "object-oriented" },
  fsharp: { name: "F#", paradigm: "functional" }
};

console.table(languages);
```

## 4. console.count()
count方法用于计数，输出它被调用了多少次。

该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。
```js
console.count('a') // a: 1
console.count('a') // a: 2
```

## 5. console.dir()，console.dirxml()
dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。

dirxml方法主要用于以目录树的形式，显示 DOM 节点。

## 6. console.assert()
console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。  
它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。
```js
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (!false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}
```

## 7. console.time()，console.timeEnd()
这两个方法用于计时，可以算出一个操作所花费的准确时间。

## 8. console.group()，console.groupEnd()，console.groupCollapsed()
console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
```js
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束
```

## 9. console.trace()，console.clear()
console.trace方法显示当前执行的代码在堆栈中的调用路径。  
console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。

# 三、控制台命令行API
浏览器控制台中，除了使用console对象，还可以使用一些控制台自带的命令行方法

## 1. $_
\$_属性返回上一个表达式的值。
```js
2 + 2
// 4
$_
// 4
```

## 2. $0 - $4
控制台保存了最近5个在 Elements 面板选中的 DOM 元素，$0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。

## 3. $(selector)
\$(selector)返回第一个匹配的元素，等同于document.querySelector()。  
注意，如果页面脚本对$有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行$(selector)就会采用 jQuery 的实现，返回一个数组。

## 4. $$(selector)
\$$(selector)返回选中的 DOM 对象，等同于document.querySelectorAll()。

## 5. $x(path)
\$x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。
```js
$x("//p[a]") // 返回所有包含a元素的p元素。
```

## 6. inspect(object)
inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节。  
DOM 元素在Elements面板中显示，比如inspect(document)会在 Elements 面板显示document元素。  
JavaScript 对象在控制台面板Profiles面板中显示，比如inspect(window)。

## 7. getEventListeners(object)
getEventListeners(object)方法返回一个对象，该对象的成员为object登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。

## 8. keys(object)，values(object)
keys(object)方法返回一个数组，包含object的所有键名。  
values(object)方法返回一个数组，包含object的所有键值

## 9. monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
monitorEvents(object[, events])方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。
unmonitorEvents方法用于停止监听。
```js
monitorEvents(window, "resize");
monitorEvents(window, ["resize", "scroll"])

unmonitorEvents(window, 'resize')
```

monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。
* mouse："mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
* key："keydown", "keyup", "keypress", "textInput"
* touch："touchstart", "touchmove", "touchend", "touchcancel"
* control："resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

## 10. 其他方法
* clear(): 清空控制台消息。
* copy(object): 复制特定DOM元素到剪贴板。
* dir(object): 显示特定对象的所有属性，是console.dir()的别名。
* dirxml(object): 显示特定对象的XML形式，是console.dirxmml()的别名。

# 四、debugger 语句
debugger语句主要用于除错，作用是设置断点。  
如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。  
如果没有除错工具，debugger语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面。





