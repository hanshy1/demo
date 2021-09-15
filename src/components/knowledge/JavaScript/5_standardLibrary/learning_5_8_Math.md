# 概述
Math是JS的原生对象，提供各种数学计算功能。
对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。

# 静态属性
* Math.E：常数e。
* Math.LN2：2 的自然对数。
* Math.LN10：10 的自然对数。
* Math.LOG2E：以 2 为底的e的对数。
* Math.LOG10E：以 10 为底的e的对数。
* Math.PI：常数π。
* Math.SQRT1_2：0.5 的平方根。
* Math.SQRT2：2 的平方根。
```js
Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951
```
这些属性都是只读的，不能修改。  

# 静态方法
* Math.abs()：绝对值
* Math.ceil()：向上取整
* Math.floor()：向下取整
* Math.max()：最大值
* Math.min()：最小值
* Math.pow()：幂运算
* Math.sqrt()：平方根
* Math.log()：自然对数
* Math.exp()：e的指数
* Math.round()：四舍五入
* Math.random()：随机数

## Math.max()，Math.min()
如果参数为空, Math.min返回Infinity, Math.max返回-Infinity。
```js
Math.min() // Infinity
Math.max() // -Infinity
```

## Math.sqrt()
Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN。
```js
Math.sqrt(-4) // NaN
```

## Math.exp()
Math.exp方法返回常数e的参数次方。
```js
Math.exp(1) // 2.718281828459045
```

## Math.random()
Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。

## 三角函数
* Math.sin()：返回参数的正弦（参数为弧度值）
* Math.cos()：返回参数的余弦（参数为弧度值）
* Math.tan()：返回参数的正切（参数为弧度值）
* Math.asin()：返回参数的反正弦（返回值为弧度值）
* Math.acos()：返回参数的反余弦（返回值为弧度值）
* Math.atan()：返回参数的反正切（返回值为弧度值）