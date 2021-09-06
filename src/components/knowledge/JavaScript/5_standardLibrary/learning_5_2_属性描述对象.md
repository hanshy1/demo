# 概述
JS提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。

属性描述对象提供6个元属性。
* value: value是该属性的属性值，默认为undefined。
* writable: writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
* enumerable: enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
* configurable: configurable是一个布尔值，表示属性的可配置性，默认为true。如果设为false，将阻止某些操作改写属性描述对象。
* get: get是一个函数，表示该属性的取值函数（getter），默认为undefined。
* set: set是一个函数，表示该属性的存值函数（setter），默认为undefined。

# Object.getOwnPropertyDescriptor()
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

# Object.getOwnPropertyNames()
Object.getOwnPropertyNames方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。

# Object.defineProperty()，Object.defineProperties()
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

# Object.prototype.propertyIsEnumerable()
实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。
这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false。

# 元属性
属性描述对象的各个属性称为“元属性”，因为它们可以看作是控制属性的属性。

## value


