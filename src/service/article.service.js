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
    // 使用条件语句判断是否为 undefined，如果是，则转换为 null
    url = url === undefined ? null : url
    filename = filename === undefined ? null : filename
    mimetype = mimetype === undefined ? null : mimetype
    size = size === undefined ? null : size

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
      a.id AS id,
      a.content AS content,
      a.author_id AS autohor_id,
      a.publication_date AS publication_date,
      JSON_OBJECT(
          'id', u.id,
          'username', u.username,
          'avatarURL', u.avatar_path,
          'wechat_or_qq', u.wechat_or_qq,
          'age', u.age,
          'gender', u.gender,
          'major', u.major,
          'class', u.class
      ) AS user,
      JSON_ARRAYAGG(i.url) AS image_urls
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      LEFT JOIN article_images AS i ON a.id = i.article_id
      GROUP BY a.id, a.content, a.author_id, a.publication_date, user
      ORDER BY a.publication_date DESC
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
      a.id AS id,
      a.content AS content,
      a.author_id AS autohor_id,
      a.publication_date AS publication_date,
      JSON_OBJECT(
          'id', u.id,
          'username', u.username,
          'avatarURL', u.avatar_path,
          'wechat_or_qq', u.wechat_or_qq,
          'age', u.age,
          'gender', u.gender,
          'major', u.major,
          'class', u.class
      ) AS user,
      JSON_ARRAYAGG(i.url) AS image_urls
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      LEFT JOIN article_images AS i ON a.id = i.article_id
      WHERE a.id = ?
      GROUP BY a.id, a.content, a.author_id, a.publication_date, user
      ORDER BY a.publication_date DESC;
      `

    const [result] = await connection.execute(statement, [articleId])
    return result
  }

  async articleRemove(articleId) {
    const statement = 'DELETE FROM articles WHERE id = ?;'
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
}
module.exports = new ArticleService()
