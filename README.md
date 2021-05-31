## 10分钟入门 Koa

## 背景
最近想开发一个团队工作管理后台来提高工作效率，需要增删查改数据，学会自己编写接口必不可少，而 Node.js 是比较适合前端上手的一门服务端开发，基于 Node.js 平台有一个小而美的 Web 开发框架 Koa，现在我们来学习下。

## 什么是 koa？

Node.js 是一个基于 Chrome v8 引擎的 javascript 运行时环境，而 Koa 是基于 Node.js 平台的下一代 web 开发框架，目前有 1.x 和 2.0 的版本，以下内容是以 2.0 版本来展开的。


## koa 的优势？
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 Web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

以下 是 Express 和 Koa 的比对项：

相当于 Express，我更喜欢 Koa ，它轻量和灵活，还可以自己开发中间件，从0到1搭建自己的项目。

| 框架 | Github关注度| 上手难度 | 优点 | 缺点 |  语法 | 
|:--|:--|:--|:--|:--|:--|
| [Express](https://github.com/expressjs/express) | 53.2k |  简单 | 功能丰富，开箱即用 | 框架重、多层嵌套回调  | ES5 | 
| [Koa](https://github.com/koajs/koa)| 31.2k | 简单 | 轻量化、灵活、简洁  | 社区相对较小 |  ES6、ES7 | 无 |


## 开始安装
**1、环境配置**

Koa 依赖 Node v7.6.0 或 ES2015及更高版本和 async 方法支持，如果 Node 版本低于7.6.0，请 [升级 Node 版本](https://nodejs.org/zh-cn/)，如果手上的项目需要依赖不同版本的 Node.js 环境可以通过 Node.js 版本管理工具 [nvm](https://github.com/nvm-sh/nvm) 来切换当前项目所需要的版本。


**2、初始化 package.json**

方便查看配置文件信息来进行各种 npm 包管理，初始化命名的 packge name 不能和 Koa 重名，不然安装 Koa 的时候会报错。

```JS
// 初始化
$ npm init
```

**3、安装 Koa**


```JS
// 安装 koa
$ npm install koa 或 cnpm install koa
```

**4、查看是否安装成功**

如果没有报错，出现版本号，则安装成功。
```JS
// 查看 koa 版本号
$ koa -V
```

## koa 相关 API

这里列出几个下面案例用到的 API，更多 API 可查 [官方文档](https://koa.bootcss.com)

### 一、应用（Application）
#### app.use(function) 
将给定的中间件方法添加到此应用程序

#### app.context 
app.context 是从其创建 ctx 的原型。您可以通过编辑 app.context 为 ctx 添加其他属性


#### app.listen(…) 
绑定一个端口作为程序入口

### 二、上下文（Context）：
#### ctx.req
node 的 request 对象

#### ctx.request
koa 的 request 对象

#### ctx.url

获取 URL ? 后面的查询参数

#### ctx.method
获取请求类型

### 三、请求（Request）
#### request.querystring
根据 ? 获取原始查询字符串

#### request.query
获取解析的查询字符串, 当没有查询字符串时，返回一个空对象

### 四、响应（Response）
#### response.body
获取响应主体


## 手写一个 hello world

新增 hello.js 文件，编写如下代码：
```js
// hello.js

const Koa = require('koa') 
const app = new Koa()  

app.use((ctx) => {
  // ctx 是 koa 提供的 Context 对象，表示这次会话的上下文 比如有 request、response 等
     ctx.response.body = 'hello world'
})

// 用3000端口监听
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

```
// 运行js文件
$ node test.js
```

## 手写一个 get 请求

首先我们需要知道 get 获取请求的数据有2种，接受的参数格式也有2种，如下：

#### 一、获取请求方式：
用其中的一种即可

- 1、从上下文 (ctx) 的 request 对象中获取 ctx.request.query
- 2、从上下文 (ctx) 直接获取 ctx.query.query

#### 二、接收参数方式：
- 1、 接收格式好的 json 对象 ctx.request.query
- 2、 接收字符串 ctx.request.querystring

新建一个 get.js 文件，编写如下代码：

```js
// get.js

const Koa = require('koa')
const app = new Koa()

app.use( async (ctx) => {
  let url = ctx.url

  // 1、从上下文 (ctx) 的 request 对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 2、从上下文 (ctx) 直接获取
  // let ctx_query = ctx.query
  // let ctx_querystring = ctx.querystring

  ctx.body = {
    code: "000001",
    desc: "success",
    data: {
        url,
        req_query,
        req_querystring,
        // ctx_query,
        // ctx_querystring
    }
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

 运行项目后，打开下面地址：

> http://localhost:3000/?age=18&name=jason

```
// 接口返回结果如下：
{"code":"000001","desc":"success","data":{"url":"/?age=18&name=jason","req_query":{"age":"18","name":"jason"},"req_querystring":"age=18&name=jason"}}
```

## 手写一个 post 请求

对于 post 请求，Koa 没有封装获取参数的方法，需求通过解析上下文 context 中的 node 请求对象req，将 post 表单数据解析成 query string，再将 query string 解析成 json 格式。

新建一个 post.js 文件，编写如下代码：

```js
// post.js

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当 GET 请求时候返回表单页面
    let html = `
      <h3>post 请求例子：</h3>
      <form method="POST" action="/">
        <p>请输入您的姓名：</p>
        <input name="name" /><br/>
        <p>请输入您的年龄：</p>
        <input name="age" /><br/>
        <br/>
        <button type="submit">提交</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 当 POST 请求的时候，解析 POST 表单里的数据，并显示出来
    let postData = await parsePostData(ctx)
    ctx.body = {
        code: "000001",
        desc: "success",
        data: postData
    }
  } else {
    // 其他请求显示 404
    ctx.body = '<h3>404</h3>'
  }
})

// 解析上下文里 node 原生请求的 POST 参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end',function() {
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 将 POST 请求参数 string 解析成 JSON 格式
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log(queryStrList)
  for (  let [index, queryStr] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```
 运行项目后，打开下面地址输入表单信息并提交：
> http://localhost:3000/


![3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aca61337317047da82db73405a7ba975~tplv-k3u1fbpfcp-watermark.image)
```
// 接口返回结果如下：
{"code":"000001","desc":"success","data":{"name":"name","age":"18"}}
```


## 最后

本文属于入门篇，对于任何知识都是先入门，再深入，希望对您有帮助！