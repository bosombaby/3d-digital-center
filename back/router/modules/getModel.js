const Router = require('@koa/router')
const multer=require('@koa/multer')
const mysql=require('mysql')
const query=require('../../db/connect')

//查询所有模型数据
let queryAll = 'select * from model_info'
let queryModelFirst='select * from model_info where first_category= ?'
let queryModelMine = 'select * from model_info where owner= ?'
let fuzzyModel='select * from model_info where name like ?'
const router = new Router()

//获取所有模型信息
router.get('/models', async (ctx, next) => { 
    let res= await query(queryAll)
    ctx.body = {
        code: 200,
        data:res
    }
})

//一级分类获取资源
router.get('/model/category/first', async (ctx, next) => { 
    let target=ctx.query.target
    let res= await query(queryModelFirst,target)
    ctx.body = {
        code: 200,
        data:res
    }
})

//我的分类资源
router.get('/model/category/mine', async (ctx, next) => { 
    let target=ctx.query.target
    let res= await query(queryModelMine,target)
    ctx.body = {
        code: 200,
        data:res
    }
})

//搜索获取资源
router.get('/model/fuzzy/search', async (ctx) => {
    let target = ctx.query.target
    let res=  await query(fuzzyModel,target)
    ctx.body = {
        code: 200,
        data:res
    }
})


//传入图片资源
router.post('/upload/img',)


//传入模型资源


module.exports=router