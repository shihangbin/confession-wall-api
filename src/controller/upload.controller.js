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
    let file

    for (const key in files) {
      file = files[key]
      const url = await upload(
        file.filepath,
        file.newFilename,
        file.mimetype,
        'avatar'
      )
      await UploadService.avatarUpload(
        file.newFilename,
        file.mimetype,
        file.size,
        url,
        id
      )
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

    const { mimetype, url } = await UploadService.getAvatar(userId)
    const result = await axios.get(url, { responseType: 'stream' })

    ctx.type = mimetype
    ctx.body = result.data
  }
}

module.exports = new UploadController()
