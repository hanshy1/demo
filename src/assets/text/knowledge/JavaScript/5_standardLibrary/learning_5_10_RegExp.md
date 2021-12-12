# 概述
正则表达式(regular expression)是一种表达文本模式的方法，常用来匹配给定模式的文本。
新建正则表达式有两种方法。
一种是字面量，以斜杠表示开始和结束。
```js
var reg = /a/
```
一种是使用构造函数。
```js
var reg = new RegExp('a')
```

这两种方法的区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式。
所以正则字面量的效率更高，并且更直观，所以尽量使用正则字面量定义正则表达式。

# 实例属性
正则对象的实例属性分为两类。
1.一类是修饰符相关，用于了解设置了什么修饰符。
* RegExp.prototype.ignoreCase: 返回一个布尔值，表示是否设置了i修饰符。
* RegExp.prototype.global: 返回一个布尔值，表示是否设置了g修饰符。
* RegExp.prototype.multiline: 返回一个布尔值，表示是否设置了m修饰符。
* RegExp.prototype.flags: 返回一个字符串，包含了已经设置的所有修饰符，按字母排序。
```js
var reg = /abc/igm;

reg.ignoreCase; // true
reg.global; // true
reg.multiline; // true
reg.flags; // 'gim'
```

2.另一类是与修饰符无关的属性。
* RegExp.prototype.lastIndex: 返回一个整数，表示下一次开始搜索的位置，该属性可读写，但是只在进行连续搜索时有意义。
* RegExp.prototype.source: 返回正则表达式的字符串形式(不包括反斜杠)，该属性只读。
```js
var reg = /abc/;

reg.lastIndex; // 0
reg.source; // 'abc'
```

# 实例方法
## RegExp.prototype.test()
正则实例对象的test方法返回一个布尔值，表示当前模式是否能匹配参数字符串。
```js
/abc/.test('abc and def'); // true
```

如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
```js
var reg = /x/g;
var str = '_x_x';

reg.lastIndex; // 0

reg.test(str); // true
reg.lastIndex; // 2

reg.test(str); // true
reg.lastIndex; // 4

reg.test(str); // false
reg.lastIndex; // 0
```

带有g修饰符的正则表达式，可以通过修改lastIndex属性指定开始搜索的位置。
```js
var reg = /x/g
var str = '_x_x'

reg.lastIndex = 4
reg.test(str) // false
```

注意，带有g修饰符的正则表达式，正则表达式内部会记录上一次的lastIndex属性，这时不应该更换要匹配的字符串，会产生预期外的结果。

lastIndex只对同一个正则表达式有效，即lastIndex属性是正则对象的实例属性。
```js
while(/a/g.test('aaaa')) { console.log('true') } // 无限循环，因为循环条件中的正则表达式每次都是新的正则，lastIndex总是0。

var reg = /a/g
while(reg.test('aaaa')) { console.log('true') } // 正确写法
```

如果正则表达式是一个空字符串，则匹配所有字符串。

## RegExp.prototype.exec()
正则对象的exec()方法，用来返回匹配的结果。如果匹配成功，则返回一个数组，成员是匹配成功的子字符串，如果匹配失败，返回null。
```js
var reg1 = /x/;
var reg2 = /y/;
var str = '_x_x';

reg1.exec(str); // ['x']
reg2.exec(str); // null
```

如果正则表达式包含圆括号(即含有“组匹配”)，则返回的数组会包括多个成员。第一个成员是整体匹配的结果，后面的成员就是圆括号对应的
匹配成功的组。
```js
var reg = /_(x)/;
var str = '_x_x';

reg.exec(str); // ['_x', 'x']
```

exec()方法返回的数组还包含两个属性。
* input: 整个原字符串。
* index: 模式匹配成功的开始位置(从0开始计数)。
```js
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // ["abbba", "bbb"]

arr.index // 1
arr.input // "_abbba_aba_"
```

如果正则表达式带有g修饰符，则下一次匹配都是从上次匹配成功结束的位置开始匹配。
```js
var reg = /a/g;
var str = 'abc_abc_abc'

var r1 = reg.exec(str);
r1 // ["a"]
r1.index // 0
reg.lastIndex // 1

var r2 = reg.exec(str);
r2 // ["a"]
r2.index // 4
reg.lastIndex // 5
```

# 字符串的实例方法
String.prototype.match(): 返回一个数组，成员是所有匹配的子字符串。
String.prototype.search(): 按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
String.prototype.replace(): 按照给定的正则表达式进行替换，返回替换后的字符串。
String.prototype.split(): 按照给定的规则进行字符串分割，返回一个数组，包含分割后的各个成员。

## String.prototype.match()
字符串实例对象的match()方法对字符串进行正则匹配，返回匹配结果。
```js
var str = '_x_x';
var reg1 = /x/;
var reg2 = /y/;

str.match(reg1); // ['x']
str.match(reg2); // null
```

