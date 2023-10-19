const KoaRouter = require('@koa/router')
const { multerAvatar } = require('../middleware/upload.middleware')
const { verifyAuth } = require('../middleware/login.middleware')
const { upAvatar, getAvatar } = require('../controller/upload.controller')

const avatarRouter = new KoaRouter({ prefix: '/upload' })

avatarRouter.post('/avatar', verifyAuth, multerAvatar, upAvatar)
avatarRouter.get('/avatar/:userId', getAvatar)

module.exports = avatarRouter
