# 一、概述
JS的所有其他对象都继承自Object对象，即那些对象都是Object的实例。

# 二、Object()
Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。  
如果参数为空（或者为undefined和null），Object()返回一个空对象。
```js
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true
```
如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例。  
如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。

# 三、Object()构造函数
Object()可以当做构造函数，即前面可以使用new命令。
```js
var obj = new Object();
```
注意，通过var obj = new Object()的写法生成新对象，与字面量的写法var obj = {}是等价的。或者说，后者只是前者的一种简便写法。

# 四、Object的静态方法
## 1. Object.keys()，Object.getOwnPropertyNames()
Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。  
Object.getOwnPropertyNames方法与Object.keys类似，区别是Object.keys方法只返回可枚举的属性，Object.getOwnPropertyNames还可以返回不可以枚举的属性名。
```js
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

## 2. Object的其他静态方法
1. 对象属性模型的相关方法
* Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
* Object.getOwnPropertyDescriptors(): 获取对象的全部属性描述对象。
* Object.defineProperty()：通过描述对象，定义某个属性。
* Object.defineProperties()：通过描述对象，定义多个属性。

2. 控制对象状态的方法
* Object.preventExtensions()：防止对象扩展。
* Object.isExtensible()：判断对象是否可扩展。
* Object.seal()：禁止对象配置。
* Object.isSealed()：判断一个对象是否可配置。
* Object.freeze()：冻结一个对象。
* Object.isFrozen()：判断一个对象是否被冻结。

3. 原型链方法
* Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
* Object.getPrototypeOf()：获取对象的Prototype对象。

# 五、Object的实例方法
定义在Object.prototype上的方法，可以被所有对象实例调用。

主要有以下6个：
* Object.prototype.valueOf()：返回当前对象对应的值。
* Object.prototype.toString()：返回当前对象对应的字符串形式。
* Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
* Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
* Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
* Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

# 六、遍历对象属性的方法
* for...in...: 不包含不可枚举的属性，包含继承的属性
* Object.keys(): 不包含不可枚举的属性，不包含继承的属性
* Object.getOwnPropertyNames(): 包含不可枚举的属性，不包含继承的属性




