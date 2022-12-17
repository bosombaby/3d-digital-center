const path=require('path')
const Router = require('@koa/router')
const multer=require('@koa/multer')
const mysql=require('mysql')
const query=require('../../db/connect')
//创建文件夹
const fs=require('fs')

let preCheck='select * from model_info  where name=?'
let insertModel = 'insert into model_info set ?'
let deleteModel='delete from model_info where id= ?'
//常量
let UPLOAD_PATH=''
const router = new Router()

// 预处理模型是否唯一
router.get('/model/check', async ctx => {

    let value = ctx.request.query.name
    const res = await query(preCheck, value)
    const isOnly=res.length==1 ? false:true
    ctx.body = {
        code: 200,
        isOnly
    }
})

//创建文件上传的内容
const createFolder = async (folderPath) => {
    UPLOAD_PATH = path.join(__dirname, `/../../public/models/${folderPath}`)
    fs.mkdirSync(UPLOAD_PATH)
}

//删除文件
const deleteFolder = async (folderPath) => {
    fs.rmSync(folderPath,{recursive:true})
}


//预先处理好文件路径
router.post('/upload/path', async (ctx, next) => {
    let folderPath = ctx.request.body.relativePath
    await createFolder(folderPath)
    ctx.body = {
        path: UPLOAD_PATH,
        msg:'文件夹创建成功'
    }
})

//multer处理图片
const multerUpload = () => {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // 设置文件的存储目录
            cb(null, UPLOAD_PATH);
          },
          filename: function (req, file, cb) {
            // 设置文件名
            // 解决中文名乱码的问题
            file.originalname = Buffer.from(file.originalname, "latin1").toString(
                "utf8"
            );
            cb(null, file.originalname);
        },
        
    })
    return multer({storage})
    
}


//传入图片资源
router.post('/upload/img',multerUpload().single('fileImg'),async (ctx, next) => {
    try {
        ctx.body = {
            code: 200,
            msg:'图片上传成功'
        }
    } catch (error) {
        ctx.body = {
            code:404
        }
    }
    
})

//传入模型资源
router.post('/upload/model', multerUpload().single('fileModel'),async (ctx, next) => {
    try {
        ctx.body = {
            code: 200,
            msg:'模型上传成功'
        }
    } catch (error) {
        ctx.body = {
            code:404
        }
    }

})

//删除模型资源
router.post('/delete/model', async (ctx) => {
    const folderName = ctx.request.body.relativePath
    const folderPath = path.join(__dirname, `/../../public/models/${folderName}`)
    await deleteFolder(folderPath)

    ctx.body = {
        code: 200,
        msg:folderPath
    }
})



//数据导入数据库
router.post('/db/insert/model', async (ctx, next) => {
    
    const modelForm = ctx.request.body
    await query(insertModel,modelForm)
    ctx.body = {
        code: 200
    }
})

//删除资源
router.post('/db/delete/model', async (ctx, next) => {
    const id = ctx.request.body.id
    const res = await query(deleteModel, id)
    const isDelete=res.affectedRows===1 ? true:false
    ctx.body = {
        code: 200,
        isDelete
    }
})


module.exports=router