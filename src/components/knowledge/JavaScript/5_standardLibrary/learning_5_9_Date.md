# 概述
Date对象是 JavaScript 原生的时间库。
它以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）。

# 普通函数的用法
Date对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。
无论有没有参数，直接调用Date总是返回当前时间。
```js
Date() // "Tue Dec 01 2021 09:34:43 GMT+0800 (CST)"
Date(2000, 1, 1) // "Tue Dec 01 2021 09:34:43 GMT+0800 (CST)"
```

# 构造函数的用法
使用new命令构造一个Date对象，不带参数时实例代表的是当前时间。
Date实例有一个独特的地方，Date实例求值的时候，默认调用的是toString()方法，返回一个对应时间的字符串。
```js
var today = new Date();

today // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
// 等同于
today.toString() // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
```

作为构造函数时，Date对象可以接受多种格式的参数。
```js
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```

关于Date构造函数的参数，有几点说明。
* 第一点，参数可以是负整数，代表1970年元旦之前的时间。
* 第二点，只要是能被Date.parse()方法解析的字符串，都可以当作参数。
* 第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。

参数为多个整数时，各个参数的取值范围如下。
* 年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
* 月：0表示一月，依次类推，11表示12月。
* 日：1到31。
* 小时：0到23。
* 分钟：0到59。
* 秒：0到59
* 毫秒：0到999。
除了日期的默认值为1，小时、分钟、秒钟和毫秒的默认值都是0。
这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月。

# 日期的运算
类型自动转换时，Date实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。
两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；
进行加法运算时，返回的是两个字符串连接而成的新字符串。

# 静态方法
## Date.now()
Date.now方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以1000。

## Date.parse()
Date.parse方法用来解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数。
如果解析失败，返回NaN。
```js
Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('xxx') // NaN
```

## Date.UTC()
Date.UTC方法接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。
该方法的参数用法与Date构造函数完全一致。
```js
// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567)
// 1293847384567
```

# 实例方法
Date的实例对象，有几十个自己的方法，除了valueOf和toString，可以分为以下三类。
* to类：从Date对象返回一个字符串，表示指定的时间。
* get类：获取Date对象的日期和时间。
* set类：设置Date对象的日期和时间。

## Date.prototype.valueOf()
valueOf方法返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法。
```js
var d = new Date();

d.valueOf() // 1362790014817
d.getTime() // 1362790014817
```
预期为数值的场合，Date实例会自动调用该方法，所以可以用下面的方法计算时间的间隔。

## to 类方法
### Date.prototype.toString()
toString方法返回一个完整的日期字符串。
因为toString是默认的调用方法，所以如果直接读取Date实例，就相当于调用这个方法。

### Date.prototype.toUTCString()
toUTCString方法返回对应的 UTC 时间，也就是比北京时间晚8个小时。

### Date.prototype.toISOString()
toISOString方法返回对应时间的 ISO8601 写法。
toISOString方法返回的总是 UTC 时区的时间。

### Date.prototype.toJSON()
toJSON方法返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同。

### Date.prototype.toDateString()
toDateString方法返回日期字符串（不含小时、分和秒）。
```js
var d = new Date(2013, 0, 1);
d.toDateString() // "Tue Jan 01 2013
```

### Date.prototype.toTimeString()
toTimeString方法返回时间字符串（不含年月日）。
```js
var d = new Date(2013, 0, 1);
d.toTimeString() // "00:00:00 GMT+0800 (CST)"
```

### 本地时间
以下三种方法，可以将 Date 实例转为表示本地时间的字符串。
* Date.prototype.toLocaleString()：完整的本地时间。
* Date.prototype.toLocaleDateString()：本地日期（不含小时、分和秒）。
* Date.prototype.toLocaleTimeString()：本地时间（不含年月日）。
```js
var d = new Date(2013, 0, 1);

d.toLocaleString()
// 中文版浏览器为"2013年1月1日 上午12:00:00"
// 英文版浏览器为"1/1/2013 12:00:00 AM"

d.toLocaleDateString()
// 中文版浏览器为"2013年1月1日"
// 英文版浏览器为"1/1/2013"

d.toLocaleTimeString()
// 中文版浏览器为"上午12:00:00"
// 英文版浏览器为"12:00:00 AM"
```




