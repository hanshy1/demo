# 一、概述
JS是一门弱类型语言（动态类型），变量没有类型限制，可以随时赋予任意值。
```js
var x = y ? 1 : 'a'
```
变量的类型没办法在编译阶段确定，必须等到运行时才能确定。

各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。
```js
'3' - '2' // 1
```

# 二、强制类型转换
强制类型转换指的是用Number()、Boolean()、String()这三个方法手动将值转为对应的原始类型值。

## 1. Number()
### 1) 原始类型值参数
原始类型值参数的转换规则如下。
```js
// 数值：转换后还是原来的值
Number(324.123) // 324.123

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0
```

Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。  
parseInt和Number函数都会自动过滤一个字符串前导和后缀的空格。
```js
parseInt('  123abc  ') // 123
Number('  123abc  ') // NaN
Number('  123  ') // 123
```

### 2) 对象
简单的规则是，对于没有重写valueOf和toString方法的对象，将会返回NaN，除非重写了valueOf和toString，或者是只有一个数值元素的数组。
```js
Number({a: 1}) // NaN
Number({valueOf: function() {return 1}}) // 1
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

Number()对于对象的转换规则：
* 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。

* 第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

* 第三步，如果toString方法返回的是对象，就报错。

```js
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  }
};

Number(obj) // TypeError: Cannot convert object to primitive value
```

## 2. String()
### 1) 原始类型值
* 数值：转为相应的字符串。
* 字符串：转换后还是原来的值。
* 布尔值：true转为字符串"true"，false转为字符串"false"。
* undefined：转为字符串"undefined"。
* null：转为字符串"null"。

```js
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
```

### 2) 对象
String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
```js
String({}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

String方法背后的转换规则，与Number方法基本相同，只是互换了valueOf方法和toString方法的执行顺序。

* 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

* 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

* 如果valueOf方法返回的是对象，就报错。

## 3. Boolean()
除了以下几个值被转换为为false，其他都为true。
* undefined
* null
* false
* 0（包含-0和+0）
* NaN
* ''（空字符串）

所有对象，包括new Boolean(false)都返回true
```js
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

这是因为 JavaScript 语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于obj1 && obj2这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为true。

# 三、自动类型转换
自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。  
由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用Boolean()、Number()和String()函数进行显式转换。

* 第一种情况，不同类型的数据互相运算。
```js
123 + 'abc' // "123abc"
```

* 第二种情况，对非布尔值类型的数据求布尔值。
```js
if ('abc') {
  console.log('hello')
}  // "hello"
```

* 第三种情况，对非数值类型的值使用一元运算符（即+和-）。
```js
+ {foo: 'bar'} // NaN
- [1, 2, 3] // NaN
```

