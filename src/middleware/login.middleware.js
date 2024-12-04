const {
  USERNAME_OR_PASSWORD_NULL,
  USERNAME_IF_NOT_EXISTS,
  PASSWORD_IS_CORRECT,
  AUTH_TOKEN,
} = require('../config/error.config')
const { PUBLIC_KEY } = require('../config/keys')
const { findUserByName } = require('../service/user.service')
const md5Password = require('../utils/md5-password')
const jwt = require('jsonwebtoken') // 引入jsonwebtoken模块，用于解析和验证JWT

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

  // 执行下一个中间件
  await next()
}

/**
 * 中间件：验证用户请求的JWT Token是否合法
 * @param {Object} ctx - Koa上下文对象
 * @param {Function} next - 下一个中间件函数
 */
const verifyAuth = async (ctx, next) => {
  // 1. 获取请求头中的 Authorization 字段
  const authorization = ctx.headers.authorization

  // 1.1 如果没有 Authorization 字段，触发 AUTH_TOKEN 错误事件
  if (!authorization) {
    // 触发错误事件，错误类型为 AUTH_TOKEN
    return ctx.app.emit('error', 'AUTH_TOKEN', ctx)
  }

  // 1.2 从 Authorization 字段中提取出 Token（去掉 "Bearer " 前缀）
  const token = authorization.replace('Bearer ', '')

  // 2. 验证 Token 是否有效
  try {
    // 2.1 使用公钥验证 Token 的有效性
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'], // 指定使用 RS256 算法进行验证
    })

    // 2.2 将 Token 中解析出的用户信息保存在 ctx.user 中
    ctx.user = result

    // 3. 调用下一个中间件
    await next()
  } catch (error) {
    // 3.1 如果 Token 验证失败，触发 AUTH_TOKEN 错误事件
    ctx.app.emit('error', 'AUTH_TOKEN', ctx)
  }
}

module.exports = { verifyLogin, verifyAuth }
