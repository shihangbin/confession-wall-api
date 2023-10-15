const app = require('../app')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_EXISTS,
  USERNAME_IF_NOT_EXISTS,
  PASSWORD_IS_CORRECT,
  AUTH_TOKEN,
  OPERATION_IS_NOT_ALLOWED,
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
    case USERNAME_IF_NOT_EXISTS:
      code = -1003
      message = '用户名不存在!'
      break
    case PASSWORD_IS_CORRECT:
      code = -1004
      message = '密码不正确!'
      break
    case AUTH_TOKEN:
      code = -1005
      message = 'token过期!'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = '没有权限!'
      break
  }

  ctx.body = { code, message }
})
