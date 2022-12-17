const Router = require('@koa/router')
const router = new Router()

//导入路由
const getModel = require('./modules/getModel')
const uploadModel = require('./modules/uploadModel')
const userInfo=require('./modules/userInfo')


router.use(getModel.routes(),router.allowedMethods())
router.use(uploadModel.routes(),router.allowedMethods())
router.use(userInfo.routes(),router.allowedMethods())


module.exports=router