字符串的match方法和正则对象的exec方法相似：匹配成功返回一个数组，匹配失败返回null。
但是如果正则表达式带有g修饰符时，match()方法会一次性返回所有匹配成功的结果。
```js
var str = '_x_x';
var reg = /x/g;

str.match(reg); // ['x', 'x']
```

正则对象的lastIndex属性，对match()方法无效，匹配总是从字符串的第一个字符开始。

## String.prototype.search()
字符串对象的search()方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有匹配，则返回-1。
```js
'_x_x'.search(/x/); // 1
```

## String.prototype.replace()
字符串对象的replace()方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。
正则表达式如果不加g修饰符，就替换第一个匹配的值，否则替换所有匹配成功的值。
```js
'aaa'.replace(/a/, 'b'); // 'baa'
'aaa'.replace(/a/g, 'b'); // 'bbb'
```

replace()的第二个参数可以使用$符号，用来指代替换的内容。
* $&: 匹配的子字符串。
* $`: 匹配结果前面的文本。
* $': 匹配结果后面的文本。
* $n: 匹配成功的第n组内容，n是从1开始的自然数。
* $$: 指代美元符号$。

replace()的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。
替换函数可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少组匹配，就有多少参数）。
此外，还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串的位置，最后一个参数是原字符串。

## String.prototype.split()
字符串对象的split()方法按照正则规则分割字符串，返回一个由分割后的部分组成的数组。
该方法接受两个参数，第一个是正则表达式，表示分割规则，第二个参数是返回数组的最大成员数。
```js
// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2) // [ 'a', 'b' ]
```

正则表达式带有括号时，则括号匹配的部分也会作为数组成员返回。
```js
'aaa*a*'.split(/(a*)/); // ['', 'aaa', '*', 'a', '*']
```

# 正则匹配规则
## 字面量字符和元字符
大部分字符在正则表达式中，代表其字面含义，如/a/匹配a, /b/匹配b。如果一个字符在正则表达式中表示他的字面含义，那么它就叫作“字面量字符”(literal characters)。

除了字面量字符外，还有一部分字符有特殊含义，不代表字面意思。他们叫作“元字符”(meta characters)。
(1) 点字符
点字符(.)匹配除回车(\r)、换行(\n)、行分割符(\u2028)和段分隔符(\u2029)以外的所有字符。码点大于0xFFFF的字符，无法用点字符正确匹配，会认为这是两个字符。
```js
/c.t/ // cat，c-t都能匹配，但是不能匹配caat
```

(2) 位置字符
^: 表示字符串的开始位置。
$: 表示字符串的结束位置。
```js
// test必须出现在开始位置
/^test/.test('test123') // true

// test必须出现在结束位置
/test$/.test('new test') // true

// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false
```

(3) 选择符
竖线符号(|)在正则表达式中表示“或关系”(OR)，即cat|dog表示匹配cat或者dog。
```js
/11|22/.test('911') // true
```

选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或cd，而不是匹配b或c。可以使用圆括号修改这个行为。

## 转义符
正则表达式中那些含有特殊含义的字符，如果要使用其字面量含义，就需要加上反斜杠进行转义。

正则表达式中，需要转义的特殊字符一共有12个：^ 、. 、[ 、$ 、( 、) 、| 、* 、+ 、? 、{ 、\
需要注意的是，如果使用正则构造函数RegExp()，转义时需要两个反斜杠，因为字符串内部会先转义一次。

## 特殊字符
正则表达式对于一些不能打印的特殊字符，提供了表达方法。
* \cX： 表示Ctrl-[x]，其中x是A-Z的任何一个英文字母，用来匹配控制字符。
* [\b]： 匹配退格键(U+0008)，注意不要与\b混淆。
* \n： 匹配换行键。
* \r： 匹配回车键。
* \t： 匹配制表符tab(U+0009)。
* \v： 匹配垂直制表符(U+000B)。
* \f： 匹配换页符(U+000C)。
* \0： 匹配null字符(U+0000)。
* \xhh： 匹配一个以两位十六进制数(\x00 - \xFF)表示的字符。
* \xhhhh： 匹配一个以四位十进制数(\u0000 - \uFFFF)表示的Unicode字符。

## 字符类
字符类表示有一系列字符可选，只要匹配其中一个字符就可以了。[abc]表示a、b、c中任选一个进行匹配。

有两个字符在字符类中有特殊含义。

(1) 脱字符^
如果字符类中第一个字符是^，则表示除了字符类中的字符，其他字符都可以匹配。[^abc]表示匹配除了a、b、c以外的字符。
```js
/[abc]/.test('apple'); // true
/[^abc]/.test('abc'); // false
```

如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。相比之下，点号作为元字符(.)是不包括换行符的。
```js
var s = 'Please yes\nmake my day!';

