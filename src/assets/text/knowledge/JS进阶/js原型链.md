# 概述
原型是一个包含诸多属性和方法的对象。实例对象可以通过__proto__属性来访问原型对象上的属性和方法，而原型对象也具有__proto__属性，可以访问另一个原型对象的属性和方法，如此递进形成了一种链式结构，称为原型链。原型链的顶端是null。

## 原型链的作用
js中每个函数都有prototype属性。实例对象的__proto__属性，指向了构造函数的prototype属性，所以prototype属性指向了构造函数的原型对象。
```js
function Parent() {
    this.name = 'a'
}
var parent = new Parent()
console.log(parent.__proto__ == Parent.prototype) // true

console.log(parent.age) // undefined
Parent.prototype.age = 30
console.log(parent.age) // 30
```

访问实例对象上的属性或方法时，首先会在实例对象本身中寻找，如果实例对象本身没有该属性，则会通过__proto__属性到构造函数的原型对象上寻找，原型对象上也没有的话则会通过原型对象的__proto__继续向上寻找，直到到达null时JS引擎返回undefined。  

如果实例对象需要一些通用的属性或方法，那么可以在构造函数中声名这些属性，这样实例对象中就会包含这些属性的副本。但是对于这些通用属性，并不需要每个实例对象都维护一份副本，这会造成资源的浪费，并且无法统一修改。原型链解决了此问题，通过将属性或方法设置在构造函数的原型对象上，每个实例对象都可以通过原型链共用这些属性和方法的唯一实例，节省了资源。

原型链有以下几个作用：
* 实现继承：将对象的__proto__指向另一个对象，可以继承另一个对象的属性和方法，即子对象继承父对象。
* 共享属性和方法：通过原型链可以实现多个对象共享同一个原型对象的属性和方法，节省资源空间。
* 方便扩展对象的能力：在实例对象的原型对象上追加的属性和方法，可以被所有实例对象继承，扩展了实例对象的能力。

## js万物皆对象
有一个很常见的说法“JS中万物皆对象，函数是第一等公民”。  
首先来分析何为“JS中万物皆对象”，从字面来理解，这句话的意思是JS中所有数据都是对象，但我们熟知JS分为基础数据类型和引用数据类型。
* 基础数据类型：number、string、boolean、undefined、null、Symbol、BigInt
* 引用数据类型：各种对象（Object、Array、Function等）

这里我们先了解基础数据类型和引用数据类型的区别：  
js引擎底层将分配到的内存分为代码区和数据区，代码区主要用来存储变量名，数据区用来存储赋值的数据。数据区分为Stack栈内存和Heap堆内存。  
js引擎存储数据时，将基础数据类型的值和对象的Heap堆内存地址存放在Stack栈内存中；将引用数据类型的值存放在Heap堆内存中。  
所以基础数据类型和引用数据类型的存储方式不同。基础数据类型是通过拷贝存储的，将一个变量的值赋值给其他变量，会在内存中拷贝一份新的数据，所以修改变量的值不会影响到其他变量；引用类型的值再赋值给其他变量时，内存中拷贝的是变量的地址，所以修改变量的值会导致其他变量的值一起改变。
```js
var num1 = 123
var num2 = num1
var num2 = 456
console.log(num1) // 123

var obj1 = { v: "123" }
var obj2 = obj1
obj2.v = "456"
console.log(obj1.v) // "456"
```
从存储方式来看，基础数据类型和对象是有区别的，但是js中有一个“包装对象”的概念。包装对象是指三种基础数据类型number、string、boolean在一定条件下，会自动转为对应的Number、String、Boolean包装对象。
```js
"abc".length // 3
```
这里“abc”是字符串字面量，本身不是对象，不能调用length属性。但是js引擎自动将其转换为包装对象，从而获得了String实例对象的能力，也就是说number、string、boolean可以通过包装对象的__proto__调用原型链上的方法。  
对于undefined，它表示未定义，不是一个确切的值，所以它不是对象也没有原型。对于null，它也不是一个对象，作为原型链的顶端也没有原型。  

所以“js中万物皆对象”可以理解为除了undefined和null这两个特殊值以外的所有数据，都可以作为对象来使用，它们都可以通过__proto__找到原型对象及构造函数。

## 函数是一等公民
我们理解了“js万物皆对象”后，知道了js中除了undefined和null以外的数据都能通过原型链找到原型对象，下面来了解为何“函数是一等公民”。

我们先来看一段实例对象的原型链代码：
```js
function Parent() {
    this.name = 'a'
}
var parent = new Parent()

console.log(parent.__proto__ == Parent.prototype) // true
console.log(Parent.prototype.__proto__ == Object.prototype) // true
console.log(Parent.__proto__ == Function.prototype) // true
console.log(Function.prototype.__proto__ == Object.prototype) // true
console.log(Object.prototype.__proto__) // null
```
由以上代码可知，实例对象parent的__proto__指向构造函数Parent的原型对象（Parent.prototype），Parent原型对象的__proto__指向Object的原型对象（Object.prototype），Object原型对象的__proto__指向null。而构造函数Parent本身的__proto__指向Function的原型对象（Function.prototype），Function原型对象__proto__指向Object原型对象，最终指向null。  

由此可以看出原型链的顶端是null，null之下是Object的原型对象（Object.prototype）。  

再来看一段构造函数的原型链代码：
```js
function Parent() {
    this.name = 'a'
}

console.log(Parent.__proto__ == Function.prototype) // true
console.log(Parent.prototype.__proto__ == Object.prototype) // true
console.log(String.__proto__ == Function.prototype) // true
console.log(String.prototype.__proto__ == Object.prototype) // true
console.log(Function.__proto__ == Function.prototype) // true
console.log(Function.prototype.__proto__ == Object.prototype) // true
console.log(Object.__proto__ == Function.prototype) // true
console.log(Object.prototype.__proto__ == null) // true
```
由此可以推导出所有构造函数的__proto__都指向Function的原型对象（Function.prototype），也就是所有构造函数都是由Function()构造出来的。  
这里容易让人混乱的是Function和Object之间的关系。

## 构造函数 new操作符

## prototype和__proto__、prototype和constructor