const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')
const UserService = require('../service/user.service')
const { APP_ID, SECRET } = require('../utils/key')

const axios = require('axios')

class LoginController {
  /**
   * 用户登录并生成Token
   * @param {Object} ctx - Koa上下文对象
   * @param {Function} next - 下一个中间件
   */
  signUser(ctx, next) {
    // 1. 获取用户信息（从中间件中解析得到）
    const { id, username } = ctx.user

    // 2. 颁发JWT令牌
    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7, // Token有效期：7天
      algorithm: 'RS256', // 使用RS256算法签名
    })

    // 3. 返回用户信息和Token
    ctx.body = {
      code: 0,
      data: {
        id, // 用户ID
        username, // 用户名
        token, // 颁发的JWT
        appid: APP_ID, // 应用ID
        secret: SECRET, // 应用密钥
      },
    }
  }

  /**
   * 验证Token并返回用户信息
   * @param {Object} ctx - Koa上下文对象
   * @param {Function} next - 下一个中间件
   */
  async user(ctx, next) {
    // 从Token解析的用户信息中获取用户ID
    const { id } = ctx.user

    // 查询数据库获取用户详细信息
    const result = await UserService.userId(id)

    // 返回用户信息
    ctx.body = {
      code: 0,
      message: 'Token验证通过',
      data: result[0], // 返回用户的第一条记录
    }
  }

  /**
   * 微信登录接口
   * @param {Object} ctx - Koa上下文对象
   * @param {Function} next - 下一个中间件
   */
  async wxLogin(ctx, next) {
    // 1. 从请求体中获取微信登录的code
    const { code } = ctx.request.body

    // 2. 构造微信登录API的请求URL
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`

    // 3. 发送请求到微信API
    const result = await axios.get(url)

    // 4. 检查微信API返回结果是否包含错误
    if (result.data.hasOwnProperty('errcode')) {
      ctx.body = {
        code: result.data.errcode,
        message: '微信登录失败',
      }
      return
    }

    // 5. 根据返回的openid查找用户
    const users = await UserService.findUserOpenid(result.data.openid)
    const user = users[0]
    ctx.user = user // 将用户信息存储在上下文中

    // 6. 如果用户不存在，则创建新用户记录
    if (!user) {
      await UserService.wxLogin(result.data.openid) // 保存新的用户记录
      ctx.user = await UserService.findUserOpenid(result.data.openid) // 获取新创建的用户信息
    }

    // 7. 颁发JWT令牌
    const { id } = ctx.user
    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7, // Token有效期：7天
      algorithm: 'RS256', // 使用RS256算法签名
    })

    // 8. 返回登录结果
    ctx.body = {
      code: 0,
      message: '微信登录成功',
      token,
      appid: APP_ID,
      secret: SECRET,
      data: result.data, // 返回微信API的原始数据
    }
  }
}

module.exports = new LoginController()
