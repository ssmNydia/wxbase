# wxbase
封装微信小程序常用的基础功能

## 安装
``` bash
$ npm i -D wxbase
```

## 使用说明

将安装好的wxbase从 node_modules 拷贝到 utils 目录使用

若需要完整的wxbase，则引用wxbase.js

在app.js页面引入wxbase.js
``` bash
import wxbase from './utils/wxbase/wxbase'
// 并添加wxbase到App object参数中
App({
  wxbase
})
```

## 文件说明

wxbase.js 是包含微信基础功能、处理日期的常用功能和解决js浮点计算问题的计算功能。后续可能会继续增加新的类型。

允许按需引入

## 各个功能的使用说明

### 微信通用功能介绍

#### appUpdate

用于检测小程序是否有新版本，仅在 app.js 的 onLaunch 内调用，且仅调用一次。

``` javascript
wxbase.appUpdate()
```

#### sceneParam
用来获取二维码携带的参数。
该函数仅可在 onLoad 内调用，只在可扫码到达的页面内调用。

``` javascript
/**
 * 假设 scene = { id: 1 }
 */
onLoad({scene=null}) {
  if (scene) {
    let { id } = app.wxbase.sceneParam(scene)
  }
}
```

#### isShare
判断当前页面是否从分享方式进入
该函数只在app.js调用，且在进入的页面设置还原状态。
``` javascript
/**
 * app.js
 */
onShow({ scene }) {
  this.globalData.isShare = wxbase.isShare(scene)
}
/**
 * 具体进入的页面
 * 离开该页面时，分享状态还原
 */
onHide() {
  app.globalData.isShare = false
}
```

### 日期

#### format

日期格式化

第一个参数传 date，第二个参数传入格式化的要求

y、m、d等，是实际值

yy、mm、dd等，是补零后的值

``` javascript
format(new Date(), 'y-m-d h:i')
// 2019-7-4 9:4
format(new Date(), 'yy-mm-dd hh:ii:ss')
// 2019-07-04 09:04:08
format(new Date(), 'd日 hh:ii')
// 4日 09:04
```

#### countdownDate
距离date过去了多久，当大于天时，则仅计算天

``` javascript
let now = new Date()
let date1 = now.setSeconds(now.getSeconds() - 16)
countdownDate(date1)
// 16秒
let date2 = now.setMinutes(now.getMinutes() - 10)
countdownDate(date2)
// 10分钟
let date3 = now.setDate(now.getDate() - 1)
countdownDate(date3)
// 1天
```

### 计算

``` javascript
// 加法
console.log(2.2 + 2.1) // 4.300000000000001
addFn(2.2, 2.1) // 4.3
// 减法
console.log(1.4 - 1.1) // 0.2999999999999998
subFn(1.4, 1.1) // 0.3
// 乘法
console.log(2.2 * 2.2) // 4.840000000000001
multiFn(2.2, 2.2) // 4.84
// 除法
console.log(2.1 / 0.3) // 7.000000000000001
divideFn(2.1, 0.3) // 7
```
