# 三维数字化开发管理中心

## 一、前言

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171343297.jpg)



随着元宇宙的爆红，3维数字化技术的市场空间也越来越大。因此，本系统实现一个三维数字化开发管理中心，主要实现对于模型的开发与管理。

对于管理系统而言，数据库的设计必不可少，数据库系统主要分为三个表，模型资源管理、用户管理、中转信息管理。后台数据库建立好了之后，我先对后台服务器进行设计，这里选择更加适配mysql和自由度更高的koa框架搭建。数据库连接部分，采用异步请求数据，实时反馈给前台渲染。接口设计部分，因为要考虑到前后端的交互问题，所以对于接口部分，主要分为模型获取接口、资源上传接口、用户管理接口，对于所有的资源单独放在一个文件夹显示，数据库只存储路径而并非模型资源。

对于前台的数据展示采取vue+element-ui的技术选型，一开始确定的是后台管理系统，所以采取左侧菜单，右侧内容这样的格式进行布局。菜单主要分为首页展示、资源中心、三维开发、模型信息管理、用户信息管理、个人中心。



**项目开源地址**：三维数字化开发管理中心

## 二、项目依赖

### 2.1 后端

```js
 "dependencies": {
    "@koa/cors": "^4.0.0",
    "@koa/multer": "^3.0.0",
    "@koa/router": "^12.0.0",
    "fs": "^0.0.1-security",
    "koa": "^2.13.4",
    "koa-bodyparser": "^4.3.0",
    "koa-static": "^5.0.0",
    "mysql": "^2.18.1",
    "path": "^0.12.7"
  }
```



### 2.2 前端

```js
  "dependencies": {
    "@element-plus/icons-vue": "^2.0.10",
    "axios": "^1.2.0",
    "dat.gui": "^0.7.9",
    "default-passive-events": "^2.0.0",
    "echarts": "^5.4.0",
    "element-plus": "^2.2.25",
    "nanoid": "^4.0.0",
    "nprogress": "^0.2.0",
    "path": "^0.12.7",
    "pinia": "^2.0.27",
    "pinia-plugin-persist": "^1.0.0",
    "three": "^0.147.0",
    "vue": "^3.2.41",
    "vue-router": "^4.1.6",
    "vuex": "^4.1.0",
    "zdog": "^1.1.3"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.2.0",
    "less": "^4.1.3",
    "sass": "^1.56.1",
    "unplugin-auto-import": "^0.12.0",
    "unplugin-vue-components": "^0.22.11",
    "vite": "^3.2.3"
  }
```

<img src="https://gitee.com/riskbaby/picgo/raw/master/blog/202209101049782.png" alt="2" style="zoom:80%;" />



- `node_modules `文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。
- `package-lock.json` 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。
- `package.json`项目的名称、版本号、描述等、用到了哪些包、开发期间使用的包、部署使用的包
  - `devDependencies `：开发依赖
  - `dependencies `：核心依赖
- **注意**：程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们，**今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中**

## 三、快速运行

### 3.1 启动后台服务

![2](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171316832.png)



电脑部署`node.js`环境，back文件夹终端运行`nodemon .\server.js`

### 3.2 启动前台页面

![3](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171318284.png)



```js
安装依赖
npm i
运行项目
npm run dev
打包项目
npm run build
```


## 四、使用手册

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171338920.jpg)

### 4.1 登录

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321624.jpg) 

 

图 4-1-1 登陆界面



​	![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321298.jpg)

 

图 4-1-2 登录失败

 

首先，进入到我们的登录界面。登录模块会先在前台对登录数据进行一次预检查，预检查通过之后，向数据库发送等待验证的账号密码。后台会返回给我们是否验证成果的结果，失败会重新登录，成功进入系统首页。

###  4.2 首页

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171323717.jpg) 

 

图 4-2-4 首页

 

来到我们的系统首页，右侧是菜单导航栏，左上方一行是用后信息显示和一些全局设置。中间这部分空出来作为我们的展示页面。首页主要是对系统的特点进行概述，四个系统特点：智能化、资源化、标签化、开源化，中间空出来一部分作为展示区，底部是系统资源、人口信息、访问信息等等的一些图表展示。

 

### 4.3  资源中心

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321478.jpg) 

 

图4-3-1 资源中心

 

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321183.jpg) 

 

 

图 4-3-2 资源分类

 

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171334331.jpg) 

 

 

图 4-3-3 资源搜索

 

 进入到我们的资源中心，其中是系统一开始上传的内置资源。每一个卡片代表一个三维模型资源，卡片包括资源的名称、标签、上传者，我们可以对任意一个资源进行分类查找、搜索、查看和下载。

### 4.4 在线预览

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321434.jpg) 

 

图 4-4-1 在线预览

 

点击资源中心的模型查看，跳转到新页面，可以对相关的模型进行平移、缩放、旋转等操作。

 

### 4.5 三维开发

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171326817.jpg) 

 

图 4-5-1 三维开发

 

进入三维开发界面，我们可以真正实现对于模型的开发。此开发平台，主要借助three.js的editor实现，可以对模型进行精细化操作。

 

### 4.6 信息管理

#### 4.6.1 用户信息

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321869.jpg) 

 

图 4-6-1 用户信息

 

‘![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171334171.jpg)

 

图 4-6-2 查看/修改用户

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321558.jpg) 

 

图 4-6-3 添加用户



![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171334866.jpg) 

 

