const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/users' })

// 定义路由中映射
userRouter.get('/', verifyUser, userController.create)

// 导出路由
module.exports = userRouter
