const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list } = require('../controller/article.controller')

const userRouter = new KoaRouter({ prefix: '/article' })

userRouter.post('/', verifyAuth, create)
userRouter.get('/', list)

module.exports = userRouter
