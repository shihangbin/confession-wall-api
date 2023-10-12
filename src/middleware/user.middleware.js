const { emit } = require('../app')
const userService = require('../service/user.service')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_EXISTS,
} = require('../config/error.config')

const verifyUser = async (ctx, next) => {
  // 用户名密码不能为空
  const { username, userpassword } = ctx.request.body
  if (!username || !userpassword) {
    return emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }
  // 判断用户名是否存在
  const users = await userService.findUserByName(username)
  if (users.length) {
    return emit('error', USERNAME_EXISTS, ctx)
  }

  await next()
}

module.exports = { verifyUser }
