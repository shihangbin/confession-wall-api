const ArticleService = require('../service/article.service')
const { upload } = require('../utils/upload')

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

  async articleImages(ctx, next) {
    const files = ctx.request.files
    let url = []
    let arrayImg = []
    // ----------------------------------------------------------------
    for (const key in files) {
      const file = files[key]
      if (Array.isArray(file)) {
        // file.forEach(async (item) => {
        //   let url_path = await upload(
        //     item.filepath,
        //     item.newFilename,
        //     item.mimetype,
        //     'article_images'
        //   )
        //   item.filepath = url_path
        //   arrayImg.push(item)
        //   await console.log(arrayImg)
        // })
        let a = file.map(async (item) => {
          let url_path = await upload(
            item.filepath,
            item.newFilename,
            item.mimetype,
            'article_images'
          )
          item.filepath = url_path

          return await arrayImg.push(item)
        })
        console.log(a)
      } else {
        let url_path = await upload(
          file.filepath,
          file.newFilename,
          file.mimetype,
          'article_images'
        )
        file.filepath = url_path
        arrayImg.push(file)
      }
    }
    // ----------------------------------------------------------------

    // async function dataImg(file) {
    //   const filepath = file.filepath
    //   const fileName = file.newFilename
    //   const mimetype = file.mimetype
    //   const fileSize = file.size

    //   let url_path = await upload(
    //     filepath,
    //     fileName,
    //     mimetype,
    //     'article_images'
    //   )
    //   url.push(url_path)
    //   objImg.imgUrl = url_path
    //   objImg.filepath = filepath
    //   objImg.fileName = fileName
    //   objImg.fileSize = fileSize
    //   // arrayImg.push(objImg)
    //   await console.log(objImg)

    //   // console.log(arrayImg.push(objImg))
    // }
    // console.log(arrayImg)

    ctx.body = await {
      code: 0,
      message: '头像上传成功!',
      url,
      arrayImg,
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
