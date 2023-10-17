const KoaRouter = require('@koa/router')

// ---------------------
const KoaMulter = require('@koa/multer')
const path = require('path')
const { UPLOAD_PATH } = require('../config/path')
// ---------------------

const { avatarCreate } = require('../controller/avatar.controller')
const { multerObtain } = require('../middleware/upload.middleware')

const avatarRouter = new KoaRouter({ prefix: '/file' })

// ----------------
const storage = KoaMulter.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const uploadFile = KoaMulter({
  storage,
})
// ----------------

avatarRouter.post('/avatar', uploadFile.array('avatar'), (ctx, next) => {
  const files = ctx.request.files
  console.log(files)
  console.log(ctx.request.files)
  ctx.body = ctx.request.files
})
avatarRouter.get('/avatar', (ctx, next) => {
  ctx.body = '11111111'
})

module.exports = avatarRouter
