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