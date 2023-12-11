const connection = require('../app/database')

class PersonageService {
  async getLike(userId) {
    const statement = `
    SELECT * FROM likes l 
    LEFT JOIN articles a ON l.user_id = a.author_id 
    WHERE user_id = ?;`

    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async getArticle(userId) {
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
    WHERE a.assort = 1 AND a.author_id = ?
    GROUP BY a.id, a.content, a.author_id, a.publication_date, user
    ORDER BY a.publication_date DESC;`

    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new PersonageService()
