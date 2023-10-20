const connection = require('../app/database')

class UploadService {
  async avatarUpload(fieldName, fileName, mimetype, fileSize, url, userId) {
    const statement = `INSERT INTO avatar(fieldname,filename,mimetype,size,url,user_id) VALUES (?,?,?,?,?,?);`
    const [result] = await connection.execute(statement, [
      fieldName,
      fileName,
      mimetype,
      fileSize,
      url,
      userId,
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
