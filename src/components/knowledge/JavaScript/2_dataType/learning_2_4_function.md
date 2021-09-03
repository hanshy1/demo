# 函数
## 概述
### 函数的声明
JS有三种声明函数的方法。

1. function 命令
function命令声明的代码区块，就是一个函数。
```js
function func(params) {
    console.log('hello world!');
}
```
这就叫做函数的声明（Function Declaration）。

2. 函数表达式
除了用function命令声明函数，还可以采取变量赋值的写法。
```js
var func = function(params) {
    console.log('hello world!');
}
```
这种写法将一个匿名函数赋值给变量。因为赋值语句的等号右边只能写表达式，所以此时这个匿名函数又称为函数表达式
（Function Expression）。

采用函数表达式声明函数时，function后面不带有函数名。如果加了函数名，此函数名只在函数体内部有效。
```js
var func = function f(params) {
    console.log(typeof f);
};

f // ReferenceError: f is not defined
func() // function
```
这种写法的用处有两个。一是可以在函数体内部调用自身；二是方便调试（调试工具显示函数调用栈时，将显示函数名，而不再显示
这里是一个匿名函数）。

需要注意的是，函数的表达式需要在语句的结尾加上分号，表示语句结束。而函数的声明在结尾的大括号后面不用加分号。

3. Function()构造函数
使用Function构造函数。
```js
var func = new Function('x', 'y', 'return x + y');

// 等同于
function func(x, y) {
    return x + y;
}
```
构造函数中，除了最后一个参数是函数体，前几个参数都是func函数的参数。

Function构造函数可以不使用new，返回结果完全一样。
但是这种方式声明函数的方式非常不直观，几乎不会使用。

### 函数的重复声明
如果同一个函数被多次声明，后面的声明就会覆盖前面的声明。（函数名的提升）

### （万物皆对象，函数是第一等公民）
JS将函数看作是一种值，与其他原始数据类型（数值、字符串、布尔值）。
凡是可以用值的地方，就能使用函数。比如可以把函数赋给其他变量或者对象的属性，也可以用函数当作参数或者返回值。

由于函数与其他数据类型地位平等，所以在JS语言中又称函数为第一等公民。

### 函数声明的提升
JS引擎将函数名视同变量名，所以采用function命令声明函数时，会像变量名一样，将函数声明提升到代码头部。
```js
f() // 不会报错
function f() {}
```

如果使用函数表达式的形式，将函数赋值给一个变量，则不会发生函数声明的提升，只有变量名提升。
```js
f() // undefined is not a function 

var f = function() {};
```
由于变量名提升，变量f的声明提升，但是此时f未被赋值，所以f是undefined。

同时使用函数声明和函数表达式的情况：
```js
var f = function() {
    console.log(1)
};

function f() {
    console.log(2)
}

f() // 1
```
此时由于函数声明提升，后一个声明被前一个函数表达式的赋值给覆盖了。

## 函数的属性和方法
### name属性
name属性返回函数的名字。
如果是通过变量赋值定义的匿名函数，那么name返回变量的名字。
如果是通过变量赋值定义的具名函数，那么name返回function命令后的函数名。

### length属性
length属性返回函数预期参数的个数。
```js
function f1(a, b) {}
f1.length // 2

function f2(a, ...b) {}]
f2.length // 1
```
length属性提供了一种机制，判断函数调用时和定义时传入参数数量的差异，以便实现面向对象编程时的“方法重载”（overload）。

### toString()
toString()方法返回一个字符串，内容是函数的源码，函数的注释也会返回，并且保留换行符。

对于JS中的原生函数，toString()方法返回 function name() { [native code] }。
```js
Object.assign.toString() // "function assign() { [native code] }"
```

## 函数作用域
作用域（scope）指的是变量存在的范围。

ES5中，JS只有两种作用域：
* 一种是全局作用域，变量在整个代码上下文环境中一直存在，所有地方都可以读取；
* 另一种是函数作用域，变量只在函数内部存在。

ES6新增了块级作用域。

对于顶层函数来说，函数外部声明的变量就是全局变量（global variable），它可以在函数内部读取。
```js
var v = 1;

function f() {
  console.log(v);
}

f() // 1
```

