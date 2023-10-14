const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_EXISTS,
  USERNAME_IF_NOT_EXISTS,
  PASSWORD_IS_CORRECT,
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 用户密码不为空
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }

  // 数据库中查询用户名是否存在
  const users = await userService.findUserByName(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_IF_NOT_EXISTS, ctx)
  }

  // 数据库中查询账号密码是否正确
  if (user.password != md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_CORRECT, ctx)
  }

  // 将user对象保存在users中
  ctx.users = user

  // 执行下一个中间件
  await next()
}

module.exports = { verifyLogin }
