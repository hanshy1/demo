# 概述
JS的继承通过原型链实现，ES6中引入了class语法的继承实现。

# 原型对象
## 构造函数的缺点
通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。
```js
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

cat1.meow === cat2.meow // false
```
cat1和cat2是同一个构造函数的两个实例，它们都具有meow方法，但是生成了两次，所以不是同一个内存地址。

## prototype 属性的作用
JavaScript 继承机制的设计思想就是，构造函数的原型对象的所有属性和方法，都能被实例对象共享。  

JavaScript 规定，每个函数都有一个prototype属性，指向一个对象。  
对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。
```js
function Animal(name) {
    this.name = name;
}
Animal.prototype.color = 'red'

var cat1 = new Animal('cat1')
var cat2 = new Animal('cat2')

cat1.color // 'red'
cat2.color // 'red'
```

原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。

当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。这就是原型对象的特殊之处。

## Function.prototype
所有函数的原型都指向Function.prototype，包括Function本身。
```js
String.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype // true
Function.__proto__ === Function.prototype // true
```

Function.prototype本身是一个函数对象，包含call，apply，bind等方法（所有函数可以依靠原型链调用这些方法）。  
Function.prototype被设置为函数的原因是为了向后兼容ES5和以前的代码。本身可以接收任何参数，返回undefined，不具有prototype属性。
> The Function prototype object is specified to be a function object to ensure compatibility with ECMAScript code that was created prior to the ECMAScript 2015 specification.  
> https://262.ecma-international.org/6.0/#sec-properties-of-the-function-prototype-object
```js
typeof Function.prototype // "function"
Function.prototype.prototype // undefined
Function.prototype.__proto__ === Object.prototype // true
```
Function.prototype的原型指向Object.prototype，所有的函数都可以根据原型链调用Object.prototype上的方法。  
所有构造函数的原型指向Function.prototype，所以说“万物皆对象，函数是一等公民”。

## __proto__和prototype的区别
__proto__是浏览器中实现的属性。  
实例对象的__proto__属性用来指向原型链的上一层原型对象（一般是构造函数的prototype）。  
构造函数的prototype中定义的属性和方法，可以被实例对象继承引用（实例对象中没有进行覆盖时）。  
实例对象设置prototype属性没有实际意义，相当于普通的属性值。

# 原型链
JavaScript 规定，所有对象都有自己的原型对象（prototype）。  
一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

如果一层层的上溯，所有对象的的原型最终都可以上溯的Object.prototype。而Object.prototype的原型指向null。因此原型链的尽头就是null。
```js
Number.__proto__ // Function.prototype
Object.__proto__ // Function.prototype
Function.__proto__ // Function.prototype
Function.prototype.__proto__ // Object.prototype
Object.prototype.__proto__ // null

typeof Function.prototype // "function"
typeof Object.prototype // "object"
```

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。

在整个原型链上寻找属性是很耗费性能的，如果寻找某个不存在的属性，将遍历整个原型链。

## constructor 属性
prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
```js
function P() {}
P.prototype.constructor === P // true
```
constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。
另一方面，有了constructor属性，就可以从一个实例对象新建另一个实例。
constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。

# instanceof 运算符
instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
```js
var v = new Vehicle();
v instanceof Vehicle // true
// 等同于
Vehicle.prototype.isPrototypeOf(v)
```
instanceof会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。

由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true。
```js
var d = new Date();
d instanceof Date // true
d instanceof Object // true
```

由于任意对象（除了null）都是Object的实例，所以instanceof运算符可以判断一个值是否为非null的对象。
```js
var obj = { foo: 123 };
obj instanceof Object // true

null instanceof Object // false
```

instanceof运算符判断会失真的情况（一个对象的原型是null）
```js
var obj = Object.create(null)
obj instanceof Object // false
```

instanceof运算符只能用于对象，不适用原始类型的值。
```js
var str = 'abc'
str instanceof String // false
```

# 构造函数的继承
https://wangdoc.com/javascript/oop/prototype.html#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E7%BB%A7%E6%89%BF



