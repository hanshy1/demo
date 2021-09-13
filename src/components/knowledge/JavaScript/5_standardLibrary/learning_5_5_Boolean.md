# 概述
作为构造函数，它主要用于生成布尔值的包装对象实例。
```js
var b = new Boolean(true)

typeof b // 'object'
b.valueOf() // true
```

# Boolean()方法实现类型转换
```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false
Boolean(false) // false
```
其他值作为Boolean()的参数都返回true。
