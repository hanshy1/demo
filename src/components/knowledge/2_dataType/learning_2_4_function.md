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
JS引擎将函数名视同变量名，所以采用function命令声明函数时，会像变量名一样，将函数声明到代码头部。
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

对于原生的函数，toString()方法返回 function name() { [native code] }。
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

同样的，函数体内部声明的函数，作用域绑定函数体内部。
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
如果有同名的参数，则取最后出现的那个值，即使后一个参数值没有赋值，也以其为准。
```js
function f1(a, a) {
    console.log(a);
}

f1(1, 2) // 2
f1(1) // undefined
```







