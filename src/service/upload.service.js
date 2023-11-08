const connection = require('../app/database')

class UploadService {
  async avatarUpload(fileName, mimetype, fileSize, url, userId) {
    fileName = fileName === undefined ? null : fileName
    mimetype = mimetype === undefined ? null : mimetype
    fileSize = fileSize === undefined ? null : fileSize
    url = url === undefined ? null : url
    userId = userId === undefined ? null : userId

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
