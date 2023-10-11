# node-wall

## 安装依赖

```sh
# 安装框架
npm i koa
# 安装路由
npm i @koa/router
# 安装body解析
npm i @koa/bodyparser
# 安装env解析
npm i dotenv
# mysql2
npm i mysql2
```

## 项目结构

![](https://img.xbin.cn/images/2023/10/10-17-49-01e12c.png)

- main

```js
// 1.导入app
const app = require('./app')

// 2.引入常量
const { SERVER_PORT } = require('./config/server.config')

// 3.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~')
})
```

- config/server.config.js

```js
const dotenv = require('dotenv')

dotenv.config()

module.exports = { SERVER_PORT } = process.env
```

- app/index.js

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')

// 创建app
const app = new Koa()

// 使用中间件
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 导出app
module.exports = app
```

- router/user.router.js

```js
const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/users' })

// 定义路由中映射
userRouter.get('/', userController.create)

// 导出路由
module.exports = userRouter
```

- controller/user.controller.js

```js
const userService = require('../service/user.service')

class userController {
  create(ctx, next) {
    // 获取用户传递过来的数据
    const user = ctx.request.body
    console.log(user)

    // 将user数据存储到数据库
    userService.create(user)

    // 查看存储结果,告诉前端
    ctx.body = '创建用户成功'
  }
}
module.exports = new userController()
```

- service/user.service.js

```js
class userService {
  create(user) {
    console.log('数据库操作成功')
  }
}
module.exports = new userService()
```
