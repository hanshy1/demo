# 构造方法
对于Array()构造函数，不同的参数会有不同的结果。
```js
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

由于构造函数行为不一致，最好使用字面量生成数组。

# 静态方法
## Array.isArray()
Array.isArray方法返回一个布尔值，表示参数是否为数组。
可以弥补typeof对于数组识别的不足。
```js
var arr = []
typeof arr // "object"
Array.isArray(arr) // true
```

# 实例方法
## valueOf()，toString()
数组的valueOf方法返回数组本身。
数组的toString方法返回数组的字符串形式。
```js
var arr = [1, 2, 3, [4, 5, 6]];
arr.valueOf() // [1, 2, 3, [4, 5, 6]]
arr.toString() // "1,2,3,4,5,6"
```

## push()，pop()
push方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
pop方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。

对空数组使用pop方法，不会报错，而是返回undefined。

## shift()，unshift()
shift()方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
unshift()方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

对空数组使用shift方法，不会报错，而是返回undefined。

## join()
join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
如果数组成员是undefined或null或空位，会被转成空字符串。
```js
var arr = [1, 2, 3, null]

console.log(arr.join()) // "1,2,3"
console.log(arr.join('|')) //"1|2|3"
```

通过call方法，这个方法也可以用于字符串或类似数组的对象。

## concat()
concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
```js
['hello'].concat(['world', '1'])
// ["hello", "world", "1"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]
```

如果原数组包含对象，concat返回的新数组中原数组对象成员是浅拷贝。

## reverse()
reverse方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。

## slice()
slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
```js
var arr = [0, 1, 2, 3, 4]
arr.slice(1, 3); // [1, 2]
```
它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内）。
如果省略第二个参数，则一直返回到原数组的最后一个成员。
如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。

slice()方法的一个重要应用，是将类似数组的对象转为真正的数组。
```js
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 }) // ['a', 'b']
```

## splice()
splice()方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
arr.splice(start, count, addElement1, addElement2, ...);
splice的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。后面的参数表示要被插入数组的新元素。

如果只是单纯地插入元素，splice方法的第二个参数可以设为0。该方法可用于在数组中间插入元素
```js
var a = [1, 1, 1];
a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
```js
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

## sort()
sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
```js
['d', 'c', 'b', 'a'].sort() // ['a', 'b', 'c', 'd']
[11, 101].sort() // [101, 11]
```

可以给sort方法传入一个函数来进行自定义的排序。
```js
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]
```
参数函数本身接受两个参数，表示进行比较的两个数组元素。
如果该函数的返回值大于0，表示第一个元素排在第二个元素后面；其他情况下，都是第一个元素排在第二个元素前面。

自定义的排序函数应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致。

## map()
map()方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回，原数组不变。
```js
var arr = [1, 2, 3];
var arr1 = arr.map(function(elem, index, arr) => {
    return elem + 1;
}, this)
```
map接收一个callback函数作为参数，函数的elem参数代表当前元素，index代表当前索引，arr代表原数组。
map接收第二个参数，用于绑定callback中的this。

map方法会跳过数组中的空位。但是返回的数组中，空位所在的位置仍是空位。
```js
[1, , 2].map(function(item) { return 'a' }) // ['a', , 'a']
```

## forEach()
forEach用于遍历数组，但是没有返回值。
forEach接收参数的方式和map相同。
forEach中使用break不能跳出循环结构。
forEach也会跳过数组的空位。

## filter()
filter()方法用于过滤数组成员，满足条件的成员组成一个新数组返回，原数组不变。
filter接收参数的方式和map相同。

## some()，every()
这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。
some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。
接收参数方式和map相同。

## reduce()，reduceRight()
reduce()方法和reduceRight()方法依次处理数组的每个成员，最终累计为一个值。
reduce()是从左到右处理（从第一个成员到最后一个成员），reduceRight()则是从右到左处理。

```js
var arr = [1, 2, 3]
arr.reduce(function(previous, current, index, arr) {
    return previous + current;
}, init)
```
reduce和reduceRight接收一个callback函数作为参数。
* previous，第一个参数，代表上一次调用callback函数的返回值，必须参数。
* current，第二个参数，代表当前元素，必须参数。
* index， 第三个参数，代表当前索引，可选参数。
* arr，第四个参数，代表原数组，可选参数。
* init，初始值，作为第一次调用callback时previous的初始值。

省略init时，previous的初始值是数组的第一个元素。
推荐添加init参数，可以防止对空数组执行reduce会报错的问题。
```js
function add(prev, cur) {
  return prev + cur;
}

[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
```

## indexOf()，lastIndexOf()
indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
indexOf方法还可以接受第二个参数，表示搜索的开始位置。
```js
['a', 'b', 'c'].indexOf('a', 1) // -1

var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
```
这两个方法不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。因为这两个方法内部使用===运算符进行比较。



