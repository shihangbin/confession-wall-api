const OSS = require('ali-oss')
const { LOCALHOST } = require('../config/server.config')

const AVATAR_URL = 'https://img.xbin.cn/'
const GET_AVATAR_URL = `http://${LOCALHOST}:51011/upload/avatar/`

const CLIENT_OSS = new OSS({
  region: 'oss-cn-chengdu',
  accessKeyId: 'LTAI5t7vdycSdDvrBVDGpvgc',
  accessKeySecret: 'AH42iMeT8MUACsGysOQZ0hRAPwkQ5c',
  bucket: 'xbinoss',
})

module.exports = {
  AVATAR_URL,
  CLIENT_OSS,
  GET_AVATAR_URL,
}
