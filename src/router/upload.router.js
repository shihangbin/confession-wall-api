const KoaRouter = require('@koa/router')
const { multerAvatar } = require('../middleware/upload.middleware')
const { upAvatar } = require('../controller/upload.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const avatarRouter = new KoaRouter({ prefix: '/upload' })

avatarRouter.post('/avatar', verifyAuth, multerAvatar, upAvatar)

module.exports = avatarRouter
