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
        'UPDATE article_images SET article_id = ? WHERE id = ?',
        [articleId, imageId]
      )
    }
  }

  async articleList(offset = 0, size = 10) {
    const statement = `
      SELECT 
        a.id AS id,a.content AS content, a.author_id AS autohor_id, a.publication_date AS publication_date,
        JSON_OBJECT('id', u.id, 'username', u.username, 'avatarURL', u.avatar_path, 'wechat_or_qq', u.wechat_or_qq,'age',u.age,'gender',u.gender,'major',u.major,'class',u.class) user
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      ORDER BY publication_date DESC
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
          a.id AS id,a.content AS content, a.author_id AS autohor_id, a.publication_date AS publication_date,
          JSON_OBJECT('id', u.id, 'username', u.username, 'avatarURL', u.avatar_path, 'wechat_or_qq', u.wechat_or_qq,'age',u.age,'gender',u.gender,'major',u.major,'class',u.class) user
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      WHERE u.id = ? AND a.author_id = ?
      ORDER BY publication_date DESC;
      `

    const [result] = await connection.execute(statement, [articleId, articleId])
    return result
  }

  async articleRemove(articleId) {
    const statement = 'DELETE FROM articles WHERE id = ?;'
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
}
module.exports = new ArticleService()
