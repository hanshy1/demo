# 概述
1. 任何保存在变量中的都是一个对象，所有对象都是对应一个类的实例。所有对象继承自Object类。
2. Dart是强类型的，但是Dart可以推断类型，所以类型注释是可选的。如果明确说明不需要任何确定的类型，需要使用特殊类型dynamic。
3. Dart支持泛型，如List<int>（整数列表）或List<dynamic>（任何类型的对象列表）。
4. Dart支持顶级函数（main()），函数绑定在类或对象上（静态函数和实例函数）。以及支持函数内创建函数（嵌套或局部函数）。
5. Dart支持顶级变量，变量绑定在类或对象上（静态变量和实例变量）。实例变量有时称为字段或属性。
6. Dart没有关键字public、protected、private。如果变量标识符以下划线(_)开头，则它相对于库是私有的。
7. 标识符以字母或下划线(_)开头，后跟任意字母和数字组合。
8. Dart语法包含表达式(expressions)和语句(statements)。表达式是为了得到返回值的计算式，语句是为了执行某些任务的操作。

# 变量
```dart
var name = 'Bob'
```
创建一个变量并初始化，变量仅存储对象引用，这里是name存储了一个String类型的对象引用。‘Bob’是这个String类型对象的值。
使用var声明的变量，赋值后变量类型被推断为String，之后再赋予其他类型值会报错。
```dart
var name 'Bob'
name = 123 // error
```
如果需要不限定变量的类型，可以将变量指定为对象类型或动态类型。
```dart
dynamic name = 'Bob'
name = 123 // success

Object n = '123'
n = 123 // success
```

## 默认值
声明但没有赋值的变量，默认值为null。
```dart
String str;
str // null
```

## Final和Const
Dart使用Final和Const声明常量（使用过程中从来不会被修改的变量）。Final变量的值只能被设置一次；Const变量在编译时就已经固定（Const变量是隐式Final的类型）最高级final变量或类变量在第一次使用时被初始化。






