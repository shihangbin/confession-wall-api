const ArticleService = require('../service/article.service')

class ArticleController {
  async createArticle(ctx, next) {
    // 1.获取body中参数
    const { content } = ctx.request.body
    const { id } = ctx.user

    // 2.操作数据库, 将数据进行存储
    const result = await ArticleService.createArticle(content, id)
    ctx.body = {
      code: 0,
      message: '文章发布成功~',
      data: result,
    }
  }

  async articleList(ctx, next) {
    const { offset, size } = ctx.query

    const result = await ArticleService.queryList(offset, size)

    ctx.body = {
      code: 0,
      message: '文章查询成功',
      data: result,
    }
  }
}

module.exports = new ArticleController()
