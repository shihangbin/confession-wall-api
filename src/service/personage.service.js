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
    const statement = `SELECT * FROM articles WHERE author_id = ?;`

    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new PersonageService()
