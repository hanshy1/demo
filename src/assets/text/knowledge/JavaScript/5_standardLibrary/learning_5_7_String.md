# 概述
String对象是JS原生提供的三个包装对象之一，用来生成字符串对象。

字符串对象是一个类数组对象。
```js
new String('abc') // String{0: "a", 1: "b", 2: "c", length: 3}
```

String()方法还可以将任意数值转换为字符串。

# 静态方法
## String.fromCharCode()
该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。
```js
String.fromCharCode() // ""
String.fromCharCode(104, 101, 108, 108, 111) // "hello"
```

该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。
```js
String.fromCharCode(0x20BB7) // "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7) // true
```
0x20BB7在unicode中为汉字"𠮷"。  
大于0xFFFF的位数2被忽略了，原因是大于0xFFFF的字符占用4个字节，所以在js中需要用两个数值来表示。
```js
String.fromCharCode(0xD842, 0xDFB7) // "𠮷"
```

# 实例属性
## String.prototype.length
length属性返回字符串的长度。
```js
'abc'.length // 3
```

# 实例方法
## String.prototype.charAt()
charAt方法返回指定位置的字符，参数是从0开始编号的位置。
```js
var str = 'abc'

str.charAt(0) // 'a'
str.charAt(str.length - 1) // 'c'
str[0] // 'a'，字符串是类数组对象，成员键名是数字
str.charAt(-1) // ""
str.charAt(3) // ""
```
如果参数为负数，或大于等于字符串的长度，charAt返回空字符串。

## String.prototype.charCodeAt()
charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作。
```js
'abc'.charCodeAt(1) // 98
'abc'.charCodeAt() // 97
'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN
```
如果没有任何参数，charCodeAt返回首字符的 Unicode 码点。  
如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN。

如果字符的Unicode码点大于0xFFFF，需要调用两次charCodeAt()方法。
```js
'𠮷'.charCodeAt(0) // 55362
'𠮷'.charCodeAt(1) // 57271
```

## String.prototype.concat()
concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。  
该方法可以接受多个参数。如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。
```js
'a'.concat('b', 'c') // "abc"

var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // "123"
one + two + three // "33"
```
此方法可以避免使用 + 运算符连接字符串时，数值类型进行加法运算。

## String.prototype.slice()
slice()方法用于从原字符串取出子字符串并返回，不改变原字符串。  
它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
```js
'JavaScript'.slice(0, 4) // "Java"
```
如果第一个参数大于第二个参数（正数情况下），slice()方法返回一个空字符串。

## String.prototype.substring()
substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。  
区别是：  
如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。  
如果参数是负数，substring方法会自动将负数转为0。
```js
'JavaScript'.substring(10, 4) // "Script"
'JavaScript'.substring(4, -3) // "Java"
```

由于这些规则违反直觉，因此不建议使用substring方法，应该优先使用slice。

## String.prototype.substr()
substr方法用于从原字符串取出子字符串并返回，不改变原字符串。  
substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度。
```js
'JavaScript'.substr(4, 6) // "Script"
```
如果省略第二个参数，则表示子字符串一直到原字符串的结束。  
如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。  
第二个参数超出字符串长度时，则表示子字符串一直到原字符串的结束。

## String.prototype.indexOf()，String.prototype.lastIndexOf()
indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。  
indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配。
```js
'hello world'.indexOf('o') // 4
'hello world'.indexOf('o', 6) // 7
```

lastIndexOf方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配。  
lastIndexOf的第二个参数表示从该位置起向前匹配。
```js
'hello world'.lastIndexOf('o') // 7
'hello world'.lastIndexOf('o', 6) // 4
```

## String.prototype.trim()
trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。  
该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。
```js
'  hello world  '.trim() // "hello world"
'\r\nabc \t'.trim() // 'abc'
```

## String.prototype.toLowerCase()，String.prototype.toUpperCase()
toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

## String.prototype.localeCompare()
localeCompare方法用于比较两个字符串。  
它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。
```js
'apple'.localeCompare('banana') // -1
'apple'.localeCompare('apple') // 0
```
该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。  
但是，localeCompare方法会考虑自然语言的排序情况，将大写的英文字母排在小写字母的前面。  
localeCompare还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。


## String.prototype.match()
match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。
```js
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null
```

返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。  
match()方法还可以使用正则表达式作为参数。

## String.prototype.search()，String.prototype.replace()
search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。
```js
'cat, bat, sat, fat'.search('at') // 1
'cat, bat, sat, fat'.search('xt') // -1
```

replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
```js
'aaa'.replace('a', 'b') // "baa"
```

## String.prototype.split()
split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
```js
'a|b|c'.split('|') // ["a", "b", "c"]
```

如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
```js
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
```

如果省略参数，则返回数组的唯一成员就是原字符串。
```js
'a|b|c'.split() // ["a|b|c"]
```

如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。  
如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。
```js
'a||c'.split('|') // ['a', '', 'c']
'|b|c'.split('|') // ["", "b", "c"]
```

split方法还可以接受第二个参数，限定返回数组的最大成员数。
```js
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
```
split()可以使用正则表达式作为参数。