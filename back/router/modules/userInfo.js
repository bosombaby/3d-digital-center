const Router = require('@koa/router')
const router = new Router()
const query=require('../../db/connect')

let queryAll = 'select * from user_info'
let queryUser = 'select * from user_info where username=? and password=?'
let preCheck='select * from user_info where username=?'
let insertUser = 'insert into user_info set ?'
let updateUser = 'update user_info set ? where id=?'
let deleteUser='delete from user_info where id =?'
let fuzzyUser='select * from user_info where username like ?'

router.get('/', async ctx => {
    
    ctx.body = {
        code: 200,
        msg:'成功连接'
    }
})

router.get('/users', async ctx => {

    let res= await query(queryAll)
    ctx.body = {
        code: 200,
        data:res
    }
})

router.get('/user/fuzzy/search', async (ctx) => {
    let target = ctx.query.target
    console.log(target);
    let res=await query(fuzzyUser,target)
    ctx.body = {
        code: 200,
        data:res
    }
})

router.post('/user/login', async ctx => {
    //数据库验证
    let values = [ctx.request.body.username,ctx.request.body.password ]
    let res = await query(queryUser, values)
    ctx.body = {
        code: 200,
        data:res
    }
})

//预检查username
router.get('/user/check', async ctx => {
    let value = ctx.request.query.username
    let res = await query(preCheck, value)
    const isOnly=res.length==1 ? false:true
    ctx.body = {
        code: 200,
        isOnly
   } 
})

router.post('/user/update', async ctx => {
    const req=ctx.request.body
    value=[req,req.id]
    const res = await query(updateUser, value)
    if (res.affectedRows) {
        ctx.body = {
            code: 200,
            msg:'信息更新成功'
        }
    }
    else {
        ctx.body = {
            code: 500,
            msg:'信息更新失败'
        }
    }
})


router.post('/user/register', async ctx => {
    //数据库验证
    let values = ctx.request.body
    let res=await query(insertUser,values)
    const msg= res.affectedRows == 1 ? '用户添加成功':'用户添加失败'
    ctx.body = {
        code: 200,
        msg
    }
})

router.post('/user/delete', async ctx => {
    let value = ctx.request.body.id
    let res = await query(deleteUser, value)
    const msg= res.affectedRows == 1 ? '用户删除成功':'用户删除失败'
    ctx.body = {
        code: 200,
        msg
        
    }
})
module.exports=router