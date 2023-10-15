const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  createArticle,
  articleList,
} = require('../controller/article.controller')

const userRouter = new KoaRouter({ prefix: '/article' })

userRouter.post('/', verifyAuth, createArticle)
userRouter.get('/', verifyAuth, articleList)

module.exports = userRouter
