const connection = require('../app/database')

class ArticleService {
  // 创建用户
  async create(user) {
    const { id, content } = user

    // 拼接statement
    const statement = 'INSERT INTO `article` (user_id, content) VALUES(?, ?);'

    // 执行SQL
    const [result] = await connection.execute(statement, [id, content])
    console.log('数据库操作成功')
    return result
  }
}
module.exports = new ArticleService()
