const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { upAvatar, getAvatar } = require('../controller/upload.controller')
const { koaBody } = require('koa-body')

const avatarRouter = new KoaRouter({ prefix: '/upload' })

avatarRouter.post('/avatar', verifyAuth, koaBody({ multipart: true }), upAvatar)
avatarRouter.get('/avatar/:userId', getAvatar)

module.exports = avatarRouter
