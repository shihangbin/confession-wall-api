const KoaRouter = require('@koa/router')
const { login } = require('../controller/login.controller')
const { verifyLogin } = require('../middleware/login.middleware')

const userRouter = new KoaRouter({ prefix: '/login' })

userRouter.post('/', verifyLogin, login)

module.exports = userRouter
