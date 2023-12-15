const PersonageService = require('../service/personage.service')

class PersonageController {
  async getLike(ctx, next) {
    // 获取用户传递过来的数据
    const { userId } = ctx.params
    const result = await PersonageService.getLike(userId)

    ctx.body = {
      code: 0,
      message: '点赞查询成功',
      data: result,
    }
  }
  async getArticle(ctx, next) {
    // 获取用户传递过来的数据
    const { userId } = ctx.params
    const result = await PersonageService.getArticle(userId)

    ctx.body = {
      code: 0,
      message: '我的文章查询成功',
      data: result,
    }
  }
}

module.exports = new PersonageController()
