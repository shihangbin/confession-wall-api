const UploadService = require('../service/upload.service')
const UserService = require('../service/user.service')
const { upload } = require('../utils/upload')

class UploadController {
  async upAvatar(ctx, next) {
    const file = ctx.request.file
    const { id } = ctx.user

    const fileName = file.path.split('\\')[0]
    const filePath = file.path.split('\\')[1]

    const url = await upload(fileName, filePath, 'avatar')
    await UploadService.avatarUpload(url, id)
    await UserService.avatarURL(url, id)

    ctx.body = {
      code: 0,
      message: '头像上传成功!',
      url,
    }
  }
}

module.exports = new UploadController()
