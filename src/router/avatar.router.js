const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')
const path = require('path')
const { multerObtain } = require('../middleware/upload.middleware')
const { uploadFile } = require('../controller/upload.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const avatarRouter = new KoaRouter({ prefix: '/upload' })

avatarRouter.post('/avatar', verifyAuth, multerObtain, uploadFile)

module.exports = avatarRouter
