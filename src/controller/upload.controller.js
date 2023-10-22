const fs = require('fs')
const UploadService = require('../service/upload.service')
const UserService = require('../service/user.service')
const { upload } = require('../utils/upload')
const { GET_AVATAR_URL } = require('../config/path')
const axios = require('axios')

class UploadController {
  async upAvatar(ctx, next) {
    const files = ctx.request.files
    const isArray = Array.isArray(files.file)
    const { id } = ctx.user

    if (isArray) {
      for (const file of files.file) {
        const filepath = file.filepath
        const fileName = file.newFilename
        const mimetype = file.mimetype
        const fileSize = file.size
        const url = await upload(filepath, fileName, mimetype, 'avatar')
        await UploadService.avatarUpload(fileName, mimetype, fileSize, url, id)
      }
    } else if (!isArray) {
      const file = files.file
      const filepath = file.filepath
      const fileName = file.newFilename
      const mimetype = file.mimetype
      const fileSize = file.size
      const url = await upload(filepath, fileName, mimetype, 'avatar')
      await UploadService.avatarUpload(fileName, mimetype, fileSize, url, id)
    } else {
      console.log('错误')
    }

    const avatarURL = `${GET_AVATAR_URL}${id}`
    await UserService.avatarURL(avatarURL, id)

    ctx.body = {
      code: 0,
      message: '头像上传成功!',
      avatarURL,
    }
  }
  async getAvatar(ctx, next) {
    const { userId } = ctx.params

    const { filename, mimetype, url } = await UploadService.getAvatar(userId)
    const result = await axios.get(url, { responseType: 'stream' })

    ctx.type = mimetype
    ctx.body = result.data
  }
}

module.exports = new UploadController()
