const fs = require('fs')
const UploadService = require('../service/upload.service')
const UserService = require('../service/user.service')
const { upload } = require('../utils/upload')
const { GET_AVATAR_URL, UPLOAD_PATH, AVATAR_URL } = require('../config/path')
const axios = require('axios')

class UploadController {
  async upAvatar(ctx, next) {
    const file = ctx.request.file
    const { id } = ctx.user

    const fieldName = file.fieldname
    const destination = file.destination
    const fileName = file.filename
    const mimetype = file.mimetype
    const fileSize = file.size

    const url = await upload(destination, fileName, mimetype, 'avatar')
    await UploadService.avatarUpload(
      fieldName,
      fileName,
      mimetype,
      fileSize,
      url,
      id
    )
    // console.log(GET_AVATAR_URL)
    const avatarURL = `${GET_AVATAR_URL}${id}`
    // console.log(avatarURL)
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
    // ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
    const response = await axios.get(url, { responseType: 'stream' })
    ctx.type = mimetype
    ctx.body = response.data
    // ctx.body = {
    //   code: 0,
    //   message: '查看头像成功!',
    //   url,
    // }
  }
}

module.exports = new UploadController()
