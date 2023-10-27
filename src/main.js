// 1.导入app
const app = require('./app')
const { SERVER_PORT } = require('./config/server.config')
require('./utils/handle-error')

// 2.将app启动起来
console.log(SERVER_PORT)
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~')
})
