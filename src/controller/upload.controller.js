const fs = require('fs')
const path = require('path')
const OSS = require('ali-oss')

class UploadController {
  async uploadFile(ctx, next) {
    const files = ctx.request.files
    for (const file of files) {
      const fileName = file.path.split('\\')[0]
      const filePath = file.path.split('\\')[1]
      put(fileName, filePath)
      console.log(`${url}${filePath}`)
    }

    const client = new OSS({
      region: 'oss-cn-chengdu',
      accessKeyId: 'LTAI5t7vdycSdDvrBVDGpvgc',
      accessKeySecret: 'AH42iMeT8MUACsGysOQZ0hRAPwkQ5c',
      bucket: 'xbinoss',
    })

    const url = 'https://img.xbin.cn/school-wall/'

    async function put(fileName, filePath) {
      try {
        let stream = fs.createReadStream(`${fileName}/${filePath}`)
        let result = await client.putStream(`school-wall/${filePath}`, stream)
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

module.exports = new UploadController()
