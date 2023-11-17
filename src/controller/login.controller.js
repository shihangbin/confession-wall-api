const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')
const UserService = require('../service/user.service')
const axios = require('axios')

class LoginController {
  signUser(ctx, next) {
    // 1.获取用户信息
    const { id, username } = ctx.user

    // 2.颁发令牌token
    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7,
      // expiresIn: 20000,
      algorithm: 'RS256',
    })

    // 3.返回用户信息
    ctx.body = {
      code: 0,
      data: {
        id,
        username,
        token,
      },
    }
  }

  async user(ctx, next) {
    const { id } = ctx.user

    const result = await UserService.userId(id)

    ctx.body = {
      code: 0,
      message: 'token验证通过',
      data: result[0],
    }
  }

  async wxLogin(ctx, next) {
    const { code } = ctx.request.body
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxb4609bd47f86f85d&secret=a8335f08c978c7890fc9a099b1c616de&js_code=${code}&grant_type=authorization_code`

    const result = await axios.get(url)

    if (result.data.hasOwnProperty('errcode')) {
      ctx.body = {
        code: result.data.errcode,
        message: '微信登录失败',
      }
      return
    }

    const users = await UserService.findUserOpenid(result.data.openid)
    const user = users[0]
    ctx.user = user

    if (!user) {
      await UserService.wxLogin(result.data.openid)
      ctx.user = await UserService.findUserOpenid(result.data.openid)
    }

    const { id } = ctx.user

    const token = jwt.sign({ id }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7,
      // expiresIn: 20000,
      algorithm: 'RS256',
    })
    ctx.body = {
      code: 0,
      message: '微信登录成功',
      token,
      data: result.data,
    }
  }
}

module.exports = new LoginController()
