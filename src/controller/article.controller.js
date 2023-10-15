const { create, queryList } = require('../service/article.service')

class ArticleController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user

    const result = await create(id, content)

    ctx.body = {
      code: 0,
      message: '文章创建成功',
      data: result,
    }
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query

    const result = await queryList(offset, size)

    ctx.body = {
      code: 0,
      message: '文章查询成功',
      data: result,
    }
  }
}

module.exports = new ArticleController()
