const connection = require('../app/database')

class CommentService {
  async create(articleId, userId, content) {
    const statement =
      'INSERT INTO comments (article_id, user_id, content) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [
      articleId,
      userId,
      content,
    ])
    return result
  }
  async requestComment(commentId) {
    const statement = `
    SELECT c.id,c.article_id,c.content, JSON_OBJECT(
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
    ) AS user
    FROM comments c
    LEFT JOIN users AS u ON u.id = c.user_id
    WHERE article_id = ?
    ORDER BY c.createAt DESC;`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new CommentService()
