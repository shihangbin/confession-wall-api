const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { createArticle, list } = require('../controller/article.controller')

const userRouter = new KoaRouter({ prefix: '/article' })

userRouter.post('/', verifyAuth, createArticle)
userRouter.get('/', list)

module.exports = userRouter
