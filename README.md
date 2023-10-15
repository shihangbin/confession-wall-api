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

## 自动化路由

- router/index.js

```js
const fs = require('fs')

const automateRouters = (app) => {
  // 1.读取当前文件
  const files = fs.readdirSync(__dirname)

  // 2.遍历所有文件
  for (const file of files) {
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = automateRouters
```

- app/index.js

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const automateRouters = require('../router')

// 创建app
const app = new Koa()

// 使用中间件
app.use(bodyParser())
automateRouters(app)

// 导出app
module.exports = app
```

## 用户登录-token 颁发

```sh
# 进入ssl的命令行交互
openssl
# 创建私钥
> openssl genrsa -out private.key 2048
# 创建公钥
> openssl rsa -in private.key -pubout -out public.key
# 安装token颁发
npm install jsonwebtoken
```

![](https://img.xbin.cn/images/2023/10/14-22-42-14ccfa.png)

```js
// login.router.js
userRouter.post('/', verifyLogin, login)
```

```js
// login.middleware.js
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_EXISTS,
  USERNAME_IF_NOT_EXISTS,
  PASSWORD_IS_CORRECT,
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 用户密码不为空
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }

  // 数据库中查询用户名是否存在
  const users = await userService.findUserByName(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_IF_NOT_EXISTS, ctx)
  }

  // 数据库中查询账号密码是否正确
  if (user.password != md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_CORRECT, ctx)
  }

  // 将user对象保存在users中
  ctx.user = user

  // 执行下一个中间件
  await next()
}

module.exports = { verifyLogin }
```

```js
// login.controller.js
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')

class LoginController {
  login(ctx, next) {
    //  1.获取用户信息
    const { user_id, username } = ctx.user

    // 2.颁发令牌token
    const token = jwt.sign({ user_id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7,
      algorithm: 'RS256',
    })

    // 3.返回用户信息
    ctx.body = {
      code: 0,
      data: {
        userId: user_id,
        username,
        token,
      },
    }
  }
}

module.exports = new LoginController()
```

## 用户登录-token 验证

- router/login.router.js

```js
userRouter.get('/test', verifyAuth, test)
```

- middleware/login.middleware.js

```js
// token验证
const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.header.authorization
  if (!authorization) {
    return ctx.app.emit('error', AUTH_TOKEN, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 验证token
  try {
    // 验证token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })

    // 将token保留下来
    ctx.user = result

    await next()
  } catch (error) {
    ctx.app.emit('error', AUTH_TOKEN, ctx)
  }
}
```

- controller/login.controller.js

```js
test(ctx, next) {
   ctx.body = 'token验证通过'
 }
```
