# 定义
JS中三种原始数据类型——数值、布尔值、字符串，在一定条件下，会自动转换为对象，也就是原始类型的“包装对象”(wrapper)。

所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

```js
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```

# 原始类型与实例对象的自动转换
某些场合，原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例。
```js
'abc'.length // 3
```
JS引擎自动将字符串字面量转换为包装对象，在这个对象上调用length属性，结束后自动销毁这个包装对象实例。

包装对象是只读的，无法添加属性。
```js
var str = 'abc'
str.a = 1
str.a // undefined
```

由于包装对象的实例会自动销毁，所以下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。

