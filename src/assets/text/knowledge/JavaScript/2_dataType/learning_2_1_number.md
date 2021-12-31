# 数值
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

## 1. 数值精度
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
```js
1.010000....000 * 2^2 == 5
{1 * 2^0 * 2^2} + {0 * 2^(-1) * 2^2} + {1 * 2^(-2) * 2^2} + ....{0 * 2^(-52) * 2^2} = 5

// 有效数字最多有52个，2^-52。内部超过2的53次方的整数无法精确表示。
```
精度最多只能到53个二进制位，意味着，绝对值小于2的53次方的整数，都能正常表示。

```js
Math.pow(2, 53)
// 9007199254740992
Math.pow(2, 53) + 1
// 9007199254740992
Math.pow(2, 53) + 2
// 9007199254740994
Math.pow(2, 53) + 3
// 9007199254740996
Math.pow(2, 53) + 4
// 9007199254740996
```

上面代码中，大于2的53次方以后，整数运算的结果开始出现错误。所以，大于2的53次方的数值，都无法保持精度。由于2的53次方是一个16位
的十进制数值，所以简单的法则就是，JavaScript 对15位的十进制数都可以精确处理。

```js
Math.pow(2, 53)
// 9007199254740992
// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000
```

大于2的53次方以后，多出来的有效数字（最后三位的111）都会无法保存，变成0。

## 2. 数值范围
JavaScript中的数值为64位二进制浮点数，指数部分有11位，意味着指数部分的最大值为2047（2^11 -1）。也就是说，64位浮点数的指数部分的最大值为2047，分出一半来表示负数，则JS能表示的数值范围是2^1024到2^-1023（开区间），超出这个范围的数字无法表示（大于2^53的数无法保持精度）。

如果一个数大于2^1024，会发生“正向溢出”（overflow），JS无法表示这样的数，会返回Infinity。  
如果一个数小于等于2^-1075（指数部分最小值-1023，在加上小数部分的53位），会发生“负向溢出”（underflow），JS无法表示这样的数，会返回0。
```js
Math.pow(2, 1024) // Infinity
Math.pow(2, -1075) // 0
Math.pow(2, -1076) // 0
Math.pow(2, -1075) - 1 // -1
```

Number对象提供MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值。
```js
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324
```

## 3. 数值的表示方法
以下两种情况，JS会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示。
* 小数点前的数字多于21位。
```js

1234567890123456789012
// 1.2345678901234568e+21
```

* 小数点后的零多于5个。
```js
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003 // 3e-7

// 否则，就保持原来的字面形式
0.000003 // 0.000003
```

## 4. 数值的进制
使用字面量（literal）直接表示一个值时，JS对整数提供四种进制的表示方法：十进制，十六进制，八进制，二进制。

* 十进制：没有前导0的数值。
* 八进制：有前缀为0o或者0O的数值，或者有前导0、且只用0-7表示的数值。
* 十六进制：有前缀0X或者0x的数值。
* 二进制：有前缀0B或者0b的数值。

默认情况下，JS内部会自动将数值转为十进制。
```js
0xff // 255
0o377 // 255
0b11 // 3
```
如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。
```js
0xzz // 报错
0o88 // 报错
0b22 // 报错
```

通常来说，有前导0的数值会被认为是八进制，但是如果前导0后面有数字8和9，则该数值被视为十进制。
前导0表示八进制，处理时容易造成混乱。ES5的严格模式和ES6，已经废除了这种表示方法，但浏览器为了兼容旧代码，目前继续支持这种表示方法。


## 5. 特殊数值
### 1) 正零和负零
JS内部实际上存在两个0：+0和-0，区别是64位浮点数的符号位不同。它们是等价的。
```js
-0 === +0 // true
0 === -0 // true
0 === +0 // true
```
唯一区别的场合是，+0或-0当做分母时，+0返回+Infinity，-0返回-Infinity。
```js
(1 / +0) === (1 / -0) // false
```

### 2) NaN
NaN是JS中的特殊值，表示“非数字”，主要出现在字符串错解析为数字出错的场合。
```js
5 - 'x' // NaN
0 / 0 // NaN，零除以零也会得到NaN
Math.acos(2) // NaN
Math.log(-1) // NaN
Math.sqrt(-1) // NaN
```

NaN不是一个独立的数据类型，它的数据类型仍为number。
```js
typeof NaN // number
```

NaN不等于任何值，包括它本身。
```js
NaN === NaN // false
```

数组的indexOf方法使用严格相等运算符。
```js
[NaN].indexOf(NaN) // -1
```

NaN转换为boolean时为false。

NaN与任何数（包括它自己）的运算，得到的都是NaN。

