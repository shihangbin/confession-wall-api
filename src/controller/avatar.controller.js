const OSS = require('ali-oss')
const fs = require('fs')

class AvatarController {
  async avatarCreate() {
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

    files.forEach((item) => {
      const fileName = item.path.split('\\')[0]
      const filePath = item.path.split('\\')[1]
      put(fileName, filePath)
      console.log(`${url}${filePath}`)
    })
  }
}
module.exports = new AvatarController()
