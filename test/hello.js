// test.js

const Koa = require('koa') // 引入koa
const app = new Koa() // 创建实例化对象 app | 创建一个Koa对象表示web app本身:

app.use((ctx) => {
  // ctx 是 koa 提供的 Context 对象，表示这次会话的上下文 比如有 request、response 等
     ctx.response.body = 'hello world'
})

// 默认3000端口，让浏览器运行
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})