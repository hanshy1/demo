# 对象
面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。  
它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。  
对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发。

* 对象是单个实物的抽象。
当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

* 对象是一个容器，封装了属性（property）和方法（method）。
属性是对象的状态，方法是对象的行为。

# 构造函数
典型的面向对象编程语言（比如 C++ 和 Java），都有“类”（class）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。  
但JS的对象体系，不是基于“类”的，而是基于构造函数（constructor）和原型链（prototype）的。

JavaScript 语言使用构造函数（constructor）作为对象的模板。构造函数就是一个普通的函数，但具有自己的特征和用法。
```js
var Vehicle = function () {
  this.price = 1000;
};
var obj = new Vehicle() // { price: 1000 }
```
构造函数的特点有两个。
* 函数体内部使用了this关键字，代表了要生成的对象实例。
* 生成对象的时候，必须使用new命令。

# new命令
new命令的作用就是执行构造函数，返回一个实例对象。

对于构造函数，如果直接执行，可能会污染全局变量。
```js
var Vehicle = function (){
  this.price = 1000;
};

var v = Vehicle();
v // undefined
price // 1000
```

可以在构造函数中使用严格模式“use strict”或者判断是否使用了new命令。
```js
var Vehicle = function Func(){
  'use strict';
  if (!this instanceof Func)
  this.price = 1000;
};
```

## new命令的原理
使用new命令时，它后面的函数依次执行下面的步骤。
* 生成一个空对象，作为将要返回的对象实例。
* 将这个对象的原型，指向构造函数的原型对象prototype。
* 将这个空对象赋值给函数内部的this关键字。
* 开始执行构造函数中的方法体。

也就是说，构造函数内部的this指向一个空对象，所有对this执行的操作都会发生在这个空对象上。

如果构造函数内部有return语句，而且return一个对象，new命令就会返回这个指定的对象；否则只会返回this对象。

另外，如果对普通函数使用new命令，则会返回一个空对象（因为普通函数中没有this）。

## new.target
函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
```js
function f() {
  console.log(new.target === f);
}

f() // false
new f() // true
```

# Object.create()创建实例对象
以现有的对象作为模板生成对象时，可以使用Object.create()方法。
```js
var person1 = {
  name: '张三',
  age: 38
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```
对象person1是person2的模板，后者继承了前者的属性和方法。
