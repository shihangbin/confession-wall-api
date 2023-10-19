const connection = require('../app/database')

class UploadService {
  async avatarUpload(userId, url, fileMimetype, fileSize) {
    const statement = `INSERT INTO avatar(user_id,url,mimetype,size) VALUES (?,?,?,?);`
    const [result] = await connection.execute(statement, [
      userId,
      url,
      fileMimetype,
      fileSize,
    ])
    return result
  }
  async getAvatar(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }
}

module.exports = new UploadService()
