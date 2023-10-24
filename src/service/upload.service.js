const connection = require('../app/database')

class UploadService {
  async avatarUpload(fileName, mimetype, fileSize, url, userId) {
    const statement =
      'INSERT INTO avatars (filename, mimetype, size, url, user_id) VALUES (?, ?, ?, ?, ?);'

    const [result] = await connection.execute(statement, [
      fileName,
      mimetype,
      fileSize,
      url,
      userId,
    ])
    return result
  }
  async getAvatar(userId) {
    const statement = `SELECT * FROM avatars WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }
}

module.exports = new UploadService()
