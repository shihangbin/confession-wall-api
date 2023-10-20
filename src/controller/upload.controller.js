const fs = require('fs')
const UploadService = require('../service/upload.service')
const UserService = require('../service/user.service')
const { upload } = require('../utils/upload')
const { GET_AVATAR_URL } = require('../config/path')

class UploadController {
  async upAvatar(ctx, next) {
    const file = ctx.request.file
    const { id } = ctx.user

    const fileName = file.path.split('\\')[0]
    const filePath = file.path.split('\\')[1]
    const fileMimetype = file.mimetype
    const fileSize = file.size

    const url = await upload(fileName, filePath, fileMimetype, 'avatar')
    await UploadService.avatarUpload(id, url, fileMimetype, fileSize)

    const avatarURL = `${GET_AVATAR_URL}${id}`
    await UserService.avatarURL(avatarURL, id)

    ctx.body = {
      code: 0,
      message: '头像上传成功!',
      url: avatarURL,
    }
  }
  async getAvatar(ctx, next) {
    const { userId } = ctx.params

    const result = await UploadService.getAvatar(userId)
    ctx.type = result.mimetype
    ctx.body = result.url
    // console.log(result)
    // console.log(ctx.body, ctx.type)
    // ctx.body = {
    //   code: 0,
    //   message: '查看头像成功!',
    //   url: result.url,
    // }
  }
}

module.exports = new UploadController()
