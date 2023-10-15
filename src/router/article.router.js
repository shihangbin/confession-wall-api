const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  articleCreate,
  articleList,
  articleDetail,
  articleRemove,
} = require('../controller/article.controller')
const { verifyPermission } = require('../middleware/permission.middleware')

const articleRouter = new KoaRouter({ prefix: '/article' })

articleRouter.post('/', verifyAuth, articleCreate)
articleRouter.get('/', articleList)
articleRouter.get('/:articleId', articleDetail)
articleRouter.delete('/:articleId', verifyAuth, verifyPermission, articleRemove)

module.exports = articleRouter
