const connection = require('../app/database')

class ArticleService {
  // 创建文章
  async createArticle(contents) {
    const { id, content } = contents
    // 拼接statement
    const statement = 'INSERT INTO `article` (user_id, content) VALUES(?, ?);'

    // 执行SQL
    const [result] = await connection.execute(statement, [id, content])
    console.log('数据库操作成功')
    return result
  }

  async queryList(offset = 0, size = 10) {
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
}
module.exports = new ArticleService()
