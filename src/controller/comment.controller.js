const commentMiddleware = require('../middleware/comment.middleware')

class CommentController {
  async create(ctx, next) {
    const { content, articleId } = ctx.request.body
    const { id } = ctx.user

    const result = await commentMiddleware.create(articleId, id, content)

    ctx.body = {
      code: 0,
      message: '创建评论成功',
      data: result,
    }
  }
  async requestComment(ctx, next) {
    const { commentId } = ctx.params
    const result = await commentMiddleware.requestComment(commentId)

    ctx.body = {
      code: 0,
      message: '查询评论成功',
      data: result,
    }
  }
}

module.exports = new CommentController()
