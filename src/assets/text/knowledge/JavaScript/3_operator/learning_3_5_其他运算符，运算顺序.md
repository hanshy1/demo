# 一、void运算符
void运算符的作用是执行一个表达式，然后不返回任何值，或者说返回undefined。
```js
void 0 // undefined
void(0) // undefined
```

这个运算符的主要用途是浏览器的书签工具（Bookmarklet），以及在超级链接中插入代码防止网页跳转。
```js
<a href="javascript: void(document.form.submit())">提交</a>
<!-- 用户点击链接提交表单，但是不产生页面跳转。 -->
```

# 二、逗号运算符
逗号运算符用于对两个表达式求值，并返回后一个表达式的值。
```js
'a', 'b' // "b"

var value = (console.log('Hi!'), true);
// Hi!

value // true
```

# 三、运算顺序
## 1. 优先级
JavaScript 各种运算符的优先级别（Operator Precedence）是不一样的。优先级高的运算符先执行，优先级低的运算符后执行。

## 2. 圆括号
圆括号的优先级是最高的，所以可以用圆括号来提高运算的优先级。

运算符的优先级别十分繁杂，且都是硬性规定，因此建议总是使用圆括号，保证运算顺序清晰可读，这对代码的维护和除错至关重要。

圆括号不是运算符，而是一种语法结构。它一共有两种用法：一种是把表达式放在圆括号之中，提升运算的优先级；另一种是跟在函数的后面，作用是调用函数。

因为圆括号不是运算符，所以不具有求值作用，只改变运算的优先级。
```js
var x = 1;
(x) = 2;
```

圆括号之中，只能放置表达式，如果将语句放在圆括号之中，就会报错。
```js
(var a = 1) // SyntaxError: Unexpected token var
```

## 3. 左结合和右结合
左结合（left-to-right associativity），右结合（right-to-left associativity）。

JS中大部分运算符都是左结合，右结合运算符：
* 赋值运算符
* 三元条件运算符
* 指数运算符

```js
w = x = y = z;
q = a ? b : c ? d : e ? f : g;
a ** b ** c;

w = (x = (y = z));
q = a ? b : (c ? d : (e ? f : g));
a ** (b ** c);
```

可以使用圆括号提升运算的优先级。

