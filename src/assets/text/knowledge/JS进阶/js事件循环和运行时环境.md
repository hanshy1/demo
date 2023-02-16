# 异步
JS是一门单线程语言，所有JS代码都会在JS引擎的主线程上运行。浏览器渲染网页时，为了防止JS主线程和浏览器渲染线程同时对DOM元素进行操作，在JS主线程运行时，渲染线程将被挂起。JS代码通常是同步执行的，也就是按照书写顺序依次运行，如果同步执行的某段代码进行了过于复杂的运算，会导致主线程阻塞，渲染线程被挂起，结果就是网页卡死，无法响应用户的操作。单线程无法满足复杂的业务需求，所以JS引入了异步机制，异步代码会在合适的时机执行，使得JS具备了多任务处理能力。

常见的异步操作：
1. setTimeout()、setInterval()、事件监听的回调函数
2. Promise、queueMicrotask()、Mutation Observer
3. worker（web worker、service worker等）

# 事件循环
即使引入了异步机制，JS仍然是单线程的，同步和异步操作最终都在主线程中运行。JS引擎通过事件循环（event loops）来处理操作执行顺序问题。
了解事件循环前，需要先了解几个概念：
* 执行上下文（execution context）
* 运行时（runtime）
* 任务队列（task queue）
* 微任务队列（Microtask queue）
## 执行上下文
在代码运行时，JS引擎会创建对应的上下文，并且把上下文放到执行上下文堆栈（execution context stack）中，当一个上下文执行完毕时，再从上下文堆栈中销毁它。  







```js
function func() {
    window.addEventListener('custom event', handleCustomEvent, { once: true})
    window.dispatchEvent(new CustomEvent('custom event'))
    // 同步任务
    console.log('sync task 1')

    // 同步任务，注册timeout回调函数
    setTimeout(() => {
        console.log('async timeout 2')
    }, 200)

    // 同步任务，初始化Promise
    new Promise((resolve, reject) => {
        // 同步任务，初始化Promise
        console.log('sync task 2')
        resolve()
    }).then(() => {
        // 微任务
        console.log('async promise 1')
        
        setTimeout(() => {
            console.log('async timeout 1')
        }, 100)

        new Promise((res, rej) => {
            console.log('sync task 3')
            res()
        }).then(() => {
            console.log('async promise 2')
        })
        
        Promise.resolve().then(() => {
            console.log('async promise 3')
        })

        // return Promise.resolve()
    }).then(() => {
        console.log('async promise 4')
    })

}

function handleCustomEvent() {
    console.log('trigger custom event')
}

func()
```