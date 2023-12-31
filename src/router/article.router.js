const KoaRouter = require('@koa/router')
const { koaBody } = require('koa-body')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  articleCreate,
  articleList,
  articleSearch,
  articleDetail,
  articleRemove,
  articleImages,
} = require('../controller/article.controller')
const { verifyPermission } = require('../middleware/permission.middleware')

const articleRouter = new KoaRouter({ prefix: '/article' })

articleRouter.post('/', verifyAuth, articleCreate)
articleRouter.post(
  '/images',
  verifyAuth,
  koaBody({ multipart: true }),
  articleImages
)
articleRouter.get('/', articleList)
articleRouter.get('/search', articleSearch)
articleRouter.get('/:articleId', articleDetail)
articleRouter.delete('/:articleId', verifyAuth, verifyPermission, articleRemove)

module.exports = articleRouter
