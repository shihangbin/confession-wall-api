const { emit } = require('../app')
const userService = require('../service/user.service')
const { NAME_OR_PASSWORD_NULL } = require('../config/error.config')

const verifyUser = async (ctx, next) => {
  // 用户名密码不能为空
  const { username, userpassword } = ctx.request.body
  if (!username || !userpassword) {
    return emit('error', NAME_OR_PASSWORD_NULL, ctx)
  }
  // 判断用户名是否存在
  const users = await userService.findUserByName(username)
  if (users.length) {
    ctx.body = {
      code: -1002,
      message: '用户名已经存在!',
    }
    return
  }

  await next()
}

module.exports = { verifyUser }
