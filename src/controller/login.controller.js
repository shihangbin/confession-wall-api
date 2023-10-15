const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')

class LoginController {
  sign(ctx, next) {
    //  1.获取用户信息
    const { user_id, username } = ctx.users

    // 2.颁发令牌token
    const token = jwt.sign({ user_id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7,
      algorithm: 'RS256',
    })

    // 3.返回用户信息
    ctx.body = {
      code: 0,
      data: {
        userId: user_id,
        username,
        token,
      },
    }
  }

  test(ctx, next) {
    ctx.body = 'token验证通过'
  }
}

module.exports = new LoginController()
