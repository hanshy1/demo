# 简介
js中有6种基本数据类型：number、string、boolean、null、undefined、symbol  
引用数据类型：object（对象）  
对象又可以分为3个子类型：object、function、array

## 1. typeof运算符
js有三种方法，可以确定一个值到底是什么类型。
* typeof
* instanceof
* Object.prototype.toString()

typeof运算符可以返回一个值的数据类型。
```js
typeof 1 // "number"
typeof '1' // "string"
typeof false  // "boolean"
typeof {} // "object"
typeof [] // "object"
typeof Function // "function"
typeof undefined // "undefined"
typeof null // "object"
```
typeof null输出“object”，但null本质不是对象，null没有原型，也不能访问属性和方法。造成这个现象的原因是在初版JS中，JS的数据被设计为存储在一个32位单元中，1-3位表示类型标签（type tag），其余表示值，typeof通过类型标签来判断值的类型。object的类型标签为000，undefined（JSVAL_VOID）为整数-2^30（整数范围外的数），null（JSVAL_NULL）为机器代码NULL的指针（空指针地址一般为0）或者跟object的类型标签相同。  
typeof在js引擎中的运行逻辑是：
1. 通过equals比较类型标签，判断值是否为undefined，不是undefined则进行下一步判断。
2. 比较类型标签，判断值是否为object，如果是object，则判断值是否可调用或者内部属性[[Class]]标识为function，满足条件则值为function，否则为object。如果值不是object则进行下一步判断。
3. 比较类型标签，依次判断值是否为number、string、boolean。
https://2ality.com/2013/10/typeof-null.html

## 2. null和undefined
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

## 3. 布尔值
布尔值代表真和假两个状态。  
逻辑运算符的计算结果为布尔值。  

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。  
转换规则是除了下面六个值被转为false，其他值都视为true。
* undefined
* null
* false
* 0
* NaN
* ""或''（空字符串）
