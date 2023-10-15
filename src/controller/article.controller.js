const ArticleService = require('../service/article.service')

class ArticleController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.users

    const result = await ArticleService.create({ id, content })

    ctx.body = {
      message: '文章创建成功',
      data: result,
    }
  }
}

module.exports = new ArticleController()
