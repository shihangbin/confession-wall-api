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

![](https://img.xbin.cn/images/2023/10/12-23-07-efa6af.png)

![](https://img.xbin.cn/images/2023/10/13-01-46-a23824.png)

- main (运行文件)

```js
// 1.导入app
const app = require('./app')
require('./utils/handle-error')

// 2.引入常量
const { SERVER_PORT } = require('./config/server.config')

// 3.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~')
})
```

- config/server.config.js (启动服务器)

```js
const dotenv = require('dotenv')

dotenv.config()

module.exports = { SERVER_PORT } = process.env
```

- app/index.js (使用中间件)

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

- router/user.router.js (主路由)

```js
const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/users' })

// 定义路由中映射
userRouter.get('/', verifyUser, userController.create)

// 导出路由
module.exports = userRouter
```

- controller/user.controller.js (单个路由)

```js
const userService = require('../service/user.service')

class userController {
  async create(ctx, next) {
    // 获取用户传递过来的数据
    const user = ctx.request.body

    // 将user数据存储到数据库
    const result = await userService.create(user)

    // 查看存储结果,告诉前端
    ctx.body = {
      message: '创建用户成功',
      data: result,
    }
  }
}
module.exports = new userController()
```

- service/user.service.js (操作数据库)

```js
const connection = require('../app/database')

class userService {
  async create(user) {
    const { username, password } = user

    // 拼接statement
    const statement = 'INSERT INTO `users` (username,password) VALUES(?, ?);'

    // 执行SQL
    const [result] = await connection.execute(statement, [username, password])
    console.log('数据库操作成功')
    return result
  }
  async findUserByName(username) {
    const statement = 'SELECT * FROM users WHERE username = ?'

    const [values] = await connection.execute(statement, [username])
    return values
  }
}
module.exports = new userService()
```

- app/database (连接数据库)

```js
const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'node-wall',
  user: 'root',
  password: 'Shb200419',
  connectionLimit: 5,
})

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取连接失败~', err)
    return
  }

  // 2.获取connection, 尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log('和数据库交互失败', err)
    } else {
      console.log('数据库连接成功, 可以操作数据库~')
    }
  })
})

// 3.获取连接池中连接对象(promise)
const connection = connectionPool.promise()
module.exports = connection
```

- utils/md5-password.js (密码加密)

```js
const crypto = require('crypto')

const md5Password = (password) => {
  const md5 = crypto.createHash('md5')
  const md5pwd = md5.update(password).digest('hex')

  return md5pwd
}

module.exports = md5Password
```

- middleware/user.middleware.js (中间件)

```js
const userService = require('../service/user.service')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_EXISTS,
} = require('../config/error.config')
const md5Password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
  // 用户名密码不能为空
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }
  // 判断用户名是否存在
  const users = await userService.findUserByName(username)
  if (users.length) {
    return ctx.app.emit('error', USERNAME_EXISTS, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body

  // 2.对密码进行加密
  ctx.request.body.password = md5Password(password)

  // 3.执行下一个中间件
  await next()
}

module.exports = { verifyUser, handlePassword }
```

- config/error.config.js (错误常量)

```js
const USERNAME_OR_PASSWORD_NULL = 'username _or_password_null'
const USERNAME_EXISTS = 'username_exists'

module.exports = {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_EXISTS,
}
```

- utils/handle-error.js (错误处理)

```js
const app = require('../app')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_EXISTS,
} = require('../config/error.config')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case USERNAME_OR_PASSWORD_NULL:
      code = -1001
      message = '用户名,密码不能为空!'
      break
    case USERNAME_EXISTS:
      code = -1002
      message = '用户名已经存在!'
      break
  }
})
```
