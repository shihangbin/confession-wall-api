const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/keys')

class LoginController {
  async login(ctx, next) {
    //  1.获取用户信息
    const { user_id, username } = ctx.users

    // 2.颁发令牌token
    const token = jwt.sign({ user_id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256',
    })
    console.log(token)
    // 3.返回用户信息
    // ctx.body = {
    //   code: 0,
    //   data: {
    //     id: user_id,
    //     username: username,
    //     token: token,
    //   },
    // }
  }
}

module.exports = new LoginController()
