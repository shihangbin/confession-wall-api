const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/article.controller')

const userRouter = new KoaRouter({ prefix: '/articles' })

userRouter.post('/', verifyAuth, create)

module.exports = userRouter
