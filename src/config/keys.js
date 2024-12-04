const fs = require('fs') // 引入fs模块，用于文件操作（如读取文件）
const path = require('path') // 引入path模块，用于处理和解析文件路径

// 默认情况下，相对路径是相对于Node.js程序启动目录的，可能会导致路径解析错误。
// 推荐使用path模块结合__dirname构造绝对路径，确保路径正确。

// 使用fs模块读取密钥文件内容，并解析为字符串
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key') // 通过path.resolve生成密钥文件的绝对路径
)
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/public.key') // 同理，生成公钥文件的绝对路径
)

// 导出私钥和公钥
module.exports = {
  PRIVATE_KEY, // 私钥，供签发Token时使用
  PUBLIC_KEY, // 公钥，供验证Token时使用
}
