const KoaRouter = require('@koa/router')
const {
  createUser,
  getUser,
  putUser,
} = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/user' })

// 定义路由中映射
userRouter.post('/', verifyUser, handlePassword, createUser)
userRouter.get('/:userID', getUser)
userRouter.put('/:userID', putUser)

// 导出路由
module.exports = userRouter