### 3) Infinity
Infinity代表无穷大。非零数值除以零得到Infinity.
```js
Math.pow(2, 1024) // Infinity
0 / 0 // NaN
1 / 0 // Infinity
1 / -0 // -Infinity
1 / 0 // Infinity
-1 / -0 // -Infinity
```
Infinity代表正的无穷，-Infinity代表负的无穷。非零正数除以-0，得到-Infinity；负数除以-0，得到Infinity。  
Infinity大于一切数值（除了NaN），-Infinity小于一切数值（除了NaN）。  
Infinity与NaN进行比较，总是返回false。  
```js
Infinity > NaN // false
```

运算规则：
Infinity的四则运算，符合无穷的数学运算规则。
```js
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
5 / Infinity // 0

// 和0的计算
0 * Infinity // NaN
0 / Infinity // 0
Infinity / 0 // Infinity

// Infinity加上或乘以Infinity，仍得到Infinity
Infinity + Infinity // Infinity
Infinity * Infinity // Infinity

// Infinity减去或除以Infinity，得到NaN
Infinity - Infinity // NaN
Infinity / Infinity // NaN

// 和null进行计算，null会转化为0，相当于和0的计算
null * Infinity // NaN
null / Infinity // 0
Infinity / null // Infinity

// Infinity和undefined进行计算，得到的都是NaN
undefined + Infinity // NaN
undefined - Infinity // NaN
undefined * Infinity // NaN
undefined / Infinity // NaN
Infinity / undefined // NaN
```

## 6. 与数值相关的全局方法
### 1) parseInt()
parseInt()用于将字符串转化为整数。  
如果字符串头部有空格，会自动去除空格。
```js
parseInt('   123') // 123
```

如果参数不是字符串，则会先转换为字符串，转换为字符串时，会转换为十进制数的字符串，再转换为整数。
```js
parseInt(1.23) // 1
parseInt('1.23') // 等同于上一条语句
```

字符串转化为整数时，是从左到右一个个字符依次转换，如果遇到不能转换的部分，就停止转换，并返回已经转换的部分。
```js
parseInt('8aaa') // 8
parseInt('123**') // 123
parseInt('123.45') // 123
```

如果第一个字符无法转化为数字（后面跟着数字的正负号除外），则返回NaN。
```js
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('+') // NaN
parseInt('+123') // 123
```

0x或0X开头的字符串，会将其作为十六进制数进行解析转化。  
0开头的字符串，会将其作为十进制数进行解析转化
```js
parseInt('0x10') // 16
parseInt('010') // 10
```

对于会自动转换为科学计数法的数字(不是字符串)，parseInt会按照科学计数法的表示方法解析。
```js
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1
parseInt('1000000000000000000000.5') // 1e+21

parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8
```

#### parsetInt用作进制转换
parseInt可以接受第二个参数用于进制转换（2到36之间），表示被解析的值的进制数，返回该值对应的十进制数。默认为10。

第二个参数会自动转换为整数，如果这个数不在2到36之间，则返回NaN。如果第二个参数是0、null、undefined，则被忽略，以十进制处理。
```js
parseInt('100', 37) // NaN
parseInt('100', 1) // NaN
parseInt('100', 0) // 100
parseInt('100', null) // 100
parseInt('100', undefined) // 100
```

如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回NaN。
```js
parseInt('1546', 2) // 1
parseInt('546', 2) // NaN
```

parseInt处理非字符串时，会先将参数转换为字符串。会导致一些意想不到的结果。
```js
parseInt(0x11, 2) // 1
// 等同于
parseInt(String(0x11), 2) // String(0x11) 会按照十六进制将数字转换为十进制的17，再转为字符串,7不是二进制的有效数字，所以返回1
```
对于八进制的0开头数字，JS不再允许将带有0前缀的数字视为八进制数，而是要求忽略这个0。但是为了保证兼容性，浏览器并没有部署这一规定。

### 2) parseFloat()
parseFloat方法用于将一个字符串转为浮点数。如果字符串符合科学计数法，则会进行相应的转换。
```js
parseFloat('3.14') // 3.14
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14
parseFloat('3.14more non-digit characters') // 3.14, 遇到不能转换的字符，停止转换
parseFloat('\t\v\r12.34\n ') // 12.34， 自动过滤前面的空格
parseFloat([]) // NaN， 参数不是字符串，或者转换为字符串时第一个字符不能转换为浮点数，返回NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN
```

这些特点使得parseFloat的转换结果不同于Number函数。
```js
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

### 3) isNaN()
isNaN方法可以用来判断一个值是否为NaN。
```js
isNaN(NaN) // true
isNaN(123) // false
```

isNaN只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true。
```js
isNaN('abc') // true
isNaN(Number('abc')) // 等同于

isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true
```
出于同样的原因，对象和数组也返回true。

但是空数组和只有一个数值成员的数组，isNaN返回false。原因是这些数组能被Number()转换为数值。
```js
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```
因此，使用isNaN()前，最好判断下数据类型。

### 4) isFinite()
isFinite方法返回一个布尔值，表示某个值是否为正常的数值。
```js
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```
除了Infinity、-Infinity、NaN、undefined这四个值会返回false（包括被Number()转化后为NaN的值），其他数值都会返回true。

