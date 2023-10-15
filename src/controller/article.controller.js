const ArticleService = require('../service/article.service')

class ArticleController {
  async articleCreate(ctx, next) {
    // 1.获取body中参数
    const { content } = ctx.request.body
    const { id } = ctx.user

    // 2.操作数据库, 将数据进行存储
    const result = await ArticleService.articleCreate(content, id)
    ctx.body = {
      code: 0,
      message: '文章发布成功~',
      data: result,
    }
  }

  async articleList(ctx, next) {
    const { offset, size } = ctx.query

    const result = await ArticleService.articleList(offset, size)

    ctx.body = {
      code: 0,
      message: '文章查询成功',
      data: result,
    }
  }

  async articleDetail(ctx, next) {
    const { articleId } = ctx.params

    const result = await ArticleService.articleDetail(articleId)

    ctx.body = {
      code: 0,
      message: '查询成功',
      data: result[0],
    }
  }

  async articleRemove(ctx, next) {
    const { articleId } = ctx.params

    const result = await ArticleService.articleRemove(articleId)

    ctx.body = {
      code: 0,
      message: '删除成功',
      data: result[0],
    }
  }
}

module.exports = new ArticleController()