s.match(/yes.*day/) // null
s.match(/yes[^]*day/) // [ 'yes\nmake my day']
```
脱字符只有在字符类的第一位才有特殊含义，否则就是字面含义。

(2) 连字符-
某些情况下，对于连续序列的字符，连字符(-)用来提供简写形式，表示字符的连续范围。例如[A-Z]代表26个大写字母。
```js
[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31] // 代表1到3,不是1到31
```

## 预定义模式
预定义模式指的是某些常见模式的简写方式。
* \d： 匹配0-9之间的任一数字，相当于[0-9]。
* \D： 匹配所有0-9以外的字符，相当于[^0-9]。
* \w： 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
* \W： 除任意字母、数字和下划线外的所有字符，相当于[^A-Za-z0-9_]。
* \s： 匹配空格(包括换行符、制表符、空格符等)，相当于[\t\r\n\v\f]。
* \S： 匹配非空格字符，相当于[^\t\r\n\v\f]。
* \b 匹配词的边界。
* \B 匹配非词边界，即在词的内部。

## 重复类
模式的精确匹配次数，使用大括号{}表示。{n}表示恰好重复n次，{n,}表示至少重复n次，{n,m}表示重复不少于n次，不多于m次。

```js
/lo{2}k/.test('look'); // true
/lo{2,5}k/.test('looook'); // true
```

## 量词符
量词符用来设定某个模式出现的次数。
?： 问号表示某个模式出现0次或1次，等同于{0,1}。
*： 星号表示某个模式出现0次或多次，等同于{0,}。
+： 加号表示某个模式出现1次或多次，等同于{1,}。

## 贪婪模式
三个量词符默认情况下都是最大可能匹配，即匹配到不满足匹配规则为止。这被称为贪婪模式。
```js
'aaaba'.match(/a+/g); // ['aaa', 'a']
```

除了贪婪模式，还有非贪婪模式，即最小可能匹配。只要一发现匹配，就返回结果，不往下继续匹配。
使用非贪婪模式，只需在量词符后加上?。
```js
'aaaba'.match(/a+?/g); // ['a', 'a', 'a', 'a']
```

* +?： 表示模式出现1次或多次，采用非贪婪模式。
* *?： 表示模式出现0次或多次，采用非贪婪模式。
* ??： 表示模式出现0次或1次，采用非贪婪模式。
```js
'aaaba'.match(/a+?/); // ['a']
'aaaba'.match(/a*?/); // ['']
'aaaba'.match(/a??/); // ['']
```

## 修饰符
修饰符(modifier)表示模式的附加规则，放在正则表达式的最尾部。
修饰符可以单个使用，也可以组合使用。

(1) g修饰符
默认情况下，正则表达式第一次匹配成功后，就不再向下匹配了。g修饰符表示全局匹配(global)，将匹配所有符合条件的结果。
```js
var reg = /a/;
var str = 'baab';

reg.test(str); // true
reg.test(str); // true
reg.test(str); // true
```
正则表达式中没有g修饰符，所以每次都是从初始位置开始匹配。

```js
var reg = /a/g;
var str = 'baab';

reg.test(str); // true
reg.test(str); // true
reg.test(str); // false
```

(2) i修饰符
默认情况下，正则表达式区分字符串的大小写，加上i修饰符后，忽略字符串的大小写。
```js
/abc/.test('ABC') // false
/abc/i.test('ABc') // true
```

(3) m修饰符
m修饰符表示多行模式(mutiline)，会修改 ^ 和 $ 的行为。默认情况下，^ 和 $ 会匹配字符串的开始和结尾处，加上m修饰符，^ 和 $ 还会匹配行首和行尾，即 ^ 和 $ 会识别换行符(\n)。
```js
/world$/.test('hello world\n'); // false
/world$/m.test('hello world\n'); // true
```

## 组匹配
### 概述
正则表达式的圆括号表示分组匹配，括号中的模式可以用来匹配分组的内容。
```js
/book+/.test('bookkk'); // true
/(book)+/.test('bookbook'); // true
```

```js
/(.)b(.)/.exec('abcabc'); // ['abc', 'a', 'c']
'abcabc'.match(/(.)b(.)/); // ['abc', 'a', 'c']
```

对于使用g修饰符的正则表达式，字符串的match()方法不会捕获分组的内容。
```js
'abcabc'.match(/(.)b(.)/g); // ['abc', 'abc']
```

正则表达式内部，可以使用\n引用组匹配的内容，n是从1开始的自然数。
```js
/(.)b(.)\2b\1/.test('abccba'); // true
```

### 非捕获组
(?:x)称为非捕获组(Non-capturing group)，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。
```js
'abcabc'.match(/(?:.)b(.)/); // ['abc', 'c']
```

### 先行断言
x(?=y)称为先行断言(positive look-ahead)，x只有在y之前才会被匹配，y不会计入返回结果。
```js
'123abc100%'.match(/\d+(?=%)/); // ['100']
```

### 先行否定断言
x(?!y)称为先行否定断言(negative look-ahead)，x只有不在y之前才会被匹配，y不会计入返回结果。
```js
'123abc100%'.match(/\d+(?!\w)/); // ['100']
```










