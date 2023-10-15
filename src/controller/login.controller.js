const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')

class LoginController {
  signUser(ctx, next) {
    // 1.获取用户信息
    const { id, username } = ctx.user

    // 2.颁发令牌token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7,
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

  test(ctx, next) {
    ctx.body = {
      code: 0,
      message: 'token验证通过',
    }
  }
}

module.exports = new LoginController()
