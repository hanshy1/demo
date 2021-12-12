# 概述
简单说，this就是属性或方法所在的对象。
this.property，this代表property所在的对象。

由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的。

JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。

# 实质
JS语言之所以有this的设计，跟内存中的数据结构有关。
```js
var obj = { foo:  5 };
```
JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。也就是说，变量obj是一个地址（reference）。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性。
原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。
```js
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```
此时foo的值存在value里面。

属性的值为一个函数时，JS引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。
由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。
```js
var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()
```

JavaScript 允许在函数体内部，引用当前环境的其他变量。
```js
var f = function () {
  console.log(x);
};
```
函数体中x由运行环境提供。

this的设计目的就是能够在函数体内部获得当前的运行环境（context）。
```js
var x = 1
var f = function () {
  console.log(this.x);
}

f()
f.call({x: 2})
```

# 使用场合
## 全局环境
全局环境使用this，它指的就是顶层对象window。

## 构造函数
构造函数中的this，指的是实例对象。

## 对象的方法
如果对象的方法里包含this，this的指向就是方法运行时所在的对象。

# 使用注意点
## 避免多层this
```js
var o = {
  f1: function () {
    console.log(this);
    // const that = this
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
```
第一个this指向o，第二个this指向window,可以使用一个变量保存this来指向外层的this。
严格模式下，如果函数内部的this指向全局变量，就会报错。

# 修改this绑定的方法
## Function.prototype.call()
call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。
```js
var obj = {};

var f = function () {
  return this;
};

f() === window // true
f.call(obj) === obj // true
```
call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。

call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。

## Function.prototype.apply() 
apply和call的调用方式类似，也是改变this指向，区别是接收一个数组作为函数执行时的参数。
```js
func.apply(thisValue, [arg1, arg2, ...])
```

## Function.prototype.bind()
bind()方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
如果bind()方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）。

bind方法每次都返回一个新函数。

结合call使用：
```js
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) // [1]
```
相当于Array.prototype.slice.call()




