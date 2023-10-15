const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_NOT_EXISTS,
  PASSWORD_IS_CORRECT,
  AUTH_TOKEN,
} = require('../config/error.config')
const { PUBLIC_KEY } = require('../config/keys')
const { findUserByName } = require('../service/user.service')
const md5Password = require('../utils/md5-password')
const jwt = require('jsonwebtoken')

// 登录验证
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 用户密码不为空
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_NULL, ctx)
  }

  // 数据库中查询用户名是否存在
  const users = await findUserByName(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_IF_NOT_EXISTS, ctx)
  }

  // 数据库中查询账号密码是否正确
  if (user.password != md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_CORRECT, ctx)
  }
  // 将user对象保存在users中
  ctx.user = user
  console.log(ctx.user)

  // 执行下一个中间件
  await next()
}

// token验证
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', AUTH_TOKEN, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 2.验证token是否是有效
  try {
    // 2.1.获取token中信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })

    // 2.将token的信息保留下来
    ctx.user = result

    // 3.执行下一个中间件
    await next()
  } catch (error) {
    ctx.app.emit('error', AUTH_TOKEN, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth }
