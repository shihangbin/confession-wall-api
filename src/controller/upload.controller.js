const fs = require('fs')
const path = require('path')
const OSS = require('ali-oss')
const { AVATAR_URL } = require('../config/path')
const UploadService = require('../service/upload.service')
const UserService = require('../service/user.service')

class UploadController {
  async uploadFile(ctx, next) {
    const files = ctx.request.files
    const { id } = ctx.user

    const arrayURL = []
    for (const file of files) {
      const fileName = file.path.split('\\')[0]
      const filePath = file.path.split('\\')[1]
      const url = await put(fileName, filePath)
      const result = await UploadService.avatarUpload(url, id)
      // const result = await UploadService.avatarUpload(url, id)
      arrayURL.push(url)
    }
    const avatar = arrayURL.slice(-1)[0]
    const result = await UserService.avatarURL(avatar, id)
    // console.log(result, '---------------------')
    ctx.body = {
      code: 0,
      message: '上传成功!',
      data: arrayURL,
    }

    async function put(fileName, filePath) {
      const client = new OSS({
        region: 'oss-cn-chengdu',
        accessKeyId: 'LTAI5t7vdycSdDvrBVDGpvgc',
        accessKeySecret: 'AH42iMeT8MUACsGysOQZ0hRAPwkQ5c',
        bucket: 'xbinoss',
      })
      try {
        let stream = fs.createReadStream(`${fileName}/${filePath}`)
        let result = await client.putStream(`school-wall/${filePath}`, stream)
        // console.log(`${AVATAR_URL}${result.name}`)
        return `${AVATAR_URL}${result.name}`
      } catch (e) {
        console.log(e)
      }
    }
  }
}

module.exports = new UploadController()
