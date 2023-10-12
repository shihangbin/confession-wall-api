const app = require('../app')
const { NAME_OR_PASSWORD_NULL } = require('../config/error.config')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_NULL:
      code = -1001
      message = '用户名,密码不能为空!'
      break
  }
})
