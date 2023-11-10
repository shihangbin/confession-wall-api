const ArticleService = require('../service/article.service')
const { upload } = require('../utils/upload')

let imgIdArr = []
let articleId = ''

class ArticleController {
  async articleCreate(ctx, next) {
    // 1.获取body中参数
    const { content } = ctx.request.body
    const { id } = ctx.user

    // 2.操作数据库, 将数据进行存储
    const result = await ArticleService.articleCreate(content, id)
    articleId = result.insertId
    await ArticleService.association(articleId, imgIdArr)
    imgIdArr = []
    articleId = ''

    ctx.body = {
      code: 0,
      message: '文章发布成功~',
      data: result,
    }
  }

  async articleImages(ctx, next) {
    const files = ctx.request.files
    console.log(false)
    let url = []
    // let arrayImg = []

    async function upImage(item) {
      let url_path = await upload(
        item.filepath,
        item.newFilename,
        item.mimetype,
        'article_images'
      )
      item.filepath = url_path
      url.push(url_path)
      // arrayImg.push(item)
      let imgId = await ArticleService.imagesUpload(
        item.filepath,
        item.newFilename,
        item.mimetype,
        item.size
      )
      imgIdArr.push(imgId.insertId)
    }

    for (const key in files) {
      const file = files[key]
      if (Array.isArray(file)) {
        for (const item of file) {
          await upImage(item)
        }
      } else {
        await upImage(file)
      }
    }

    ctx.body = await {
      code: 0,
      message: '图片上传成功!',
      url,
    }

    setTimeout(() => {
      imgIdArr = []
    }, 60000)
  }

  async articleList(ctx, next) {
    const { offset, size, sort } = ctx.query

    const result = await ArticleService.articleList(offset, size, sort)

    ctx.body = {
      code: 0,
      message: '文章查询成功',
      data: result,
    }
  }

  async articleSearch(ctx, next) {
    const { search, offset, size } = ctx.query
    const result = await ArticleService.articleSearch(search, offset, size)

    ctx.body = {
      code: 0,
      message: '文章搜索成功',
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
