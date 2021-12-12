# 数组
数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。
除了在定义时赋值，数组也可以先定义后赋值。
```js
var arr = [];
arr[0] = 1;
arr[1] = 2;
```

## 数组的本质
本质上，数组属于一种特殊的对象。typeof 会返回 ‘object’。
数组的特殊性在于，它的键名是按次序排列的一组整数。数组的成员不用指定键名，而对象的每个成员必须指定键名。数组的成员只能使用方括号取值，对象还可以使用点运算符取值。

## length属性
数组的length属性，返回数组的成员数量。
JS使用一个32位的整数，保存数组的元素个数。这意味着数组最多能存储2^32 - 1个元素，length的最大值为2^32 - 1。

length属性是一个动态的值，它等于数组中最大的整数键加1。
```js
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[1000] = 'e';
arr.length // 1001
```
上面的代码表示，数组中的数字键不需要连续，length的值总是比最大的数字键大1。另外也表明数组是一种动态的数据结构，可随时增减成员。

length属性是可写的，如果改变了length的值，该数组的大小会自动增减到length设定的值。
```js
var arr1 = ['a', 'b', 'c']
arr1.length = 2
arr1 // ['a', 'b']

var arr2 = ['a']
arr.length = 1000
arr[1] // undefined 空位
```
清空数组的一个有效方法，就是给length赋值为0。

如果设置length的属性为不合法的值，JS会报错。
```js
// 设置负值
[].length = -1

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2, 32)

// 设置字符串
[].length = 'abc'
```

由于数组本质上是对象，所以可以为数组添加属性，只要不添加整数键名的属性，就不会影响length的值。
```js
var a = [];

a['p'] = 'abc';
a.length // 0

a[2.1] = 'abc';
a.length // 0
```
如果数组的键名是添加超出范围的数值，键名会自动转换为字符串。
```js
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length // 0
arr[-1] // "a"
arr[4294967296] // "b"
```

## in运算符
检查某个键名是否存在于数组上，可以用in运算符，适用于数组，也适用于对象。

如果数组的某个位置是空位，in运算符返回false。
```js
var arr = [];
arr[100] = 'a';

100 in arr // true
1 in arr // false
```

## for...in...循环
for...in...循环不仅会遍历数组的数字键，还会遍历数组的非数字键。
```js
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo
```
所以不推荐适用for...in...遍历数组，可以使用for，forEach方法。

## 数组的空位
当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。数组的最后一个元素后有逗号，不会产生空位。
数组的空位不影响length属性。
```js
var a = [1, , 3,]
a.length // 3
a[1] // undefined
```
数组的空位可以读取，返回undefined。

使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。
```js
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```
length属性不会过滤空位，所以使用length属性遍历数组时，需要小心。

数组某个位置是空位，和某个位置被赋值为undefined是不同的。如果是空位，使用forEach方法、for...in...结构、Object.keys()方法进行遍历时，会跳过空位。
```js
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 没有输出
```
也就是说，空位指的是数组没有这个元素，所以不会遍历到；而undefined表示数组有这个元素，值是undefined。

## 类似数组的对象
如果一个对象的所有键名都是正整数或零，并且有length属性，那个这个对象被称为类似数组的对象（array-like object）。
```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```
类数组对象不具有数组特有的方法。
类似数组的对象的根本特征，就是具有length属性，但length属性不是动态值。

典型的类似数组的对象是函数的arguments对象，DOM元素集，字符串等。
```js
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

数组的slice方法可以将类似数组的对象转换为数组。
```js
var arr = Array.prototype.slice.call(arrayLike);
```

通过call方法改变this指向，可以使类似数组的对象调用定义在数组原型上的方法。
```js
// forEach 方法
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}
```

这种方式比直接使用数组原生的forEach方法要慢，所以最好先用slice将其转为数组，在调用forEach方法。
```js
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```
