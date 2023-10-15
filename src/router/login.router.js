const KoaRouter = require('@koa/router')
const { sign, test } = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const userRouter = new KoaRouter({ prefix: '/login' })

userRouter.post('/', verifyLogin, sign)
userRouter.get('/test', verifyAuth, test)

module.exports = userRouter
