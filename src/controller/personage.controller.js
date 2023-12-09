const PersonageService = require('../service/personage.service')

class PersonageController {
  async getLike(ctx, next) {
    // 获取用户传递过来的数据
    const { id } = ctx.user
    const result = await PersonageService.getLike(id)

    ctx.body = {
      code: 0,
      message: '点赞查询成功',
      data: result,
    }
  }
  async getArticle(ctx, next) {
    // 获取用户传递过来的数据
    const { id } = ctx.user
    const result = await PersonageService.getArticle(id)

    ctx.body = {
      code: 0,
      message: '点赞查询成功',
      data: result,
    }
  }
}

module.exports = new PersonageController()
