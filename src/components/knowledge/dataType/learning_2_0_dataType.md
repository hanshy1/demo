# 简介
js中有6种基本数据类型：number、string、boolean、null、undefined、symbol
引用数据类型：object（对象）
对象又可以分为3个子类型：object、function、array

## typeof运算符
js有三种方法，可以确定一个值到底是什么类型。
* typeof
* instanceof
* Object.prototype.toString()

typeof运算符可以返回一个值得数据类型
```js
typeof 1 // "number"
typeof '1' // "string"
typeof false  // "boolean"
typeof {} // "object"
typeof [] // "object"
typeof Function // "function"
typeof undefined // "undefined"
typeof null // "null"
```

## null和undefined
null代表一个空的对象，转为数值时为0；undefined是一个原始值，表示“此处无定义”，转为数值时为NaN。
null和undefined转为boolean时都为false，null == undefined 返回true。

对变量取值为undefined的场合：
```js
// 变量声明了，但没有赋值
var i;
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f() // undefined

// 对象没有赋值的属性
var  o = new Object();
o.p // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f() // undefined
```

## 布尔值
布尔值代表真和假两个状态。

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。
转换规则是除了下面六个值被转为false，其他值都视为true。
* undefined
* null
* false
* 0
* NaN
* ""或''（空字符串）
