const KoaMulter = require('@koa/multer')
const path = require('path')
const { UPLOAD_PATH } = require('../config/path')

const storage = KoaMulter.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const uploadFile = KoaMulter({
  storage,
})

const multerObtain = uploadFile.array('avatar')

module.exports = { multerObtain }
