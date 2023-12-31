const { url } = require('@koa/router')
const connection = require('../app/database')

class ArticleService {
  // 创建文章
  async articleCreate(content, assort = 1, userId) {
    // 拼接statement
    const statement = `
      INSERT INTO articles (content, assort, author_id)
      VALUES (?, ?, ?);
    `

    // 执行SQL
    const [result] = await connection.execute(statement, [
      content,
      assort,
      userId,
    ])
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

  async articleList(offset = 0, size = 10, assort = 1, sort = 'DESC') {
    const statement = `
      SELECT 
      a.id AS id,
      a.content AS content,
      a.author_id AS autohor_id,
      a.assort AS assort,
      a.publication_date AS publication_date,
      JSON_OBJECT(
          'id', u.id,
          'username', u.username,
          'avatar_path', u.avatar_path,
          'nickname',u.nickname,
          'age', u.age,
          'role',u.role,
          'is_muted',u.is_muted,
          'wechat_or_qq', u.wechat_or_qq,
          'gender', u.gender,
          'major', u.major,
          'school_class', u.school_class,
          'say',u.say
      ) AS user,
      JSON_ARRAYAGG(i.url) AS image_urls
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      LEFT JOIN article_images AS i ON a.id = i.article_id
      WHERE a.assort = ?
      GROUP BY a.id, a.content, a.author_id, a.publication_date, user
      ORDER BY a.publication_date ${sort}
      LIMIT ? OFFSET ?;`

    const [result] = await connection.execute(statement, [
      assort,
      String(size),
      String(offset),
    ])
    return result
  }

  async articleSearch(search, offset = 0, size = 10) {
    console.log(search)
    const statement = `
      SELECT 
      a.id AS id,
      a.content AS content,
      a.author_id AS autohor_id,
      a.assort AS assort,
      a.publication_date AS publication_date,
      JSON_OBJECT(
          'id', u.id,
          'username', u.username,
          'avatar_path', u.avatar_path,
          'nickname',u.nickname,
          'age', u.age,
          'role',u.role,
          'is_muted',u.is_muted,
          'wechat_or_qq', u.wechat_or_qq,
          'gender', u.gender,
          'major', u.major,
          'school_class', u.school_class,
          'say',u.say
      ) AS user,
      JSON_ARRAYAGG(i.url) AS image_urls
      FROM articles AS a
      LEFT JOIN users AS u ON u.id = a.author_id
      LEFT JOIN article_images AS i ON a.id = i.article_id
      WHERE a.content LIKE CONCAT('%', ?, '%') AND a.assort = 1
      GROUP BY a.id, a.content, a.author_id, a.publication_date, user
      ORDER BY a.publication_date DESC
    LIMIT ? OFFSET ?;`

    const [result] = await connection.execute(statement, [
      search,
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
    a.assort AS assort,
    a.publication_date AS publication_date,
    JSON_OBJECT(
        'id', u.id,
        'username', u.username,
        'avatar_path', u.avatar_path,
        'nickname',u.nickname,
        'age', u.age,
        'role',u.role,
        'is_muted',u.is_muted,
        'wechat_or_qq', u.wechat_or_qq,
        'gender', u.gender,
        'major', u.major,
        'school_class', u.school_class,
        'say',u.say
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
