const userService = require('../service/user.service')

class userController {
  create(ctx, next) {
    // 获取用户传递过来的数据
    const user = ctx.request.body
    console.log(user)

    // 将user数据存储到数据库
    userService.create(user)

    // 查看存储结果,告诉前端
    ctx.body = '创建用户成功'
  }
}
module.exports = new userController()
