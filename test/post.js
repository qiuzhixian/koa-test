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