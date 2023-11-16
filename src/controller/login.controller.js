const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')
const UserService = require('../service/user.service')

class LoginController {
  signUser(ctx, next) {
    // 1.获取用户信息
    const { id, username } = ctx.user

    // 2.颁发令牌token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
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
}

module.exports = new LoginController()
