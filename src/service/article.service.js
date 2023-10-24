const { url } = require('@koa/router')
const connection = require('../app/database')

class ArticleService {
  // 创建文章
  async articleCreate(content, userId) {
    // 拼接statement
    const statement = `
      INSERT INTO articles (content, author_id)
      VALUES (?, ?);
    `

    // 执行SQL
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async imagesUpload(url, filename, mimetype, size) {
    // console.log(url, filename, mimetype, size)
    const statement = `
        INSERT INTO article_images (url,filename,mimetype,size) 
        VALUES (?, ?, ?, ?);
      `
    const [result] = await connection.execute(statement, [
      url,
      filename,
      mimetype,
      size,
    ])
    return result
  }

  async association(articleId, imgIdArr) {
    for (const imageId of imgIdArr) {
      await connection.execute(
        'UPDATE article_images SET article_id = ? WHERE image_id = ?',
        [articleId, imageId]
      )
    }
  }

  async articleList(offset = 0, size = 10) {
    const statement = `
    SELECT 
      a.id AS id,a.content AS content, a.createAt AS createTime, a.updateAt AS updateTime,
      JSON_OBJECT('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) user
    FROM article AS a
    LEFT JOIN user AS u ON u.id = a.user_id
    LIMIT ? OFFSET ?;`

    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ])
    return result
  }

  async articleDetail(articleId) {
    const statement = `
      SELECT 
        a.id id, a.content content, a.createAt createTime, a.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) user
      FROM article a
      LEFT JOIN user u ON u.id = a.user_id
      WHERE a.id = ?;
    `
    const [result] = await connection.execute(statement, [articleId])
    return result
  }

  async articleRemove(articleId) {
    const statement = 'DELETE FROM article WHERE id = ?;'
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
}
module.exports = new ArticleService()
