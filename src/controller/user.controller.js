const userService = require('../service/user.service')

class UserController {
  async createUser(ctx, next) {
    // 获取用户传递过来的数据
    const user = ctx.request.body
    // 将user数据存储到数据库
    const result = await userService.createUser(user)

    // 查看存储结果,告诉前端
    ctx.body = {
      message: '创建用户成功',
      data: result,
    }
  }
}
module.exports = new UserController()