在函数内部定义的变量，外部无法读取，称为局部变量（local variable）。
```js
function f() {
    var v = 1;
}

v // v is not defined
```

函数内部用var定义的变量，会在该函数作用域内覆盖同名的全局变量。
```js
var x = 1;
function f() {
    var x = 2;
    console.log(x);
}

f() // 2
```

对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量 。
```js
if (true) {
    var x = 1;
}

x // 1
```

### 函数内部的变量提升
在函数内部也会发生变量提升的行为，通过var声明的变量，无论在那个位置，变量声明都会被提升到函数体头部。

### 函数本身的作用域
函数本身也是一个值，也有自己的作用域。它的作用域和变量一样，就是其声明时所在的作用域，与其调用时的作用域无关。
```js
var a = 1;
var x = function () {
    console.log(a);
};

function f() {
    var a = 2;
    x();
}

f() // 1
```
函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

同样的，函数体内部声明的函数，作用域绑定在函数体内部。
```js
function foo() {
    var x = 1;
    function bar() {
        consoel.log(x);
    }
    return bar;
}

var x = 2;
var f = foo();
f() // 1
```

## 函数的参数
### 参数的省略
JS允许省略函数的参数，但是没有办法省略靠前的参数，保留靠后的参数。如果想这样做，只能显式的传入undefined。
被省略的参数值使用时为undefined。

### 参数传递方式
函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是按值传递（passed by value）。这意味着在函数体内修改参数值，不会影响到函数外部。在函数内部，p的值是原始值的拷贝。
```js
var p = 2;

function f(p) {
  p = 3;
}

f(p);

p // 2
```

但是，如果函数参数是复合类型的值（数组、对象、函数），传递方式是按引用传递（passed by reference）。也就是说，传入参数的内存地址，因此在函数内部修改，会影响到原始参数值。
```js
var obj = { p: 1 };

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2
```

如果函数内部修改的不是参数对象的某个属性，而是给参数重新赋值，则不会影响原始参数值。
```js
var arr = [1, 2, 3];

function f(o) {
  o = [2, 3, 4];
}
f(arr);

arr // [1, 2, 3]
```

### 同名参数
如果有同名的参数，则取最后出现的那个值，即使后一个参数值没有被赋值，也以其为准。
```js
function f1(a, a) {
    console.log(a);
}

f1(1, 2) // 2
f1(1) // undefined
```

### arguments对象
1. arguments对象包含的函数运行时的所有参数。arguments[0]代表第一参数，依次类推。anguments只能在函数内部使用。
```js
var f = function () {
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}

f(1, 2, 3) 
// 1
// 2
// 3
```

2. arguments对象可以在运行时修改传入参数。但严格模式下，修改arguments对象不会影响传入参数。
```js
var f1 = function(a, b) {
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
};

f1(1, 1) // 5

var f2 = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
};

f2(1, 1) // 2
```

3. 通过arguments的length属性，可以判断函数调用时到底传了几个参数。
```js
function f() {
    console.log(arguments.length)
}

f(1, 2, 3) // 3
```
4. arguments看起来像是数组，但其实是个对象，键名为数字。

5. 通过arguments.callee属性，可以获得原函数。
```js
var f = function () {
    console.log(arguments.callee == f)
}

f() // true
```
但这个属性在严格模式下是禁用的，所以不推荐使用。

## 其他
### 闭包
闭包（closure）是JS的一个特色。
闭包通过JS中的函数作用域实现。ES5中，JS有两种作用域：全局作用域和函数作用域。
在函数中用var声明的变量，具有函数作用域，在函数外无法被读取。但是可以通过在函数内在定义一个函数读取外层函数作用域的变量。
```js
function f1(x) {
    return function f2 () {
        x += 1;
        console.log(x);
    }
}

var func = f1(0);
func() // 1
func() // 2
```
由于f2在f1中定义，所以f1中的所有局部变量对f2都是可见的，但是反过来不行，f1不能读取f2中定义的局部变量。
这就是JS中的链式作用域（chain scope），子对象会一级一级的向上寻找父对象的变量。所以父对象的所有变量对子对象都是可见的，反之不成立。

