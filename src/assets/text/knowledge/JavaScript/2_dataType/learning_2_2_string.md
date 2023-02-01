# 字符串
字符串就是零个或多个排在一起的字符，放在单引号或双引号之中。  
由于HTML标签的属性值使用双引号，所以JS代码中最好使用单引号，而不要单引号双引号混用，保持代码风格一致。  

字符串默认只能写在一行，分成多行时需要在尾部使用反斜杠（反斜杠后必须是换行符， 有其他字符会报错）。
```js
'a
b
c' // error

' a \
b \
c' // a b c
```

(+)运算符可以连接多个字符串。
```js
var str = 'a ' + 'b ' + 'c'; // a b c
```

## 1. 转义
反斜杠 (\) 在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。

* \0: null (\u0000)
* \n: 换行符 (\u000A)
* \r: 回车键 (\u000D)
* \b: 后退符 (\u0008)
* \f: 换页符 (\u000C)
* \t: 制表符 (\u0009)
* \v: 垂直制表符 (\u000B)
* \\': 单引号 (\u0027)
* \\": 双引号 (\u0022)
* \\\\: 反斜杠 (\u005C)

反斜杠还有三种特殊用法。
1. \HHH （\三个八进制数）
反斜杠后面紧跟三个八进制数（000到377），代表一个字符。HHH对应该字符的 Unicode 码点，比如\251表示版权符号。  
显然，这种方法只能输出256种字符。

2. \xHH （\x两个十六进制数）
\x后面紧跟两个十六进制数（00到FF），代表一个字符。HH对应该字符的 Unicode 码点，比如\xA9表示版权符号。这种方法也只能输出256种字符。

3. \uXXXX （\u四个十六进制数）
\u后面紧跟四个十六进制数（0000到FFFF），代表一个字符。XXXX对应该字符的 Unicode 码点，比如\u00A9表示版权符号。

```js
'\251' // "©"
'\xA9' // "©"
'\u00A9' // "©"

'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true

'\a' // 非特殊字符前使用反斜杠，则反斜杠会被忽略。
```

## 2. 字符串与数组
字符串可以被视为字符数组，因此可以用数组索引的方式来取得某个位置的单个字符（索引从0开始）。
```js
var str = 'hello';
str[0] // "h"
str[1] // "e"

'hello'[0] // "h"
```

如果方括号中的数字超出字符串长度范围，或者根本不是数字，则返回undefined。
```js
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'['a'] // undefined
```

字符串与数组的相似性仅此而已。实际上，无法直接改变字符串之中的单个字符。
```js
var s = 'hello';

delete s[0];
s // "hello"

s[1] = 'a';
s // "hello"

s[5] = '!';
s // "hello"
```

## 3. length
length属性返回字符串的长度，该属性值也无法直接改变。
```js
var s = 'hello';
s.length // 5

s.length = 3;
s.length // 5
```

## 4. 字符集
JS使用Unicode字符集。JS引擎内部，所有字符都用Unicode表示。

可以在代码中使用Unicode码点表示字符，即\uxxxx的格式，其中xxxx表示字符的Unicode码点。  
解析代码的时候，JS会自动识别一个字符是字面表示还是码点表示，输出给用户的时候，自动转换为字面形式。
```js
var f\u006F\u006F = 'abc';
console.log(foo) // abc
```

还需要知道，每个字符在JS内部都是以16位（2个字节）的UTF-16格式储存。也就是说JS的单位字符长度固定为16位，2个字节。

但是UTF-16有两种长度：  
对于码点在U+0000到U+FFFF之间的字符，长度为16位（2个字节）；  
对于码点在U+10000到U+10FFFF之间的字符，长度为32位（4个字节），而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间。  
举例来说，码点U+1D306对应的字符为𝌆，它写成UTF-16就是0xD834 0xDF06。
```js
'\uD834\uDF06' // 𝌆
'𝌆'.length // 2
```

JS对UTF-16的支持是不完整的，只支持两字节的字符。由于历史原因，JS发布第一版的时候Unicode的码点只到U+FFFF，因此两字节足够表示字符了。后来Unicode纳入的字符越来越多，出现了四字节的编码。导致JS无法识别四字节的字符，𝌆在浏览器中能正确识别为一个字符，但是JS引擎认为这是两个字符。

总结，对于U+10000到U+10FFFF之间的字符，JS引擎会认为它是两个字符（length属性值为2）。所以，JS返回字符串长度时可能是不正确的。

## 5. Base64编码
有时文本中包含一些无法打印的符号，比如ASCII码0到31的符号无法打印出来，这时可以使用Base64编码，将它们编码成可打印的字符。  
另一个使用场景是，有时需要以文本格式传递二进制数据，那么也可以使用Base64编码。

Base64编码方法，可以将任意值转为 0-9、a-z、A-Z、+、/ 这64个字符组成的可打印字符。使用Base64的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

JS提供两个原生的Base64转码方法。
* btoa(): 将任意值转为Base64编码字符串。
* atob(): 将Base64字符串转为原来的值。
```js
var str = 'hello world!';
var b64 = btoa(str) // aGVsbG8gd29ybGQh
atob(b64) // hello world!
```

这两个方法不适用于非ASCII编码的字符，会报错。
```js
btoa('你好') // error
```

要将非ASCII字符转为Base64编码，中间必须插入一个转码的环节，再使用这两个方法。
```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

## encodeURIComponent()和encodeURI()
encodeURIComponent()和encodeURI()都用来将URI非法字符转化成合法字符。  
encodeURIComponent()和encodeURI()编码字符时范围不同：
```js
var set1 = ";,/?:@&=+$";  // 保留字符
var set2 = "-_.!~*'()";   // 不转义字符
var set3 = "#";           // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (空格被编码为 %20)
```

如果需要编码整个URL，使用encodeURI()方法，如果使用encodeURIComponent()会则会将:/等字符都进行编码。
```js
var url = 'http://www.example.com/home/t e s t';
console.log(encodeURI(url)); // "http://www.example.com/home/t%20e%20s%20t"
```

如果需要编码URL中参数的值，使用encodeURIComponent()方法。
```js
var param = 'http://www.example.com/home/t e s t';
var url = 'http://www.example.com/test?param=' + encodeURIComponent(param);
console.log(url); // "http://www.example.com/test?param=http%3A%2F%2Fwww.example.com%2Fhome%2Ft%20e%20s%20t"
```

## 6. 包含4字节字符串的长度
ES6中为字符串实现了遍历器(Iterator)接口。所以可以使用for...of...遍历字符串。
for...of...循环遍历字符串时，可以识别大于0xFFFF的码点，for循环不可以。
```js
var str = '𝌆'
var num = 0
for (s of str) {
  num ++
  console.log(s)
} 
// 𝌆
console.log(num) // 1

for (let i = 0; i < str.length; i++) {
  console.log(str[i])
} 
// ''
// ''
```

使用正则表达式匹配4字节字符串，使用replace()替换成2字节字符串后计算长度。
```js
var str = '𝌆'
str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '1').length // 1
// 性能比for of循环计算长度差
```

