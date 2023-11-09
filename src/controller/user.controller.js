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

  async putUser(ctx, next) {
    const { userID } = ctx.params
    const {
      username,
      password,
      avatar_path,
      nickname,
      age,
      role,
      is_muted,
      wechat_or_qq,
      gender,
      major,
      school_class,
      say,
    } = ctx.request.body

    const result = await userService.putUserInfo(
      username,
      password,
      avatar_path,
      nickname,
      age,
      role,
      is_muted,
      wechat_or_qq,
      gender,
      major,
      school_class,
      say,
      userID
    )
    ctx.body = {
      code: 0,
      message: '修改用户信息成功',
      data: result,
    }
  }
}
module.exports = new UserController()
