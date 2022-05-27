# 概述
JS一共提供了8个比较运算符。
* \> 大于运算符
* < 小于运算符
* <= 小于或等于运算符
* \>= 大于或等于运算符
* == 相等运算符
* === 严格相等运算符
* != 不相等运算符
* !== 严格不相等运算符

这八个比较运算符分成两类：相等比较和非相等比较。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。

## 1. 非相等运算符：字符串的比较
字符串按照字段顺序比较。
```js
'cat' > 'Cat' // true'
```
JS引擎内部首先比较首字符的码点大小，如果首字符相同，在比较第二个字符，以此类推。

## 2. 非相等运算符：非字符串的比较
### 1) 原始类型值
如果两个运算子都是原始类型的值，则都会先转换为数值进行比较。
```js
5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0

2 > true // true
// 等同于 2 > Number(true)
// 即 2 > 1
```

这里需要注意，任何原始类型值和NaN进行比较(包括NaN自身)，返回的都是false。
```js
1 > NaN // false
'1' > NaN // false
NaN > NaN // false
null > NaN // false
undefined > NaN // false
1 > undefined // false (undefined转换成NaN)
```

### 2) 对象
如果运算子是对象，会先转换为原始类型值，在进行比较。

对象转换为原始类型值，会先调用valueOf方法，如果valueOf方法的返回值不是原始类型值，则调用对象的toString()方法。
```js
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 [2].valueOf() > '11'
// 即 '1' > '11'
```

## 3. 严格相等运算符
JS 提供两种相等运算符：== 和 ===。  
如果两个值不是同一类型，严格相等运算符会直接返回false；相等运算符会先将它们转换为同一类型，再用严格相等运算符比较。

### 1) 不同类型的值
严格相等运算符直接返回false。

### 2) 同一类的原始类型值
同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，值不同就返回false。
```js
1 === 0x1 // true
```
十进制的1与十六进制的1，因为类型和值都相同，返回true。

NaN与任何值都不相等（包括自身）。另外，正0等于负0。

### 3) 复合类型的值
两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。
```js
{} === {} // false
[] === [] // false
```

### 4) undefined和null
undefined和null与自身严格相等。
```js
undefined === undefined // true
null === null // true

null === undefined // false

var v1;
var v2;
v1 === v2 // true
```

## 4. 严格不相等运算符
严格相等运算符有一个对应的“严格不相等运算符”（!==），它的算法就是先求严格相等运算符的结果，然后返回相反值。

## 5. 相等运算符
相等运算符用来比较相同类型的数据时，与严格相等运算符完全一样。  
比较不同类型的数据时，相等运算符会先将数据进行类型转换，然后再用严格相等运算符比较。

### 1) 原始类型值
原始类型的值会转换成数值再进行比较。

### 2) 对象与原始类型值比较
对象转换为原始类型值，会先调用valueOf方法，如果valueOf方法的返回值不是原始类型值，则调用对象的toString()方法。

### 3) undefined和null
undefined和null只有与自身比较，或者互相比较时，才会返回true；与其他类型的值比较时，结果都为false。
```js
null == null // true
undefined == undefined // true
null == undefined // true

null == false // false
undefined == 0 // false
```

### 4) 相等运算符的缺点
相等运算符隐藏的类型转换，会带来一些违反直觉的结果。
```js
// 非同一类型的原始类型值，转为数值后进行比较
0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

// null和undefined只有和自身或相互比较相等时才会返回true
false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```