图 4-6-4 删除用户

 

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321667.jpg) 

 

图 4-6-5 用户搜索

 

信息管理功能模块做了等级限制，只有用户等级大于0（不是普通用户），才可以进入这个页面进行操作。用户管理模块实现了用户的增删改查，对于等级用户也进行了相应的限制。

 

#### 4.6.2 模型信息

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171334114.jpg) 

 

图 4-6-5 模型资源

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171321383.jpg) 

 

图 4-6-6 删除模型

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171333031.jpg) 

 

图 4-6-7 添加模型

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171333282.jpg) 

 

图 4-6-8 模型搜索

 

模型信息管理功能模块，主要对系统内部的模型资源进行管理。模型管理界面主要可以对前台展示的数据进行管理，如模型查看、上传、删除、搜索，此功能模块只对管理员开放。

### 4.7 个人中心

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171333460.jpg) 

 

图 4-7-1 个人中心

 

个人中心主要对与已经登录的用户进行用户信息管理，同时该界面还支持对用户的虚拟形象进行创建，打造个人主页。

## 五、数据库

### 5.1 数据需求

- 用户：唯一id标识、账号、密码、用户等级
- 模型：唯一id标识、名称、一级分类、二级分类（备用）、tag标签、模型预览图片、模型、拥有者
- 中转信息：模型id标识、下载次数、收藏次数、上传时间、下载时间

### 5.2 数据流图

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171333253.jpg)

 

顶层数据流图分别为用户、管理员提供两种不同的服务。其中，普通用户提供账号密码数据之后可以对管理中心的开发服务进行二次开发。管理员验证完成身份之后，对用户、资源进行管理。

 

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171333896.jpg) 

 

进行登录验证之后的用户，可以导入提供模型资源，开发展台对模型进行数据处理，处理完成返回结果。

### 5.3 数据字典

![img](https://gitee.com/riskbaby/picgo/raw/master/blog/202212171341457.jpg)

#### 1）用户 user_info

 

| **数据项**   | **数据项含义**     | **类型**    | **长度** | **约束** |
| ------------ | ------------------ | ----------- | -------- | -------- |
| **id**       | **唯一标识、主键** | **VARCHAR** | **30**   | **主键** |
| **username** | **用户名**         | **VARCHAR** | **45**   | **非空** |
| **password** | **密码**           | **VARCHAR** | **45**   | **非空** |
| **level**    | **等级 0 1 2**     | **INT**     |          | **非空** |

#### 2）资源 model_info

| **数据项**          | **数据项含义**       | **类型**    | **长度** | **约束**           |
| ------------------- | -------------------- | ----------- | -------- | ------------------ |
| **id**              | **唯一标识、主键**   | **VARCHAR** | **30**   | **主键**           |
| **name**            | **模型名称**         | **VARCHAR** | **30**   | **非空**           |
| **first_category**  | **一级分类**         | **VARCHAR** | **45**   | **非空**           |
| **second_category** | **二级分类**         | **VARCHAR** | **45**   |                    |
| **tag**             | **标签**             | **VARCHAR** | **45**   | **限制5个tag标签** |
| **photo_url**       | **图片地址**         | **VARCHAR** | **45**   | **非空，格式正确** |
| **model_url**       | **模型地址**         | **VARCHAR** | **45**   | **非空，格式正确** |
| **owner**           | **模型拥有者、外键** | **VARCHAR** | **30**   | **外键**           |

#### 3）中转信息 transfer_info

| **数据项**        | **数据项含义**   | **类型**     | **长度** | **约束** |
| ----------------- | ---------------- | ------------ | -------- | -------- |
| **id**            | **模型唯一标识** | **VARCHAR**  | **30**   | **外键** |
| **downloads**     | **下载次数**     | **INT**      |          |          |
| **collections**   | **收藏次数**     | **INT**      |          |          |
| **upload_date**   | **上传时间**     | **DATETIME** |          | **非空** |
| **download_date** | **下载时间**     | **DATETIME** |          |          |



### 5.4 异步连接

```js
//异步实现数据库连接
const mysql = require('mysql')

// 更改全局数据库连接
const pool = mysql.createPool({
    url: '101.132.190.14',
    user: 'bosom',
    password: '123456',
    database:'3d_resources'
})

let query = async (sql,values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject('数据库连接出错',err)
            } else {
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject('sql语句错误',err)
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports=query
```



## 六、后台

后端：node+koa+mysql

到时候有时间细分讲一讲

## 七、前台

前端：html+js+scss+vue

到时候有时间细分讲一讲



## 八、总结



通过本次设计完成了一个简易的数字化开发管理中心，但是总体看下来还是有许多的不足之处。比如，对于模型上传部分，没有办法对于所有的模型格式进行解析，并渲染到网页里面去。目前v1.0.0版本只支持gltf格式的模型数据，上传别的模型数据比如obj、fbx会出现解析出错的情况。此外，上传的模型会包含许多的依赖项，如果只上传单个模型，缺少依赖也会报错。模型的贴图部分，还不能够对于模型进行完美适配，一些大型的场景还有缺陷。

 

虽然本项目存在一些不足，但对于自己来说也收获了很多。自己独立一个人完成前后台交互的项目，融合了3d技术开发。对于数据库的概念设计、E-R图、数据表的映射、关系规范化理论、数据表等知识点有了一次复习与提高，对于mysql数据库语句的熟练性也有了很大的提高。