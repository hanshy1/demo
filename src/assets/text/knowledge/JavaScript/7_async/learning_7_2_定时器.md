# setTimeout()
setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。
```js
var timerId = setTimeout(func|code, delay);
```
setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码，第二个参数delay是推迟执行的毫秒数。

setTimeout的第二个参数如果省略，则默认为0。

除了前两个参数，setTimeout还允许更多的参数。它们将依次传入推迟执行的函数（回调函数）。
```js
setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
```

回调函数中的this，如果没有用bind绑定this的上下文环境，会指向全局环境。

# setInterval()
setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。

# clearTimeout()，clearInterval()
setTimeout和setInterval函数，都返回一个整数值，表示计数器编号。将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。

# 事件防抖（debounce）
假设用户连续点击时会多次触发回调函数，但我们只希望触发最后一次。
```js
$('button').on('click', ajaxAction);
```

我们可以通过setTimeout实现事件防抖，在给定时间内不在点击时，才会触发方法。
```js
$('button').on('click', ajaxAction());

function ajaxAction() {
    var timeout = null;
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            // statement
        }, 100)
    }
}
```

# 运行机制
setTimeout和setInterval都是在指定的时间后，将事件加入任务队列，并不能保证回调事件一定按照指定的时间运行。
如果上一个任务耗时长，回调事件将会推迟运行。









