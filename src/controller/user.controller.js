const userService = require('../service/user.service')

class UserController {
  async createUser(ctx, next) {
    // 获取用户传递过来的数据
    const user = ctx.request.body
    // 将user数据存储到数据库
    const result = await userService.createUser(user)

    // 查看存储结果,告诉前端
    ctx.body = {
      code: 0,
      message: '创建用户成功',
      data: result,
    }
  }

  async getUser(ctx, next) {
    const { userID } = ctx.params
    const result = await userService.userId(userID)
    ctx.body = {
      code: 0,
      message: '查询用户成功',
      data: result[0],
    }
  }
}
module.exports = new UserController()
