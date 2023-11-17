const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, requestComment } = require('../controller/comment.controller')

const momentRouter = new KoaRouter({ prefix: '/comment' })

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:commentId', requestComment)

module.exports = momentRouter
