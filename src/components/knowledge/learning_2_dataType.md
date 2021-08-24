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

## 数值
JavaScript底层，所有数字都是以64位浮点数形式储存，即 1 === 1.0。
由于某些操作只有整数才能完成，此时JavaScript会自动把64位浮点数转换为32位整数，然后进行运算。

浮点数不是精确的值，计算时需要注意
```js
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false
```

### 数值精度
JavaScript浮点数有64个二进制位，从最左边开始，是这样组成的。
* 第1位：符号位，0代表正数，1代表负数
* 第2位到第12位（共11位）：指数位
* 第13位到第64位（共52位）：小数部分（即有效数字）

符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

指数部分一共有11个二进制位，因此大小范围就是0到2047。IEEE 754 规定，如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字这时总是1.xx...xx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位。因此，JavaScript 提供的有效数字最长为53个二进制位。
```js
(-1)^符号位 * 1.xx...xx * 2^指数部分
```
上面公式是正常情况下（指数部分在0到2047之间），一个数在 JavaScript 内部实际的表示形式。

精度最多只能到53个二进制位，意味着，绝对值小于2的53次方的整数，都能正常表示。

