// 1.导入app
const app = require('./app')

// 2.引入常量
const { SERVER_PORT } = require('./config/server.config')

// 3.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~')
})