闭包就是函数f2，即能够读取其他函数局部变量的函数。闭包最大的特点，就是它能记住它“诞生的环境”。比如f2记住了它的诞生环境f1，所以f2可以得到f1的内部变量。
本质上，闭包是将函数内部和函数外部联系起来的一座桥梁（可以在函数外部访问函数内部变量）。

闭包最大的用处有两个。
* 可以读取外部函数的局部变量。
* 可以将这些变量始终保持在内存中，即闭包的诞生环境会一直存在。

由于闭包用到了外层函数的变量，导致外层函数一直不能从内存中被释放。只要闭包没有被垃圾回收机制清除，外层函数提供的运行环境也不会被清除，它的内部变量就会保存着当前值，供闭包读取。

闭包的另一个用处，是封装对象的私有属性和私有方法。
```js
function Person(name) {
    var _age; // 私有属性
    function getAge() { // 公有方法
        return _age;
    }
    function setAge(age) {
        _age = age;
    }

    return {
        name: name, // 公有属性
        getAge: getAge， // 公有方法
        setAge: setAge，
    }
}

var p = Person('Jack')
p._age // undefined
p.name // Jack
p.getAge() // undefined
p.setAge(11)
p.getAge() // 11
```

每一次外部函数f2执行，都会产生一个新的闭包，而这个闭包会保留外部函数的局部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成性能问题。

### 立即调用表达式（IIFE）
function表达式会被JS引擎当做一个值，函数表达式后加上圆括号()可以立即调用函数。
```js
var func = function () { console.log(1) } (); // 1
```

但是不能在函数声明中使用，会有语法错误。因为JS引擎无法判断这是表达式还是一条语句。
```js
function f() { console.log(1) } () // SyntaxError: Unexpected token )
```

为了避免解析的歧义，JavaScript 规定，如果function关键字出现在行首，一律解释成语句。因此，引擎看到行首是function关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

最简单的解决办法是在外面加上圆括号()，这样JS就会认为它是一个表达式。
```js
(function f() { console.log(1) } ()); // 1
(function f() { console.log(1) })(); // 1
```
这就叫做函数立即调用表达式（Immediately-Invoked Function Expression），简称IIFE。

这种方法需要在末尾加上分号，不加分号连续两个IIFE后一个会被当成前一个的参数。
```js
(function f() { console.log(1) } ())
(function f() { console.log(1) } ()) // 被当成前一个的参数
```

任何能让JS解释器以表达式来处理函数的地方，都能直接使用圆括号立即调用函数。
```js
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
```

通常情况下，只对匿名函数使用这种方法，目的有两个，一是不用为函数命名，防止污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

### eval命令
eval命令接受一个字符串作为参数，并将这个字符串当做语句执行。
如果参数语句无法当做语句执行，那么就会报错。
```js
eval('3x') // Uncaught SyntaxError: Invalid or unexpected token
```
防在eval中的字符串，应该有独自存在的意义，不能用来与eval以外的命令配合使用。
```js
eval('return;') // Uncaught SyntaxError: Illegal return statement
```
return不能单独使用，必须在函数中使用。

如果eval的参数不是字符串，那么会原样返回。

eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。
```js
var a = 1;
eval('a = 2;');

a // 2
```

严格模式下，eval中声名的变量，不影响外部变量；但是eval仍然能读写外部变量的值。
```js
(function f() {
    'use strict';
    var b = 1
    eval('var a = 1');
    eval('b = 2');
    console.log(a) // ReferenceError: a is not defined
    console.log(b) // 2
})()
```

由于eval别名调用时，JS引擎静态解析时无法分辨执行的是eval。
为了保证eval的别名调用不影响代码优化。JS的标准规定，凡是使用别名调用eval，eval内部都是全局作用域。
```js
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e('console.log(a)');
}

f() // 1
```
eval的别名调用五花八门，只要不是直接用eval命令调用，都属于别名调用，因为引擎只能识别这一种形式是直接调用。
```js
eval.call(null, '...')
window.eval('...')
(1, eval)('...')
(eval, eval)('...')
```
以上都是eval的别名调用，都是全局作用域。

