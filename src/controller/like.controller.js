const LikeService = require('../service/like.service')

class LikeController {
  async getLike(ctx, next) {
    const { userId, articleId } = ctx.query
    const result = await LikeService.getLike(userId, articleId)

    ctx.body = {
      code: 0,
      message: '点赞查询',
      data: result[0],
    }
  }

  async getUserLike(ctx, next) {
    const { userId } = ctx.query
    const result = await LikeService.getUserLike(userId)

    ctx.body = {
      code: 0,
      message: '点赞查询',
      data: result,
    }
  }

  async getLikeList(ctx, next) {
    const { articleId } = ctx.query
    const result = await LikeService.getLikeList(articleId)

    ctx.body = {
      code: 0,
      message: '点赞查询',
      data: result,
    }
  }

  async postLike(ctx, next) {
    const { id } = ctx.user
    const { articleId } = ctx.request.body
    const result = await LikeService.postLike(id, articleId)

    ctx.body = {
      code: 0,
      message: '点赞成功',
      data: result,
    }
  }

  async delLike(ctx, next) {
    const { id } = ctx.user
    const { likeId } = ctx.params
    const result = await LikeService.delLike(id, likeId)

    ctx.body = {
      code: 0,
      message: '取消点赞',
      data: result,
    }
  }
}

module.exports = new LikeController()
