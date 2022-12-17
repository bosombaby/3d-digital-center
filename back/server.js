//后端资源服务器
const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const cors = require('@koa/cors')
const bodyParser=require('koa-bodyparser')

//定义常量
const PORT = 8080
const RESOURCE_URL=path.join(__dirname,'/public/models')

//导入路由
const router=require('./router/index')

const app = new Koa()
app.use(cors())
app.use(bodyParser())

//静态资源
app.use(serve(RESOURCE_URL))
//路由问题

app.use(router.routes())

app.listen(PORT, () => { 
    console.log(`http://127.0.0.1:${PORT}`);
})