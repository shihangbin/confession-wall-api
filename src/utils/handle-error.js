const app = require('../app')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_EXISTS,
} = require('../config/error.config')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case USERNAME_OR_PASSWORD_NULL:
      code = -1001
      message = '用户名,密码不能为空!'
      break
    case USERNAME_IF_EXISTS:
      code = -1002
      message = '用户名已经存在!'
      break
  }

  ctx.body = { code, message }
})
