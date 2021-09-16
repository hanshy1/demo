# 概述
JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

JSON对象只能是一个值，不能是两个或更多的值。

JSON 对值的类型和格式有严格的规定。
* 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
* 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
* 字符串必须使用双引号表示，不能使用单引号。
* 对象的键名必须放在双引号里面。
* 数组或对象最后一个成员的后面，不能加逗号。
```js
["one", "two", "three"]
{ "one": 1, "two": 2, "three": 3 }
```

# JSON 对象
JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：JSON.stringify()和JSON.parse()。

# JSON.stringify()
JSON.stringify()方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被JSON.parse()方法还原。
对于原始字符串，stringify()转换结果会带上双引号，这样将来还原的时候，就能知道这是一个字符串，而不是其他值。
```js
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
```

如果对象的属性是undefined、函数或 XML 对象等，该属性会被JSON.stringify()过滤。
```js
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```

如果数组的成员是undefined、函数或 XML 对象等，则这些值被转成null。
```js
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

正则对象会被转成空对象。

JSON.stringify()方法会忽略对象的不可遍历的属性。

## 第二个参数
JSON.stringify()方法还可以接受一个数组，作为第二个参数，指定参数对象的哪些属性需要转成字符串,只对对象的属性有效，对数组无效。
```js
JSON.stringify(['a', 'b'], ['0']) // "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0']) // "{"0":"a"}"
```

第二个参数还可以是一个函数，用来更改JSON.stringify()的返回值。
```js
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

这个处理函数会递归处理所有的键。
```js
var obj = {a: {b: 1}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(obj, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'
```
递归处理中，每一次处理的对象，都是前一次返回的值。
```js
var obj = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(obj, f)
// "{"b": 4}"
```

如果处理函数返回undefined或没有返回值，则该属性会被忽略。
```js
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: "abc", b: 123 }, f)
// '{"b": 123}'
```

## 第三个参数
JSON.stringify()还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。

默认返回的是单行字符串，对于大型的 JSON 对象，可读性非常差。第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）。
```js
// 默认输出
JSON.stringify({ p1: 1, p2: 2 })
// JSON.stringify({ p1: 1, p2: 2 })

// 分行输出
JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
// {
// 	"p1": 1,
// 	"p2": 2
// }
```

上面例子中，第三个属性\t在每个属性前面添加一个制表符，然后分行显示。
第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。
```js
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/
```

## 参数对象的 toJSON() 方法
如果参数对象有自定义的toJSON()方法，那么JSON.stringify()会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

```js
var user = {
  firstName: '三',
  lastName: '张',
  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
```

Date对象就有一个自己的toJSON()方法。
```js
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```

# JSON.parse()
JSON.parse()方法用于将 JSON 字符串转换成对应的值。
```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错。
```js
JSON.parse("'String'") // illegal single quotes 
// SyntaxError: Unexpected token ILLEGAL
```

为了防止解析错误，可以将JSON.parse()放在try...catch中。

JSON.parse()方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify()方法类似。
```js
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```





