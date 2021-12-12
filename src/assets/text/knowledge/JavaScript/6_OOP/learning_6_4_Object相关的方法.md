# Object.getPrototypeOf()
Object.getPrototypeOf方法返回参数对象的原型。这是获取原型对象的标准方法。
```js
Object.getPrototypeOf(Function) // Function.prototype
```

# Object.setPrototypeOf()
Object.setPrototypeOf方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。
```js
var a = {};
var b = {x: 1};
Object.setPrototypeOf(a, b);

Object.getPrototypeOf(a) === b // true
a.x // 1
```

# Object.create()
该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。
```js
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
```

如果想要生成一个不继承任何属性（比如没有toString()和valueOf()方法）的对象，可以将Object.create()的参数设为null。

使用Object.create()方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。

Object.create()方法还可以接受第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。
```js
var obj = Object.create({}, {
  p1: {
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
```

# Object.prototype.isPrototypeOf()
实例对象的isPrototypeOf方法，用来判断该对象是否为参数对象的原型。
```js
var o1 = {};
var o2 = Object.create(o1);

o1.isPrototypeOf(o2) // true
```

# Object.prototype.__proto__
实例对象的__proto__属性（前后各两个下划线），返回该对象的原型对象。该属性可读写。

__proto__属性只有浏览器才需要部署，其他环境可以没有这个属性。
它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用Object.getPrototypeOf()和Object.setPrototypeOf()，进行原型对象的读写操作。

获取实例对象obj的原型对象，有三种方法。
```js
obj.__proto__
obj.constructor.prototype
Object.getPrototypeOf(obj)
```
__proto__属性只有浏览器才需要部署，其他环境可以不部署。而obj.constructor.prototype在手动改变原型对象时，可能会失效。
因此，推荐使用第三种方式取得原型对象。

# Object.getOwnPropertyNames()
Object.getOwnPropertyNames方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名。
```js
Object.getOwnPropertyNames(Date)
// ["parse", "arguments", "UTC", "caller", "name", "prototype", "now", "length"]
```
Object.getOwnPropertyNames方法返回所有键名，不管是否可以遍历。只获取那些可以遍历的属性，使用Object.keys方法。

# Object.prototype.hasOwnProperty()
对象实例的hasOwnProperty方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。
```js
Date.hasOwnProperty('length') // true
Date.hasOwnProperty('toString') // false
```

# in 运算符和 for...in 循环
in运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。

获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用for...in循环。








