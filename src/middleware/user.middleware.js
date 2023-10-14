const userService = require('../service/user.service')
const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_EXISTS,
} = require('../config/error.config')

const md5Password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
  // 用户名密码不能为空
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }
  // 判断用户名是否存在
  const users = await userService.findUserByName(username)
  if (users.length) {
    return ctx.app.emit('error', USERNAME_IF_EXISTS, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body

  // 2.对密码进行加密
  ctx.request.body.password = md5Password(password)

  // 3.执行下一个中间件
  await next()
}

module.exports = { verifyUser, handlePassword }
