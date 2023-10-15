const KoaRouter = require('@koa/router')
const { createUser } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 创建路由
const userRouter = new KoaRouter({ prefix: '/user' })

// 定义路由中映射
userRouter.post('/', verifyUser, handlePassword, createUser)

// 导出路由
module.exports = userRouter
