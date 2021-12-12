# Error实例对象
JS原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
```js
var err = new Error('出错了');
err.message // "出错了"
```

JS标准只提到，Error对象必须拥有message属性,大多数 JavaScript 引擎，对Error实例还提供name和stack属性，但不是每个引擎都有。
* message：错误提示信息
* name：错误名称（非标准属性）
* stack：错误的堆栈（非标准属性）

# 原生错误类型
JS定义了6种基于Error派生的错误对象。

## SyntaxError 对象
SyntaxError对象是解析代码时发生的语法错误。
```js
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```
语法解析阶段就能发现的错误。

## ReferenceError 对象
ReferenceError对象是引用一个不存在的变量时发生的错误。
使用一个不存在的变量。
将一个值分配给无法分配的对象，比如对函数的运行结果赋值。
```js
// 使用一个不存在的变量
unknownVariable // Uncaught ReferenceError: unknownVariable is not defined

// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment
```

## RangeError 对象
RangeError对象是一个值超出有效范围时发生的错误。
主要有几种情况，一是数组长度越界，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
```js
// 数组长度不得为负数
new Array(-1) // Uncaught RangeError: Invalid array length
new Array(Math.pow(2, 32)) // Uncaught RangeError: Invalid array length
```

## TypeError 对象
TypeError对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误。
```js
new 123 // Uncaught TypeError: 123 is not a constructor

var obj = {};
obj.unknownMethod() // Uncaught TypeError: obj.unknownMethod is not a function
```

## URIError 对象
URIError对象是 URI 相关函数的参数不正确时抛出的错误。
主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
```js
decodeURI('%2') // URIError: URI malformed
```

## EvalError 对象
eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

## 总结
以上这6种派生错误，连同原始的Error对象，都是构造函数。
开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息（message）。
```js
var err1 = new Error('出错了！');
var err2 = new RangeError('出错了，变量超出有效范围！');
var err3 = new TypeError('出错了，变量类型无效！');

err1.message // "出错了！"
err2.message // "出错了，变量超出有效范围！"
err3.message // "出错了，变量类型无效！"
```

# 自定义错误
```js
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

new UserError('custom error message');
```
在自定义错误构造器中定义message属性，并且继承Error对象。

# throw语句
throw语句的作用是手动中断程序执行，抛出一个错误。

throw可以抛出任何类型的值。对于 JavaScript 引擎来说，遇到throw语句，程序就中止了。引擎会接收到throw抛出的信息，可能是一个错误实例，也可能是其他类型的值。

# try...catch结构，finally语句
JS提供了try...catch结构，允许对错误进行处理。

try代码块抛出的错误，被catch代码块捕获后，程序会继续向下执行。
```js
try {
    throw new Error(1)
} catch(e) {
    console.log(e)
} finally {
    console.log('finally')
}
```

finally代码块中的语句不管是否出现错误，都在最后执行。
```js
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```


