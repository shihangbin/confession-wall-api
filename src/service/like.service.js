const connection = require('../app/database')

class LikeService {
  async getLike(userId, articleId) {
    const statement = 'SELECT * FROM likes WHERE user_id = ? AND article_id = ?'
    // 执行 SQL
    const [result] = await connection.execute(statement, [userId, articleId])
    return result
  }
  async getUserLike(userId) {
    const statement = 'SELECT * FROM likes WHERE user_id = ?;'
    // 执行 SQL
    const [result] = await connection.execute(statement, [userId])
    return result
  }
  async getLikeList(articleId) {
    const statement = 'SELECT * FROM likes WHERE article_id = ?;;'
    // 执行 SQL
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
  async getLike(userId, articleId) {
    const statement = 'SELECT * FROM likes WHERE user_id = ? AND article_id = ?'
    // 执行 SQL
    const [result] = await connection.execute(statement, [userId, articleId])
    return result
  }

  async delLike(userId, likeId) {
    const statement = 'DELETE FROM likes WHERE user_id = ? AND id = ?'
    // 执行 SQL
    const [result] = await connection.execute(statement, [userId, likeId])
    return result
  }

  async postLike(userId, articleId) {
    const statement = `
      INSERT INTO likes (user_id, article_id) 
      SELECT ?, ?
      FROM dual
      WHERE NOT EXISTS (
          SELECT 1
          FROM likes 
          WHERE user_id = ? AND article_id = ?
      );
    `
    // 执行 SQL
    const [result] = await connection.execute(statement, [
      userId,
      articleId,
      userId,
      articleId,
    ])
    return result
  }
}

module.exports = new LikeService()
