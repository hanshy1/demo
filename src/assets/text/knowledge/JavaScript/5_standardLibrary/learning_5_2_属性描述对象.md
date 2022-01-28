# 一、概述
JS提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。

属性描述对象提供6个元属性。
* value: value是该属性的属性值，默认为undefined。
* writable: writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
* enumerable: enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
* configurable: configurable是一个布尔值，表示属性的可配置性，默认为true。如果设为false，将阻止某些操作改写属性描述对象。
* get: get是一个函数，表示该属性的取值函数（getter），默认为undefined。
* set: set是一个函数，表示该属性的存值函数（setter），默认为undefined。

# 二、Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptor()方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```
Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，不能用于继承的属性。

# 三、Object.getOwnPropertyNames()
Object.getOwnPropertyNames方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。

# 四、Object.defineProperty()，Object.defineProperties()
Object.defineProperty()方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象。
```js
Object.defineProperty(object, propertyName, attributesObject)
// object：属性所在的对象
// propertyName：字符串，表示属性名
// attributesObject：属性描述对象
```

如果一次性定义或修改多个属性，可以使用Object.defineProperties()方法。
```js
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
```

注意，一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错。

Object.defineProperty()和Object.defineProperties()参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false。

# 五、Object.prototype.propertyIsEnumerable()
实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。  
这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false。

# 六、元属性
属性描述对象的各个属性称为“元属性”，因为它们可以看作是控制属性的属性。

## 1. value
value属性是目标属性的值。
```js
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value // 123
```

## 2. writable
writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。
```js
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a // 37
obj.a = 25;
obj.a // 37
```

正常模式下，对writable为false的属性赋值不会报错，只会默默失败。严格模式下，会报错。

如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性。
```js
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);

obj.foo = 'b';
obj.foo // 'a'
```
但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。
```js
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
});

obj.foo // "b"
```

## 3. enumerable
enumerable（可遍历性）返回一个布尔值，表示目标属性是否可遍历。

如果一个属性的enumerable为false，下面三个操作不会取到该属性。
* for..in循环
* Object.keys方法
* JSON.stringify方法

in运算符不管某个属性是对象自身的还是继承的，都会返回true。

只有可遍历的属性(包括继承的属性)，才会被for...in循环遍历，同时还规定toString这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了for...in循环的可用性。

Object.keys方法不包括继承的或不可遍历的属性。如果需要获取对象自身的所有属性(不包括继承的属性)，不管是否可遍历，可以使用Object.getOwnPropertyNames方法。

JSON.stringify方法会排除enumerable为false的属性，有时可以利用这一点。如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的enumerable设为false。

## 4. configurable
configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。  
configurable为false时，writable、enumerable和configurable都不能被修改了。
* writable属性只有在false改为true时会报错，true改为false是允许的。
* value属性的情况比较特殊。只要writable和configurable有一个为true，就允许改动value。
* 目标属性不能被删除（delete）

```js
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p
```

# 七、存取器
属性还可以用存取器（accessor）定义。存值函数称为setter，使用属性描述对象的set属性；取值函数称为getter，使用属性描述对象的get属性。

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。

有两种写法。
```js
// 写法一
var obj1 = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});

obj1.p // "getter"
obj1.p = 123 // "setter: 123"

// 写法二
var obj2 = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};
```

# 八、控制对象的状态
有时需要冻结对象的读写状态，防止对象被改变。  
JavaScript 提供了三种冻结方法，最弱的一种是Object.preventExtensions，其次是Object.seal，最强的是Object.freeze。

## 1. Object.preventExtensions()
Object.preventExtensions方法可以使得一个对象无法再添加新的属性。但是可以修改原有的属性的值。因为可写性由writable决定。
```js
var obj = { a: 1 };
Object.preventExtensions(obj);

Object.defineProperty(obj, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

obj.p = 1;
obj.p // undefined

obj.a = 2;
obj.a // 2
```

## 2. Object.isExtensible()
Object.isExtensible方法用于检查一个对象是否可以添加属性。返回false，表示已经不能添加新属性了。

## 3. Object.seal()
Object.seal方法使得一个对象既无法添加新属性，也无法删除旧属性。但是可以修改原有的属性的值。
```js
var obj = { p: 'hello' };
Object.seal(obj);

delete obj.p;
obj.p // "hello"

obj.x = 'world';
obj.x // undefined
```
Object.seal实质是把属性描述对象的configurable属性设为false，因此属性描述对象不再能改变了。

## 4. Object.isSealed()
Object.isSealed方法用于检查一个对象是否使用了Object.seal方法。  
使用Object.seal方法后，Object.isExtensible方法也返回false。
```js
var obj = { p: 'a' };

Object.seal(obj);
Object.isSealed(obj) // true
Object.isExtensible(obj) // false
```

## 5. Object.freeze()
Object.freeze方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。
```js
var obj = {
  p: 'hello'
};

Object.freeze(obj);

obj.p = 'world';
obj.p // "hello"

obj.t = 'hello';
obj.t // undefined

delete obj.p // false
obj.p // "hello"
```
这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错。

## 6. Object.isFrozen()
Object.isFrozen方法用于检查一个对象是否使用了Object.freeze方法。

## 7. 局限性
上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
```js
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t
// hello
```
可以通过把原型对象也冻住，来解决这个问题。

另外一个局限是，如果属性值是对象，上面这些方法只能冻结参数指向的对象，而不能冻结参数对象属性值指向的对象。
```js
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```
obj.bar属性指向一个数组，obj对象被冻结以后，这个指向无法改变，即无法指向其他值，但是所指向的数组是可以改变的。

