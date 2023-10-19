const multer = require('@koa/multer')
const path = require('path')
const { UPLOAD_PATH } = require('../config/path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// 上传头像的中间件
const uploadAvatar = multer({
  storage,
})

const multerAvatar = uploadAvatar.single('avatar')

module.exports = { multerAvatar }
