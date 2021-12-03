# 语句
语句（statement）是为了完成某种任务而进行的操作
```js
var a = 1 + 3;
```
1 + 3叫做表达式（expression），指一个为了得到返回值的计算式。
语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。
凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。

分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
```js
;;;
```

# 变量
## 概念
变量是对“值”的具名引用。
```js
var a = 1;
```
JavaScript 的变量名区分大小写

变量的声明和赋值，是分开的两个步骤
```js
var a;
a = 1;
```
如果只是声明变量而没有赋值，则该变量的值是undefined。undefined是一个特殊的值，表示“无定义”。

JavaScript 是一种动态类型语言，弱类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。

## 变量提升
JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。
结果就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。
```js
console.log(a);
var a = 1;
```

实际运行代码：
```js
var a;
console.log(a); // undefined
a = 1;
```

# 标识符
标识符（identifier）指的是用来识别各种值的合法名称。最常见的标识符就是变量名，以及函数名。

标识符命名规则如下。
* 第一个字符，可以是任意 Unicode 字母（包括英文字母和其他语言的字母），以及美元符号（$）和下划线（_）。
* 第二个字符及后面的字符，除了 Unicode 字母、美元符号和下划线，还可以用数字0-9。

JavaScript 有一些保留字，不能用作标识符：
```
arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、 finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。
```

# 区块
JavaScript 使用大括号，将多个相关的语句组合在一起，称为“区块”（block）。

# 条件语句
## if
```js
if (booleanValue1) {
    statement;
} else if (booleanValue2) {
    statement;
} else {
    statement;
}
```

## switch
```js
switch (value) {
    case 1:
        statement;
        // 使用break跳出switch结构，没有break时，会继续执行下一个case中的代码。
        break;
    case 2:
        statement;
        break;
    default:
        statement;
        break;
}
```
switch语句后面的表达式，与case语句后面的表示式比较运行结果时，采用的是严格相等运算符（===）,这意味着比较时不会发生类型转换。

## 三元运算符
```js
var value = (1 == 0) ? 1 : 0;
// value: 0
```

# 循环语句
## while循环
```js
while (booleanValue) {
    statement;  
}
```

## do while循环
```js
do {
    statemnent;
} while (booleanValue);
```
不管条件是否为真，do...while循环至少运行一次,while语句后面的分号注意不要省略。

## for循环
```js
for (初始化表达式; 条件; 递增表达式) {
  语句
}
```
for语句后面的括号里面，有三个表达式。
* 初始化表达式（initialize）：确定循环变量的初始值，只在循环开始时执行一次。
* 条件表达式（test）：每轮循环开始时，都要执行这个条件表达式，只有值为真，才继续进行循环。
* 递增表达式（increment）：每轮循环的最后一个操作，通常用来递增循环变量。

## break语句和continue语句
break语句用于跳出代码块或循环。
continue语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环。

## label标签
JavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。
```js
label:
  语句
```

标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句。
标签通常与break语句和continue语句配合使用，跳出特定的循环。
```js
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log('i=' + i + ', j=' + j);
    }
  }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```
上面代码为一个双重循环区块，break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

标签也可以用于跳出代码块。
```js
foo: {
  console.log(1);
  break foo;
  console.log('本行不会输出');
}
console.log(2);
// 1
// 2
```

continue语句也可以与标签配合使用。 
```js
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) continue top;
      console.log('i=' + i + ', j=' + j);
    }
  }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=2, j=0
// i=2, j=1
// i=2, j=2
```

上面代码中，continue命令后面有一个标签名，满足条件时，会跳过当前循环，直接进入下一轮外层循环。
如果continue语句后面不使用标签，则只能进入下一轮的内层循环。
